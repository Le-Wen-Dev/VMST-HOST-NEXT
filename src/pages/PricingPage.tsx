import { useState } from 'react';
import { Check } from 'lucide-react';
import { wordpressPlans, businessPlans, emailPlans, HostingPlan } from '../data/mockData';

interface PricingPageProps {
  onNavigate: (page: string) => void;
  onAddToCart: (plan: HostingPlan, duration: string) => void;
}

export default function PricingPage({ onNavigate, onAddToCart }: PricingPageProps) {
  const [duration, setDuration] = useState<'monthly' | 'quarterly' | 'yearly'>('yearly');
  const [category, setCategory] = useState<'all' | 'wordpress' | 'business' | 'email'>('all');

  const getPriceByDuration = (plan: HostingPlan) => {
    return plan.price[duration];
  };

  const filteredPlans = () => {
    let plans: HostingPlan[] = [];
    if (category === 'all') {
      plans = [...wordpressPlans, ...businessPlans, ...emailPlans];
    } else if (category === 'wordpress') {
      plans = wordpressPlans;
    } else if (category === 'business') {
      plans = businessPlans;
    } else {
      plans = emailPlans;
    }
    return plans;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-[#034CC9] to-[#0B2B6F] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Bảng giá tổng hợp</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Chọn gói phù hợp với nhu cầu của bạn. Tất cả các gói đều có SLA cao và hỗ trợ 24/7
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setCategory('all')}
              className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                category === 'all'
                  ? 'bg-[#034CC9] text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Tất cả
            </button>
            <button
              onClick={() => setCategory('wordpress')}
              className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                category === 'wordpress'
                  ? 'bg-[#034CC9] text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              WordPress
            </button>
            <button
              onClick={() => setCategory('business')}
              className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                category === 'business'
                  ? 'bg-[#034CC9] text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Business
            </button>
            <button
              onClick={() => setCategory('email')}
              className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                category === 'email'
                  ? 'bg-[#034CC9] text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Email
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-md p-2 inline-flex">
            <button
              onClick={() => setDuration('monthly')}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors text-sm ${
                duration === 'monthly'
                  ? 'bg-[#034CC9] text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Tháng
            </button>
            <button
              onClick={() => setDuration('quarterly')}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors text-sm ${
                duration === 'quarterly'
                  ? 'bg-[#034CC9] text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              3 tháng
            </button>
            <button
              onClick={() => setDuration('yearly')}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors text-sm ${
                duration === 'yearly'
                  ? 'bg-[#034CC9] text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Năm (-20%)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlans().map((plan) => (
            <div
              key={plan.id}
              className={`bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-6 ${
                plan.recommended ? 'border-2 border-[#034CC9] relative' : ''
              }`}
            >
              {plan.recommended && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-[#034CC9] text-white px-4 py-1 rounded-full text-xs font-semibold">
                    Phổ biến
                  </span>
                </div>
              )}

              <div className="mb-4">
                <span className="text-sm text-gray-500 uppercase tracking-wide">
                  {plan.type === 'wordpress' ? 'WordPress' : plan.type === 'business' ? 'Business' : 'Email'}
                </span>
                <h3 className="text-2xl font-bold text-[#0B2B6F] mt-1">{plan.name}</h3>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold text-[#034CC9]">
                    {getPriceByDuration(plan).toLocaleString('vi-VN')}₫
                  </span>
                  <span className="text-gray-500 ml-2 text-sm">
                    /{duration === 'monthly' ? 'tháng' : duration === 'quarterly' ? '3 tháng' : 'năm'}
                  </span>
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                <li className="flex items-center text-sm">
                  <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">{plan.storage} Storage</span>
                </li>
                <li className="flex items-center text-sm">
                  <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">{plan.bandwidth} Bandwidth</span>
                </li>
                {plan.websites > 0 && (
                  <li className="flex items-center text-sm">
                    <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">{plan.websites} Websites</span>
                  </li>
                )}
                {plan.emails !== undefined && (
                  <li className="flex items-center text-sm">
                    <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">{plan.emails} Email Accounts</span>
                  </li>
                )}
                <li className="flex items-center text-sm">
                  <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">SLA {plan.sla}</span>
                </li>
                <li className="flex items-center text-sm">
                  <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">{plan.backup}</span>
                </li>
              </ul>

              <button
                onClick={() => onAddToCart(plan, duration)}
                className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                  plan.recommended
                    ? 'bg-[#034CC9] text-white hover:bg-[#0B2B6F]'
                    : 'bg-gray-100 text-[#034CC9] hover:bg-gray-200'
                }`}
              >
                Chọn gói
              </button>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-[#0B2B6F] mb-4">Không biết chọn gói nào?</h2>
          <p className="text-gray-600 mb-6">
            Sử dụng công cụ tư vấn của chúng tôi để tìm gói phù hợp nhất
          </p>
          <button
            onClick={() => onNavigate('advisor')}
            className="bg-[#034CC9] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#0B2B6F] transition-colors"
          >
            Tư vấn chọn gói
          </button>
        </div>
      </div>
    </div>
  );
}
