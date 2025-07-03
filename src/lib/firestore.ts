import { app, isFirebaseConfigured } from '@/lib/firebase';
import { getFirestore, collection, addDoc, getDocs, doc, getDoc, query, orderBy, Timestamp, where, type Firestore, setDoc } from 'firebase/firestore';
import type { BusinessInfo, Funnel, GenerateFunnelContentOutput, PublicFunnel, Lead } from '@/lib/types';
import { format } from 'date-fns';

const db: Firestore | undefined = isFirebaseConfigured && app ? getFirestore(app) : undefined;

function ensureDb(): Firestore {
    if (!db) {
        throw new Error("Firestore is not configured. Please add your Firebase credentials to the .env file.");
    }
    return db;
}


export async function saveFunnel(
    userId: string,
    businessInfo: BusinessInfo,
    generatedContent: GenerateFunnelContentOutput
): Promise<string> {
    const db = ensureDb();
    const funnelName = `${businessInfo.businessName} - ${format(new Date(), 'MM/dd/yyyy')}`;
    const funnelsCollectionRef = collection(db, 'users', userId, 'funnels');
    
    const funnelData = {
        name: funnelName,
        userId: userId,
        businessInfo,
        generatedContent,
        createdAt: Timestamp.fromDate(new Date()),
    };
    
    const docRef = await addDoc(funnelsCollectionRef, funnelData);

    // Create a public index for the funnel using the same ID for direct lookup
    const funnelIndexRef = doc(db, 'funnelIndex', docRef.id);
    await setDoc(funnelIndexRef, {
      name: funnelName,
      userId: userId,
      generatedContent,
    });

    return docRef.id;
}


export async function getFunnels(userId: string): Promise<Funnel[]> {
    const db = ensureDb();
    const funnelsCollectionRef = collection(db, 'users', userId, 'funnels');
    const q = query(funnelsCollectionRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const funnels = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
            id: doc.id,
            name: data.name,
            userId: data.userId,
            businessInfo: data.businessInfo,
            generatedContent: data.generatedContent,
            createdAt: data.createdAt.toDate(),
        } as Funnel
    });
    return funnels;
}

export async function getFunnel(userId: string, funnelId: string): Promise<Funnel | null> {
    const db = ensureDb();
    const funnelDocRef = doc(db, 'users', userId, 'funnels', funnelId);
    const docSnap = await getDoc(funnelDocRef);

    if (docSnap.exists()) {
        const data = docSnap.data();
        return {
            id: docSnap.id,
            name: data.name,
            userId: data.userId,
            businessInfo: data.businessInfo,
            generatedContent: data.generatedContent,
            createdAt: data.createdAt.toDate(),
        } as Funnel;
    } else {
        return null;
    }
}

export async function getPublicFunnel(funnelId: string): Promise<PublicFunnel | null> {
    const db = ensureDb();
    const funnelDocRef = doc(db, 'funnelIndex', funnelId);
    const docSnap = await getDoc(funnelDocRef);
    
    if (!docSnap.exists()) {
        console.log("No matching public funnel found in index.");
        return null;
    }
    
    const data = docSnap.data();

    return {
        id: docSnap.id,
        name: data.name,
        userId: data.userId,
        generatedContent: data.generatedContent,
    };
}

export async function saveLead(userId: string, funnelId: string, name: string, email: string): Promise<void> {
    const db = ensureDb();
    // We get the funnel from the private collection to ensure we have the correct name.
    const funnel = await getFunnel(userId, funnelId);
    if (!funnel) {
        // Fallback to public funnel data if private one not found (should be rare)
        const publicFunnel = await getPublicFunnel(funnelId);
         if (!publicFunnel) {
            throw new Error("Funnel not found");
         }
         const leadsCollectionRef = collection(db, 'users', userId, 'leads');
         await addDoc(leadsCollectionRef, {
            name,
            email,
            funnelId,
            funnelName: publicFunnel.name,
            collectedAt: Timestamp.fromDate(new Date()),
        });
        return;
    }

    const leadsCollectionRef = collection(db, 'users', userId, 'leads');
    await addDoc(leadsCollectionRef, {
        name,
        email,
        funnelId,
        funnelName: funnel.name,
        collectedAt: Timestamp.fromDate(new Date()),
    });
}

export async function getLeads(userId: string): Promise<Lead[]> {
    const db = ensureDb();
    const leadsCollectionRef = collection(db, 'users', userId, 'leads');
    const q = query(leadsCollectionRef, orderBy('collectedAt', 'desc'));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
            id: doc.id,
            name: data.name,
            email: data.email,
            funnelId: data.funnelId,
            funnelName: data.funnelName,
            collectedAt: data.collectedAt.toDate(),
        } as Lead;
    });
}
