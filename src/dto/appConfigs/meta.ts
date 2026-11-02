import type { ZodTypeAny } from "zod";

export type UiControlType =
    | "text"
    | "textarea"
    | "integer"
    | "decimal"
    | "boolean"
    | "select"
    | "multiSelect"
    | "date"
    | "group"
    | "array";

export interface FieldOption {
    label: string;
    value: string;
}

export interface FieldMeta {
    label: string;
    description: string;
    control?: UiControlType;
    options?: FieldOption[];
    /** Only used on multiSelect fields backed by a Record<string, boolean> shape in the wire format. */
    valueTransform?: "recordOfBooleans";
}

const metaRegistry = new WeakMap<ZodTypeAny, FieldMeta>();

/**
 * Attaches UI metadata (label/description/control/options) to a zod schema instance
 * without altering its inferred TS type. Metadata is tracked out-of-band in a WeakMap
 * keyed by the schema instance itself.
 */
export function withMeta<T extends ZodTypeAny>(schema: T, meta: FieldMeta): T {
    metaRegistry.set(schema, meta);
    return schema;
}

export function getMeta(schema: ZodTypeAny): FieldMeta | undefined {
    return metaRegistry.get(schema);
}
