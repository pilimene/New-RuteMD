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
export const routeSpecificDisabledDates: Record<string, string[]> = {
  // Example: "Chișinău-Istanbul": ["2026-01-26", "2026-02-02"],
  // Example: "Istanbul-Chișinău": ["2026-01-29"],
};

/**
 * Check if a date is disabled
 * @param date - The date to check
 * @param routeKey - Optional route identifier (e.g., "Chișinău-Istanbul")
 * @returns true if the date is disabled
 */
export function isDateDisabled(date: Date, routeKey?: string): boolean {
  // Normalize date to YYYY-MM-DD format
  const dateStr = date.toISOString().split('T')[0];
  
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
  const dateStr = date.toISOString().split('T')[0];
  
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
  const dateStr = date.toISOString().split('T')[0];
  
  if (routeKey && routeSpecificDisabledDates[routeKey]) {
    routeSpecificDisabledDates[routeKey] = routeSpecificDisabledDates[routeKey].filter(d => d !== dateStr);
  } else {
    const index = globallyDisabledDates.indexOf(dateStr);
    if (index > -1) {
      globallyDisabledDates.splice(index, 1);
    }
  }
}
