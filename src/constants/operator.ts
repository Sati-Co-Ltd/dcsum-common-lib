import type { OperatorCode, OperatorSymbol, OperatorSymbolUnicode } from "../dto/operator.dto";

/** code → symbol. Single source of truth; the reverse map is derived from this. */
export const OPERATOR_SYMBOL_BY_CODE: Record<OperatorCode, OperatorSymbol> = {
    gt: ">",
    gte: ">=",
    eq: "=",
    lte: "<=",
    lt: "<"
};

/** symbol → code (derived, so it can never drift from OPERATOR_SYMBOL_BY_CODE). */
export const OPERATOR_CODE_BY_SYMBOL = Object.fromEntries(
    Object.entries(OPERATOR_SYMBOL_BY_CODE).map(([code, symbol]) => [symbol, code])
) as Record<OperatorSymbol, OperatorCode>;

/** code → unicode symbol. Single source of truth; the reverse map is derived from this. */
export const OPERATOR_SYMBOL_UNICODE_BY_CODE: Record<OperatorCode, OperatorSymbolUnicode> = {
    gt: ">",
    gte: "≥",
    eq: "=",
    lte: "≤",
    lt: "<"
};

/** unicode symbol → code (derived, so it can never drift from OPERATOR_SYMBOL_UNICODE_BY_CODE). */
export const OPERATOR_CODE_BY_SYMBOL_UNICODE = Object.fromEntries(
    Object.entries(OPERATOR_SYMBOL_UNICODE_BY_CODE).map(([code, symbol]) => [symbol, code])
) as Record<OperatorSymbolUnicode, OperatorCode>;

/** Dropdown options: stable `code` value, pretty unicode glyph (≥ / ≤) as the label. */
export const OPERATOR_OPTIONS = (Object.keys(OPERATOR_SYMBOL_UNICODE_BY_CODE) as OperatorCode[]).map((code) => ({
    code,
    label: OPERATOR_SYMBOL_UNICODE_BY_CODE[code]
}));
