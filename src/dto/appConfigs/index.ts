import type { ClinicalSummaryDisplayMode, ClinicalSummaryDto } from "../dischargeSummary/clinicalSummary.dto";
import type { DischargeSummaryListConfigDto } from "./dischargeSummaryListConfig.dto";

// --- Export Feature Configuration ---
export interface ButtonConfigDto {
    label: string;
    enabled: boolean;
    defaultCheck: boolean;
}

export interface UserRoleConfigDto {
    enabled: boolean;
    hidden: boolean;
    buttonList: ButtonConfigDto[];
}

interface PrintFormConfigDto {
    enablePrintForm: boolean;
    printFormURL: string;
    templateName: string;
}

interface SyncOnpremDataConfigDto {
    enableSyncOnpremData: boolean;
    syncOnpremDataURL: string;
}

interface ExportCustomConfigDto {
    enabled: boolean;
    processOnlyDischarged: boolean;
    customPathURL?: string;

    // รูปแบบค่า dischargeType/dischargeStatus ที่ส่งออกใน custom export payload
    // "text" (default) = ชื่อจาก dischargeCodeMaster, "code" = code ดิบจากระบบต้นทาง
    dischargeValueMode?: "text" | "code";

    // เปิด/ปิดการ merge coder icd เข้ากับ diagnosis/procedure (field coderIcd/coderType/coderCategory/coderExtension)
    // ใน custom export payload — default false (ปิด, พฤติกรรมเดิม)
    mergeDiagnosisIcd?: boolean;

    // ค่าเริ่มต้นของ checkbox "Export after saving" ใน summary modal (ไม่ตั้ง = ไม่ติ๊ก)
    defaultExportOnSave?: boolean;

    // ปิดหน้าต่างเบราว์เซอร์เมื่อ export สำเร็จ (ไม่ตั้ง = ไม่ปิด)
    // เบราว์เซอร์ยอมให้ปิดเฉพาะหน้าต่างที่สคริปต์เปิดเอง หรือหน้าต่างที่ history length ยังเป็น 1
    closeWindowAfterExport?: boolean;

    // หน่วงก่อนปิดหน้าต่าง (ms) ให้ผู้ใช้เห็น toast ก่อน (ไม่ตั้ง = 1200)
    closeWindowDelayMs?: number;

    attendingDoctor: UserRoleConfigDto;
    auditorNonDoctorStaff: UserRoleConfigDto;
    auditorDoctor: UserRoleConfigDto;
    auditorDoctorAndAttending: UserRoleConfigDto;
    coder: UserRoleConfigDto;
}

// --- Batch Import Configuration ---
interface BatchLimitConfigDto {
    enabled: boolean;
    limit: number;
}

interface BatchImportConfigDto {
    enabled: boolean;
    limit: BatchLimitConfigDto;
    allowOnlyDischarge: boolean;
    allowOnlyUndischarged: boolean;
}

// --- Hidden Configuration ---
interface IsHiddenDto {
    autoCorrectButton: boolean;
    criteriaSuggestionIcon?: boolean;
    auditorSuggestionTab?: boolean;
    inpatientCaseSelection?: boolean;
    investigationReportTab?: boolean;
    excelUploadUserTab?: boolean;
}

// --- Display Configuration ---
interface ReasonListItemDto {
    label: string;
    value: string;
    data: string;
}

interface DsListColumnConfigDto {
    field: string; // column field เช่น "name", "age", "ward"
    visible: boolean; // โชว์/ซ่อน
    order: number; // ลำดับ น้อยไปมาก
}

interface UtilityBoxTabConfigDto {
    value: string; // tab value เช่น "auditor_suggestion", "scanDoc"
    visible: boolean; // โชว์/ซ่อน
    order: number; // ลำดับ น้อยไปมาก
}

export type PreAuditVersion = "v2" | "v3" | "v4" | "v4.2" | "v4.4";

export interface AppConfigDto {
    // Tenant-specific frontend URL. Overrides appConfig.clientUrl (env CLIENT_URL) when set.
    // Supports the ":subdomain" placeholder, e.g. "https://:subdomain.sati.co.th"
    clientUrl?: string;

    exportCustom?: ExportCustomConfigDto;
    batchImport: BatchImportConfigDto;
    preAuditRetry?: {
        enabled?: boolean;
        rangeHours?: number;
    };
    preAuditVersion: PreAuditVersion;
    disableValidateProcedure?: boolean;
    procedure?: {
        displayOnlyICD9AffectDrg?: boolean;
        importUpsertMode?: boolean;
    };
    isHidden: IsHiddenDto;
    utilityBoxTabs?: UtilityBoxTabConfigDto[];
    dsListColumns?: DsListColumnConfigDto[];
    import: {
        isHandleDoctorOrderSheetProc: boolean;
        isOpenOnly: boolean;
        defaultEncounterStatus: string;
        syncDxProcOnly: boolean;
        isAutoAssignDoctor: boolean;
        // Name procedure/operation rows that arrive with a blank name instead of rejecting the import
        fillBlankProcedureName?: boolean;

        // โหมดกระจายงานใน pool: "list" = เรียงลำดับ (round-robin), "random" = สุ่ม (ค่าเริ่มต้น)
        autoAssignMode?: "list" | "random";

        defaultAssignment: {
            enabled: boolean;
            roleId: string;
        } | null;

        // Terms to drop at import time, grouped by field name (e.g. "procedure", "operation")
        skipList?: { field: string; text: string[] }[];
    };
    export: {
        doctorOrderSheetProcExport: boolean; // True = export, False = not export. Default: False
        removeIcdDot?: boolean; // True = send icd without the dot (E35.2 -> E352) in exportData and exportCustomPath. Default: False
    };
    printForm?: PrintFormConfigDto;
    syncOnpremData?: SyncOnpremDataConfigDto;
    auditorTextHandle: boolean;
    isAutoSyncIcd: boolean;
    icdSyncMode?: "diagText" | "auditText" | "union";
    isCallPreAuditOneTime: boolean;
    disableValidatePDX?: boolean;
    censorSensitiveInfo: boolean;
    canEditDischargeDate?: boolean;
    canEditWeight?: boolean;
    scanDoc?: {
        strategy?: "S3" | "HOS_URL";
    };
    hiddenMenus?: Record<string, boolean>;
    statusInfo?: {
        enabled: boolean;
        showDischargeType: boolean;
        showEncounterStatus: boolean;
        showAssignment: boolean;
        allowDuplicateAssignees?: boolean;
        // When true, GET /discharge-code-master merges the standard default codes into the
        // list alongside any tenant-specific/auto-discovered rows. When false (default), a
        // tenant with any row of its own sees only its own rows, matching the current behavior.
        showDefaultDischargeCode?: boolean;
    };
    enablePrintForm?: boolean;
    preAuditSuggestion?: {
        displayMode: {
            enabled: boolean;
            defaultMode: "brief" | "detailed";
        };
        similarity: {
            enabled: boolean;
        };
        isCurrentANOnly: boolean;
    };
    reasonList?: ReasonListItemDto[];
    autoPractitioner?: boolean;
    disableAutoPractitioner?: boolean;
    skipAuditModeCheck?: boolean;
    disableValidateClinicalSummary?: boolean;
    clinicalSummaryDisplayMode?: ClinicalSummaryDisplayMode;
    clinicalSummarySourcePriority?: ClinicalSummaryDto["source"][];
    encounterAssignmentCheck?: {
        enabled: boolean;
    };
    disabledDischargeSummary?: boolean;
    // History Mapping -> Pre-Audit Mapping -> Impress
    icdMappingFlow?: {
        disableHistoryMapping?: boolean;
        disableImpress?: boolean;
    };
    icdO?: boolean;
    rewriteOption?: {
        keepOriginalTerm?: boolean; // default false
        suggestICD?: boolean; // default true
    };
    unsavedDraftGuard?: {
        enabled: boolean;
    };
    lab?: {
        // แหล่งที่มาของ normalStatus ของ lab item
        // "interpreter" (default) = ใช้ lab interpreter,
        // "import" = ใช้ค่าที่คำนวณตอน import (HIS flag/range) ไม่เรียก interpreter,
        // "hybrid" = ใช้ค่าตอน import ก่อน แล้วเรียก interpreter เฉพาะ item ที่ยังไม่มีค่า
        normalStatusMode?: "interpreter" | "import" | "hybrid";
    };
    dischargeSummaryList?: DischargeSummaryListConfigDto;
}
