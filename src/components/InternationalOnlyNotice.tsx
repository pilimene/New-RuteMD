import { Globe } from 'lucide-react';
import { useTranslation } from '../i18n';

export function InternationalOnlyNotice({ variant = 'banner' }: { variant?: 'banner' | 'hero' }) {
  const { t } = useTranslation();

  if (variant === 'hero') {
    return (
      <div
        role="note"
        className="mx-auto mt-6 max-w-3xl rounded-2xl border border-amber-300/40 bg-amber-400/10 px-5 py-4 text-left backdrop-blur-sm"
      >
        <div className="flex items-start gap-3">
          <Globe className="mt-0.5 h-5 w-5 shrink-0 text-amber-300" aria-hidden="true" />
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-amber-200">
              {t.common.internationalOnlyTitle}
            </p>
            <p className="mt-1 text-sm leading-relaxed text-white/90">
              {t.common.internationalOnlyNotice}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      role="note"
      className="border-b border-amber-300/30 bg-amber-50 px-4 py-2.5 text-center"
    >
      <p className="mx-auto flex max-w-5xl items-center justify-center gap-2 text-sm leading-snug text-[#012141]">
        <Globe className="h-4 w-4 shrink-0 text-[#3870db]" aria-hidden="true" />
        <span>
          <strong className="font-semibold">{t.common.internationalOnlyTitle}</strong>
          {' — '}
          {t.common.internationalOnlyShort}
        </span>
      </p>
    </div>
  );
}
