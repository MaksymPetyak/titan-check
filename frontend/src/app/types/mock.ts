export const mockReport = {
    query: "John Smith, john.smith@email.com, LinkedIn: linkedin.com/in/johnsmith, Phone: +1234567890",
    score: 85,
    summary: "High Risk Profile",
    explanation: "Multiple risk indicators found including suspicious business activities and presence on watchlists.",

    atRiskDatabases: [
        "EU Sanctions List",
        "OFAC Watchlist",
        "Financial Fraud Database"
    ],

    linkedInReport: {
        linkedInUrl: "linkedin.com/in/johnsmith",
        connections: 42,
        experience_summary: "Multiple red flags: Claims C-level positions at companies that cannot be verified. Profile shows inconsistent career timeline."
    },

    emailReport: {
        score: 65,
        summary: "Medium Risk",
        explanation: "Email associated with previously reported investment schemes. Multiple aliases detected."
    },

    phoneReport: {
        score: 75,
        summary: "High Risk",
        explanation: "Number linked to multiple business fraud reports. Recently flagged in financial scam investigations.",
        phoneNumber: "+1234567890"
    },

    instagramReport: {
        score: 80,
        summary: "High Risk",
        explanation: "Profile uses stolen images from verified businesses. Promotes unregistered investment opportunities."
    }
};

export const mockReportLowRisk = {
    query: "Sarah Johnson, sarah.j@deloitte.com, LinkedIn: linkedin.com/in/sarahjohnson",
    score: 15,
    summary: "Low Risk Profile",
    explanation: "Verified professional with consistent background. No adverse findings.",

    atRiskDatabases: [],

    linkedInReport: {
        linkedInUrl: "linkedin.com/in/sarahjohnson",
        connections: 500,
        experience_summary: "Verified employment history at Deloitte. Professional certifications confirmed. Active industry participation."
    },

    emailReport: {
        score: 10,
        summary: "Low Risk",
        explanation: "Corporate email with verified domain. No suspicious activities detected."
    },

    phoneReport: {
        score: 20,
        summary: "Low Risk",
        explanation: "Registered business line with verified corporate connection.",
        phoneNumber: "+1987654321"
    },

    instagramReport: {
        score: 15,
        summary: "Low Risk",
        explanation: "Professional account with verified business connections. Consistent with stated role."
    }
};

export const mockReportHighRisk = {
    query: "Alex Trading Ltd, invest@quickprofit.com, Phone: +44123456789",
    score: 95,
    summary: "Critical Risk Profile",
    explanation: "Entity found on multiple sanctions lists. Strong indicators of fraudulent activities.",

    atRiskDatabases: [
        "EU Sanctions List",
        "OFAC SDN List",
        "Financial Action Task Force Blacklist",
        "Interpol Red Notices",
        "World Bank Debarred Parties"
    ],

    linkedInReport: {
        linkedInUrl: "linkedin.com/company/alex-trading",
        connections: 15,
        experience_summary: "Company claims cannot be verified. Multiple complaints about fraudulent business practices."
    },

    emailReport: {
        score: 95,
        summary: "Critical Risk",
        explanation: "Domain associated with known fraud schemes. Listed in multiple regulatory warnings."
    },

    phoneReport: {
        score: 90,
        summary: "Critical Risk",
        explanation: "Number linked to multiple reported fraud cases across EU jurisdictions.",
        phoneNumber: "+44123456789"
    },

    instagramReport: {
        score: 100,
        summary: "Critical Risk",
        explanation: "Account used in documented investment fraud cases. Subject of regulatory warnings."
    }
};
