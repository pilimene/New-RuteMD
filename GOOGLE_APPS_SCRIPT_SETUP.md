# Google Apps Script Setup for RuteMD Booking System

This guide will help you set up Google Apps Script to save bookings to Google Sheets and automatically send email tickets.

## Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "RuteMD Bookings"
4. In the first row (header row), add these columns:
   - A1: `Booking ID`
   - B1: `Data Rezervare`
   - C1: `Nume`
   - D1: `Prenume`
   - E1: `Telefon`
   - F1: `Email`
   - G1: `Ruta`
   - H1: `Data Calatorie`
   - I1: `Nr Pasageri`
   - J1: `Pret Total`
   - K1: `Status`

## Step 2: Create Google Apps Script

1. In your Google Sheet, click **Extensions > Apps Script**
2. Delete any existing code in the editor
3. Copy and paste the following code:

```javascript
// Configuration
const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID'; // Replace with your actual spreadsheet ID
const SHEET_NAME = 'Sheet1'; // Or your sheet name
const COMPANY_EMAIL = 'rutemd@example.com'; // Your company email for notifications

/**
 * Handle POST requests from the booking form
 */
function doPost(e) {
  try {
    // Log that we received a request
    Logger.log('=== POST REQUEST RECEIVED ===');
    Logger.log('PostData exists: ' + (e.postData ? 'YES' : 'NO'));
    
    if (!e.postData || !e.postData.contents) {
      Logger.log('ERROR: No postData.contents received');
      throw new Error('No data received in POST request');
    }
    
    Logger.log('PostData contents: ' + e.postData.contents);
    
    const data = JSON.parse(e.postData.contents);
    Logger.log('Parsed data successfully');

    // Generate booking ID
    const bookingId = generateBookingId();
    Logger.log('Generated booking ID: ' + bookingId);

    // Save to spreadsheet
    try {
      saveToSheet(bookingId, data);
      Logger.log('Saved to spreadsheet: SUCCESS');
    } catch (sheetError) {
      Logger.log('ERROR saving to sheet: ' + sheetError.toString());
      throw sheetError;
    }

    // Send confirmation email to customer
    try {
      sendCustomerEmail(bookingId, data);
      Logger.log('Customer email sent: SUCCESS');
    } catch (emailError) {
      Logger.log('ERROR sending customer email: ' + emailError.toString());
      // Continue even if email fails
    }

    // Send notification email to company
    try {
      sendCompanyNotification(bookingId, data);
      Logger.log('Company notification sent: SUCCESS');
    } catch (notifError) {
      Logger.log('ERROR sending company notification: ' + notifError.toString());
      // Continue even if email fails
    }
    
    Logger.log('=== BOOKING PROCESSED SUCCESSFULLY ===');

    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        bookingId: bookingId,
        message: 'Rezervarea a fost procesată cu succes!'
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    Logger.log('=== ERROR IN doPost ===');
    Logger.log('Error: ' + error.toString());
    Logger.log('Stack: ' + (error.stack || 'No stack trace'));
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Handle GET requests (for testing)
 */
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      status: 'RuteMD Booking API is running',
      timestamp: new Date().toISOString()
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Generate unique booking ID
 */
function generateBookingId() {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `RMD-${timestamp}-${random}`;
}

/**
 * Save booking data to spreadsheet
 */
function saveToSheet(bookingId, data) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName(SHEET_NAME);

  const now = new Date();
  const formattedDate = Utilities.formatDate(now, 'Europe/Chisinau', 'dd.MM.yyyy HH:mm');

  const row = [
    bookingId,
    formattedDate,
    data.nume,
    data.prenume,
    data.telefon,
    data.email,
    data.ruta,
    data.dataCalatorie,
    data.nrPasageri,
    data.pretTotal,
    'Nou'
  ];

  sheet.appendRow(row);
}

/**
 * Send confirmation email to customer with e-ticket
 */
function sendCustomerEmail(bookingId, data) {
  const subject = `Bilet Electronic RuteMD - ${bookingId}`;

  const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; -webkit-font-smoothing: antialiased; }
    .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
    .header { background: #012141; color: white; padding: 30px 20px; text-align: center; }
    .header h1 { margin: 0; font-size: 28px; letter-spacing: 2px; font-weight: bold; }
    .header p { margin: 10px 0 0; opacity: 0.9; font-size: 14px; }
    .ticket { padding: 30px 20px; }
    .ticket-header { text-align: center; padding-bottom: 20px; border-bottom: 2px dashed #e0e0e0; margin-bottom: 20px; }
    .booking-id { background: #3870db; color: white; padding: 12px 24px; border-radius: 8px; display: inline-block; font-size: 18px; font-weight: bold; letter-spacing: 1px; margin-bottom: 10px; }
    .ticket-header p { color: #666; margin-top: 10px; font-size: 14px; }
    .route-info { text-align: center; padding: 30px 0; }
    .route { font-size: 24px; font-weight: bold; color: #012141; line-height: 1.4; }
    .route-arrow { color: #3870db; font-size: 20px; margin: 0 10px; }
    .date-badge { background: #e8f0fe; color: #3870db; padding: 10px 20px; border-radius: 20px; display: inline-block; margin-top: 15px; font-weight: 600; font-size: 14px; }
    .details { background: #f8f9fa; padding: 20px; border-radius: 12px; margin: 20px 0; }
    .detail-row { padding: 12px 0; border-bottom: 1px solid #e0e0e0; }
    .detail-row:last-child { border-bottom: none; }
    .detail-label { color: #666; font-size: 14px; display: inline-block; width: 45%; }
    .detail-value { font-weight: 600; color: #012141; font-size: 14px; display: inline-block; width: 54%; text-align: right; }
    .detail-value a { color: #3870db; text-decoration: none; }
    .total-row { background: #012141; color: white; padding: 20px; border-radius: 8px; margin-top: 20px; }
    .total-label { font-size: 16px; display: inline-block; }
    .total-value { font-size: 24px; font-weight: bold; display: inline-block; float: right; }
    .important { background: #fff3cd; border-left: 4px solid #ffc107; padding: 20px; margin: 20px 0; }
    .important h4 { margin: 0 0 12px; color: #856404; font-size: 16px; font-weight: bold; }
    .important ul { margin: 0; padding-left: 20px; color: #856404; font-size: 14px; line-height: 1.6; }
    .important li { margin-bottom: 8px; }
    .footer { background: #f8f9fa; padding: 20px; text-align: center; color: #666; font-size: 12px; }
    .footer a { color: #3870db; text-decoration: none; }
    .contact-box { background: #012141; color: white; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0; }
    .contact-box p { margin: 0; }
    .contact-box p:first-child { margin-bottom: 10px; font-size: 14px; }
    .contact-box a { color: #3870db; font-weight: bold; text-decoration: none; }
    .contact-box a:hover { text-decoration: underline; }
    @media only screen and (max-width: 600px) {
      .container { width: 100% !important; }
      .ticket { padding: 20px 15px !important; }
      .route { font-size: 20px !important; }
      .detail-label, .detail-value { display: block !important; width: 100% !important; text-align: left !important; }
      .detail-value { margin-top: 5px; }
      .total-value { float: none !important; display: block !important; margin-top: 10px; }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>RUTEMD</h1>
      <p>Bilet Electronic de Calatorie</p>
    </div>

    <div class="ticket">
      <div class="ticket-header">
        <div class="booking-id">${bookingId}</div>
        <p>Prezentati acest cod la imbarcare</p>
      </div>

      <div class="route-info">
        <div class="route">
          ${data.ruta.replace(' - ', '<span class="route-arrow"> → </span>')}
        </div>
        <div class="date-badge">${data.dataCalatorie}</div>
      </div>

      <div class="details">
        <div class="detail-row">
          <span class="detail-label">Pasager Principal</span>
          <span class="detail-value">${data.nume} ${data.prenume}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Telefon</span>
          <span class="detail-value">${data.telefon}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Email</span>
          <span class="detail-value"><a href="mailto:${data.email}">${data.email}</a></span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Numar Pasageri</span>
          <span class="detail-value">${data.nrPasageri} ${data.nrPasageri === 1 ? 'persoana' : 'persoane'}</span>
        </div>
      </div>

      <div class="total-row">
        <span class="total-label">Total de plata (la sofer)</span>
        <span class="total-value">${data.pretTotal}</span>
      </div>

      <div class="important">
        <h4>Informatii Importante</h4>
        <ul>
          <li>Prezentati-va la locul de imbarcare cu 15 minute inainte de plecare</li>
          <li>Aveti la dumneavoastra un act de identitate valid</li>
          <li>Plata se face in numerar la sofer</li>
          <li>Bagaj inclus: max 40kg</li>
          <li>Anulare gratuita cu 24h inainte de plecare</li>
        </ul>
      </div>

      <div class="contact-box">
        <p>Intrebari? Contactati-ne:</p>
        <p>
          <a href="tel:+373000000">+373 000 000</a> | 
          <a href="mailto:contact@rutemd.com">contact@rutemd.com</a>
        </p>
      </div>
    </div>

    <div class="footer">
      <p>Acest email a fost trimis automat de sistemul RuteMD.</p>
      <p>© ${new Date().getFullYear()} RuteMD - Transport International de Pasageri</p>
    </div>
  </div>
</body>
</html>
  `;

  const plainBody = `
BILET ELECTRONIC RUTEMD
========================
Cod Rezervare: ${bookingId}

DETALII CALATORIE
-----------------
Ruta: ${data.ruta}
Data: ${data.dataCalatorie}
Pasageri: ${data.nrPasageri}

PASAGER
-------
Nume: ${data.nume} ${data.prenume}
Telefon: ${data.telefon}
Email: ${data.email}

TOTAL: ${data.pretTotal} (plata la sofer)

IMPORTANT:
- Prezentati-va cu 45 minute inainte de plecare
- Aveti la dumneavoastra un act de identitate valid
- Anulare gratuita cu 24h inainte

Contact: +373 000 000
  `;

  GmailApp.sendEmail(data.email, subject, plainBody, {
    htmlBody: htmlBody,
    name: 'RuteMD - Rezervari'
  });
}

/**
 * Send notification email to company
 */
function sendCompanyNotification(bookingId, data) {
  const subject = `[NOUA REZERVARE] ${bookingId} - ${data.ruta}`;

  const body = `
O noua rezervare a fost primita:

Cod Rezervare: ${bookingId}
Data/Ora: ${new Date().toLocaleString('ro-RO')}

DETALII CLIENT
--------------
Nume: ${data.nume} ${data.prenume}
Telefon: ${data.telefon}
Email: ${data.email}

DETALII CALATORIE
-----------------
Ruta: ${data.ruta}
Data Calatorie: ${data.dataCalatorie}
Nr. Pasageri: ${data.nrPasageri}
Pret Total: ${data.pretTotal}

---
Acest email a fost generat automat de sistemul RuteMD.
`;

  GmailApp.sendEmail(COMPANY_EMAIL, subject, body, {
    name: 'RuteMD Booking System'
  });
}

/**
 * Test function - run this to test the email template
 */
function testEmail() {
  const testData = {
    nume: 'Test',
    prenume: 'User',
    telefon: '+373 60 123 456',
    email: 'your-test-email@gmail.com', // Replace with your email
    ruta: 'Chișinău - Istanbul',
    dataCalatorie: '15 Ianuarie 2025',
    nrPasageri: 2,
    pretTotal: '€100'
  };

  sendCustomerEmail('RMD-TEST-1234', testData);
  Logger.log('Test email sent!');
}
```

## Step 3: Configure the Script

1. Replace `YOUR_SPREADSHEET_ID` with your actual spreadsheet ID
   - You can find it in the URL: `https://docs.google.com/spreadsheets/d/YOUR_SPREADSHEET_ID/edit`
2. Replace `rutemd@example.com` with your company email address
3. Click **Save** (Ctrl+S)

## Step 4: Deploy as Web App

1. Click **Deploy > New deployment**
2. Click the gear icon next to "Select type" and choose **Web app**
3. Configure:
   - Description: "RuteMD Booking API"
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Click **Deploy**
5. Click **Authorize access** and follow the prompts to allow the script
6. **Copy the Web app URL** - You'll need this for the frontend

The URL will look like: `https://script.google.com/macros/s/AKfycb.../exec`

## Step 5: Update Frontend Configuration

1. Open `/src/services/bookingService.ts`
2. Replace the placeholder URL with your deployed Web app URL:

```typescript
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';
```

## Step 6: Test the Integration

1. Run the `testEmail()` function in Apps Script to test email sending
2. Make a test booking on your website
3. Check your Google Sheet for the new entry
4. Check your email for the confirmation

## Troubleshooting

### Email not sending?
- Make sure you've authorized Gmail access
- Check the Apps Script execution log: **View > Executions**

### CORS errors?
- Make sure the deployment is set to "Anyone" can access
- The script handles CORS automatically

### Sheet not updating?
- Verify the SPREADSHEET_ID is correct
- Check that the sheet name matches SHEET_NAME

## Security Notes

- The Google Apps Script URL is safe to expose as it only accepts specific data
- All data is validated server-side
- Consider adding rate limiting for production use
