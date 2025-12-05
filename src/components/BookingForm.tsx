import { useState } from 'react';
import { Calendar as CalendarIcon, Check, ChevronRight, CreditCard, MapPin, User, Phone, Mail, Bus } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Card } from './ui/card';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { format } from 'date-fns';
import { cn } from '../lib/utils';

export function BookingForm() {
  const [step, setStep] = useState(1);
  const [date, setDate] = useState<Date>();
  const [seats, setSeats] = useState(1);

  const pricePerSeat = 50;
  const total = seats * pricePerSeat;

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl overflow-hidden flex flex-col h-[600px]">
      {/* Header */}
      <div className="bg-[#012141] p-6 text-white shrink-0">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">Rezervare Bilet</h2>
            <p className="text-blue-200 text-sm">Chișinău - Istanbul</p>
          </div>
          <div className="flex items-center gap-2 text-xs font-medium bg-white/10 px-3 py-1 rounded-full">
            <Bus className="w-3 h-3" />
            <span>Tur-Retur</span>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center gap-2">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex-1 h-1 rounded-full bg-white/10 overflow-hidden">
              <div 
                className={`h-full bg-[#3870db] transition-all duration-500 ${
                  s <= step ? 'w-full' : 'w-0'
                }`} 
              />
            </div>
          ))}
        </div>
        <div className="flex justify-between text-xs text-blue-200 mt-2 font-medium">
          <span className={step >= 1 ? 'text-white' : ''}>Detalii</span>
          <span className={step >= 2 ? 'text-white' : ''}>Pasageri</span>
          <span className={step >= 3 ? 'text-white' : ''}>Finalizare</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {step === 1 && (
          <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
            <div className="space-y-4">
              <Label>Selectează Data Plecării</Label>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-xl border border-gray-100 shadow-sm w-full flex justify-center"
                classNames={{
                  day_selected: "bg-[#3870db] text-white hover:bg-[#3870db] hover:text-white focus:bg-[#3870db] focus:text-white",
                  day_today: "bg-gray-100 text-gray-900",
                }}
              />
            </div>

            <div className="space-y-4">
              <Label>Număr Locuri</Label>
              <div className="flex items-center gap-4">
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => setSeats(Math.max(1, seats - 1))}
                  className="w-12 h-12 rounded-xl border-gray-200"
                >
                  -
                </Button>
                <span className="text-2xl font-bold text-[#012141] w-12 text-center">{seats}</span>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => setSeats(Math.min(10, seats + 1))}
                  className="w-12 h-12 rounded-xl border-gray-200"
                >
                  +
                </Button>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label>Nume și Prenume</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input className="pl-10 h-11 rounded-xl bg-gray-50 border-gray-200" placeholder="Ex: Ion Popescu" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Telefon</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input className="pl-10 h-11 rounded-xl bg-gray-50 border-gray-200" placeholder="+373 60 000 000" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Email (Opțional)</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input className="pl-10 h-11 rounded-xl bg-gray-50 border-gray-200" placeholder="ion@example.com" />
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 bg-[#3870db] rounded-full flex items-center justify-center mt-0.5 shrink-0">
                   <Check className="w-3 h-3 text-white" />
                </div>
                <p className="text-sm text-blue-900">
                  Veți primi biletul electronic pe email și confirmarea prin SMS imediat după rezervare.
                </p>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
            <div className="text-center py-6">
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-10 h-10 text-green-500" />
              </div>
              <h3 className="text-xl font-bold text-[#012141] mb-2">Gata de plecare!</h3>
              <p className="text-gray-500">Verifică detaliile și confirmă rezervarea.</p>
            </div>

            <Card className="p-4 bg-gray-50 border-gray-100 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Traseu</span>
                <span className="font-medium text-[#012141]">Chișinău - Istanbul</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Data</span>
                <span className="font-medium text-[#012141]">{date ? format(date, 'dd MMM yyyy') : 'Neselectat'}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Pasageri</span>
                <span className="font-medium text-[#012141]">{seats} persoane</span>
              </div>
              <div className="border-t border-dashed border-gray-200 my-2" />
              <div className="flex justify-between text-lg font-bold">
                <span className="text-[#012141]">Total</span>
                <span className="text-[#3870db]">${total}</span>
              </div>
            </Card>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="p-6 border-t border-gray-100 bg-gray-50 shrink-0 flex gap-3">
        {step > 1 && (
          <Button 
            variant="outline" 
            onClick={() => setStep(step - 1)}
            className="h-12 px-6 rounded-xl border-gray-200 hover:bg-white hover:text-[#3870db]"
          >
            Înapoi
          </Button>
        )}
        <Button 
          className="flex-1 h-12 bg-[#3870db] hover:bg-[#2b5bb8] text-white rounded-xl text-lg shadow-lg shadow-blue-500/20"
          onClick={() => step < 3 ? setStep(step + 1) : alert('Rezervare Trimisă!')}
        >
          {step === 3 ? 'Confirmă Rezervarea' : 'Continuă'}
          {step < 3 && <ChevronRight className="w-5 h-5 ml-2" />}
        </Button>
      </div>
    </div>
  );
}