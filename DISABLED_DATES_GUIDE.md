# How to Close/Disable Dates for Reservations

## Simple Method

To close reservations for specific dates (when full, holidays, maintenance, etc.), simply edit the file:

**`src/data/disabledDates.ts`**

## Examples

### Close a date for ALL routes (global)

```typescript
export const globallyDisabledDates: string[] = [
  "2026-01-26", // New Year holiday - closed for all routes
  "2026-12-25", // Christmas - closed for all routes
];
```

### Close a date for a SPECIFIC route

```typescript
export const routeSpecificDisabledDates: Record<string, string[]> = {
  "Chișinău-Istanbul": [
    "2026-01-26", // Full on this date
    "2026-02-02", // Maintenance day
  ],
  "Istanbul-Chișinău": [
    "2026-01-29", // Full on return route
  ],
};
```

## Date Format

- Use format: `"YYYY-MM-DD"` (e.g., `"2026-01-26"`)
- Always use quotes around the date string

## Route Key Format

For route-specific dates, use the format: `"Origin-Destination"`

Examples:
- `"Chișinău-Istanbul"` - for Chișinău → Istanbul
- `"Istanbul-Chișinău"` - for Istanbul → Chișinău (reverse)
- `"Chișinău-Varna"` - for Chișinău → Varna

## Quick Steps

1. Open `src/data/disabledDates.ts`
2. Add dates to `globallyDisabledDates` (affects all routes) or `routeSpecificDisabledDates` (affects specific route)
3. Save the file
4. The dates will be automatically disabled in the booking calendar

## Notes

- Dates are automatically checked when users try to book
- Disabled dates appear grayed out in the calendar
- Users cannot select disabled dates
- Changes take effect immediately (no restart needed in development)

## Advanced: Programmatic Control

You can also programmatically add/remove disabled dates using the helper functions:

```typescript
import { addDisabledDate, removeDisabledDate } from '../data/disabledDates';

// Add a disabled date
addDisabledDate(new Date('2026-01-26'), 'Chișinău-Istanbul');

// Remove a disabled date
removeDisabledDate(new Date('2026-01-26'), 'Chișinău-Istanbul');
```
