import { z } from "zod";
import { withMeta } from "./meta";

export const preAuditModeEnum = z.enum(["default", "strict", "relax"]);
export type PreAuditMode = z.infer<typeof preAuditModeEnum>;

const displayModeSchema = withMeta(
    z
        .object({
            enabled: withMeta(z.boolean().optional().default(false), {
                label: "เปิดใช้งานโหมดการแสดงผล",
                description: "อนุญาตให้สลับระหว่างการแสดงคำแนะนำพรีออดิตแบบย่อและแบบละเอียด"
            }),
            defaultMode: withMeta(z.enum(["brief", "detailed"]).optional().default("detailed"), {
                label: "โหมดการแสดงผลเริ่มต้น",
                description: "ระดับรายละเอียดเริ่มต้นที่แสดงสำหรับคำแนะนำพรีออดิต เมื่อเปิดใช้งานโหมดการแสดงผล",
                control: "select"
            })
        })
        .optional()
        .default({}),
    {
        label: "โหมดการแสดงผล",
        description: "การตั้งค่าควบคุมวิธีแสดงคำแนะนำพรีออดิตให้ผู้ใช้เห็น"
    }
);

const similaritySchema = withMeta(
    z
        .object({
            enabled: withMeta(z.boolean().optional().default(false), {
                label: "เปิดใช้งานการจับคู่ความคล้ายคลึง",
                description: "เปิดใช้งานการจับคู่ด้วยความคล้ายคลึงเมื่อแนะนำรหัสวินิจฉัย/หัตถการในพรีออดิต"
            })
        })
        .optional()
        .default({}),
    {
        label: "การจับคู่ความคล้ายคลึง",
        description: "การตั้งค่าควบคุมการจับคู่คำแนะนำพรีออดิตด้วยความคล้ายคลึง"
    }
);

export const preAuditSuggestionConfigSchema = withMeta(
    z
        .object({
            preAuditMode: withMeta(preAuditModeEnum.optional().default("default"), {
                label: "โหมดพรีออดิต",
                description: "ควบคุมความเข้มงวดของเอนจินคำแนะนำพรีออดิตเมื่อจับคู่การวินิจฉัยและหัตถการ",
                control: "select"
            }),
            displayMode: displayModeSchema,
            similarity: similaritySchema,
            isCurrentANOnly: withMeta(z.boolean().optional().default(false), {
                label: "เฉพาะเลขที่รับเข้ารักษาปัจจุบันเท่านั้น",
                description: "จำกัดคำแนะนำพรีออดิตให้ใช้ได้เฉพาะเลขที่รับเข้ารักษา (AN) ปัจจุบันเท่านั้น"
            })
        })
        .optional()
        .default({}),
    {
        label: "คำแนะนำพรีออดิต",
        description: "การตั้งค่าสำหรับเอนจินคำแนะนำพรีออดิต"
    }
);

export type PreAuditSuggestionConfig = z.infer<typeof preAuditSuggestionConfigSchema>;
