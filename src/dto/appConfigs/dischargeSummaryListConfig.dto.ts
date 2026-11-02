import { z } from "zod";
import { withMeta } from "./meta";

const assignmentSchema = withMeta(
    z
        .object({
            maskStaff: withMeta(z.boolean().optional().default(false), {
                label: "Mask Staff Display Names",
                description: "Mask staff display names (e.g. assignee) shown in the discharge summary list, based on the hospital-staff masking config."
            })
        })
        .optional()
        .default({}),
    {
        label: "Assignment",
        description: "Settings for how assignment info is displayed in the discharge summary list."
    }
);

const patientSchema = withMeta(
    z
        .object({
            maskPatientName: withMeta(z.boolean().optional().default(false), {
                label: "Mask Patient Name",
                description: "Mask patient names shown in the discharge summary list."
            })
        })
        .optional()
        .default({}),
    {
        label: "Patient",
        description: "Settings for how patient info is displayed in the discharge summary list."
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
        label: "Discharge Summary List",
        description: "Settings controlling the discharge summary list view."
    }
);

export type DischargeSummaryListConfigDto = z.infer<typeof dischargeSummaryListConfigSchema>;
