import { useState } from 'react';
import { Check, Info } from 'lucide-react';
import { HostingPlan } from '../data/mockData';

interface ProductPageProps {
  productType: 'wordpress' | 'business' | 'email';
  plans: HostingPlan[];
  onAddToCart: (plan: HostingPlan, duration: string) => void;
}

export default function ProductPage({ productType, plans, onAddToCart }: ProductPageProps) {
  const [duration, setDuration] = useState<'monthly' | 'quarterly' | 'yearly'>('yearly');

  const titles = {
    wordpress: 'WordPress Hosting',
    business: 'Business Hosting',
    email: 'Email Domain'
  };

  const descriptions = {
    wordpress: 'Hosting được tối ưu riêng cho WordPress với OpenLiteSpeed, LiteSpeed Cache và WordPress Toolkit',
    business: 'Hosting linh hoạt hỗ trợ đa dạng công nghệ cho mọi loại ứng dụng web và thương mại điện tử',
    email: 'Email doanh nghiệp chuyên nghiệp với bảo mật cao, anti-spam và đồng bộ đa thiết bị'
  };

  const getPriceByDuration = (plan: HostingPlan) => {
    return plan.price[duration];
  };

  const getSavings = () => {
    if (duration === 'yearly') return 'Tiết kiệm 20%';
    if (duration === 'quarterly') return 'Tiết kiệm 10%';
    return '';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-[#034CC9] to-[#0B2B6F] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">{titles[productType]}</h1>
          <p className="text-xl text-blue-100 max-w-3xl">{descriptions[productType]}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-lg shadow-md p-2 inline-flex">
            <button
              onClick={() => setDuration('monthly')}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                duration === 'monthly'
                  ? 'bg-[#034CC9] text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              1 tháng
            </button>
            <button
              onClick={() => setDuration('quarterly')}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors relative ${
                duration === 'quarterly'
                  ? 'bg-[#034CC9] text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              3 tháng
              {duration === 'quarterly' && (
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
                  -10%
                </span>
              )}
            </button>
            <button
              onClick={() => setDuration('yearly')}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors relative ${
                duration === 'yearly'
                  ? 'bg-[#034CC9] text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              12 tháng
              {duration === 'yearly' && (
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
                  -20%
                </span>
              )}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`bg-white rounded-2xl shadow-lg overflow-hidden transition-all hover:shadow-xl ${
                plan.recommended ? 'border-2 border-[#034CC9] relative' : ''
              }`}
            >
              {plan.recommended && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <span className="bg-[#034CC9] text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                    Recommended
                  </span>
                </div>
              )}

              <div className={`p-8 ${plan.recommended ? 'pt-10' : ''}`}>
                <h3 className="text-2xl font-bold text-[#0B2B6F] mb-2">{plan.name}</h3>
                <div className="flex items-baseline mb-6">
                  <span className="text-4xl font-bold text-[#034CC9]">
                    {getPriceByDuration(plan).toLocaleString('vi-VN')}₫
                  </span>
                  <span className="text-gray-500 ml-2">
                    /{duration === 'monthly' ? 'tháng' : duration === 'quarterly' ? '3 tháng' : 'năm'}
                  </span>
                </div>

                {getSavings() && (
                  <div className="bg-green-50 text-green-700 px-3 py-2 rounded-lg text-sm font-semibold mb-6 inline-block">
                    {getSavings()}
                  </div>
                )}

                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between py-2 border-b">
                    <span className="text-gray-700 font-medium">Dung lượng</span>
                    <span className="text-[#0B2B6F] font-semibold">{plan.storage}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b">
                    <span className="text-gray-700 font-medium">Băng thông</span>
                    <span className="text-[#0B2B6F] font-semibold">{plan.bandwidth}</span>
                  </div>
                  {plan.websites > 0 && (
                    <div className="flex items-center justify-between py-2 border-b">
                      <span className="text-gray-700 font-medium">Websites</span>
                      <span className="text-[#0B2B6F] font-semibold">{plan.websites}</span>
                    </div>
                  )}
                  {plan.emails !== undefined && (
                    <div className="flex items-center justify-between py-2 border-b">
                      <span className="text-gray-700 font-medium">Email Accounts</span>
                      <span className="text-[#0B2B6F] font-semibold">{plan.emails}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between py-2 border-b">
                    <span className="text-gray-700 font-medium">SLA</span>
                    <span className="text-[#0B2B6F] font-semibold">{plan.sla}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b">
                    <span className="text-gray-700 font-medium">Hỗ trợ</span>
                    <span className="text-[#0B2B6F] font-semibold">{plan.support}</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
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
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-[#0B2B6F] mb-6">Câu hỏi thường gặp</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-[#0B2B6F] mb-2 flex items-center">
                <Info className="h-5 w-5 mr-2 text-[#034CC9]" />
                Tôi có thể nâng cấp gói sau không?
              </h3>
              <p className="text-gray-600 ml-7">
                Có, bạn có thể nâng cấp gói bất cứ lúc nào. Chi phí sẽ được tính theo tỷ lệ thời gian còn lại.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-[#0B2B6F] mb-2 flex items-center">
                <Info className="h-5 w-5 mr-2 text-[#034CC9]" />
                Có hỗ trợ chuyển website từ nhà cung cấp khác không?
              </h3>
              <p className="text-gray-600 ml-7">
                Có, đội ngũ kỹ thuật của chúng tôi sẽ hỗ trợ miễn phí chuyển website từ nhà cung cấp khác sang VMST Host.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-[#0B2B6F] mb-2 flex items-center">
                <Info className="h-5 w-5 mr-2 text-[#034CC9]" />
                Chính sách hoàn tiền như thế nào?
              </h3>
              <p className="text-gray-600 ml-7">
                Chúng tôi có chính sách hoàn tiền 100% trong vòng 7 ngày đầu tiên nếu bạn không hài lòng với dịch vụ.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-[#0B2B6F] mb-2 flex items-center">
                <Info className="h-5 w-5 mr-2 text-[#034CC9]" />
                Backup được thực hiện như thế nào?
              </h3>
              <p className="text-gray-600 ml-7">
                Tất cả các gói đều có backup tự động hằng ngày. Dữ liệu được lưu trữ ở nhiều địa điểm khác nhau để đảm bảo an toàn.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
