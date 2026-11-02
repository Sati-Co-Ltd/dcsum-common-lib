import { z } from "zod";
import { dischargeSummaryListConfigSchema } from "./dischargeSummaryListConfig.dto";
import { withMeta } from "./meta";
import { preAuditSuggestionConfigSchema } from "./preAuditSuggestionConfig.dto";

export { describeSchema } from "./describe";
export type { SchemaNode } from "./describe";
export { getMeta, withMeta } from "./meta";
export type { FieldMeta, FieldOption, UiControlType } from "./meta";
export type { PreAuditMode } from "./preAuditSuggestionConfig.dto";
export { preAuditSuggestionConfigSchema } from "./preAuditSuggestionConfig.dto";
export type { PreAuditSuggestionConfig } from "./preAuditSuggestionConfig.dto";
export { dischargeSummaryListConfigSchema } from "./dischargeSummaryListConfig.dto";
export type { DischargeSummaryListConfigDto } from "./dischargeSummaryListConfig.dto";

// --- Export Feature Configuration ---

export const buttonConfigSchema = z.object({
    label: withMeta(z.string().optional().default(""), {
        label: "Label",
        description: "Text shown on the export button."
    }),
    enabled: withMeta(z.boolean().optional().default(true), {
        label: "Enabled",
        description: "Whether this export button is shown at all."
    }),
    defaultCheck: withMeta(z.boolean().optional().default(false), {
        label: "Checked By Default",
        description: "Whether this button's checkbox is pre-checked by default when the export dialog opens."
    })
});
export type ButtonConfigDto = z.infer<typeof buttonConfigSchema>;

export const userRoleConfigSchema = z.object({
    enabled: withMeta(z.boolean().optional().default(true), {
        label: "Enabled",
        description: "Whether this role can access the custom export feature."
    }),
    hidden: withMeta(z.boolean().optional().default(false), {
        label: "Hidden",
        description: "Whether the custom export entry point is hidden from this role."
    }),
    buttonList: withMeta(z.array(buttonConfigSchema).optional().default([]), {
        label: "Buttons",
        description: "List of export buttons shown to this role, each with its own enabled/default-checked state."
    })
});
export type UserRoleConfigDto = z.infer<typeof userRoleConfigSchema>;

const CODER_DEFAULT_BUTTONS: z.infer<typeof buttonConfigSchema>[] = [
    { label: "Clinical Summary Note", enabled: true, defaultCheck: false },
    { label: "Diagnosis & Procedure", enabled: true, defaultCheck: true },
    { label: "ICD", enabled: true, defaultCheck: true }
];

const DOCTOR_DEFAULT_BUTTONS: z.infer<typeof buttonConfigSchema>[] = [
    { label: "Clinical Summary Note", enabled: true, defaultCheck: true },
    { label: "Diagnosis & Procedure", enabled: true, defaultCheck: true },
    { label: "ICD", enabled: true, defaultCheck: false }
];

const NON_DOCTOR_DEFAULT_BUTTONS: z.infer<typeof buttonConfigSchema>[] = [
    { label: "Clinical Summary Note", enabled: true, defaultCheck: false },
    { label: "Diagnosis & Procedure", enabled: true, defaultCheck: true },
    { label: "ICD", enabled: true, defaultCheck: false }
];

const exportCustomSchema = withMeta(
    z
        .object({
            enabled: withMeta(z.boolean().optional().default(false), {
                label: "Enabled",
                description: "Master switch for the custom export feature."
            }),
            processOnlyDischarged: withMeta(z.boolean().optional().default(false), {
                label: "Process Only Discharged",
                description: "When enabled, custom export only processes encounters that have already been discharged."
            }),
            customPathURL: withMeta(z.string().optional().default(""), {
                label: "Custom Export URL",
                description: "Destination URL that the custom export payload is sent to."
            }),
            dischargeValueMode: withMeta(z.enum(["text", "code"]).optional().default("text"), {
                label: "Discharge Value Mode",
                description:
                    'Format used for dischargeType/dischargeStatus values in the custom export payload: "text" sends the name from the discharge code master, "code" sends the raw source-system code.',
                control: "select"
            }),
            mergeDiagnosisIcd: withMeta(z.boolean().optional().default(false), {
                label: "Merge Coder ICD",
                description:
                    "Merge coder ICD fields (coderIcd/coderType/coderCategory/coderExtension) into diagnosis/procedure entries in the custom export payload."
            }),
            defaultExportOnSave: withMeta(z.boolean().optional().default(false), {
                label: "Default Export On Save",
                description: 'Default checked state of the "Export after saving" checkbox in the summary modal.'
            }),
            closeWindowAfterExport: withMeta(z.boolean().optional().default(false), {
                label: "Close Window After Export",
                description:
                    "Automatically close the browser window after a successful export. Browsers only allow this for windows the script opened itself, or windows whose history length is still 1."
            }),
            closeWindowDelayMs: withMeta(z.number().optional().default(1200), {
                label: "Close Window Delay (ms)",
                description: "Delay, in milliseconds, before closing the window after export, so the user can see the success toast first."
            }),
            attendingDoctor: withMeta(userRoleConfigSchema.optional().default({ hidden: false, enabled: true, buttonList: DOCTOR_DEFAULT_BUTTONS }), {
                label: "Attending Doctor",
                description: "Custom export access and button configuration for the attending doctor role."
            }),
            auditorNonDoctorStaff: withMeta(
                userRoleConfigSchema.optional().default({ hidden: false, enabled: true, buttonList: NON_DOCTOR_DEFAULT_BUTTONS }),
                {
                    label: "Auditor (Non-Doctor Staff)",
                    description: "Custom export access and button configuration for non-doctor auditor staff."
                }
            ),
            auditorDoctor: withMeta(userRoleConfigSchema.optional().default({ hidden: false, enabled: true, buttonList: DOCTOR_DEFAULT_BUTTONS }), {
                label: "Auditor (Doctor)",
                description: "Custom export access and button configuration for doctor auditors."
            }),
            auditorDoctorAndAttending: withMeta(
                userRoleConfigSchema.optional().default({ hidden: false, enabled: true, buttonList: DOCTOR_DEFAULT_BUTTONS }),
                {
                    label: "Auditor + Attending Doctor",
                    description: "Custom export access and button configuration for users who are both auditor and attending doctor."
                }
            ),
            coder: withMeta(userRoleConfigSchema.optional().default({ hidden: false, enabled: true, buttonList: CODER_DEFAULT_BUTTONS }), {
                label: "Coder",
                description: "Custom export access and button configuration for the medical coder role."
            })
        })
        .optional()
        .default({}),
    {
        label: "Custom Export Settings",
        description: "Configuration for the per-role custom export feature, including destination URL and payload options."
    }
);

// --- Batch Import Configuration ---

const batchLimitSchema = withMeta(
    z
        .object({
            enabled: withMeta(z.boolean().optional().default(true), {
                label: "Enabled",
                description: "Whether a limit is enforced on the number of records in a single batch import."
            }),
            limit: withMeta(z.number().optional().default(0), {
                label: "Limit",
                description: "Maximum number of records allowed in a single batch import."
            })
        })
        .optional()
        .default({}),
    {
        label: "Batch Limit",
        description: "Limit applied to the size of a single batch import."
    }
);

const batchImportSchema = withMeta(
    z
        .object({
            enabled: withMeta(z.boolean().optional().default(false), {
                label: "Enabled",
                description: "Master switch for the batch import feature."
            }),
            limit: batchLimitSchema,
            allowOnlyDischarge: withMeta(z.boolean().optional().default(true), {
                label: "Allow Only Discharged",
                description: "When enabled, batch import only accepts encounters that are already discharged."
            }),
            allowOnlyUndischarged: withMeta(z.boolean().optional().default(false), {
                label: "Allow Only Undischarged",
                description: "When enabled, batch import only accepts encounters that are not yet discharged."
            })
        })
        .optional()
        .default({}),
    {
        label: "Batch Import Settings",
        description: "Configuration for the batch import feature."
    }
);

// --- Hidden Configuration ---

const isHiddenSchema = withMeta(
    z
        .object({
            autoCorrectButton: withMeta(z.boolean().optional().default(false), {
                label: "Auto-Correct Button",
                description: "Hide the auto-correct button in the UI."
            }),
            criteriaSuggestionIcon: withMeta(z.boolean().optional().default(false), {
                label: "Criteria Suggestion Icon",
                description: "Hide the criteria suggestion icon in the UI."
            }),
            auditorSuggestionTab: withMeta(z.boolean().optional().default(false), {
                label: "Auditor Suggestion Tab",
                description: "Hide the auditor suggestion tab in the utility box."
            }),
            inpatientCaseSelection: withMeta(z.boolean().optional().default(false), {
                label: "Inpatient Case Selection",
                description: "Hide the inpatient case selection page/entry point."
            }),
            investigationReportTab: withMeta(z.boolean().optional().default(false), {
                label: "Investigation Report Tab",
                description: "Hide the investigation report tab in the utility box."
            }),
            excelUploadUserTab: withMeta(z.boolean().optional().default(false), {
                label: "Excel Upload User Tab",
                description: "Hide the Excel user-upload tab in settings."
            })
        })
        .optional()
        .default({}),
    {
        label: "Hidden UI Elements",
        description: "Toggles that hide specific UI elements and entry points across the app."
    }
);

// --- Display Configuration ---

const reasonListItemSchema = z.object({
    label: withMeta(z.string().optional().default(""), {
        label: "Label",
        description: "Display text for this reason, shown in the reason dropdown (e.g. discharge/cancel reasons)."
    }),
    value: withMeta(z.string().optional().default(""), {
        label: "Value",
        description: "Underlying value stored when this reason is selected."
    }),
    data: withMeta(z.string().optional().default(""), {
        label: "Data",
        description: "Additional free-form data associated with this reason."
    })
});

const dsListColumnConfigSchema = z.object({
    field: withMeta(z.string().optional().default(""), {
        label: "Field",
        description: 'Column field name, e.g. "name", "age", "ward".'
    }),
    visible: withMeta(z.boolean().optional().default(true), {
        label: "Visible",
        description: "Whether this column is shown in the discharge-summary list."
    }),
    order: withMeta(z.number().optional().default(0), {
        label: "Order",
        description: "Sort order for this column, ascending."
    })
});

const utilityBoxTabConfigSchema = z.object({
    value: withMeta(z.string().optional().default(""), {
        label: "Tab Value",
        description: 'Internal value identifying which utility box tab this entry controls, e.g. "auditor_suggestion", "scanDoc".'
    }),
    visible: withMeta(z.boolean().optional().default(true), {
        label: "Visible",
        description: "Whether this tab is shown in the utility box."
    }),
    order: withMeta(z.number().optional().default(0), {
        label: "Order",
        description: "Sort order for this tab, ascending."
    })
});

const skipListItemSchema = z.object({
    field: withMeta(z.string().optional().default(""), {
        label: "Field",
        description: 'Name of the import field this skip-list applies to, e.g. "procedure", "operation".'
    }),
    text: withMeta(z.array(z.string()).optional().default([]), {
        label: "Terms",
        description: "Terms that are dropped from this field at import time."
    })
});

export type PreAuditVersion = "v2" | "v3" | "v4" | "v4.2" | "v4.4";

// --- Hidden Menus Configuration ---
// Authoritative key set taken from dcsum-api-hosxp/src/modules/app/constant/initialApp.ts's
// APP_CONFIGS.hiddenMenus default. Keep this list in sync with that file and with the menu ids
// defined in dcsum-client-hosxp/src/hooks/useMenu.tsx if menus are added/removed/renamed.
const HIDDEN_MENU_KEYS = [
    "search",
    "impress",
    "patients",
    "dashboard",
    "encounter",
    "drg-estimator",
    "patient-record",
    "reports-and-exports",
    "inpatient-case-selection"
] as const;

const HIDDEN_MENU_LABELS: Record<(typeof HIDDEN_MENU_KEYS)[number], string> = {
    search: "Search",
    impress: "Impress",
    patients: "Patients",
    dashboard: "Dashboard",
    encounter: "Encounter",
    "drg-estimator": "DRG Estimator",
    "patient-record": "Patient Record",
    "reports-and-exports": "Reports & Exports",
    "inpatient-case-selection": "Inpatient Case Selection"
};

const hiddenMenusShape = Object.fromEntries(
    HIDDEN_MENU_KEYS.map((key) => [key, z.boolean().optional().default(true)])
) as Record<(typeof HIDDEN_MENU_KEYS)[number], z.ZodDefault<z.ZodOptional<z.ZodBoolean>>>;

const hiddenMenusSchema = withMeta(z.object(hiddenMenusShape).optional().default({}), {
    label: "Hidden Menus",
    description: "Menus hidden from the sidebar for this tenant. Each selected menu id is hidden; unselected menu ids remain visible.",
    control: "multiSelect",
    valueTransform: "recordOfBooleans",
    options: HIDDEN_MENU_KEYS.map((key) => ({ label: HIDDEN_MENU_LABELS[key], value: key }))
});

// --- Clinical Summary (mirrors ../dischargeSummary/clinicalSummary.dto.ts — keep in sync manually) ---

// Mirrors ClinicalSummaryDisplayMode from ../dischargeSummary/clinicalSummary.dto.ts
const clinicalSummaryDisplayModeEnum = z.enum(["priority", "draft", "all"]);

// Mirrors ClinicalSummaryDto["source"] from ../dischargeSummary/clinicalSummary.dto.ts
const clinicalSummarySourceEnum = z.enum(["IMPORT", "AI", "USER", "DRAFT"]);

export const appConfigSchema = withMeta(z.object({
    clientUrl: withMeta(z.string().optional().default(""), {
        label: "Client URL",
        description:
            'Tenant-specific frontend URL, overriding the CLIENT_URL environment variable when set. Supports the ":subdomain" placeholder, e.g. "https://:subdomain.sati.co.th".'
    }),

    exportCustom: exportCustomSchema,

    batchImport: batchImportSchema,

    preAuditRetry: withMeta(
        z
            .object({
                enabled: withMeta(z.boolean().optional().default(false), {
                    label: "Enabled",
                    description: "Whether failed pre-audit calls are automatically retried."
                }),
                rangeHours: withMeta(z.number().optional().default(0), {
                    label: "Range (Hours)",
                    description: "How many hours back to look for failed pre-audit calls eligible for retry."
                })
            })
            .optional()
            .default({}),
        {
            label: "Pre-Audit Retry",
            description: "Settings controlling automatic retry of failed pre-audit calls."
        }
    ),

    preAuditVersion: withMeta(z.enum(["v2", "v3", "v4", "v4.2", "v4.4"]).optional().default("v4.4"), {
        label: "Pre-Audit Version",
        description: "Version of the pre-audit engine/API used for this tenant.",
        control: "select"
    }),

    disableValidateProcedure: withMeta(z.boolean().optional().default(false), {
        label: "Disable Procedure Validation",
        description: "Skip validation of procedure codes."
    }),

    procedure: withMeta(
        z
            .object({
                displayOnlyICD9AffectDrg: withMeta(z.boolean().optional().default(true), {
                    label: "Display Only DRG-Affecting ICD-9",
                    description: "Only display ICD-9 procedure codes that affect the DRG calculation."
                }),
                importUpsertMode: withMeta(z.boolean().optional().default(false), {
                    label: "Import Upsert Mode",
                    description: "When importing procedures, upsert existing records instead of always inserting new ones."
                })
            })
            .optional()
            .default({}),
        {
            label: "Procedure Settings",
            description: "Settings controlling how procedure codes are displayed and imported."
        }
    ),

    isHidden: isHiddenSchema,

    utilityBoxTabs: withMeta(z.array(utilityBoxTabConfigSchema).optional().default([]), {
        label: "Utility Box Tabs",
        description: "Visibility and ordering of tabs shown in the utility box."
    }),

    dsListColumns: withMeta(z.array(dsListColumnConfigSchema).optional().default([]), {
        label: "Discharge Summary List Columns",
        description: "Visibility and ordering of columns shown in the discharge summary list."
    }),

    import: withMeta(
        z
            .object({
                isHandleDoctorOrderSheetProc: withMeta(z.boolean().optional().default(false), {
                    label: "Handle Doctor Order Sheet Procedures",
                    description: "Process procedures from the doctor order sheet during import."
                }),
                isOpenOnly: withMeta(z.boolean().optional().default(false), {
                    label: "Open Encounters Only",
                    description: "Only import encounters that are currently open."
                }),
                defaultEncounterStatus: withMeta(z.string().optional().default(""), {
                    label: "Default Encounter Status",
                    description: "Encounter status assigned by default to newly imported encounters."
                }),
                syncDxProcOnly: withMeta(z.boolean().optional().default(false), {
                    label: "Sync Diagnosis/Procedure Only",
                    description: "Limit the import sync to diagnosis and procedure data only."
                }),
                isAutoAssignDoctor: withMeta(z.boolean().optional().default(false), {
                    label: "Auto-Assign Doctor",
                    description: "Automatically assign a doctor to newly imported encounters."
                }),
                fillBlankProcedureName: withMeta(z.boolean().optional().default(false), {
                    label: "Fill Blank Procedure Name",
                    description: "Name procedure/operation rows that arrive with a blank name instead of rejecting the import."
                }),
                autoAssignMode: withMeta(z.enum(["list", "random"]).optional().default("random"), {
                    label: "Auto-Assign Mode",
                    description:
                        'How work is distributed in the assignment pool: "list" assigns round-robin in order, "random" assigns randomly (default).',
                    control: "select"
                }),
                defaultAssignment: withMeta(
                    z
                        .object({
                            enabled: withMeta(z.boolean().optional().default(false), {
                                label: "Enabled",
                                description: "Automatically assign a default role to newly imported encounters."
                            }),
                            roleId: withMeta(z.string().optional().default(""), {
                                label: "Default Role",
                                description: "Role id assigned by default to newly imported encounters."
                            })
                        })
                        .nullable()
                        .optional()
                        .default({ enabled: false, roleId: "" }),
                    {
                        label: "Default Assignment",
                        description: "Default role assignment applied to newly imported encounters."
                    }
                ),
                skipList: withMeta(z.array(skipListItemSchema).optional().default([]), {
                    label: "Skip List",
                    description: "Terms to drop at import time, grouped by field name (e.g. \"procedure\", \"operation\")."
                })
            })
            .optional()
            .default({}),
        {
            label: "Import Settings",
            description: "Configuration for how encounters and related data are imported from the source system."
        }
    ),

    export: withMeta(
        z
            .object({
                doctorOrderSheetProcExport: withMeta(z.boolean().optional().default(true), {
                    label: "Export Doctor Order Sheet Procedures",
                    description: "Include doctor order sheet procedures in exported data."
                }),
                removeIcdDot: withMeta(z.boolean().optional().default(false), {
                    label: "Remove ICD Dot",
                    description: 'Export ICD codes without the dot (e.g. "E35.2" becomes "E352") in exportData and exportCustomPath.'
                })
            })
            .optional()
            .default({}),
        {
            label: "Export Settings",
            description: "Configuration for the standard (non-custom) export feature."
        }
    ),

    printForm: withMeta(
        z
            .object({
                enablePrintForm: withMeta(z.boolean().optional().default(false), {
                    label: "Enable Print Form",
                    description: "Enable the print-form feature for this tenant."
                }),
                printFormURL: withMeta(z.string().optional().default(""), {
                    label: "Print Form URL",
                    description: "URL of the print-form service used to render printable forms."
                }),
                templateName: withMeta(z.string().optional().default(""), {
                    label: "Template Name",
                    description: "Name of the print-form template used to render printable forms."
                })
            })
            .optional()
            .default({}),
        {
            label: "Print Form Settings",
            description: "Configuration for the print-form feature."
        }
    ),

    syncOnpremData: withMeta(
        z
            .object({
                enableSyncOnpremData: withMeta(z.boolean().optional().default(false), {
                    label: "Enable On-Premise Data Sync",
                    description: "Enable syncing data with the tenant's on-premise system."
                }),
                syncOnpremDataURL: withMeta(z.string().optional().default(""), {
                    label: "On-Premise Sync URL",
                    description: "URL of the on-premise service used for data sync."
                })
            })
            .optional()
            .default({}),
        {
            label: "On-Premise Data Sync",
            description: "Configuration for syncing data with the tenant's on-premise system."
        }
    ),

    auditorTextHandle: withMeta(z.boolean().optional().default(false), {
        label: "Auditor Text Handle",
        description: "Enable special text-handling behavior for auditor-entered text."
    }),

    isAutoSyncIcd: withMeta(z.boolean().optional().default(false), {
        label: "Auto-Sync ICD",
        description: "Automatically sync ICD codes without manual intervention."
    }),

    icdSyncMode: withMeta(z.enum(["diagText", "auditText", "union"]).optional().default("auditText"), {
        label: "ICD Sync Mode",
        description: 'Source used when syncing ICD codes: "diagText" uses diagnosis text, "auditText" uses auditor text, "union" uses both.',
        control: "select"
    }),

    isCallPreAuditOneTime: withMeta(z.boolean().optional().default(true), {
        label: "Call Pre-Audit Once",
        description: "Call the pre-audit engine only once per encounter instead of on every relevant change."
    }),

    disableValidatePDX: withMeta(z.boolean().optional().default(false), {
        label: "Disable PDX Validation",
        description: "Skip validation of the principal diagnosis (PDX)."
    }),

    censorSensitiveInfo: withMeta(z.boolean().optional().default(false), {
        label: "Censor Sensitive Info",
        description: "Censor sensitive patient information displayed in the UI."
    }),

    canEditDischargeDate: withMeta(z.boolean().optional().default(false), {
        label: "Can Edit Discharge Date",
        description: "Allow users to edit the discharge date after an encounter has been discharged."
    }),

    canEditWeight: withMeta(z.boolean().optional().default(false), {
        label: "Can Edit Weight",
        description: "Allow users to edit the patient's recorded weight."
    }),

    scanDoc: withMeta(
        z
            .object({
                strategy: withMeta(z.enum(["S3", "HOS_URL"]).optional().default("S3"), {
                    label: "Storage Strategy",
                    description: 'Where scanned documents are stored and served from: "S3" (object storage) or "HOS_URL" (hospital-hosted URL).',
                    control: "select"
                })
            })
            .optional()
            .default({}),
        {
            label: "Scanned Document Settings",
            description: "Configuration for where scanned documents are stored and served from."
        }
    ),

    hiddenMenus: hiddenMenusSchema,

    statusInfo: withMeta(
        z
            .object({
                enabled: withMeta(z.boolean().optional().default(true), {
                    label: "Enabled",
                    description: "Show status information (discharge type, encounter status, assignment) on the work list."
                }),
                showDischargeType: withMeta(z.boolean().optional().default(true), {
                    label: "Show Discharge Type",
                    description: "Show the discharge type badge on the work list."
                }),
                showEncounterStatus: withMeta(z.boolean().optional().default(true), {
                    label: "Show Encounter Status",
                    description: "Show the encounter status badge on the work list."
                }),
                showAssignment: withMeta(z.boolean().optional().default(false), {
                    label: "Show Assignment",
                    description: "Show the assignee badge on the work list."
                }),
                allowDuplicateAssignees: withMeta(z.boolean().optional().default(false), {
                    label: "Allow Duplicate Assignees",
                    description: "Allow the same user to be assigned to more than one role on the same encounter."
                }),
                showDefaultDischargeCode: withMeta(z.boolean().optional().default(false), {
                    label: "Show Default Discharge Codes",
                    description:
                        "When enabled, GET /discharge-code-master merges the standard default codes into the list alongside tenant-specific/auto-discovered rows. When disabled, a tenant with its own rows sees only its own rows."
                })
            })
            .optional()
            .default({}),
        {
            label: "Status Info",
            description: "Configuration for the status information badges shown on the work list."
        }
    ),

    enablePrintForm: withMeta(z.boolean().optional().default(false), {
        label: "Enable Print Form",
        description: "Top-level switch enabling the print-form feature."
    }),

    preAuditSuggestion: preAuditSuggestionConfigSchema,

    reasonList: withMeta(z.array(reasonListItemSchema).optional().default([]), {
        label: "Reason List",
        description: "List of selectable reasons used in reason dropdowns (e.g. discharge/cancel reasons)."
    }),

    autoPractitioner: withMeta(z.boolean().optional().default(false), {
        label: "Auto Practitioner",
        description: "Automatically determine the practitioner for an encounter."
    }),

    disableAutoPractitioner: withMeta(z.boolean().optional().default(false), {
        label: "Disable Auto Practitioner",
        description: "Disable automatic practitioner determination."
    }),

    skipAuditModeCheck: withMeta(z.boolean().optional().default(false), {
        label: "Skip Audit Mode Check",
        description: "Skip the audit-mode check that normally gates certain actions."
    }),

    disableValidateClinicalSummary: withMeta(z.boolean().optional().default(true), {
        label: "Disable Clinical Summary Validation",
        description: "Skip validation of the clinical summary note."
    }),

    clinicalSummaryDisplayMode: withMeta(clinicalSummaryDisplayModeEnum.optional().default("priority"), {
        label: "Clinical Summary Display Mode",
        description: 'Which clinical summary content is shown by default: "priority" (highest-priority source), "draft", or "all" sources.',
        control: "select"
    }),

    clinicalSummarySourcePriority: withMeta(z.array(clinicalSummarySourceEnum).optional().default([]), {
        label: "Clinical Summary Source Priority",
        description: "Ordered list of clinical summary sources (IMPORT, AI, USER, DRAFT), highest priority first, used to pick which content to show.",
        control: "multiSelect"
    }),

    encounterAssignmentCheck: withMeta(
        z
            .object({
                enabled: withMeta(z.boolean().optional().default(false), {
                    label: "Enabled",
                    description: "Require an encounter to be assigned before certain actions are allowed."
                })
            })
            .optional()
            .default({}),
        {
            label: "Encounter Assignment Check",
            description: "Settings controlling whether an encounter must be assigned before certain actions are allowed."
        }
    ),

    disabledDischargeSummary: withMeta(z.boolean().optional().default(false), {
        label: "Disable Discharge Summary",
        description: "Disable the discharge summary feature entirely for this tenant."
    }),

    icdMappingFlow: withMeta(
        z
            .object({
                disableHistoryMapping: withMeta(z.boolean().optional().default(false), {
                    label: "Disable History Mapping",
                    description: "Disable the history-mapping step in the ICD mapping flow (History Mapping -> Pre-Audit Mapping -> Impress)."
                }),
                disableImpress: withMeta(z.boolean().optional().default(false), {
                    label: "Disable Impress",
                    description: "Disable the impress step in the ICD mapping flow (History Mapping -> Pre-Audit Mapping -> Impress)."
                })
            })
            .optional()
            .default({}),
        {
            label: "ICD Mapping Flow",
            description: "Configuration for the ICD mapping flow: History Mapping -> Pre-Audit Mapping -> Impress."
        }
    ),

    icdO: withMeta(z.boolean().optional().default(false), {
        label: "ICD-O",
        description: "Enable ICD-O (oncology) coding support."
    }),

    rewriteOption: withMeta(
        z
            .object({
                keepOriginalTerm: withMeta(z.boolean().optional().default(false), {
                    label: "Keep Original Term",
                    description: "Keep the original diagnosis/procedure term alongside the rewritten/suggested one."
                }),
                suggestICD: withMeta(z.boolean().optional().default(true), {
                    label: "Suggest ICD",
                    description: "Suggest ICD codes as part of the rewrite flow."
                }),
                codeMappingProvider: withMeta(z.enum(["oneshot", "coder-ai"]).optional().default("oneshot"), {
                    label: "Code Mapping Provider",
                    description:
                        'Backend that answers the code-mapping/rewrite call: "oneshot" (default) calls /ipd-oneshot/v2/rewrite, "coder-ai" calls /coder-ai/v1/rewrite.',
                    control: "select"
                })
            })
            .optional()
            .default({}),
        {
            label: "Rewrite Options",
            description: "Configuration for the diagnosis/procedure rewrite and code-suggestion flow."
        }
    ),

    unsavedDraftGuard: withMeta(
        z
            .object({
                enabled: withMeta(z.boolean().optional().default(false), {
                    label: "Enabled",
                    description: "Warn the user about unsaved draft changes before they navigate away."
                })
            })
            .optional()
            .default({}),
        {
            label: "Unsaved Draft Guard",
            description: "Configuration for the unsaved-draft navigation guard."
        }
    ),

    lab: withMeta(
        z
            .object({
                normalStatusMode: withMeta(z.enum(["interpreter", "import", "hybrid"]).optional().default("interpreter"), {
                    label: "Normal Status Mode",
                    description:
                        'Source used for a lab item\'s normal status: "interpreter" (default) always uses the lab interpreter, "import" uses the value computed at import time (HIS flag/range) without calling the interpreter, "hybrid" uses the import-time value first and only calls the interpreter for items that still lack a value.',
                    control: "select"
                })
            })
            .optional()
            .default({}),
        {
            label: "Lab Settings",
            description: "Configuration for how lab item normal-status values are determined."
        }
    ),

    dischargeSummaryList: dischargeSummaryListConfigSchema
}), {
    label: "App Config",
    description: "All configurable settings for this tenant."
});

export type AppConfigDto = z.infer<typeof appConfigSchema>;

export const APP_CONFIG_DEFAULTS: AppConfigDto = appConfigSchema.parse({});
