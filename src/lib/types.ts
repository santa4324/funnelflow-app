import type { GenerateFunnelContentOutput } from '@/ai/flows/generate-funnel-content';

export interface BusinessInfo {
    businessName: string;
    industry: string;
    targetAudience: string;
    offer: string;
    websiteUrl?: string;
    socialUrls?: string;
}

export interface Funnel {
    id: string;
    name: string;
    userId: string;
    businessInfo: BusinessInfo;
    generatedContent: GenerateFunnelContentOutput;
    createdAt: Date;
}

export interface PublicFunnel {
    name: string;
    generatedContent: GenerateFunnelContentOutput;
    userId: string;
    id: string;
}

export interface Lead {
    id: string;
    name: string;
    email: string;
    funnelId: string;
    funnelName: string;
    collectedAt: Date;
    emailsSent?: string[];
}
