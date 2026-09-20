/**
 * Universal Data Formatters
 *
 * Provides safe formatting helpers for monetary figures, dates, and numbers.
 * Supports both raw PostgreSQL types (floats/integers, ISO-8601 timestamps)
 * and formatted mock strings without throwing runtime errors.
 */

/**
 * Safely parses any currency input (number or string with £, $, commas) into a float.
 */
export function parseCurrency(value: number | string | null | undefined): number {
  if (value === null || value === undefined) return 0;
  if (typeof value === "number") return isNaN(value) ? 0 : value;
  const cleaned = String(value).replace(/[^0-9.-]+/g, "");
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
}

/**
 * Formats a number or string into standard UK currency (e.g. £2,450 or £2,450.00).
 */
export function formatCurrency(
  value: number | string | null | undefined,
  options?: { showDecimals?: boolean }
): string {
  if (value === null || value === undefined) return "£0";
  
  // If it's already a clean formatted string and starts with £, check if valid
  if (typeof value === "string" && value.trim().startsWith("£") && !options?.showDecimals) {
    return value.trim();
  }

  const numeric = parseCurrency(value);
  const showDecimals = options?.showDecimals ?? numeric % 1 !== 0;

  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: showDecimals ? 2 : 0,
    maximumFractionDigits: 2,
  }).format(numeric);
}

/**
 * Formats standard ISO dates or date strings into readable UK display formats.
 */
export function formatDate(
  dateInput: string | Date | null | undefined,
  style: "short" | "medium" | "long" = "medium"
): string {
  if (!dateInput) return "—";

  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
  if (isNaN(date.getTime())) {
    // If it's already a custom human string like "24 Oct 2025" or "01 Dec 2023", return as-is
    return String(dateInput);
  }

  const options: Intl.DateTimeFormatOptions =
    style === "short"
      ? { day: "2-digit", month: "2-digit", year: "numeric" }
      : style === "long"
      ? { day: "numeric", month: "long", year: "numeric" }
      : { day: "numeric", month: "short", year: "numeric" };

  return new Intl.DateTimeFormat("en-GB", options).format(date);
}

/**
 * Formats percentage numbers safely.
 */
export function formatPercent(value: number | string | null | undefined): string {
  if (value === null || value === undefined) return "0%";
  const num = typeof value === "number" ? value : parseFloat(String(value));
  return `${isNaN(num) ? 0 : num}%`;
}
