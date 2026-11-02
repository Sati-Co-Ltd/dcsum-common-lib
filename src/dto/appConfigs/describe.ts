import { ZodArray, ZodBoolean, ZodDefault, ZodEnum, ZodNullable, ZodNumber, ZodObject, ZodOptional, type ZodTypeAny } from "zod";
import { getMeta, type FieldOption, type UiControlType } from "./meta";

export type SchemaNode =
    | { kind: "field"; control: UiControlType; label: string; description: string; options?: FieldOption[]; valueTransform?: "recordOfBooleans" }
    | { kind: "group"; label: string; description: string; children: Record<string, SchemaNode> }
    | { kind: "array"; label: string; description: string; itemShape: Record<string, SchemaNode> };

/**
 * Unwraps ZodOptional/ZodDefault/ZodNullable wrappers transparently, returning the
 * innermost schema used for structural inspection. Metadata lookup must happen on the
 * OUTER (wrapper) schema before calling this, since that's where withMeta() attaches it.
 */
function unwrap(schema: ZodTypeAny): ZodTypeAny {
    let current = schema;
    while (current instanceof ZodOptional || current instanceof ZodDefault || current instanceof ZodNullable) {
        if (current instanceof ZodDefault) {
            current = current.removeDefault();
        } else {
            current = current.unwrap();
        }
    }
    return current;
}

function defaultControlFor(schema: ZodTypeAny): UiControlType {
    if (schema instanceof ZodBoolean) {
        return "boolean";
    }
    if (schema instanceof ZodEnum) {
        return "select";
    }
    if (schema instanceof ZodNumber) {
        return "integer";
    }
    return "text";
}

function optionsFor(schema: ZodTypeAny): FieldOption[] | undefined {
    if (schema instanceof ZodEnum) {
        return (schema.options as string[]).map((value) => ({ label: value, value }));
    }
    return undefined;
}

export function describeSchema(schema: ZodTypeAny, path = "$root"): SchemaNode {
    const ownMeta = getMeta(schema);
    const inner = unwrap(schema);
    const meta = ownMeta ?? getMeta(inner);

    if (!meta) {
        throw new Error(`Missing withMeta() for schema at path: ${path}`);
    }

    // A schema whose own meta explicitly declares a control is always rendered as a single
    // field node, even if it is structurally a ZodObject (e.g. hiddenMenus collapses to a
    // single multiSelect field instead of a group of booleans).
    if (meta.control) {
        return {
            kind: "field",
            control: meta.control,
            label: meta.label,
            description: meta.description,
            options: meta.options ?? optionsFor(inner),
            valueTransform: meta.valueTransform
        };
    }

    if (inner instanceof ZodObject) {
        const shape = inner.shape as Record<string, ZodTypeAny>;
        const children: Record<string, SchemaNode> = {};
        for (const key of Object.keys(shape)) {
            children[key] = describeSchema(shape[key], `${path}.${key}`);
        }
        return {
            kind: "group",
            label: meta.label,
            description: meta.description,
            children
        };
    }

    if (inner instanceof ZodArray) {
        const element = inner.element as ZodTypeAny;
        const elementInner = unwrap(element);
        if (elementInner instanceof ZodObject) {
            const shape = elementInner.shape as Record<string, ZodTypeAny>;
            const itemShape: Record<string, SchemaNode> = {};
            for (const key of Object.keys(shape)) {
                itemShape[key] = describeSchema(shape[key], `${path}[].${key}`);
            }
            return {
                kind: "array",
                label: meta.label,
                description: meta.description,
                itemShape
            };
        }
        // Array of scalars: treat the whole array as a single field (e.g. multiSelect-like).
        return {
            kind: "field",
            control: meta.control ?? defaultControlFor(elementInner),
            label: meta.label,
            description: meta.description,
            options: meta.options ?? optionsFor(elementInner),
            valueTransform: meta.valueTransform
        };
    }

    // Scalar leaf: ZodString, ZodNumber, ZodBoolean, ZodEnum, etc.
    return {
        kind: "field",
        control: meta.control ?? defaultControlFor(inner),
        label: meta.label,
        description: meta.description,
        options: meta.options ?? optionsFor(inner),
        valueTransform: meta.valueTransform
    };
}
