export type PreAuditMode = 'default' | 'strict' | 'relax';

export type PreAuditSuggestionConfig = {
    preAuditMode?: PreAuditMode;
    displayMode?: {
        enabled?: boolean;
        defaultMode?: "brief" | "detailed";
    };
    similarity?: {
        enabled?: boolean;
    };
    isCurrentANOnly?: boolean;
};
