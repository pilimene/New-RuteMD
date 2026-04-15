/**
 * Disabled Dates Configuration
 * 
 * Add dates here to close reservations for specific dates.
 * Format: "YYYY-MM-DD" (e.g., "2026-01-26")
 * 
 * You can also disable dates for specific routes by adding route-specific dates.
 */

// Dates that are disabled for ALL routes
export const globallyDisabledDates: string[] = [
  // Example: "2026-01-26", // New Year holiday
  // Example: "2026-12-25", // Christmas
];

// Dates disabled for specific routes
// Format: "origin-destination" or "destination-origin"
// RouteDetailsPage uses "Istanbul-Chișinău"; BookingWidget uses "istanbul-chisinau"
export const routeSpecificDisabledDates: Record<string, string[]> = {
  // Chișinău → Istanbul / Varna / Burgas (no plecare 12.04.2026)
  "Chișinău-Istanbul": ["2026-03-25", "2026-04-12", "2026-04-19"],
  "Chișinău-Varna": ["2026-03-25", "2026-04-12", "2026-04-19"],
  "Chișinău-Burgas": ["2026-03-25", "2026-04-12", "2026-04-19"],
  "chisinau-istanbul": ["2026-03-25", "2026-04-12", "2026-04-19"],
  "chisinau-varna": ["2026-03-25", "2026-04-12", "2026-04-19"],
  "chisinau-burgas": ["2026-03-25", "2026-04-12", "2026-04-19"],
  // Istanbul / Varna / Burgas → Chișinău (no întoarcere 15.04.2026)
  "Istanbul-Chișinău": ["2026-03-25", "2026-04-15", "2026-04-22"],
  "Varna-Chișinău": ["2026-03-25", "2026-04-15", "2026-04-22"],
  "Burgas-Chișinău": ["2026-03-25", "2026-04-15", "2026-04-22"],
  "istanbul-chisinau": ["2026-03-25", "2026-04-15", "2026-04-22"],
  "varna-chisinau": ["2026-03-25", "2026-04-15", "2026-04-22"],
  "burgas-chisinau": ["2026-03-25", "2026-04-15", "2026-04-22"],
};

function toLocalYyyyMmDd(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/**
 * Check if a date is disabled
 * @param date - The date to check
 * @param routeKey - Optional route identifier (e.g., "Chișinău-Istanbul")
 * @returns true if the date is disabled
 */
export function isDateDisabled(date: Date, routeKey?: string): boolean {
  // Normalize date to YYYY-MM-DD format
  const dateStr = toLocalYyyyMmDd(date);
  
  // Check global disabled dates
  if (globallyDisabledDates.includes(dateStr)) {
    return true;
  }
  
  // Check route-specific disabled dates
  if (routeKey && routeSpecificDisabledDates[routeKey]) {
    if (routeSpecificDisabledDates[routeKey].includes(dateStr)) {
      return true;
    }
  }
  
  return false;
}

/**
 * Add a disabled date (for programmatic use)
 */
export function addDisabledDate(date: Date, routeKey?: string): void {
  const dateStr = toLocalYyyyMmDd(date);
  
  if (routeKey) {
    if (!routeSpecificDisabledDates[routeKey]) {
      routeSpecificDisabledDates[routeKey] = [];
    }
    if (!routeSpecificDisabledDates[routeKey].includes(dateStr)) {
      routeSpecificDisabledDates[routeKey].push(dateStr);
    }
  } else {
    if (!globallyDisabledDates.includes(dateStr)) {
      globallyDisabledDates.push(dateStr);
    }
  }
}

/**
 * Remove a disabled date (for programmatic use)
 */
export function removeDisabledDate(date: Date, routeKey?: string): void {
  const dateStr = toLocalYyyyMmDd(date);
  
  if (routeKey && routeSpecificDisabledDates[routeKey]) {
    routeSpecificDisabledDates[routeKey] = routeSpecificDisabledDates[routeKey].filter(d => d !== dateStr);
  } else {
    const index = globallyDisabledDates.indexOf(dateStr);
    if (index > -1) {
      globallyDisabledDates.splice(index, 1);
    }
  }
}
