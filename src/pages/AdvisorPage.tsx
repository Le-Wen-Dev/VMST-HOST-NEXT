import { useState } from 'react';
import { Lightbulb, ArrowRight, Check } from 'lucide-react';
import { wordpressPlans, businessPlans, HostingPlan } from '../data/mockData';

interface AdvisorPageProps {
  onNavigate: (page: string) => void;
  onAddToCart: (plan: HostingPlan, duration: string) => void;
}

export default function AdvisorPage({ onNavigate, onAddToCart }: AdvisorPageProps) {
  const [storage, setStorage] = useState('');
  const [traffic, setTraffic] = useState('');
  const [websites, setWebsites] = useState('');
  const [planType, setPlanType] = useState<'wordpress' | 'business' | 'unsure'>('unsure');
  const [recommendation, setRecommendation] = useState<HostingPlan | null>(null);
  const [reasons, setReasons] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const storageNum = parseInt(storage);
    const trafficNum = parseInt(traffic);
    const websitesNum = parseInt(websites);

    let recommendedPlan: HostingPlan | null = null;
    const recommendationReasons: string[] = [];

    const plans = planType === 'business' ? businessPlans : wordpressPlans;

    for (const plan of plans) {
      const planStorage = parseInt(plan.storage);
      const planTraffic = parseInt(plan.bandwidth);
      const storageHeadroom = (planStorage / storageNum) * 100;
      const trafficHeadroom = (planTraffic / trafficNum) * 100;

      if (
        storageHeadroom >= 115 &&
        storageHeadroom <= 200 &&
        trafficHeadroom >= 115 &&
        trafficHeadroom <= 200 &&
        plan.websites >= websitesNum
      ) {
        recommendedPlan = plan;
        recommendationReasons.push(`Dung lượng ${plan.storage} phù hợp với nhu cầu ${storage}GB của bạn (headroom 15-20%)`);
        recommendationReasons.push(`Băng thông ${plan.bandwidth} đáp ứng traffic ${traffic}GB/tháng`);
        recommendationReasons.push(`Hỗ trợ ${plan.websites} websites (bạn cần ${websitesNum})`);
        recommendationReasons.push(`SLA ${plan.sla} đảm bảo uptime cao`);
        if (plan.recommended) {
          recommendationReasons.push('Gói được lựa chọn nhiều nhất bởi khách hàng');
        }
        break;
      }
    }

    if (!recommendedPlan) {
      recommendedPlan = plans.find(p => p.recommended) || plans[2];
      recommendationReasons.push('Gói Pro phù hợp với hầu hết doanh nghiệp SME');
      recommendationReasons.push('Cân bằng tốt giữa hiệu năng và chi phí');
      recommendationReasons.push('Đủ headroom cho tăng trưởng trong tương lai');
    }

    setRecommendation(recommendedPlan);
    setReasons(recommendationReasons);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-[#034CC9] to-[#0B2B6F] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center mb-4">
            <Lightbulb className="h-12 w-12 mr-3" />
            <h1 className="text-4xl sm:text-5xl font-bold">Tư vấn chọn gói</h1>
          </div>
          <p className="text-xl text-blue-100 text-center max-w-3xl mx-auto">
            Trả lời vài câu hỏi đơn giản để chúng tôi gợi ý gói hosting phù hợp nhất với nhu cầu của bạn
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Dung lượng website (GB)
              </label>
              <input
                type="number"
                value={storage}
                onChange={(e) => setStorage(e.target.value)}
                required
                min="1"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#034CC9]"
                placeholder="Ví dụ: 10"
              />
              <p className="text-sm text-gray-500 mt-1">Dung lượng hiện tại hoặc dự kiến của website</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Traffic/tháng (GB)
              </label>
              <input
                type="number"
                value={traffic}
                onChange={(e) => setTraffic(e.target.value)}
                required
                min="1"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#034CC9]"
                placeholder="Ví dụ: 50"
              />
              <p className="text-sm text-gray-500 mt-1">Lượng traffic trung bình mỗi tháng</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Số lượng websites
              </label>
              <input
                type="number"
                value={websites}
                onChange={(e) => setWebsites(e.target.value)}
                required
                min="1"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#034CC9]"
                placeholder="Ví dụ: 3"
              />
              <p className="text-sm text-gray-500 mt-1">Số website bạn cần host</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Loại website
              </label>
              <div className="space-y-3">
                <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-[#034CC9] transition-colors">
                  <input
                    type="radio"
                    value="wordpress"
                    checked={planType === 'wordpress'}
                    onChange={(e) => setPlanType(e.target.value as 'wordpress')}
                    className="mr-3 text-[#034CC9]"
                  />
                  <div>
                    <span className="font-semibold text-gray-900">WordPress</span>
                    <p className="text-sm text-gray-500">Website WordPress hoặc kế hoạch sử dụng WordPress</p>
                  </div>
                </label>
                <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-[#034CC9] transition-colors">
                  <input
                    type="radio"
                    value="business"
                    checked={planType === 'business'}
                    onChange={(e) => setPlanType(e.target.value as 'business')}
                    className="mr-3 text-[#034CC9]"
                  />
                  <div>
                    <span className="font-semibold text-gray-900">Business / Custom</span>
                    <p className="text-sm text-gray-500">Ứng dụng tùy chỉnh, thương mại điện tử, hoặc nhiều công nghệ</p>
                  </div>
                </label>
                <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-[#034CC9] transition-colors">
                  <input
                    type="radio"
                    value="unsure"
                    checked={planType === 'unsure'}
                    onChange={(e) => setPlanType(e.target.value as 'unsure')}
                    className="mr-3 text-[#034CC9]"
                  />
                  <div>
                    <span className="font-semibold text-gray-900">Không chắc chắn</span>
                    <p className="text-sm text-gray-500">Hệ thống sẽ gợi ý WordPress Hosting (phổ biến nhất)</p>
                  </div>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#034CC9] text-white py-4 rounded-lg font-semibold hover:bg-[#0B2B6F] transition-colors flex items-center justify-center"
            >
              Xem gợi ý
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </form>
        </div>

        {recommendation && (
          <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-[#034CC9]">
            <div className="flex items-center mb-6">
              <div className="bg-green-100 p-3 rounded-full">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-4">
                <h2 className="text-2xl font-bold text-[#0B2B6F]">Gói phù hợp nhất với bạn</h2>
                <p className="text-gray-600">Dựa trên nhu cầu bạn đã cung cấp</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#E6EEFF] to-white rounded-xl p-8 mb-6">
              <h3 className="text-3xl font-bold text-[#034CC9] mb-2">{recommendation.name}</h3>
              <p className="text-gray-700 mb-4">
                {recommendation.type === 'wordpress' ? 'WordPress Hosting' : 'Business Hosting'}
              </p>
              <div className="flex items-baseline mb-6">
                <span className="text-5xl font-bold text-[#0B2B6F]">
                  {recommendation.price.monthly.toLocaleString('vi-VN')}₫
                </span>
                <span className="text-gray-500 ml-2">/tháng</span>
              </div>
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="bg-white p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Dung lượng</p>
                  <p className="text-lg font-semibold text-[#0B2B6F]">{recommendation.storage}</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Băng thông</p>
                  <p className="text-lg font-semibold text-[#0B2B6F]">{recommendation.bandwidth}</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Websites</p>
                  <p className="text-lg font-semibold text-[#0B2B6F]">{recommendation.websites}</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">SLA</p>
                  <p className="text-lg font-semibold text-[#0B2B6F]">{recommendation.sla}</p>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-[#0B2B6F] mb-4">Tại sao gói này phù hợp?</h3>
              <ul className="space-y-3">
                {reasons.map((reason, idx) => (
                  <li key={idx} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{reason}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <button
                onClick={() => onAddToCart(recommendation, 'yearly')}
                className="bg-[#034CC9] text-white py-4 rounded-lg font-semibold hover:bg-[#0B2B6F] transition-colors"
              >
                Chọn gói này
              </button>
              <button
                onClick={() => onNavigate(recommendation.type === 'wordpress' ? 'wordpress-hosting' : 'business-hosting')}
                className="bg-white text-[#034CC9] border-2 border-[#034CC9] py-4 rounded-lg font-semibold hover:bg-[#E6EEFF] transition-colors"
              >
                Xem gói khác
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
