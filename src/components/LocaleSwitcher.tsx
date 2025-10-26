import { Globe, DollarSign } from 'lucide-react';
import { useLocale } from '../contexts/LocaleContext';

export default function LocaleSwitcher() {
  const { language, currency, setLanguage, setCurrency } = useLocale();

  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <button className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
          <Globe className="h-4 w-4 text-gray-600" />
          <span className="text-sm font-semibold text-gray-700">{language.toUpperCase()}</span>
        </button>
        <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-50 hidden group-hover:block">
          <button
            onClick={() => setLanguage('vi')}
            className={`w-full text-left px-4 py-2 hover:bg-blue-50 transition-colors ${
              language === 'vi' ? 'bg-blue-100 font-bold' : ''
            }`}
          >
            Tiếng Việt
          </button>
          <button
            onClick={() => setLanguage('en')}
            className={`w-full text-left px-4 py-2 hover:bg-blue-50 transition-colors ${
              language === 'en' ? 'bg-blue-100 font-bold' : ''
            }`}
          >
            English
          </button>
        </div>
      </div>

      <div className="relative group">
        <button className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
          <DollarSign className="h-4 w-4 text-gray-600" />
          <span className="text-sm font-semibold text-gray-700">{currency}</span>
        </button>
        <div className="absolute right-0 mt-2 w-28 bg-white border border-gray-200 rounded-lg shadow-lg z-50 hidden group-hover:block">
          <button
            onClick={() => setCurrency('VND')}
            className={`w-full text-left px-4 py-2 hover:bg-blue-50 transition-colors ${
              currency === 'VND' ? 'bg-blue-100 font-bold' : ''
            }`}
          >
            VND (đ)
          </button>
          <button
            onClick={() => setCurrency('USD')}
            className={`w-full text-left px-4 py-2 hover:bg-blue-50 transition-colors ${
              currency === 'USD' ? 'bg-blue-100 font-bold' : ''
            }`}
          >
            USD ($)
          </button>
        </div>
      </div>
    </div>
  );
}
