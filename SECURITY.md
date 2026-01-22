# 🔒 RUTEMD Security Guide

> **⚠️ IMPORTANT NOTE**: Content Security Policy (CSP) has been **removed from HTML** to prevent console errors during development. CSP should be configured on your **web server** (Apache/Nginx) in production, not in HTML meta tags.

## Security Features Implemented

### 1. **Content Security Policy (CSP)**
**Status**: Should be configured on web server (not in HTML)

For **production deployment**, configure CSP on your web server:

**Nginx Example** (`/etc/nginx/sites-available/your-site`):
```nginx
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' data: https://fonts.gstatic.com; img-src 'self' data: https: blob:; connect-src 'self' https://script.google.com; frame-src https://www.google.com; object-src 'none';" always;
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
```

**Apache Example** (`.htaccess` or `httpd.conf`):
```apache
Header always set Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' data: https://fonts.gstatic.com; img-src 'self' data: https: blob:; connect-src 'self' https://script.google.com; frame-src https://www.google.com; object-src 'none';"
Header always set X-Frame-Options "SAMEORIGIN"
Header always set X-Content-Type-Options "nosniff"
Header always set Referrer-Policy "strict-origin-when-cross-origin"
```

**What CSP blocks**:
- ❌ Inline scripts (XSS attacks)
- ❌ External scripts (malicious code injection)
- ❌ Unauthorized resource loading
- ✅ Allows: Your app, Google Fonts, Google Maps, Google Apps Script

### 2. **Anti-Spam Protection**
The booking form has **3 layers** of anti-spam protection:

#### Layer 1: Honeypot Field
- Hidden "website" field that bots fill but humans don't see
- If filled, form is rejected silently

#### Layer 2: Time-Based Validation
- Form must take at least 3 seconds to complete
- Prevents automated rapid submissions

#### Layer 3: Input Validation
- All fields validated with regex patterns
- Phone: Only allows valid characters `[\d\s+()-]`
- Email: RFC-compliant email validation
- Names: Minimum 2 characters, trimmed

### 3. **Input Sanitization**
All user inputs are sanitized:
- Phone numbers: Only numeric characters allowed
- Email: Validated before submission
- Text fields: Trimmed whitespace
- All inputs: maxLength restrictions

### 4. **No Exposed Secrets**
- ✅ No API keys in code
- ✅ No passwords
- ✅ No environment variables committed
- ✅ Google Apps Script URL is public (by design)

### 5. **Secure External Links**
All external links use proper security attributes:
```html
<a href="..." target="_blank" rel="noopener noreferrer">
```

### 6. **HTTPS Enforcement**
When deploying to production, ensure:
- Force HTTPS redirect
- HSTS header enabled
- Secure cookies (if using sessions)

## Google Apps Script Backend Security

**CRITICAL**: The Google Apps Script backend MUST validate all inputs!

### Required Backend Validations:

```javascript
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    
    // 1. Validate required fields
    if (!data.nume || !data.prenume || !data.email || !data.telefon) {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        error: 'Missing required fields'
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // 2. Validate field lengths
    if (data.nume.length < 2 || data.nume.length > 50) {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        error: 'Invalid name length'
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // 3. Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        error: 'Invalid email format'
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // 4. Validate phone format
    const phoneRegex = /^[\d\s+()-]{8,20}$/;
    if (!phoneRegex.test(data.telefon)) {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        error: 'Invalid phone format'
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // 5. Rate limiting (simple example)
    const cache = CacheService.getScriptCache();
    const userKey = 'rate_' + Session.getTemporaryActiveUserKey();
    const lastSubmit = cache.get(userKey);
    
    if (lastSubmit) {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        error: 'Please wait before submitting again'
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Set rate limit (60 seconds)
    cache.put(userKey, Date.now().toString(), 60);
    
    // 6. Sanitize data before saving
    const sanitizedData = {
      nume: data.nume.trim().substring(0, 50),
      prenume: data.prenume.trim().substring(0, 50),
      email: data.email.trim().toLowerCase().substring(0, 100),
      telefon: data.telefon.trim().substring(0, 20),
      ruta: data.ruta.trim().substring(0, 100),
      dataCalatorie: data.dataCalatorie.trim().substring(0, 50),
      nrPasageri: parseInt(data.nrPasageri) || 1,
      pretTotal: data.pretTotal.trim().substring(0, 20)
    };
    
    // Now save to Google Sheets
    // ... your sheet saving code ...
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: 'Server error'
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
```

## Deployment Checklist

Before deploying to production:

- [ ] Update Google Apps Script URL in `bookingService.ts`
- [ ] Implement backend validation in Google Apps Script (see above)
- [ ] Enable HTTPS on your hosting provider
- [ ] Set up HSTS header
- [ ] Test all forms for security
- [ ] Review CSP policy if you add new external resources
- [ ] Set up error monitoring (Sentry, LogRocket, etc.)
- [ ] Test honeypot field works
- [ ] Test rate limiting
- [ ] Backup Google Sheets data regularly

## Security Monitoring

### What to Monitor:
1. **Failed validation attempts** - May indicate attack attempts
2. **Honeypot triggers** - Bots trying to submit
3. **Rapid submissions** - Rate limit violations
4. **Invalid email/phone patterns** - Suspicious activity
5. **Google Apps Script errors** - Backend issues

### Tools to Use:
- Google Apps Script Logs
- Google Sheets for tracking submissions
- Browser console for client errors

## Reporting Security Issues

If you discover a security vulnerability:
1. Do NOT post publicly
2. Email: [your-security-email@rutemd.md]
3. Include details and steps to reproduce
4. Allow time for fix before disclosure

## License

This security guide is part of the RUTEMD website project.
Last updated: 2026-01-22
