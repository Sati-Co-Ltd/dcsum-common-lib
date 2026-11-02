import { z } from "zod";
import { withMeta } from "./meta";

export const preAuditModeEnum = z.enum(["default", "strict", "relax"]);
export type PreAuditMode = z.infer<typeof preAuditModeEnum>;

const displayModeSchema = withMeta(
    z
        .object({
            enabled: withMeta(z.boolean().optional().default(false), {
                label: "Enable Display Mode",
                description: "Allow switching between brief and detailed pre-audit suggestion displays."
            }),
            defaultMode: withMeta(z.enum(["brief", "detailed"]).optional().default("detailed"), {
                label: "Default Display Mode",
                description: "Default level of detail shown for pre-audit suggestions when display mode is enabled.",
                control: "select"
            })
        })
        .optional()
        .default({}),
    {
        label: "Display Mode",
        description: "Settings controlling how pre-audit suggestions are displayed to the user."
    }
);

const similaritySchema = withMeta(
    z
        .object({
            enabled: withMeta(z.boolean().optional().default(false), {
                label: "Enable Similarity Matching",
                description: "Enable similarity-based matching when suggesting pre-audit diagnosis/procedure codes."
            })
        })
        .optional()
        .default({}),
    {
        label: "Similarity Matching",
        description: "Settings controlling similarity-based pre-audit suggestion matching."
    }
);

export const preAuditSuggestionConfigSchema = withMeta(
    z
        .object({
            preAuditMode: withMeta(preAuditModeEnum.optional().default("default"), {
                label: "Pre-Audit Mode",
                description: "Controls how strict the pre-audit suggestion engine is when matching diagnoses and procedures.",
                control: "select"
            }),
            displayMode: displayModeSchema,
            similarity: similaritySchema,
            isCurrentANOnly: withMeta(z.boolean().optional().default(false), {
                label: "Current Admission Number Only",
                description: "Restrict pre-audit suggestions to the current admission number (AN) only."
            })
        })
        .optional()
        .default({}),
    {
        label: "Pre-Audit Suggestion",
        description: "Configuration for the pre-audit suggestion engine."
    }
);

export type PreAuditSuggestionConfig = z.infer<typeof preAuditSuggestionConfigSchema>;
