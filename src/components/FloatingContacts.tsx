import { Phone } from 'lucide-react';

export default function FloatingContacts() {
  const zaloUrl = 'https://zalo.me/0822636676';
  const hotline = '0822 636 676';
  const facebookUrl = 'https://www.facebook.com/vmstsolutionsvietnam?locale=vi_VN';

  return (
    <div className="fixed right-6 bottom-28 z-50 flex flex-col items-end gap-3">
      {/* Hotline label */}
      <div className="bg-white shadow-lg rounded-full px-4 py-2 text-sm font-semibold text-gray-800 border border-gray-200">
        Hotline: {hotline}
      </div>

      {/* Icons stack */}
      <div className="flex flex-col gap-3">
        {/* Zalo */}
        <a
          href={zaloUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-12 h-12 rounded-full bg-[#008fe5] text-white shadow-lg hover:brightness-105 transition-all hover:scale-105"
          title="Liên hệ Zalo"
        >
          {/* Simple Zalo logo mark (white Z inside blue circle) */}
          <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="central"
              fontSize="16"
              fontWeight="700"
              fill="white"
            >
              Z
            </text>
          </svg>
        </a>

        {/* Facebook */}
        <a
          href={facebookUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-12 h-12 rounded-full bg-[#1877F2] text-white shadow-lg hover:brightness-105 transition-all hover:scale-105"
          title="Facebook Page"
        >
          {/* Use a simple 'f' glyph to avoid external icon dependency */}
          <span className="text-2xl font-bold -mt-0.5">f</span>
        </a>

        {/* Phone call */}
        <a
          href={`tel:${hotline.replace(/\s+/g, '')}`}
          className="flex items-center justify-center w-12 h-12 rounded-full bg-green-500 text-white shadow-lg hover:brightness-105 transition-all hover:scale-105"
          title="Gọi Hotline"
        >
          <Phone className="h-6 w-6" />
        </a>
      </div>
    </div>
  );
}