// Inspired by react-hot-toast library
import * as React from "react"

import type { ToastProps as ToastPrimitivesProps } from "@/components/ui/toast"

type ToasterToast = ToastPrimitivesProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: React.ReactElement
}

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 1000000

type ToasterProps = {
  toasts: ToasterToast[]
  toast: (toast: Omit<ToasterToast, "id">) => void
  dismiss: (toastId?: string) => void
}

export const ToastContext = React.createContext<ToasterProps | undefined>(
  undefined
)

export function useToast() {
  const context = React.useContext(ToastContext)

  if (!context) {
    // Return a dummy object that does nothing to prevent crashes
    // if the hook is used outside of a provider.
    return {
      toast: () => {
        console.warn("Toast provider not found. Skipping toast.")
      },
      dismiss: () => {},
      toasts: [],
    }
  }

  return context
}

// We need a global state to track the toasts
let memoryState: ToasterProps = {
  toasts: [],
  toast: () => {},
  dismiss: () => {},
}

type ToastProps = Omit<
  React.ComponentPropsWithoutRef<typeof import("@/components/ui/toast").Toast>,
  "id"
>

export function reducer(state: ToasterProps, action: any): ToasterProps {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }

    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      }

    case "DISMISS_TOAST": {
      const { toastId } = action

      // ! Side effects ! - This could be extracted into a dismissToast() action,
      // but I'll keep it here for simplicity
      if (toastId) {
        setTimeout(() => {
          memoryState.dismiss(toastId)
        }, TOAST_REMOVE_DELAY)
      } else {
        state.toasts.forEach((toast) => {
          setTimeout(() => {
            memoryState.dismiss(toast.id)
          }, TOAST_REMOVE_DELAY)
        })
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t
        ),
      }
    }
    case "REMOVE_TOAST":
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        }
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      }
  }
}

const listeners: Array<(state: ToasterProps) => void> = []

export const toast = (props: Omit<ToasterToast, "id">) => {
  const id = Math.random().toString(36).slice(2, 11)

  memoryState = reducer(memoryState, {
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open: boolean) => {
        if (!open) {
          memoryState.dismiss(id)
        }
      },
    },
  })

  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

// This hook is used to listen to the global state
export function useToastState() {
  const [state, setState] = React.useState(memoryState)

  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [state])

  memoryState = {
    ...state,
    toast,
    dismiss: (toastId?: string) => {
      const id = toastId ?? state.toasts[0]?.id
      if (id) {
        // Find the toast and call its onOpenChange
        const toast = state.toasts.find((t) => t.id === id)
        if (toast?.onOpenChange) {
          toast.onOpenChange(false)
        }
      }

      const newState = reducer(memoryState, {
        type: "DISMISS_TOAST",
        toastId,
      })

      memoryState = newState
      listeners.forEach((listener) => {
        listener(newState)
      })

      // Auto remove toast after a while
      setTimeout(() => {
        const newState = reducer(memoryState, {
          type: "REMOVE_TOAST",
          toastId,
        })

        memoryState = newState
        listeners.forEach((listener) => {
          listener(newState)
        })
      }, TOAST_REMOVE_DELAY)
    },
  }

  return memoryState
}
