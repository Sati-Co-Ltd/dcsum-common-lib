/**
 * Comparison operators, in two interchangeable representations:
 *
 * - **code**   — the string form used in API payloads (`"gt"`, `"gte"`, …)
 * - **symbol** — the math symbol shown to users (`">"`, `">="`, …)
 *
 * Operator meanings:
 * - `gt`  / `>`   — greater than
 * - `gte` / `>=`  — greater than or equal
 * - `eq`  / `=`   — equal; matches the whole-day window [days, days + 1)
 * - `lte` / `<=`  — less than or equal
 * - `lt`  / `<`   — less than
 */

/** API/payload form. */
export type OperatorCode = "gt" | "gte" | "eq" | "lte" | "lt";

/** User-facing math-symbol form. */
export type OperatorSymbol = ">" | ">=" | "=" | "<=" | "<";

/** User-facing unicode math-symbol form (uses ≥ / ≤ glyphs). */
export type OperatorSymbolUnicode = ">" | "≥" | "=" | "≤" | "<";
