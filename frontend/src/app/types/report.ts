

export interface ReportOverview {
    query: string;
    score: number;
    summary: string;
    explanation: string;

    atRiskDatabases: string[];

    linkedInReport: LinkedInCheck;
    emailReport: EmailCheck;
    phoneReport: PhoneCheck;
    instagramReport: InstagramCheck;
}

interface LinkedInCheck {
    linkedInUrl: string;

    connections: number; 
    experience_summary: string;
}

interface PhoneCheck {
    score: number;
    summary: string;
    explanation: string;

    phoneNumber: string;
}

interface InstagramCheck {
    score: number;
    summary: string;
    explanation: string;
}

interface EmailCheck {
    score: number;
    summary: string;
    explanation: string;
}

interface WatchListMatch {
    watchlistName: string;
    description: string;
    link: string;
}

type WatchListCheck = {
    description: string;
}