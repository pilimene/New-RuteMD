import { useState } from 'react';
import { Check, ChevronRight, MapPin, User, Phone, Mail, Bus, Users, Loader2, AlertCircle, Calendar as CalendarIcon, Copy, CheckCircle2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { Calendar } from './ui/calendar';
import { format } from 'date-fns';
import { ro, ru } from 'date-fns/locale';
import { cn } from '../lib/utils';
import { submitBooking, isDateAvailable, type BookingData } from '../services/bookingService';
import type { Route } from '../data/routes';
import { useTranslation } from '../i18n';

interface BookingFormProps {
  route: Route;
  isReverse?: boolean;
  onClose?: () => void;
}

interface FormData {
  nume: string;
  prenume: string;
  telefon: string;
  email: string;
  website?: string; // Honeypot field
}

export function BookingForm({ route, isReverse = false, onClose }: BookingFormProps) {
  const { t, language } = useTranslation();
  const dateLocale = language === 'ru' ? ru : ro;
  
  const [step, setStep] = useState(1);
  const [date, setDate] = useState<Date>();
  const [passengers, setPassengers] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    nume: '',
    prenume: '',
    telefon: '+373 ',
    email: '',
    website: '', // Honeypot field
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingResult, setBookingResult] = useState<{ success: boolean; bookingId?: string; error?: string } | null>(null);
  const [copied, setCopied] = useState(false);
  const [formStartTime] = useState(Date.now());

  const origin = isReverse ? route.destination : route.origin;
  const destination = isReverse ? route.origin : route.destination;
  const departureDayRaw = isReverse ? route.returnDay : route.departureDay;
  const departureTime = isReverse ? route.returnStops[0].time : route.stops[0].time;
  
  // Translate day name for display only (keep original for date checking)
  const dayMap: Record<string, keyof typeof t.days> = {
    'Duminică': 'sunday',
    'Miercuri': 'wednesday',
    'Воскресенье': 'sunday',
    'Среда': 'wednesday',
  };
  const departureDayDisplay = dayMap[departureDayRaw] ? t.days[dayMap[departureDayRaw]] : departureDayRaw;

  const total = passengers * route.price;
  const totalFormatted = `${route.currency}${total}`;

  // Determine which dates are available based on departure day
  // Use original day name (not translated) for date checking
  const routeKey = `${origin}-${destination}`;
  
  // Extract time from departure time string (e.g., "10:00" from "10:00" or "10:00 (+1 zi)")
  const extractTime = (timeStr: string): string | undefined => {
    const match = timeStr.match(/(\d{1,2}):(\d{2})/);
    return match ? `${match[1].padStart(2, '0')}:${match[2]}` : undefined;
  };
  
  const departureTimeOnly = extractTime(departureTime);
  
  // Booking closes 2 hours before departure (no same-day bookings allowed)
  const bookingCutoffHours = 2;
  
  const isDateDisabled = (day: Date) => {
    return !isDateAvailable(day, departureDayRaw, routeKey, departureTimeOnly, bookingCutoffHours);
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    // Special handling for phone number - only allow valid characters
    if (field === 'telefon') {
      // Only allow numbers, spaces, +, -, (, )
      const cleanValue = value.replace(/[^\d\s+()-]/g, '');
      setFormData(prev => ({ ...prev, [field]: cleanValue }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
    setErrors([]); // Clear errors on input
  };

  const validateStep = (currentStep: number): boolean => {
    const newErrors: string[] = [];

    if (currentStep === 1) {
      if (!date) {
        newErrors.push(t.bookingForm.errorSelectDate);
      }
    }

    if (currentStep === 2) {
      // Check honeypot field (should be empty)
      if (formData.website && formData.website.trim() !== '') {
        newErrors.push(t.bookingForm.errorValidation);
        setErrors(newErrors);
        return false;
      }

      if (!formData.nume.trim()) {
        newErrors.push(t.bookingForm.errorNameRequired);
      } else if (formData.nume.trim().length < 2) {
        newErrors.push(t.bookingForm.errorNameMinLength);
      }
      
      if (!formData.prenume.trim()) {
        newErrors.push(t.bookingForm.errorSurnameRequired);
      } else if (formData.prenume.trim().length < 2) {
        newErrors.push(t.bookingForm.errorSurnameMinLength);
      }
      
      if (!formData.telefon.trim()) {
        newErrors.push(t.bookingForm.errorPhoneRequired);
      } else {
        // Improved phone validation for Moldova/International numbers
        const phoneRegex = /^(\+373|373|0)?[67]\d{7}$|^\+?[1-9]\d{7,14}$/;
        const cleanPhone = formData.telefon.replace(/[\s()-]/g, '');
        if (!phoneRegex.test(cleanPhone)) {
          newErrors.push(t.bookingForm.errorPhoneInvalid);
        }
      }
      
      if (!formData.email.trim()) {
        newErrors.push(t.bookingForm.errorEmailRequired);
      } else {
        // Improved email validation
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(formData.email)) {
          newErrors.push(t.bookingForm.errorEmailInvalid);
        }
      }
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
    setErrors([]);
  };

  const handleSubmit = async () => {
    if (!validateStep(2)) return;

    // Anti-spam: Check if form was filled too quickly (less than 3 seconds)
    const timeTaken = Date.now() - formStartTime;
    if (timeTaken < 3000) {
      setErrors([t.bookingForm.errorFormTooFast]);
      return;
    }

    // Anti-spam: Check honeypot field
    if (formData.website && formData.website.trim() !== '') {
      setErrors([t.bookingForm.errorValidation]);
      return;
    }

    setIsSubmitting(true);
    setErrors([]);

    const bookingData: BookingData = {
      nume: formData.nume.trim(),
      prenume: formData.prenume.trim(),
      telefon: formData.telefon.trim(),
      email: formData.email.trim(),
      ruta: `${origin} - ${destination}`,
      dataCalatorie: date ? format(date, 'dd MMMM yyyy', { locale: dateLocale }) : '',
      nrPasageri: passengers,
      pretTotal: totalFormatted,
    };

    try {
      const result = await submitBooking(bookingData);
      setBookingResult(result);

      if (result.success) {
        // Track Google Analytics 4 booking event (gtag or dataLayer fallback if script not loaded yet)
        if (typeof window !== 'undefined') {
          const currency = route.currency === 'MDL' ? 'MDL' : 'EUR';
          const bookingEventParams = {
            currency,
            value: total,
            booking_id: result.bookingId,
            route: `${origin} - ${destination}`,
            route_id: route.id,
            passengers,
            departure_date: date ? format(date, 'yyyy-MM-dd') : '',
            departure_day: departureDayDisplay,
            departure_time: departureTime,
            origin,
            destination,
          };
          const leadEventParams = {
            currency,
            value: total,
            transaction_id: result.bookingId,
          };

          if (window.gtag) {
            window.gtag('event', 'booking_completed', bookingEventParams);
            window.gtag('event', 'generate_lead', leadEventParams);
          } else {
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({ event: 'booking_completed', ...bookingEventParams });
            window.dataLayer.push({ event: 'generate_lead', ...leadEventParams });
          }
        }

        setStep(4); // Success step
      } else {
        setErrors([result.error || t.bookingForm.errorGeneric]);
      }
    } catch {
      setErrors([t.bookingForm.errorConnection]);
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyBookingId = () => {
    if (bookingResult?.bookingId) {
      navigator.clipboard.writeText(bookingResult.bookingId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl overflow-hidden flex flex-col max-h-[90vh]">
      {/* Header */}
      <div className="bg-[#012141] p-6 text-white shrink-0">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">{t.bookingForm.title}</h2>
            <p className="text-blue-200 text-sm flex items-center gap-2 mt-1">
              <MapPin className="w-3 h-3" />
              {origin} → {destination}
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{route.currency}{route.price}</div>
            <div className="text-blue-200 text-xs">{t.bookingForm.perPerson}</div>
          </div>
        </div>

        {/* Progress Steps */}
        {step < 4 && (
          <>
            <div className="flex items-center gap-2">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className={cn(
                      "h-full bg-[#3870db] transition-all duration-500",
                      s <= step ? 'w-full' : 'w-0'
                    )}
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-between text-xs text-blue-200 mt-2 font-medium">
              <span className={step >= 1 ? 'text-white' : ''}>{t.bookingForm.step1Label}</span>
              <span className={step >= 2 ? 'text-white' : ''}>{t.bookingForm.step2Label}</span>
              <span className={step >= 3 ? 'text-white' : ''}>{t.bookingForm.step3Label}</span>
            </div>
          </>
        )}
      </div>

      {/* Error Messages */}
      {errors.length > 0 && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 m-4 mb-0 rounded-r-lg">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <div>
              {errors.map((error, index) => (
                <p key={index} className="text-red-700 text-sm">{error}</p>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* Step 1: Date & Passengers Selection */}
        {step === 1 && (
          <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
            {/* Route Info Badge */}
            <div className="bg-blue-50 rounded-xl p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#3870db] flex items-center justify-center">
                <Bus className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-medium text-[#012141]">{t.bookingForm.departureEvery} {departureDayDisplay}</div>
                <div className="text-sm text-gray-500">{t.bookingForm.departureTime}: {departureTime} • {t.bookingForm.duration}: ~{route.duration}</div>
              </div>
            </div>

            {/* Date Selection */}
            <div className="space-y-3">
              <Label className="text-[#012141] font-medium flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 text-[#3870db]" />
                {t.bookingForm.selectDepartureDate}
              </Label>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={isDateDisabled}
                className="rounded-xl border border-gray-200 shadow-sm w-full flex justify-center bg-white"
                locale={dateLocale}
                classNames={{
                  day_selected: "bg-[#3870db] text-white hover:bg-[#3870db] hover:text-white focus:bg-[#3870db] focus:text-white",
                  day_today: "bg-blue-50 text-[#3870db] font-bold",
                  day_disabled: "text-gray-300 hover:bg-transparent",
                }}
              />
              {date && (
                <div className="bg-green-50 text-green-700 px-4 py-2 rounded-lg text-sm flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  {t.bookingForm.selected}: {format(date, 'EEEE, dd MMMM yyyy', { locale: dateLocale })}
                </div>
              )}
            </div>

            {/* Passenger Selection */}
            <div className="space-y-3">
              <Label className="text-[#012141] font-medium flex items-center gap-2">
                <Users className="w-4 h-4 text-[#3870db]" />
                {t.bookingForm.numberOfPassengers}
              </Label>
              <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setPassengers(Math.max(1, passengers - 1))}
                  className="w-12 h-12 rounded-xl border-gray-300 hover:bg-white hover:border-[#3870db] transition-all"
                  disabled={passengers <= 1}
                >
                  <span className="text-xl">−</span>
                </Button>
                <div className="flex-1 text-center">
                  <span className="text-3xl font-bold text-[#012141]">{passengers}</span>
                  <span className="text-gray-500 text-sm ml-2">{passengers === 1 ? t.bookingForm.person : t.bookingForm.persons}</span>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setPassengers(Math.min(10, passengers + 1))}
                  className="w-12 h-12 rounded-xl border-gray-300 hover:bg-white hover:border-[#3870db] transition-all"
                  disabled={passengers >= 10}
                >
                  <span className="text-xl">+</span>
                </Button>
              </div>
            </div>

            {/* Price Summary */}
            <div className="bg-[#012141] rounded-xl p-4 text-white">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-blue-200 text-sm">{t.bookingForm.totalPayment}</div>
                  <div className="text-xs text-blue-300 mt-1">
                    {passengers} × {route.currency}{route.price}
                  </div>
                  {route.priceEquivalent && (
                    <div className="text-xs text-blue-400 mt-1">
                      {route.priceEquivalent}
                    </div>
                  )}
                </div>
                <div className="text-3xl font-bold">{totalFormatted}</div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Personal Information */}
        {step === 2 && (
          <div className="space-y-5 animate-in slide-in-from-right-4 duration-300">
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 space-y-2">
              <p className="text-amber-800 text-sm">
                <strong>{t.bookingForm.important}:</strong> {t.bookingForm.importantNote}
              </p>
              <p className="text-amber-800 text-sm">
                <strong>{t.bookingForm.confirmationNote}</strong>
              </p>
            </div>

            <div className="grid gap-5">
              {/* Name */}
              <div className="space-y-2">
                <Label className="text-[#012141] font-medium">
                  {t.bookingForm.nameLabel} <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    className="pl-10 h-12 rounded-xl bg-gray-50 border-gray-200 focus:border-[#3870db] focus:ring-[#3870db]"
                    placeholder={t.bookingForm.namePlaceholder}
                    value={formData.nume}
                    onChange={(e) => handleInputChange('nume', e.target.value)}
                  />
                </div>
              </div>

              {/* Surname */}
              <div className="space-y-2">
                <Label className="text-[#012141] font-medium">
                  {t.bookingForm.surnameLabel} <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    className="pl-10 h-12 rounded-xl bg-gray-50 border-gray-200 focus:border-[#3870db] focus:ring-[#3870db]"
                    placeholder={t.bookingForm.surnamePlaceholder}
                    value={formData.prenume}
                    onChange={(e) => handleInputChange('prenume', e.target.value)}
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label className="text-[#012141] font-medium">
                  {t.bookingForm.phoneLabel} <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9\s\+\-\(\)]*"
                    className="pl-10 h-12 rounded-xl bg-gray-50 border-gray-200 focus:border-[#3870db] focus:ring-[#3870db]"
                    placeholder={t.bookingForm.phonePlaceholder}
                    value={formData.telefon}
                    onChange={(e) => handleInputChange('telefon', e.target.value)}
                    maxLength={20}
                  />
                </div>
                <p className="text-xs text-gray-500">{t.bookingForm.phoneFormat}</p>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label className="text-[#012141] font-medium">
                  {t.bookingForm.emailLabel} <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    type="email"
                    className="pl-10 h-12 rounded-xl bg-gray-50 border-gray-200 focus:border-[#3870db] focus:ring-[#3870db]"
                    placeholder={t.bookingForm.emailPlaceholder}
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                  />
                </div>
                <p className="text-xs text-gray-500">{t.bookingForm.emailNote}</p>
              </div>

              {/* Honeypot field - hidden from users, visible to bots */}
              <div className="absolute opacity-0 pointer-events-none" aria-hidden="true" tabIndex={-1}>
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  name="website"
                  type="text"
                  autoComplete="off"
                  value={formData.website || ''}
                  onChange={(e) => handleInputChange('website' as keyof FormData, e.target.value)}
                  tabIndex={-1}
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Review & Confirm */}
        {step === 3 && (
          <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
            <div className="text-center py-2">
              <h3 className="text-xl font-bold text-[#012141]">{t.bookingForm.reviewTitle}</h3>
              <p className="text-gray-500 text-sm mt-1">{t.bookingForm.reviewSubtitle}</p>
            </div>

            {/* Route Card */}
            <Card className="p-5 bg-gradient-to-br from-[#012141] to-[#1a3a5c] text-white rounded-xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-10 -mt-10"></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Bus className="w-5 h-5 text-blue-300" />
                    <span className="text-blue-200 text-sm font-medium">RUTEMD</span>
                  </div>
                  <div className="text-xs bg-white/10 px-2 py-1 rounded-full">{departureDayDisplay}</div>
                </div>
                <div className="text-2xl font-bold mb-2">
                  {origin} → {destination}
                </div>
                <div className="text-blue-200 text-sm">
                  {date ? format(date, 'EEEE, dd MMMM yyyy', { locale: dateLocale }) : ''} • {departureTime}
                </div>
              </div>
            </Card>

            {/* Booking Details */}
            <Card className="p-5 bg-gray-50 border-gray-100 space-y-4 rounded-xl">
              <h4 className="font-medium text-[#012141] flex items-center gap-2">
                <User className="w-4 h-4 text-[#3870db]" />
                {t.bookingForm.passengerData}
              </h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">{t.bookingForm.nameLabel}</span>
                  <p className="font-medium text-[#012141]">{formData.nume} {formData.prenume}</p>
                </div>
                <div>
                  <span className="text-gray-500">{t.bookingForm.passengers}</span>
                  <p className="font-medium text-[#012141]">{passengers} {passengers === 1 ? t.bookingForm.person : t.bookingForm.persons}</p>
                </div>
                <div>
                  <span className="text-gray-500">{t.bookingForm.phoneLabel}</span>
                  <p className="font-medium text-[#012141]">{formData.telefon}</p>
                </div>
                <div>
                  <span className="text-gray-500">{t.bookingForm.emailLabel}</span>
                  <p className="font-medium text-[#012141] break-all">{formData.email}</p>
                </div>
              </div>
            </Card>

            {/* Price Summary */}
            <Card className="p-5 border-2 border-[#3870db] bg-blue-50/50 rounded-xl">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-[#012141] font-medium">{t.bookingForm.totalPayment}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {passengers} {passengers > 1 ? t.bookingForm.ticketsPlural : t.bookingForm.tickets} × {route.currency}{route.price}
                  </div>
                  {route.priceEquivalent && (
                    <div className="text-xs text-gray-400 mt-1">
                      {route.priceEquivalent}
                    </div>
                  )}
                </div>
                <div className="text-3xl font-bold text-[#3870db]">{totalFormatted}</div>
              </div>
            </Card>

            {/* Payment Info */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center shrink-0">
                  <span className="text-amber-600">💵</span>
                </div>
                <div>
                  <p className="font-medium text-amber-800">{t.bookingForm.paymentAtDriver}</p>
                  <p className="text-amber-700 text-sm mt-1">
                    {t.bookingForm.paymentNote}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Success */}
        {step === 4 && bookingResult?.success && (
          <div className="space-y-6 animate-in zoom-in-95 fade-in duration-500 text-center py-4">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-14 h-14 text-green-500" />
            </div>

            <div>
              <h3 className="text-2xl font-bold text-[#012141]">{t.bookingForm.bookingConfirmed}</h3>
              <p className="text-gray-500 mt-2">
                {t.bookingForm.ticketSent}<br />
                <strong className="text-[#012141]">{formData.email}</strong>
              </p>
            </div>

            {/* Booking ID Card */}
            <Card className="p-5 bg-[#012141] text-white rounded-xl">
              <div className="text-blue-200 text-sm mb-2">{t.bookingForm.bookingCode}</div>
              <div className="flex items-center justify-center gap-3">
                <code className="text-2xl font-mono font-bold tracking-wider">
                  {bookingResult.bookingId}
                </code>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/10"
                  onClick={copyBookingId}
                >
                  {copied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
                </Button>
              </div>
              <p className="text-blue-200 text-xs mt-3">{t.bookingForm.showCodeAtBoarding}</p>
            </Card>

            {/* Trip Summary */}
            <Card className="p-4 bg-gray-50 border-gray-100 rounded-xl text-left">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-gray-500">{t.bookingForm.route}</span>
                  <p className="font-medium text-[#012141]">{origin} → {destination}</p>
                </div>
                <div>
                  <span className="text-gray-500">{t.routeDetails.departure}</span>
                  <p className="font-medium text-[#012141]">
                    {date ? format(date, 'dd.MM.yyyy', { locale: dateLocale }) : ''}
                  </p>
                </div>
                <div>
                  <span className="text-gray-500">{t.bookingForm.passengers}</span>
                  <p className="font-medium text-[#012141]">{passengers}</p>
                </div>
                <div>
                  <span className="text-gray-500">{t.bookingForm.totalPayment}</span>
                  <p className="font-bold text-[#3870db]">{totalFormatted}</p>
                </div>
              </div>
            </Card>

            <div className="bg-blue-50 rounded-xl p-4 text-sm text-blue-800">
              <p><strong>{t.bookingForm.nextSteps}:</strong></p>
              <ul className="mt-2 space-y-1 text-left list-disc list-inside">
                <li>{t.bookingForm.nextStep1}</li>
                <li>{t.bookingForm.nextStep2}</li>
                <li>{t.bookingForm.nextStep3}</li>
                <li>{t.bookingForm.nextStep4}</li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="p-6 border-t border-gray-100 bg-gray-50 shrink-0 flex gap-3">
        {step > 1 && step < 4 && (
          <Button
            variant="outline"
            onClick={handleBack}
            className="h-12 px-6 rounded-xl border-gray-200 hover:bg-white hover:text-[#3870db]"
            disabled={isSubmitting}
          >
            {t.bookingForm.back}
          </Button>
        )}

        {step < 3 && (
          <Button
            className="flex-1 h-12 bg-[#3870db] hover:bg-[#2b5bb8] text-white rounded-xl text-lg shadow-lg shadow-blue-500/20"
            onClick={handleNext}
          >
            {t.bookingForm.continue}
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        )}

        {step === 3 && (
          <Button
            className="flex-1 h-12 bg-green-600 hover:bg-green-700 text-white rounded-xl text-lg shadow-lg shadow-green-500/20"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                {t.bookingForm.processing}
              </>
            ) : (
              <>
                <Check className="w-5 h-5 mr-2" />
                {t.bookingForm.confirmBooking}
              </>
            )}
          </Button>
        )}

        {step === 4 && (
          <Button
            className="flex-1 h-12 bg-[#012141] hover:bg-[#012141]/90 text-white rounded-xl text-lg"
            onClick={onClose}
          >
            {t.bookingForm.close}
          </Button>
        )}
      </div>
    </div>
  );
}
