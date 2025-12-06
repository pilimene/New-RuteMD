import { useState } from 'react';
import { Check, ChevronRight, MapPin, User, Phone, Mail, Bus, Users, Loader2, AlertCircle, Calendar as CalendarIcon, Copy, CheckCircle2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { Calendar } from './ui/calendar';
import { format } from 'date-fns';
import { ro } from 'date-fns/locale';
import { cn } from '../lib/utils';
import { submitBooking, validateBookingData, isDateAvailable, type BookingData } from '../services/bookingService';
import type { Route } from '../data/routes';

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
}

export function BookingForm({ route, isReverse = false, onClose }: BookingFormProps) {
  const [step, setStep] = useState(1);
  const [date, setDate] = useState<Date>();
  const [passengers, setPassengers] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    nume: '',
    prenume: '',
    telefon: '',
    email: '',
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingResult, setBookingResult] = useState<{ success: boolean; bookingId?: string; error?: string } | null>(null);
  const [copied, setCopied] = useState(false);

  const origin = isReverse ? route.destination : route.origin;
  const destination = isReverse ? route.origin : route.destination;
  const departureDay = isReverse ? route.returnDay : route.departureDay;
  const departureTime = isReverse ? route.returnStops[0].time : route.stops[0].time;

  const total = passengers * route.price;
  const totalFormatted = `${route.currency}${total}`;

  // Determine which dates are available based on departure day
  const isDateDisabled = (day: Date) => {
    return !isDateAvailable(day, departureDay);
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors([]); // Clear errors on input
  };

  const validateStep = (currentStep: number): boolean => {
    const newErrors: string[] = [];

    if (currentStep === 1) {
      if (!date) {
        newErrors.push('Vă rugăm selectați data călătoriei');
      }
    }

    if (currentStep === 2) {
      if (!formData.nume.trim()) {
        newErrors.push('Numele este obligatoriu');
      }
      if (!formData.prenume.trim()) {
        newErrors.push('Prenumele este obligatoriu');
      }
      if (!formData.telefon.trim()) {
        newErrors.push('Numărul de telefon este obligatoriu');
      } else if (!/^[\d\s+()-]{8,}$/.test(formData.telefon)) {
        newErrors.push('Numărul de telefon nu este valid');
      }
      if (!formData.email.trim()) {
        newErrors.push('Adresa de email este obligatorie');
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.push('Adresa de email nu este validă');
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

    setIsSubmitting(true);
    setErrors([]);

    const bookingData: BookingData = {
      nume: formData.nume.trim(),
      prenume: formData.prenume.trim(),
      telefon: formData.telefon.trim(),
      email: formData.email.trim(),
      ruta: `${origin} - ${destination}`,
      dataCalatorie: date ? format(date, 'dd MMMM yyyy', { locale: ro }) : '',
      nrPasageri: passengers,
      pretTotal: totalFormatted,
    };

    try {
      const result = await submitBooking(bookingData);
      setBookingResult(result);

      if (result.success) {
        setStep(4); // Success step
      } else {
        setErrors([result.error || 'A apărut o eroare. Vă rugăm încercați din nou.']);
      }
    } catch {
      setErrors(['A apărut o eroare de conexiune. Vă rugăm încercați din nou.']);
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
            <h2 className="text-2xl font-bold">Rezervare Bilet</h2>
            <p className="text-blue-200 text-sm flex items-center gap-2 mt-1">
              <MapPin className="w-3 h-3" />
              {origin} → {destination}
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{route.currency}{route.price}</div>
            <div className="text-blue-200 text-xs">per persoană</div>
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
              <span className={step >= 1 ? 'text-white' : ''}>Data & Locuri</span>
              <span className={step >= 2 ? 'text-white' : ''}>Date Personale</span>
              <span className={step >= 3 ? 'text-white' : ''}>Confirmare</span>
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
                <div className="font-medium text-[#012141]">Plecare în fiecare {departureDay}</div>
                <div className="text-sm text-gray-500">Ora plecării: {departureTime} • Durată: ~{route.duration}</div>
              </div>
            </div>

            {/* Date Selection */}
            <div className="space-y-3">
              <Label className="text-[#012141] font-medium flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 text-[#3870db]" />
                Selectează Data Plecării
              </Label>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={isDateDisabled}
                className="rounded-xl border border-gray-200 shadow-sm w-full flex justify-center bg-white"
                locale={ro}
                classNames={{
                  day_selected: "bg-[#3870db] text-white hover:bg-[#3870db] hover:text-white focus:bg-[#3870db] focus:text-white",
                  day_today: "bg-blue-50 text-[#3870db] font-bold",
                  day_disabled: "text-gray-300 hover:bg-transparent",
                }}
              />
              {date && (
                <div className="bg-green-50 text-green-700 px-4 py-2 rounded-lg text-sm flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  Selectat: {format(date, 'EEEE, dd MMMM yyyy', { locale: ro })}
                </div>
              )}
            </div>

            {/* Passenger Selection */}
            <div className="space-y-3">
              <Label className="text-[#012141] font-medium flex items-center gap-2">
                <Users className="w-4 h-4 text-[#3870db]" />
                Număr Pasageri
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
                  <span className="text-gray-500 text-sm ml-2">{passengers === 1 ? 'persoană' : 'persoane'}</span>
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
                  <div className="text-blue-200 text-sm">Total de plată</div>
                  <div className="text-xs text-blue-300 mt-1">
                    {passengers} × {route.currency}{route.price}
                  </div>
                </div>
                <div className="text-3xl font-bold">{totalFormatted}</div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Personal Information */}
        {step === 2 && (
          <div className="space-y-5 animate-in slide-in-from-right-4 duration-300">
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <p className="text-amber-800 text-sm">
                <strong>Important:</strong> Introduceți datele pasagerului principal. Aceste informații vor fi folosite pentru emiterea biletului electronic.
              </p>
            </div>

            <div className="grid gap-5">
              {/* Name */}
              <div className="space-y-2">
                <Label className="text-[#012141] font-medium">
                  Nume <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    className="pl-10 h-12 rounded-xl bg-gray-50 border-gray-200 focus:border-[#3870db] focus:ring-[#3870db]"
                    placeholder="Popescu"
                    value={formData.nume}
                    onChange={(e) => handleInputChange('nume', e.target.value)}
                  />
                </div>
              </div>

              {/* Surname */}
              <div className="space-y-2">
                <Label className="text-[#012141] font-medium">
                  Prenume <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    className="pl-10 h-12 rounded-xl bg-gray-50 border-gray-200 focus:border-[#3870db] focus:ring-[#3870db]"
                    placeholder="Ion"
                    value={formData.prenume}
                    onChange={(e) => handleInputChange('prenume', e.target.value)}
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label className="text-[#012141] font-medium">
                  Telefon <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    type="tel"
                    className="pl-10 h-12 rounded-xl bg-gray-50 border-gray-200 focus:border-[#3870db] focus:ring-[#3870db]"
                    placeholder="+373 60 123 456"
                    value={formData.telefon}
                    onChange={(e) => handleInputChange('telefon', e.target.value)}
                  />
                </div>
                <p className="text-xs text-gray-500">Veți primi confirmarea prin SMS</p>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label className="text-[#012141] font-medium">
                  Email <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    type="email"
                    className="pl-10 h-12 rounded-xl bg-gray-50 border-gray-200 focus:border-[#3870db] focus:ring-[#3870db]"
                    placeholder="ion.popescu@email.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                  />
                </div>
                <p className="text-xs text-gray-500">Biletul electronic va fi trimis pe acest email</p>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Review & Confirm */}
        {step === 3 && (
          <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
            <div className="text-center py-2">
              <h3 className="text-xl font-bold text-[#012141]">Verifică Rezervarea</h3>
              <p className="text-gray-500 text-sm mt-1">Asigură-te că toate datele sunt corecte</p>
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
                  <div className="text-xs bg-white/10 px-2 py-1 rounded-full">{departureDay}</div>
                </div>
                <div className="text-2xl font-bold mb-2">
                  {origin} → {destination}
                </div>
                <div className="text-blue-200 text-sm">
                  {date ? format(date, 'EEEE, dd MMMM yyyy', { locale: ro }) : ''} • {departureTime}
                </div>
              </div>
            </Card>

            {/* Booking Details */}
            <Card className="p-5 bg-gray-50 border-gray-100 space-y-4 rounded-xl">
              <h4 className="font-medium text-[#012141] flex items-center gap-2">
                <User className="w-4 h-4 text-[#3870db]" />
                Date Pasager
              </h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Nume</span>
                  <p className="font-medium text-[#012141]">{formData.nume} {formData.prenume}</p>
                </div>
                <div>
                  <span className="text-gray-500">Pasageri</span>
                  <p className="font-medium text-[#012141]">{passengers} {passengers === 1 ? 'persoană' : 'persoane'}</p>
                </div>
                <div>
                  <span className="text-gray-500">Telefon</span>
                  <p className="font-medium text-[#012141]">{formData.telefon}</p>
                </div>
                <div>
                  <span className="text-gray-500">Email</span>
                  <p className="font-medium text-[#012141] break-all">{formData.email}</p>
                </div>
              </div>
            </Card>

            {/* Price Summary */}
            <Card className="p-5 border-2 border-[#3870db] bg-blue-50/50 rounded-xl">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-[#012141] font-medium">Total de plată</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {passengers} bilet{passengers > 1 ? 'e' : ''} × {route.currency}{route.price}
                  </div>
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
                  <p className="font-medium text-amber-800">Plata se face la șofer</p>
                  <p className="text-amber-700 text-sm mt-1">
                    Puteți achita în numerar (LEI, EUR) direct la îmbarcare.
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
              <h3 className="text-2xl font-bold text-[#012141]">Rezervare Confirmată!</h3>
              <p className="text-gray-500 mt-2">
                Biletul electronic a fost trimis pe adresa<br />
                <strong className="text-[#012141]">{formData.email}</strong>
              </p>
            </div>

            {/* Booking ID Card */}
            <Card className="p-5 bg-[#012141] text-white rounded-xl">
              <div className="text-blue-200 text-sm mb-2">Cod Rezervare</div>
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
              <p className="text-blue-200 text-xs mt-3">Prezentați acest cod la îmbarcare</p>
            </Card>

            {/* Trip Summary */}
            <Card className="p-4 bg-gray-50 border-gray-100 rounded-xl text-left">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-gray-500">Rută</span>
                  <p className="font-medium text-[#012141]">{origin} → {destination}</p>
                </div>
                <div>
                  <span className="text-gray-500">Data</span>
                  <p className="font-medium text-[#012141]">
                    {date ? format(date, 'dd.MM.yyyy', { locale: ro }) : ''}
                  </p>
                </div>
                <div>
                  <span className="text-gray-500">Pasageri</span>
                  <p className="font-medium text-[#012141]">{passengers}</p>
                </div>
                <div>
                  <span className="text-gray-500">Total</span>
                  <p className="font-bold text-[#3870db]">{totalFormatted}</p>
                </div>
              </div>
            </Card>

            <div className="bg-blue-50 rounded-xl p-4 text-sm text-blue-800">
              <p><strong>Următorii pași:</strong></p>
              <ul className="mt-2 space-y-1 text-left list-disc list-inside">
                <li>Verificați email-ul pentru biletul electronic</li>
                <li>Prezentați-vă cu 15 min înainte de plecare</li>
                <li>Aveți la dvs. un act de identitate valid</li>
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
            Înapoi
          </Button>
        )}

        {step < 3 && (
          <Button
            className="flex-1 h-12 bg-[#3870db] hover:bg-[#2b5bb8] text-white rounded-xl text-lg shadow-lg shadow-blue-500/20"
            onClick={handleNext}
          >
            Continuă
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
                Se procesează...
              </>
            ) : (
              <>
                <Check className="w-5 h-5 mr-2" />
                Confirmă Rezervarea
              </>
            )}
          </Button>
        )}

        {step === 4 && (
          <Button
            className="flex-1 h-12 bg-[#012141] hover:bg-[#012141]/90 text-white rounded-xl text-lg"
            onClick={onClose}
          >
            Închide
          </Button>
        )}
      </div>
    </div>
  );
}
