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
        label: "ป้ายกำกับ",
        description: "ข้อความที่แสดงบนปุ่มส่งออก"
    }),
    enabled: withMeta(z.boolean().optional().default(true), {
        label: "เปิดใช้งาน",
        description: "กำหนดว่าจะแสดงปุ่มส่งออกนี้หรือไม่"
    }),
    defaultCheck: withMeta(z.boolean().optional().default(false), {
        label: "เลือกไว้ล่วงหน้า",
        description: "กำหนดว่าช่องเลือกของปุ่มนี้จะถูกติ๊กไว้ล่วงหน้าโดยค่าเริ่มต้นเมื่อเปิดหน้าต่างส่งออกหรือไม่"
    })
});
export type ButtonConfigDto = z.infer<typeof buttonConfigSchema>;

export const userRoleConfigSchema = z.object({
    enabled: withMeta(z.boolean().optional().default(true), {
        label: "เปิดใช้งาน",
        description: "กำหนดว่าบทบาทนี้สามารถเข้าถึงฟีเจอร์ส่งออกแบบกำหนดเองได้หรือไม่"
    }),
    hidden: withMeta(z.boolean().optional().default(false), {
        label: "ซ่อน",
        description: "กำหนดว่าจะซ่อนจุดเข้าถึงฟีเจอร์ส่งออกแบบกำหนดเองจากบทบาทนี้หรือไม่"
    }),
    buttonList: withMeta(z.array(buttonConfigSchema).optional().default([]), {
        label: "รายการปุ่ม",
        description: "รายการปุ่มส่งออกที่แสดงให้บทบาทนี้เห็น พร้อมสถานะเปิดใช้งาน/เลือกไว้ล่วงหน้าของแต่ละปุ่ม"
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
                label: "เปิดใช้งาน",
                description: "สวิตช์หลักสำหรับฟีเจอร์ส่งออกแบบกำหนดเอง"
            }),
            processOnlyDischarged: withMeta(z.boolean().optional().default(false), {
                label: "ประมวลผลเฉพาะเคสที่จำหน่ายแล้ว",
                description: "เมื่อเปิดใช้งาน การส่งออกแบบกำหนดเองจะประมวลผลเฉพาะเคสที่จำหน่ายแล้วเท่านั้น"
            }),
            customPathURL: withMeta(z.string().optional().default(""), {
                label: "URL ส่งออกแบบกำหนดเอง",
                description: "URL ปลายทางที่ข้อมูลส่งออกแบบกำหนดเองจะถูกส่งไป"
            }),
            dischargeValueMode: withMeta(z.enum(["text", "code"]).optional().default("text"), {
                label: "รูปแบบค่าการจำหน่าย",
                description:
                    'รูปแบบที่ใช้สำหรับค่า dischargeType/dischargeStatus ในข้อมูลส่งออกแบบกำหนดเอง: "text" ส่งชื่อจากชุดรหัสการจำหน่าย ส่วน "code" ส่งรหัสดิบจากระบบต้นทาง',
                control: "select",
                options: [
                    { label: "ชื่อ (จากชุดรหัสการจำหน่าย)", value: "text" },
                    { label: "รหัสดิบ (จากระบบต้นทาง)", value: "code" }
                ]
            }),
            mergeDiagnosisIcd: withMeta(z.boolean().optional().default(false), {
                label: "รวม ICD ของผู้ให้รหัส",
                description:
                    "รวมฟิลด์ ICD ของผู้ให้รหัส (coderIcd/coderType/coderCategory/coderExtension) เข้ากับรายการวินิจฉัย/หัตถการในข้อมูลส่งออกแบบกำหนดเอง"
            }),
            defaultExportOnSave: withMeta(z.boolean().optional().default(false), {
                label: "ส่งออกเมื่อบันทึกโดยค่าเริ่มต้น",
                description: 'สถานะติ๊กเริ่มต้นของช่องเลือก "ส่งออกหลังจากบันทึก" ในหน้าต่างสรุปจำหน่าย'
            }),
            closeWindowAfterExport: withMeta(z.boolean().optional().default(false), {
                label: "ปิดหน้าต่างหลังส่งออก",
                description:
                    "ปิดหน้าต่างเบราว์เซอร์อัตโนมัติหลังส่งออกสำเร็จ โดยเบราว์เซอร์จะอนุญาตให้ปิดเฉพาะหน้าต่างที่สคริปต์เปิดขึ้นเองเท่านั้น หรือหน้าต่างที่มีประวัติการเข้าชมความยาวเท่ากับ 1"
            }),
            closeWindowDelayMs: withMeta(z.number().optional().default(1200), {
                label: "ระยะเวลาหน่วงก่อนปิดหน้าต่าง (มิลลิวินาที)",
                description: "ระยะเวลาหน่วงเป็นมิลลิวินาทีก่อนปิดหน้าต่างหลังส่งออก เพื่อให้ผู้ใช้เห็นข้อความแจ้งเตือนความสำเร็จก่อน"
            }),
            attendingDoctor: withMeta(userRoleConfigSchema.optional().default({ hidden: false, enabled: true, buttonList: DOCTOR_DEFAULT_BUTTONS }), {
                label: "แพทย์เจ้าของไข้",
                description: "สิทธิการเข้าถึงและการตั้งค่าปุ่มส่งออกแบบกำหนดเองสำหรับบทบาทแพทย์เจ้าของไข้"
            }),
            auditorNonDoctorStaff: withMeta(
                userRoleConfigSchema.optional().default({ hidden: false, enabled: true, buttonList: NON_DOCTOR_DEFAULT_BUTTONS }),
                {
                    label: "ผู้ตรวจสอบ (เจ้าหน้าที่ที่ไม่ใช่แพทย์)",
                    description: "สิทธิการเข้าถึงและการตั้งค่าปุ่มส่งออกแบบกำหนดเองสำหรับเจ้าหน้าที่ผู้ตรวจสอบที่ไม่ใช่แพทย์"
                }
            ),
            auditorDoctor: withMeta(userRoleConfigSchema.optional().default({ hidden: false, enabled: true, buttonList: DOCTOR_DEFAULT_BUTTONS }), {
                label: "ผู้ตรวจสอบ (แพทย์)",
                description: "สิทธิการเข้าถึงและการตั้งค่าปุ่มส่งออกแบบกำหนดเองสำหรับแพทย์ผู้ตรวจสอบ"
            }),
            auditorDoctorAndAttending: withMeta(
                userRoleConfigSchema.optional().default({ hidden: false, enabled: true, buttonList: DOCTOR_DEFAULT_BUTTONS }),
                {
                    label: "ผู้ตรวจสอบ + แพทย์เจ้าของไข้",
                    description: "สิทธิการเข้าถึงและการตั้งค่าปุ่มส่งออกแบบกำหนดเองสำหรับผู้ใช้ที่เป็นทั้งผู้ตรวจสอบและแพทย์เจ้าของไข้"
                }
            ),
            coder: withMeta(userRoleConfigSchema.optional().default({ hidden: false, enabled: true, buttonList: CODER_DEFAULT_BUTTONS }), {
                label: "ผู้ให้รหัส",
                description: "สิทธิการเข้าถึงและการตั้งค่าปุ่มส่งออกแบบกำหนดเองสำหรับบทบาทผู้ให้รหัสโรค"
            })
        })
        .optional()
        .default({}),
    {
        label: "การตั้งค่าส่งออกแบบกำหนดเอง",
        description: "การตั้งค่าสำหรับฟีเจอร์ส่งออกแบบกำหนดเองตามบทบาท รวมถึง URL ปลายทางและตัวเลือกข้อมูลที่ส่งออก"
    }
);

// --- Batch Import Configuration ---

const batchLimitSchema = withMeta(
    z
        .object({
            enabled: withMeta(z.boolean().optional().default(true), {
                label: "เปิดใช้งาน",
                description: "กำหนดว่าจะบังคับใช้ขีดจำกัดจำนวนรายการในการนำเข้าแบบกลุ่มแต่ละครั้งหรือไม่"
            }),
            limit: withMeta(z.number().optional().default(0), {
                label: "จำนวนจำกัด",
                description: "จำนวนรายการสูงสุดที่อนุญาตในการนำเข้าแบบกลุ่มแต่ละครั้ง"
            })
        })
        .optional()
        .default({}),
    {
        label: "ขีดจำกัดการนำเข้าแบบกลุ่ม",
        description: "ขีดจำกัดที่ใช้กับขนาดของการนำเข้าแบบกลุ่มแต่ละครั้ง"
    }
);

const batchImportSchema = withMeta(
    z
        .object({
            enabled: withMeta(z.boolean().optional().default(false), {
                label: "เปิดใช้งาน",
                description: "สวิตช์หลักสำหรับฟีเจอร์นำเข้าแบบกลุ่ม"
            }),
            limit: batchLimitSchema,
            allowOnlyDischarge: withMeta(z.boolean().optional().default(true), {
                label: "อนุญาตเฉพาะเคสที่จำหน่ายแล้ว",
                description: "เมื่อเปิดใช้งาน การนำเข้าแบบกลุ่มจะรับเฉพาะเคสที่จำหน่ายแล้วเท่านั้น"
            }),
            allowOnlyUndischarged: withMeta(z.boolean().optional().default(false), {
                label: "อนุญาตเฉพาะเคสที่ยังไม่จำหน่าย",
                description: "เมื่อเปิดใช้งาน การนำเข้าแบบกลุ่มจะรับเฉพาะเคสที่ยังไม่จำหน่ายเท่านั้น"
            })
        })
        .optional()
        .default({}),
    {
        label: "การตั้งค่านำเข้าแบบกลุ่ม",
        description: "การตั้งค่าสำหรับฟีเจอร์นำเข้าแบบกลุ่ม"
    }
);

// --- Hidden Configuration ---

const isHiddenSchema = withMeta(
    z
        .object({
            autoCorrectButton: withMeta(z.boolean().optional().default(false), {
                label: "ปุ่มแก้ไขอัตโนมัติ",
                description: "ซ่อนปุ่มแก้ไขอัตโนมัติในหน้าจอ"
            }),
            criteriaSuggestionIcon: withMeta(z.boolean().optional().default(false), {
                label: "ไอคอนคำแนะนำเกณฑ์",
                description: "ซ่อนไอคอนคำแนะนำเกณฑ์ในหน้าจอ"
            }),
            auditorSuggestionTab: withMeta(z.boolean().optional().default(false), {
                label: "แท็บคำแนะนำผู้ตรวจสอบ",
                description: "ซ่อนแท็บคำแนะนำผู้ตรวจสอบในกล่องเครื่องมือ"
            }),
            inpatientCaseSelection: withMeta(z.boolean().optional().default(false), {
                label: "การเลือกเคสผู้ป่วยใน",
                description: "ซ่อนหน้า/จุดเข้าถึงการเลือกเคสผู้ป่วยใน"
            }),
            investigationReportTab: withMeta(z.boolean().optional().default(false), {
                label: "แท็บรายงานการตรวจ",
                description: "ซ่อนแท็บรายงานการตรวจในกล่องเครื่องมือ"
            }),
            excelUploadUserTab: withMeta(z.boolean().optional().default(false), {
                label: "แท็บอัปโหลด Excel ผู้ใช้",
                description: "ซ่อนแท็บอัปโหลดผู้ใช้ด้วย Excel ในหน้าตั้งค่า"
            })
        })
        .optional()
        .default({}),
    {
        label: "องค์ประกอบ UI ที่ซ่อน",
        description: "สวิตช์สำหรับซ่อนองค์ประกอบ UI และจุดเข้าถึงเฉพาะในแอปพลิเคชัน"
    }
);

// --- Display Configuration ---

const reasonListItemSchema = z.object({
    label: withMeta(z.string().optional().default(""), {
        label: "ป้ายกำกับ",
        description: "ข้อความที่แสดงสำหรับเหตุผลนี้ ซึ่งจะแสดงในดรอปดาวน์เหตุผล (เช่น เหตุผลการจำหน่าย/ยกเลิก)"
    }),
    value: withMeta(z.string().optional().default(""), {
        label: "ค่า",
        description: "ค่าที่ถูกบันทึกเมื่อเลือกเหตุผลนี้"
    }),
    data: withMeta(z.string().optional().default(""), {
        label: "ข้อมูล",
        description: "ข้อมูลเพิ่มเติมแบบอิสระที่เชื่อมโยงกับเหตุผลนี้"
    })
});

const dsListColumnConfigSchema = z.object({
    field: withMeta(z.string().optional().default(""), {
        label: "ฟิลด์",
        description: 'ชื่อฟิลด์ของคอลัมน์ เช่น "name", "age", "ward"'
    }),
    visible: withMeta(z.boolean().optional().default(true), {
        label: "แสดงผล",
        description: "กำหนดว่าจะแสดงคอลัมน์นี้ในรายการสรุปจำหน่ายหรือไม่"
    }),
    order: withMeta(z.number().optional().default(0), {
        label: "ลำดับ",
        description: "ลำดับการเรียงของคอลัมน์นี้ จากน้อยไปมาก"
    })
});

const utilityBoxTabConfigSchema = z.object({
    value: withMeta(z.string().optional().default(""), {
        label: "ค่าแท็บ",
        description: 'ค่าภายในที่ระบุว่าแท็บใดในกล่องเครื่องมือที่รายการนี้ควบคุม เช่น "auditor_suggestion", "scanDoc"'
    }),
    visible: withMeta(z.boolean().optional().default(true), {
        label: "แสดงผล",
        description: "กำหนดว่าจะแสดงแท็บนี้ในกล่องเครื่องมือหรือไม่"
    }),
    order: withMeta(z.number().optional().default(0), {
        label: "ลำดับ",
        description: "ลำดับการเรียงของแท็บนี้ จากน้อยไปมาก"
    })
});

const skipListItemSchema = z.object({
    field: withMeta(z.string().optional().default(""), {
        label: "ฟิลด์",
        description: 'ชื่อฟิลด์นำเข้าที่รายการคำที่ข้ามนี้มีผลด้วย เช่น "procedure", "operation"'
    }),
    text: withMeta(z.array(z.string()).optional().default([]), {
        label: "คำที่กำหนด",
        description: "คำที่จะถูกตัดออกจากฟิลด์นี้ในขณะนำเข้าข้อมูล"
    })
});

export type PreAuditVersion = "v2" | "v3" | "v4" | "v4.2" | "v4.4";

// --- Hidden Menus Configuration ---
// Authoritative key set taken from the full menu registry in
// dcsum-client-hosxp/src/hooks/useMenu.tsx (every top-level and nested menu id), not just the
// subset that happens to have a default in dcsum-api-hosxp/src/modules/app/constant/initialApp.ts.
// Keep this list in sync with useMenu.tsx if menus are added/removed/renamed.
const HIDDEN_MENU_KEYS = [
    "dashboard",
    "financial-dashboard",
    "financial-dashboard/revenue-drg",
    "financial-dashboard/staff-pending",
    "financial-dashboard/revenue-user",
    "leaderboard",
    "search",
    "patients",
    "encounter",
    "patient-record",
    "inpatient-case-selection",
    "discharge-summary",
    "drg-estimator",
    "reports-and-exports",
    "impress",
    "retry-case",
    "setting",
    "setting/users",
    "setting/roles",
    "setting/modules",
    "setting/health-care-coverages",
    "setting/operational",
    "setting/encounter-status",
    "setting/kpi-sets",
    "setting/user-module",
    "setting/assignee"
] as const;

const HIDDEN_MENU_LABELS: Record<(typeof HIDDEN_MENU_KEYS)[number], string> = {
    dashboard: "แดชบอร์ด",
    "financial-dashboard": "แดชบอร์ดการเงิน",
    "financial-dashboard/revenue-drg": "แดชบอร์ดการเงิน – รายได้ตาม DRG",
    "financial-dashboard/staff-pending": "แดชบอร์ดการเงิน – งานค้างของเจ้าหน้าที่",
    "financial-dashboard/revenue-user": "แดชบอร์ดการเงิน – รายได้ตามผู้ใช้งาน",
    leaderboard: "ลีดเดอร์บอร์ด",
    search: "ค้นหา",
    patients: "ผู้ป่วย",
    encounter: "การเข้ารับบริการ",
    "patient-record": "เวชระเบียนผู้ป่วย",
    "inpatient-case-selection": "การเลือกเคสผู้ป่วยใน",
    "discharge-summary": "สรุปจำหน่าย",
    "drg-estimator": "เครื่องมือประเมิน DRG",
    "reports-and-exports": "รายงานและส่งออกข้อมูล",
    impress: "Impress",
    "retry-case": "ลองเคสใหม่",
    setting: "ตั้งค่า",
    "setting/users": "ตั้งค่า – ผู้ใช้งาน",
    "setting/roles": "ตั้งค่า – บทบาท",
    "setting/modules": "ตั้งค่า – โมดูล",
    "setting/health-care-coverages": "ตั้งค่า – สิทธิการรักษา",
    "setting/operational": "ตั้งค่า – การดำเนินงาน",
    "setting/encounter-status": "ตั้งค่า – สถานะการเข้ารับบริการ",
    "setting/kpi-sets": "ตั้งค่า – ชุด KPI",
    "setting/user-module": "ตั้งค่า – โมดูลผู้ใช้งาน",
    "setting/assignee": "ตั้งค่า – ผู้รับมอบหมาย"
};

// Menu ids hidden by default for a tenant with no explicit hiddenMenus entry, matching the
// union of today's two existing default layers: the frontend's DEFAULT_HIDDEN_MENUS fallback
// (dcsum-client-hosxp/src/constants/menus.ts) and the backend's initialApp.ts tenant-creation
// default. Every other menu id defaults to visible (false).
const HIDDEN_BY_DEFAULT_MENU_KEYS = new Set<(typeof HIDDEN_MENU_KEYS)[number]>([
    "dashboard",
    "financial-dashboard",
    "leaderboard",
    "search",
    "patients",
    "encounter",
    "patient-record",
    "inpatient-case-selection",
    "drg-estimator",
    "reports-and-exports",
    "impress"
]);

const hiddenMenusShape = Object.fromEntries(
    HIDDEN_MENU_KEYS.map((key) => [
        key,
        z.boolean().optional().default(HIDDEN_BY_DEFAULT_MENU_KEYS.has(key))
    ])
) as Record<(typeof HIDDEN_MENU_KEYS)[number], z.ZodDefault<z.ZodOptional<z.ZodBoolean>>>;

const hiddenMenusSchema = withMeta(z.object(hiddenMenusShape).optional().default({}), {
    label: "เมนูที่ซ่อน",
    description: "เมนูที่ถูกซ่อนจากแถบด้านข้างสำหรับผู้เช่ารายนี้ เมนูที่เลือกจะถูกซ่อน ส่วนเมนูที่ไม่ได้เลือกจะยังแสดงผลตามปกติ",
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
        label: "URL ไคลเอนต์",
        description:
            'URL ของหน้าเว็บฝั่งไคลเอนต์เฉพาะผู้เช่ารายนี้ ซึ่งจะแทนที่ตัวแปรสภาพแวดล้อม CLIENT_URL เมื่อมีการกำหนดค่า รองรับตัวแปรแทนที่ ":subdomain" เช่น "https://:subdomain.sati.co.th"'
    }),

    exportCustom: exportCustomSchema,

    batchImport: batchImportSchema,

    preAuditRetry: withMeta(
        z
            .object({
                enabled: withMeta(z.boolean().optional().default(false), {
                    label: "เปิดใช้งาน",
                    description: "กำหนดว่าจะลองเรียกพรีออดิตที่ล้มเหลวซ้ำโดยอัตโนมัติหรือไม่"
                }),
                rangeHours: withMeta(z.number().optional().default(0), {
                    label: "ช่วงเวลาย้อนหลัง (ชั่วโมง)",
                    description: "จำนวนชั่วโมงย้อนหลังที่จะมองหาการเรียกพรีออดิตที่ล้มเหลวซึ่งสามารถลองใหม่ได้"
                })
            })
            .optional()
            .default({}),
        {
            label: "การลองพรีออดิตใหม่",
            description: "การตั้งค่าควบคุมการลองเรียกพรีออดิตที่ล้มเหลวซ้ำโดยอัตโนมัติ"
        }
    ),

    preAuditVersion: withMeta(z.enum(["v2", "v3", "v4", "v4.2", "v4.4"]).optional().default("v4.4"), {
        label: "เวอร์ชันพรีออดิต",
        description: "เวอร์ชันของเอนจิน/API พรีออดิตที่ใช้สำหรับผู้เช่ารายนี้",
        control: "select"
    }),

    disableValidateProcedure: withMeta(z.boolean().optional().default(false), {
        label: "ปิดการตรวจสอบหัตถการ",
        description: "ข้ามการตรวจสอบความถูกต้องของรหัสหัตถการ"
    }),

    procedure: withMeta(
        z
            .object({
                displayOnlyICD9AffectDrg: withMeta(z.boolean().optional().default(true), {
                    label: "แสดงเฉพาะ ICD-9 ที่มีผลต่อ DRG",
                    description: "แสดงเฉพาะรหัสหัตถการ ICD-9 ที่มีผลต่อการคำนวณ DRG เท่านั้น"
                }),
                importUpsertMode: withMeta(z.boolean().optional().default(false), {
                    label: "โหมด Upsert เมื่อนำเข้า",
                    description: "เมื่อนำเข้าหัตถการ ให้อัปเดตรายการที่มีอยู่แล้วแทนการเพิ่มรายการใหม่เสมอ"
                })
            })
            .optional()
            .default({}),
        {
            label: "การตั้งค่าหัตถการ",
            description: "การตั้งค่าควบคุมการแสดงผลและการนำเข้ารหัสหัตถการ"
        }
    ),

    isHidden: isHiddenSchema,

    utilityBoxTabs: withMeta(z.array(utilityBoxTabConfigSchema).optional().default([]), {
        label: "แท็บกล่องเครื่องมือ",
        description: "การแสดงผลและลำดับของแท็บที่แสดงในกล่องเครื่องมือ"
    }),

    dsListColumns: withMeta(z.array(dsListColumnConfigSchema).optional().default([]), {
        label: "คอลัมน์รายการสรุปจำหน่าย",
        description: "การแสดงผลและลำดับของคอลัมน์ที่แสดงในรายการสรุปจำหน่าย"
    }),

    import: withMeta(
        z
            .object({
                isHandleDoctorOrderSheetProc: withMeta(z.boolean().optional().default(false), {
                    label: "จัดการหัตถการจากใบสั่งการแพทย์",
                    description: "ประมวลผลหัตถการจากใบสั่งการแพทย์ในระหว่างการนำเข้า"
                }),
                isOpenOnly: withMeta(z.boolean().optional().default(false), {
                    label: "เฉพาะเคสที่ยังเปิดอยู่",
                    description: "นำเข้าเฉพาะเคสที่ยังเปิดอยู่ในปัจจุบันเท่านั้น"
                }),
                defaultEncounterStatus: withMeta(z.string().optional().default(""), {
                    label: "สถานะการเข้ารับบริการเริ่มต้น",
                    description: "สถานะการเข้ารับบริการที่กำหนดให้เคสที่นำเข้าใหม่โดยค่าเริ่มต้น"
                }),
                syncDxProcOnly: withMeta(z.boolean().optional().default(false), {
                    label: "ซิงค์เฉพาะวินิจฉัย/หัตถการ",
                    description: "จำกัดการซิงค์การนำเข้าให้เฉพาะข้อมูลวินิจฉัยและหัตถการเท่านั้น"
                }),
                isAutoAssignDoctor: withMeta(z.boolean().optional().default(false), {
                    label: "มอบหมายแพทย์อัตโนมัติ",
                    description: "มอบหมายแพทย์ให้เคสที่นำเข้าใหม่โดยอัตโนมัติ"
                }),
                fillBlankProcedureName: withMeta(z.boolean().optional().default(false), {
                    label: "เติมชื่อหัตถการที่ว่างเปล่า",
                    description: "ตั้งชื่อให้แถวหัตถการ/การผ่าตัดที่นำเข้ามาแบบไม่มีชื่อ แทนการปฏิเสธการนำเข้า"
                }),
                autoAssignMode: withMeta(z.enum(["list", "random"]).optional().default("random"), {
                    label: "โหมดมอบหมายอัตโนมัติ",
                    description:
                        'วิธีกระจายงานในพูลการมอบหมาย: "list" มอบหมายตามลำดับแบบวนรอบ ส่วน "random" มอบหมายแบบสุ่ม (ค่าเริ่มต้น)',
                    control: "select",
                    options: [
                        { label: "ตามลำดับ (วนรอบ)", value: "list" },
                        { label: "สุ่ม", value: "random" }
                    ]
                }),
                defaultAssignment: withMeta(
                    z
                        .object({
                            enabled: withMeta(z.boolean().optional().default(false), {
                                label: "เปิดใช้งาน",
                                description: "มอบหมายบทบาทเริ่มต้นให้เคสที่นำเข้าใหม่โดยอัตโนมัติ"
                            }),
                            roleId: withMeta(z.string().optional().default(""), {
                                label: "บทบาทเริ่มต้น",
                                description: "รหัสบทบาทที่กำหนดให้เคสที่นำเข้าใหม่โดยค่าเริ่มต้น"
                            })
                        })
                        .nullable()
                        .optional()
                        .default({ enabled: false, roleId: "" }),
                    {
                        label: "การมอบหมายเริ่มต้น",
                        description: "การมอบหมายบทบาทเริ่มต้นที่ใช้กับเคสที่นำเข้าใหม่"
                    }
                ),
                skipList: withMeta(z.array(skipListItemSchema).optional().default([]), {
                    label: "รายการคำที่ข้าม",
                    description: 'คำที่จะถูกตัดออกในขณะนำเข้า แยกตามชื่อฟิลด์ (เช่น "procedure", "operation")'
                })
            })
            .optional()
            .default({}),
        {
            label: "การตั้งค่านำเข้า",
            description: "การตั้งค่าควบคุมวิธีนำเข้าเคสและข้อมูลที่เกี่ยวข้องจากระบบต้นทาง"
        }
    ),

    export: withMeta(
        z
            .object({
                doctorOrderSheetProcExport: withMeta(z.boolean().optional().default(true), {
                    label: "ส่งออกหัตถการจากใบสั่งการแพทย์",
                    description: "รวมหัตถการจากใบสั่งการแพทย์ไว้ในข้อมูลที่ส่งออก"
                }),
                removeIcdDot: withMeta(z.boolean().optional().default(false), {
                    label: "ตัดจุดออกจากรหัส ICD",
                    description: 'ส่งออกรหัส ICD โดยไม่มีจุด (เช่น "E35.2" จะกลายเป็น "E352") ใน exportData และ exportCustomPath'
                })
            })
            .optional()
            .default({}),
        {
            label: "การตั้งค่าส่งออก",
            description: "การตั้งค่าสำหรับฟีเจอร์ส่งออกมาตรฐาน (ไม่ใช่แบบกำหนดเอง)"
        }
    ),

    printForm: withMeta(
        z
            .object({
                enablePrintForm: withMeta(z.boolean().optional().default(false), {
                    label: "เปิดใช้งานแบบฟอร์มพิมพ์",
                    description: "เปิดใช้งานฟีเจอร์แบบฟอร์มพิมพ์สำหรับผู้เช่ารายนี้"
                }),
                printFormURL: withMeta(z.string().optional().default(""), {
                    label: "URL แบบฟอร์มพิมพ์",
                    description: "URL ของบริการแบบฟอร์มพิมพ์ที่ใช้สร้างแบบฟอร์มสำหรับพิมพ์"
                }),
                templateName: withMeta(z.string().optional().default(""), {
                    label: "ชื่อเทมเพลต",
                    description: "ชื่อเทมเพลตแบบฟอร์มพิมพ์ที่ใช้สร้างแบบฟอร์มสำหรับพิมพ์"
                })
            })
            .optional()
            .default({}),
        {
            label: "การตั้งค่าแบบฟอร์มพิมพ์",
            description: "การตั้งค่าสำหรับฟีเจอร์แบบฟอร์มพิมพ์"
        }
    ),

    syncOnpremData: withMeta(
        z
            .object({
                enableSyncOnpremData: withMeta(z.boolean().optional().default(false), {
                    label: "เปิดใช้งานการซิงค์ข้อมูล On-Premise",
                    description: "เปิดใช้งานการซิงค์ข้อมูลกับระบบ On-Premise ของผู้เช่ารายนี้"
                }),
                syncOnpremDataURL: withMeta(z.string().optional().default(""), {
                    label: "URL ซิงค์ On-Premise",
                    description: "URL ของบริการ On-Premise ที่ใช้สำหรับซิงค์ข้อมูล"
                })
            })
            .optional()
            .default({}),
        {
            label: "การซิงค์ข้อมูล On-Premise",
            description: "การตั้งค่าสำหรับการซิงค์ข้อมูลกับระบบ On-Premise ของผู้เช่ารายนี้"
        }
    ),

    auditorTextHandle: withMeta(z.boolean().optional().default(false), {
        label: "การจัดการข้อความผู้ตรวจสอบ",
        description: "เปิดใช้งานพฤติกรรมการจัดการข้อความแบบพิเศษสำหรับข้อความที่ผู้ตรวจสอบกรอก"
    }),

    isAutoSyncIcd: withMeta(z.boolean().optional().default(false), {
        label: "ซิงค์ ICD อัตโนมัติ",
        description: "ซิงค์รหัส ICD โดยอัตโนมัติโดยไม่ต้องดำเนินการด้วยตนเอง"
    }),

    icdSyncMode: withMeta(z.enum(["diagText", "auditText", "union"]).optional().default("auditText"), {
        label: "โหมดซิงค์ ICD",
        description: 'แหล่งข้อมูลที่ใช้ตอนซิงค์รหัส ICD: "diagText" ใช้ข้อความวินิจฉัย "auditText" ใช้ข้อความของผู้ตรวจสอบ ส่วน "union" ใช้ทั้งสองแหล่ง',
        control: "select",
        options: [
            { label: "ข้อความวินิจฉัย (diagText)", value: "diagText" },
            { label: "ข้อความผู้ตรวจสอบ (auditText)", value: "auditText" },
            { label: "ทั้งสองแหล่ง (union)", value: "union" }
        ]
    }),

    isCallPreAuditOneTime: withMeta(z.boolean().optional().default(true), {
        label: "เรียกพรีออดิตเพียงครั้งเดียว",
        description: "เรียกเอนจินพรีออดิตเพียงครั้งเดียวต่อเคส แทนที่จะเรียกทุกครั้งที่มีการเปลี่ยนแปลงที่เกี่ยวข้อง"
    }),

    disableValidatePDX: withMeta(z.boolean().optional().default(false), {
        label: "ปิดการตรวจสอบ PDX",
        description: "ข้ามการตรวจสอบความถูกต้องของการวินิจฉัยหลัก (PDX)"
    }),

    censorSensitiveInfo: withMeta(z.boolean().optional().default(false), {
        label: "ปิดบังข้อมูลที่ละเอียดอ่อน",
        description: "ปิดบังข้อมูลผู้ป่วยที่ละเอียดอ่อนซึ่งแสดงอยู่ในหน้าจอ"
    }),

    canEditDischargeDate: withMeta(z.boolean().optional().default(false), {
        label: "แก้ไขวันที่จำหน่ายได้",
        description: "อนุญาตให้ผู้ใช้แก้ไขวันที่จำหน่ายได้หลังจากเคสถูกจำหน่ายแล้ว"
    }),

    canEditWeight: withMeta(z.boolean().optional().default(false), {
        label: "แก้ไขน้ำหนักได้",
        description: "อนุญาตให้ผู้ใช้แก้ไขน้ำหนักที่บันทึกไว้ของผู้ป่วย"
    }),

    scanDoc: withMeta(
        z
            .object({
                strategy: withMeta(z.enum(["S3", "HOS_URL"]).optional().default("S3"), {
                    label: "รูปแบบการจัดเก็บ",
                    description: 'ที่จัดเก็บและให้บริการเอกสารสแกน: "S3" (พื้นที่จัดเก็บแบบออบเจ็กต์) หรือ "HOS_URL" (URL ที่โรงพยาบาลเป็นผู้โฮสต์)',
                    control: "select",
                    options: [
                        { label: "พื้นที่จัดเก็บ S3", value: "S3" },
                        { label: "URL จากโรงพยาบาล (HOSxP)", value: "HOS_URL" }
                    ]
                })
            })
            .optional()
            .default({}),
        {
            label: "การตั้งค่าเอกสารสแกน",
            description: "การตั้งค่าสำหรับตำแหน่งที่จัดเก็บและให้บริการเอกสารสแกน"
        }
    ),

    hiddenMenus: hiddenMenusSchema,

    statusInfo: withMeta(
        z
            .object({
                enabled: withMeta(z.boolean().optional().default(true), {
                    label: "เปิดใช้งาน",
                    description: "แสดงข้อมูลสถานะ (ประเภทการจำหน่าย สถานะการเข้ารับบริการ การมอบหมาย) ในรายการงาน"
                }),
                showDischargeType: withMeta(z.boolean().optional().default(true), {
                    label: "แสดงประเภทการจำหน่าย",
                    description: "แสดงป้ายประเภทการจำหน่ายในรายการงาน"
                }),
                showEncounterStatus: withMeta(z.boolean().optional().default(true), {
                    label: "แสดงสถานะการเข้ารับบริการ",
                    description: "แสดงป้ายสถานะการเข้ารับบริการในรายการงาน"
                }),
                showAssignment: withMeta(z.boolean().optional().default(false), {
                    label: "แสดงการมอบหมาย",
                    description: "แสดงป้ายผู้รับมอบหมายในรายการงาน"
                }),
                allowDuplicateAssignees: withMeta(z.boolean().optional().default(false), {
                    label: "อนุญาตผู้รับมอบหมายซ้ำ",
                    description: "อนุญาตให้ผู้ใช้คนเดียวกันถูกมอบหมายได้มากกว่าหนึ่งบทบาทในเคสเดียวกัน"
                }),
                showDefaultDischargeCode: withMeta(z.boolean().optional().default(false), {
                    label: "แสดงรหัสการจำหน่ายเริ่มต้น",
                    description:
                        "เมื่อเปิดใช้งาน GET /discharge-code-master จะรวมรหัสมาตรฐานเริ่มต้นเข้ากับรายการ ควบคู่ไปกับแถวเฉพาะของผู้เช่า/ที่ตรวจพบอัตโนมัติ เมื่อปิดใช้งาน ผู้เช่าที่มีแถวของตนเองจะเห็นเฉพาะแถวของตนเองเท่านั้น"
                })
            })
            .optional()
            .default({}),
        {
            label: "ข้อมูลสถานะ",
            description: "การตั้งค่าสำหรับป้ายข้อมูลสถานะที่แสดงในรายการงาน"
        }
    ),

    enablePrintForm: withMeta(z.boolean().optional().default(false), {
        label: "เปิดใช้งานแบบฟอร์มพิมพ์",
        description: "สวิตช์ระดับบนสุดสำหรับเปิดใช้งานฟีเจอร์แบบฟอร์มพิมพ์"
    }),

    preAuditSuggestion: preAuditSuggestionConfigSchema,

    reasonList: withMeta(z.array(reasonListItemSchema).optional().default([]), {
        label: "รายการเหตุผล",
        description: "รายการเหตุผลที่เลือกได้ซึ่งใช้ในดรอปดาวน์เหตุผล (เช่น เหตุผลการจำหน่าย/ยกเลิก)"
    }),

    autoPractitioner: withMeta(z.boolean().optional().default(false), {
        label: "ผู้ปฏิบัติงานอัตโนมัติ",
        description: "กำหนดผู้ปฏิบัติงานของเคสโดยอัตโนมัติ"
    }),

    disableAutoPractitioner: withMeta(z.boolean().optional().default(false), {
        label: "ปิดผู้ปฏิบัติงานอัตโนมัติ",
        description: "ปิดการกำหนดผู้ปฏิบัติงานโดยอัตโนมัติ"
    }),

    skipAuditModeCheck: withMeta(z.boolean().optional().default(false), {
        label: "ข้ามการตรวจสอบโหมดตรวจสอบ",
        description: "ข้ามการตรวจสอบโหมดตรวจสอบที่ปกติจะควบคุมการดำเนินการบางอย่าง"
    }),

    disableValidateClinicalSummary: withMeta(z.boolean().optional().default(true), {
        label: "ปิดการตรวจสอบสรุปทางคลินิก",
        description: "ข้ามการตรวจสอบความถูกต้องของบันทึกสรุปทางคลินิก"
    }),

    clinicalSummaryDisplayMode: withMeta(clinicalSummaryDisplayModeEnum.optional().default("priority"), {
        label: "โหมดแสดงสรุปทางคลินิก",
        description: 'เนื้อหาสรุปทางคลินิกที่แสดงโดยค่าเริ่มต้น: "priority" (แหล่งข้อมูลที่มีความสำคัญสูงสุด) "draft" หรือ "all" (ทุกแหล่งข้อมูล)',
        control: "select",
        options: [
            { label: "แหล่งข้อมูลที่สำคัญที่สุด", value: "priority" },
            { label: "ฉบับร่าง", value: "draft" },
            { label: "ทุกแหล่งข้อมูล", value: "all" }
        ]
    }),

    clinicalSummarySourcePriority: withMeta(z.array(clinicalSummarySourceEnum).optional().default([]), {
        label: "ลำดับความสำคัญแหล่งข้อมูลสรุปทางคลินิก",
        description: "รายการแหล่งข้อมูลสรุปทางคลินิก (นำเข้า, AI, ผู้ใช้, ฉบับร่าง) เรียงตามลำดับความสำคัญสูงสุดก่อน ใช้เพื่อเลือกเนื้อหาที่จะแสดง",
        control: "multiSelect",
        options: [
            { label: "นำเข้าจากระบบต้นทาง (IMPORT)", value: "IMPORT" },
            { label: "สร้างโดย AI", value: "AI" },
            { label: "ผู้ใช้กรอกเอง (USER)", value: "USER" },
            { label: "ฉบับร่าง (DRAFT)", value: "DRAFT" }
        ]
    }),

    encounterAssignmentCheck: withMeta(
        z
            .object({
                enabled: withMeta(z.boolean().optional().default(false), {
                    label: "เปิดใช้งาน",
                    description: "กำหนดให้เคสต้องถูกมอบหมายก่อนจึงจะอนุญาตให้ดำเนินการบางอย่างได้"
                })
            })
            .optional()
            .default({}),
        {
            label: "การตรวจสอบการมอบหมายเคส",
            description: "การตั้งค่าควบคุมว่าเคสต้องถูกมอบหมายก่อนจึงจะอนุญาตให้ดำเนินการบางอย่างได้หรือไม่"
        }
    ),

    disabledDischargeSummary: withMeta(z.boolean().optional().default(false), {
        label: "ปิดฟีเจอร์สรุปจำหน่าย",
        description: "ปิดฟีเจอร์สรุปจำหน่ายทั้งหมดสำหรับผู้เช่ารายนี้"
    }),

    icdMappingFlow: withMeta(
        z
            .object({
                disableHistoryMapping: withMeta(z.boolean().optional().default(false), {
                    label: "ปิดการแมปประวัติ",
                    description: "ปิดขั้นตอนการแมปประวัติในกระบวนการแมป ICD (การแมปประวัติ -> การแมปพรีออดิต -> Impress)"
                }),
                disableImpress: withMeta(z.boolean().optional().default(false), {
                    label: "ปิด Impress",
                    description: "ปิดขั้นตอน Impress ในกระบวนการแมป ICD (การแมปประวัติ -> การแมปพรีออดิต -> Impress)"
                })
            })
            .optional()
            .default({}),
        {
            label: "กระบวนการแมป ICD",
            description: "การตั้งค่าสำหรับกระบวนการแมป ICD: การแมปประวัติ -> การแมปพรีออดิต -> Impress"
        }
    ),

    icdO: withMeta(z.boolean().optional().default(false), {
        label: "ICD-O",
        description: "เปิดใช้งานการให้รหัส ICD-O (มะเร็งวิทยา)"
    }),

    rewriteOption: withMeta(
        z
            .object({
                keepOriginalTerm: withMeta(z.boolean().optional().default(false), {
                    label: "เก็บคำศัพท์ต้นฉบับ",
                    description: "เก็บคำศัพท์วินิจฉัย/หัตถการต้นฉบับไว้คู่กับคำที่ถูกเขียนใหม่/แนะนำ"
                }),
                suggestICD: withMeta(z.boolean().optional().default(true), {
                    label: "แนะนำ ICD",
                    description: "แนะนำรหัส ICD เป็นส่วนหนึ่งของกระบวนการเขียนใหม่"
                }),
                codeMappingProvider: withMeta(z.enum(["oneshot", "coder-ai"]).optional().default("oneshot"), {
                    label: "ผู้ให้บริการแมปรหัส",
                    description:
                        'ระบบหลังบ้านที่ตอบคำขอแมปรหัส/เขียนใหม่: "oneshot" (ค่าเริ่มต้น) เรียก /ipd-oneshot/v2/rewrite ส่วน "coder-ai" เรียก /coder-ai/v1/rewrite',
                    control: "select",
                    options: [
                        { label: "Oneshot (ค่าเริ่มต้น)", value: "oneshot" },
                        { label: "Coder AI", value: "coder-ai" }
                    ]
                })
            })
            .optional()
            .default({}),
        {
            label: "ตัวเลือกการเขียนใหม่",
            description: "การตั้งค่าสำหรับกระบวนการเขียนใหม่และแนะนำรหัสวินิจฉัย/หัตถการ"
        }
    ),

    unsavedDraftGuard: withMeta(
        z
            .object({
                enabled: withMeta(z.boolean().optional().default(false), {
                    label: "เปิดใช้งาน",
                    description: "แจ้งเตือนผู้ใช้เกี่ยวกับการเปลี่ยนแปลงฉบับร่างที่ยังไม่บันทึก ก่อนออกจากหน้า"
                })
            })
            .optional()
            .default({}),
        {
            label: "การป้องกันฉบับร่างที่ยังไม่บันทึก",
            description: "การตั้งค่าสำหรับการแจ้งเตือนป้องกันการออกจากหน้าเมื่อมีฉบับร่างที่ยังไม่บันทึก"
        }
    ),

    lab: withMeta(
        z
            .object({
                normalStatusMode: withMeta(z.enum(["interpreter", "import", "hybrid"]).optional().default("interpreter"), {
                    label: "โหมดสถานะค่าปกติ",
                    description:
                        'แหล่งข้อมูลที่ใช้สำหรับสถานะค่าปกติของรายการแล็บ: "interpreter" (ค่าเริ่มต้น) ใช้ตัวแปลผลแล็บเสมอ "import" ใช้ค่าที่คำนวณไว้ตอนนำเข้า (ค่าธง/ช่วงค่าจาก HIS) โดยไม่เรียกตัวแปลผล ส่วน "hybrid" ใช้ค่าตอนนำเข้าก่อน และจะเรียกตัวแปลผลเฉพาะรายการที่ยังไม่มีค่าเท่านั้น',
                    control: "select",
                    options: [
                        { label: "ตัวแปลผลแล็บ (ค่าเริ่มต้น)", value: "interpreter" },
                        { label: "ค่าจากตอนนำเข้า (HIS)", value: "import" },
                        { label: "ผสมผสาน (นำเข้าก่อน แล้วจึงแปลผล)", value: "hybrid" }
                    ]
                })
            })
            .optional()
            .default({}),
        {
            label: "การตั้งค่าแล็บ",
            description: "การตั้งค่าสำหรับวิธีกำหนดค่าสถานะปกติของรายการแล็บ"
        }
    ),

    dischargeSummaryList: dischargeSummaryListConfigSchema
}), {
    label: "การตั้งค่าแอปพลิเคชัน",
    description: "การตั้งค่าทั้งหมดที่ปรับแต่งได้สำหรับผู้เช่ารายนี้"
});

export type AppConfigDto = z.infer<typeof appConfigSchema>;

export const APP_CONFIG_DEFAULTS: AppConfigDto = appConfigSchema.parse({});
