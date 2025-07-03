import { app } from '@/lib/firebase';
import { getFirestore, collection, addDoc, getDocs, doc, getDoc, query, orderBy, Timestamp } from 'firebase/firestore';
import type { BusinessInfo, Funnel, GenerateFunnelContentOutput } from '@/lib/types';
import { format } from 'date-fns';

const db = getFirestore(app);

export async function saveFunnel(
    userId: string,
    businessInfo: BusinessInfo,
    generatedContent: GenerateFunnelContentOutput
): Promise<string> {
    const funnelName = `${businessInfo.businessName} - ${format(new Date(), 'MM/dd/yyyy')}`;
    const funnelsCollectionRef = collection(db, 'users', userId, 'funnels');
    const docRef = await addDoc(funnelsCollectionRef, {
        name: funnelName,
        businessInfo,
        generatedContent,
        createdAt: Timestamp.fromDate(new Date()),
    });
    return docRef.id;
}


export async function getFunnels(userId: string): Promise<Funnel[]> {
    const funnelsCollectionRef = collection(db, 'users', userId, 'funnels');
    const q = query(funnelsCollectionRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const funnels = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
            id: doc.id,
            name: data.name,
            businessInfo: data.businessInfo,
            generatedContent: data.generatedContent,
            // Convert Firestore timestamp to JS Date
            createdAt: data.createdAt.toDate(),
        } as Funnel
    });
    return funnels;
}

export async function getFunnel(userId: string, funnelId: string): Promise<Funnel | null> {
    const funnelDocRef = doc(db, 'users', userId, 'funnels', funnelId);
    const docSnap = await getDoc(funnelDocRef);

    if (docSnap.exists()) {
        const data = docSnap.data();
        return {
            id: docSnap.id,
            name: data.name,
            businessInfo: data.businessInfo,
            generatedContent: data.generatedContent,
            createdAt: data.createdAt.toDate(),
        } as Funnel;
    } else {
        return null;
    }
}
