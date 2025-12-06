// Booking Service for RuteMD
// This service communicates with Google Apps Script to save bookings and send emails

// IMPORTANT: Replace this URL with your deployed Google Apps Script Web App URL
// See GOOGLE_APPS_SCRIPT_SETUP.md for instructions
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID_HERE/exec';

export interface BookingData {
  nume: string;
  prenume: string;
  telefon: string;
  email: string;
  ruta: string;
  dataCalatorie: string;
  nrPasageri: number;
  pretTotal: string;
}

export interface BookingResponse {
  success: boolean;
  bookingId?: string;
  message?: string;
  error?: string;
}

/**
 * Submit a booking to Google Sheets and trigger email confirmation
 */
export async function submitBooking(data: BookingData): Promise<BookingResponse> {
  try {
    // Check if the Google Script URL has been configured
    if (GOOGLE_SCRIPT_URL.includes('YOUR_SCRIPT_ID_HERE')) {
      // Development mode - simulate successful booking
      console.warn('⚠️ Google Apps Script URL not configured. Running in demo mode.');

      const demoBookingId = `DEMO-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      return {
        success: true,
        bookingId: demoBookingId,
        message: 'Rezervarea a fost procesată cu succes! (Demo Mode)'
      };
    }

    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors', // Google Apps Script requires no-cors
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    // Due to no-cors mode, we can't read the response directly
    // We'll assume success if no error was thrown
    // For a more robust solution, you could use a different approach

    // Generate a local booking ID for display purposes
    const bookingId = `RMD-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    return {
      success: true,
      bookingId: bookingId,
      message: 'Rezervarea a fost procesată cu succes!'
    };

  } catch (error) {
    console.error('Booking submission error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'A apărut o eroare. Vă rugăm încercați din nou.'
    };
  }
}

/**
 * Validate booking data before submission
 */
export function validateBookingData(data: Partial<BookingData>): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!data.nume?.trim()) {
    errors.push('Numele este obligatoriu');
  }

  if (!data.prenume?.trim()) {
    errors.push('Prenumele este obligatoriu');
  }

  if (!data.telefon?.trim()) {
    errors.push('Numărul de telefon este obligatoriu');
  } else if (!/^[\d\s+()-]{8,}$/.test(data.telefon)) {
    errors.push('Numărul de telefon nu este valid');
  }

  if (!data.email?.trim()) {
    errors.push('Adresa de email este obligatorie');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push('Adresa de email nu este validă');
  }

  if (!data.dataCalatorie) {
    errors.push('Data călătoriei este obligatorie');
  }

  if (!data.nrPasageri || data.nrPasageri < 1) {
    errors.push('Numărul de pasageri este obligatoriu');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Format phone number for display
 */
export function formatPhoneNumber(phone: string): string {
  // Remove all non-numeric characters except +
  const cleaned = phone.replace(/[^\d+]/g, '');

  // Add Moldova country code if not present
  if (!cleaned.startsWith('+') && !cleaned.startsWith('0')) {
    return '+373 ' + cleaned;
  }

  return cleaned;
}

/**
 * Calculate available dates for a route based on departure day
 */
export function getAvailableDates(departureDay: string, monthsAhead: number = 3): Date[] {
  const dayMap: Record<string, number> = {
    'Duminică': 0,
    'Luni': 1,
    'Marți': 2,
    'Miercuri': 3,
    'Joi': 4,
    'Vineri': 5,
    'Sâmbătă': 6,
  };

  const targetDay = dayMap[departureDay];
  if (targetDay === undefined) return [];

  const dates: Date[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const endDate = new Date(today);
  endDate.setMonth(endDate.getMonth() + monthsAhead);

  // Start from tomorrow
  const currentDate = new Date(today);
  currentDate.setDate(currentDate.getDate() + 1);

  while (currentDate <= endDate) {
    if (currentDate.getDay() === targetDay) {
      dates.push(new Date(currentDate));
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
}

/**
 * Check if a date is available for booking
 */
export function isDateAvailable(date: Date, departureDay: string): boolean {
  const dayMap: Record<string, number> = {
    'Duminică': 0,
    'Luni': 1,
    'Marți': 2,
    'Miercuri': 3,
    'Joi': 4,
    'Vineri': 5,
    'Sâmbătă': 6,
  };

  const targetDay = dayMap[departureDay];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Must be in the future and on the correct day
  return date > today && date.getDay() === targetDay;
}
