import { z } from "zod";
import { withMeta } from "./meta";

const assignmentSchema = withMeta(
    z
        .object({
            maskStaff: withMeta(z.boolean().optional().default(false), {
                label: "ปิดบังชื่อที่แสดงของเจ้าหน้าที่",
                description: "ปิดบังชื่อที่แสดงของเจ้าหน้าที่ (เช่น ผู้รับมอบหมาย) ในรายการสรุปจำหน่าย ตามการตั้งค่าปิดบังข้อมูลเจ้าหน้าที่โรงพยาบาล"
            })
        })
        .optional()
        .default({}),
    {
        label: "การมอบหมาย",
        description: "การตั้งค่าการแสดงข้อมูลการมอบหมายในรายการสรุปจำหน่าย"
    }
);

const patientSchema = withMeta(
    z
        .object({
            maskPatientName: withMeta(z.boolean().optional().default(false), {
                label: "ปิดบังชื่อผู้ป่วย",
                description: "ปิดบังชื่อผู้ป่วยที่แสดงในรายการสรุปจำหน่าย"
            })
        })
        .optional()
        .default({}),
    {
        label: "ผู้ป่วย",
        description: "การตั้งค่าการแสดงข้อมูลผู้ป่วยในรายการสรุปจำหน่าย"
    }
);

export const dischargeSummaryListConfigSchema = withMeta(
    z
        .object({
            assignment: assignmentSchema,
            patient: patientSchema
        })
        .optional()
        .default({}),
    {
        label: "รายการสรุปจำหน่าย",
        description: "การตั้งค่าควบคุมมุมมองรายการสรุปจำหน่าย"
    }
);

export type DischargeSummaryListConfigDto = z.infer<typeof dischargeSummaryListConfigSchema>;
