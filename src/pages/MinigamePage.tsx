import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Gamepad2 } from 'lucide-react';

export default function MinigamePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B9D] via-[#C9379D] to-[#8B5CF6]"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 20% 30%, rgba(255, 215, 0, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(255, 107, 157, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(138, 92, 246, 0.3) 0%, transparent 50%),
            url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23FFD700' fill-opacity='0.15'%3E%3Ccircle cx='20' cy='20' r='3'/%3E%3Ccircle cx='80' cy='20' r='3'/%3E%3Ccircle cx='20' cy='80' r='3'/%3E%3Ccircle cx='80' cy='80' r='3'/%3E%3Ccircle cx='50' cy='50' r='4'/%3E%3Cpath d='M50 10 L52 16 L58 16 L53 20 L55 26 L50 22 L45 26 L47 20 L42 16 L48 16 Z'/%3E%3Cpath d='M90 50 L92 56 L98 56 L93 60 L95 66 L90 62 L85 66 L87 60 L82 56 L88 56 Z'/%3E%3Cpath d='M10 50 L12 56 L18 56 L13 60 L15 66 L10 62 L5 66 L7 60 L2 56 L8 56 Z'/%3E%3Cpath d='M50 90 L52 96 L58 96 L53 100 L55 106 L50 102 L45 106 L47 100 L42 96 L48 96 Z'/%3E%3C/g%3E%3C/svg%3E")
          `,
          backgroundSize: 'cover, cover, cover, 100px 100px',
          backgroundPosition: 'center'
        }}></div>
        <div className="absolute inset-0 animate-pulse opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23FFD700' stroke-width='2' opacity='0.3'%3E%3Ccircle cx='50' cy='50' r='20'/%3E%3Ccircle cx='150' cy='50' r='25'/%3E%3Ccircle cx='50' cy='150' r='15'/%3E%3Ccircle cx='150' cy='150' r='30'/%3E%3Cpolygon points='100,20 110,40 130,40 115,55 120,75 100,60 80,75 85,55 70,40 90,40'/%3E%3Cpolygon points='180,100 185,110 195,110 188,117 191,127 180,120 169,127 172,117 165,110 175,110'/%3E%3Cpolygon points='20,100 25,110 35,110 28,117 31,127 20,120 9,127 12,117 5,110 15,110'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
          animation: 'float 20s ease-in-out infinite'
        }}></div>
      </div>

      <div className="relative z-10">
        <nav className="container mx-auto px-6 py-6">
          <button
            onClick={() => navigate('/presentation')}
            className="flex items-center gap-2 bg-[#FFD700] text-[#b30000] px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-transform shadow-lg"
          >
            <ArrowLeft size={20} />
            Quay lại trang tài liệu
          </button>
        </nav>

        <main className="container mx-auto px-6 py-20 flex items-center justify-center min-h-[80vh]">
          <div className="glassmorphism-card max-w-2xl w-full p-12 rounded-3xl text-center animate-fade-in">
            <div className="flex justify-center mb-8">
              <div className="w-32 h-32 bg-[#FFD700] rounded-full flex items-center justify-center shadow-2xl">
                <Gamepad2 size={64} className="text-[#b30000]" />
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              MINI GAME
            </h1>
            <h2 className="text-2xl md:text-3xl text-[#FFD700] font-semibold mb-8">
              KIỂM TRA KIẾN THỨC TƯ TƯỞNG HỒ CHÍ MINH
            </h2>

            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl mb-8">
              <p className="text-xl text-gray-100 italic">
                Nội dung mini game sẽ được bổ sung sau.
              </p>
            </div>

            <button
              className="bg-[#FFD700] text-[#b30000] px-12 py-4 rounded-xl font-bold text-xl hover:scale-105 hover:shadow-2xl transition-all shadow-lg"
              disabled
            >
              BẮT ĐẦU MINI GAME
            </button>

            <p className="text-gray-300 mt-6 text-sm">
              (Chức năng đang được phát triển)
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
