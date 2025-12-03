import { useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, Shield } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function PresentationPage() {
  const navigate = useNavigate();
  const [soldierPosition, setSoldierPosition] = useState(0);
  const [isJumping, setIsJumping] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.fade-in-section').forEach((el) => {
      observer.observe(el);
    });

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollPercentage = scrollPosition / (documentHeight - windowHeight);
      setSoldierPosition(scrollPercentage * 100);

      const sections = document.querySelectorAll('.fade-in-section');
      const viewportMiddle = window.scrollY + window.innerHeight / 2;

      sections.forEach((section, index) => {
        const element = section as HTMLElement;
        if (element.offsetTop <= viewportMiddle && element.offsetTop + element.offsetHeight > viewportMiddle) {
          if (index !== currentSection) {
            setCurrentSection(index);
            setIsJumping(true);
            setTimeout(() => setIsJumping(false), 600);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [currentSection]);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white relative">
      <div className="fixed left-8 top-1/2 -translate-y-1/2 z-40 hidden lg:block">
        <div className={`soldier-character ${isJumping ? 'soldier-jump' : ''}`} style={{ transform: `translateY(${soldierPosition * 2}px)` }}>
          <div className="relative">
            <div className="w-24 h-32 bg-gradient-to-b from-[#2d5016] to-[#1a3d0f] rounded-lg relative overflow-hidden shadow-2xl">
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-10 h-10 bg-[#d4a574] rounded-full"></div>
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-12 h-3 bg-[#b30000] rounded-full"></div>
              <div className="absolute top-14 left-1/2 -translate-x-1/2 w-16 h-12 bg-[#2d5016] rounded-lg"></div>
              <div className="absolute top-14 left-1/2 -translate-x-1/2">
                <Shield size={20} className="text-[#FFD700]" />
              </div>
              <div className="absolute bottom-0 left-2 w-8 h-10 bg-[#1a3d0f] rounded-b-lg"></div>
              <div className="absolute bottom-0 right-2 w-8 h-10 bg-[#1a3d0f] rounded-b-lg"></div>
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#FFD700] rounded-full flex items-center justify-center shadow-lg animate-pulse">
              <span className="text-[#b30000] text-lg font-bold">⭐</span>
            </div>
          </div>
        </div>
      </div>
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-md z-50 border-b-4 border-[#FFD700]">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 bg-[#FFD700] text-[#b30000] px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-transform shadow-lg"
          >
            <ArrowLeft size={20} />
            Trang Chủ
          </button>
          <div className="flex items-center gap-3">
            <BookOpen className="text-[#b30000]" size={28} />
            <span className="text-[#b30000] font-bold text-xl hidden md:block">Nội Dung Trình Chiếu</span>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-12">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="bg-gradient-to-r from-[#b30000] to-[#8b0000] p-12 rounded-3xl shadow-2xl mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              BÀI THUYẾT TRÌNH
            </h1>
            <h2 className="text-2xl md:text-3xl text-[#FFD700] font-semibold">
              SINH VIÊN TRÊN "MẶT TRẬN VĂN HÓA" – CUỘC CHIẾN CHỐNG "GIẶC NỘI XÂM"
            </h2>
          </div>

          <div className="bg-gray-50 p-8 rounded-2xl shadow-lg mb-12">
            <h3 className="text-2xl font-bold text-[#b30000] mb-6 flex items-center gap-2">
              <BookOpen size={28} />
              Mục Lục
            </h3>
            <nav className="space-y-3">
              <button onClick={() => scrollToSection('section1')} className="block w-full text-left px-4 py-3 bg-white rounded-lg hover:bg-[#FFD700]/20 hover:translate-x-2 transition-all">
                <span className="font-semibold text-[#b30000]">Phần 1:</span> Dẫn Nhập – Từ Bối Cảnh Lịch Sử Đến Nhiệm Vụ Thời Đại
              </button>
              <button onClick={() => scrollToSection('section2')} className="block w-full text-left px-4 py-3 bg-white rounded-lg hover:bg-[#FFD700]/20 hover:translate-x-2 transition-all">
                <span className="font-semibold text-[#b30000]">Phần 2:</span> Nhận Diện "Kẻ Thù" – Giặc Nội Xâm Là Ai?
              </button>
              <button onClick={() => scrollToSection('section3')} className="block w-full text-left px-4 py-3 bg-white rounded-lg hover:bg-[#FFD700]/20 hover:translate-x-2 transition-all">
                <span className="font-semibold text-[#b30000]">Phần 3:</span> Vũ Khí Chiến Đấu – "Phò Chính Trừ Tà" & Đời Sống Mới
              </button>
              <button onClick={() => scrollToSection('section4')} className="block w-full text-left px-4 py-3 bg-white rounded-lg hover:bg-[#FFD700]/20 hover:translate-x-2 transition-all">
                <span className="font-semibold text-[#b30000]">Phần 4:</span> Vận Dụng Thực Tiễn – Hành Động Của Sinh Viên
              </button>
              <button onClick={() => scrollToSection('section5')} className="block w-full text-left px-4 py-3 bg-white rounded-lg hover:bg-[#FFD700]/20 hover:translate-x-2 transition-all">
                <span className="font-semibold text-[#b30000]">Phần 5:</span> Kết Luận – Mỗi Sinh Viên Là Một Chiến Sĩ
              </button>
              <button onClick={() => scrollToSection('section6')} className="block w-full text-left px-4 py-3 bg-white rounded-lg hover:bg-[#FFD700]/20 hover:translate-x-2 transition-all">
                <span className="font-semibold text-[#b30000]">Phần 6:</span> Tài Liệu Tham Khảo & Trích Dẫn
              </button>
            </nav>
          </div>

          <article className="prose prose-lg max-w-none">
            <section id="section1" className="fade-in-section mb-16">
              <div className="h-1 bg-gradient-to-r from-[#FFD700] to-[#b30000] rounded-full mb-8"></div>
              <h2 className="text-3xl font-bold text-[#b30000] mb-6">
                PHẦN 1: DẪN NHẬP – TỪ BỐI CẢNH LỊCH SỬ ĐẾN NHIỆM VỤ THỜI ĐẠI
              </h2>
              <p className="text-gray-800 leading-relaxed mb-4">
                <strong>Kính thưa thầy/cô và các bạn,</strong>
              </p>
              <p className="text-gray-800 leading-relaxed mb-4">
                Để hiểu rõ vì sao Chủ tịch Hồ Chí Minh khẳng định văn hóa là một "mặt trận" và người làm văn hóa là "chiến sĩ", chúng ta cần đặt nó trong bối cảnh lịch sử đầy biến động cuối thế kỷ XIX – đầu thế kỷ XX.
              </p>
              <p className="text-gray-800 leading-relaxed mb-4">
                Lúc bấy giờ, sau khi xâm lược Việt Nam, thực dân Pháp không chỉ dùng quân sự để thống trị mà còn thi hành nhiều chính sách cực kỳ thâm độc về văn hóa:
              </p>
              <ul className="list-disc list-inside space-y-3 mb-4 text-gray-800">
                <li><strong>Chính sách ngu dân:</strong> hạn chế mở trường, không cho dân ta học cao, chỉ đào tạo một tầng lớp tay sai phục vụ chính quyền thực dân.</li>
                <li><strong>Chính sách đồng hóa:</strong> truyền bá lối sống, tư tưởng, thói quen, thị hiếu của văn hóa Pháp với mục đích làm "nhạt nhòa" bản sắc Việt.</li>
                <li><strong>Chính sách chia rẽ tinh thần dân tộc:</strong> xuyên tạc lịch sử, thay đổi chương trình giáo dục, hạ thấp giá trị của tổ tiên ta.</li>
              </ul>
              <p className="text-gray-800 leading-relaxed mb-4">
                <strong>Thực dân không chỉ muốn chiếm đất mà còn muốn chiếm luôn linh hồn và trí tuệ dân tộc.</strong>
              </p>
              <p className="text-gray-800 leading-relaxed mb-4">
                Chính vì vậy, Hồ Chí Minh nhìn rất rõ:
              </p>
              <p className="text-gray-800 leading-relaxed ml-6 mb-2">
                → Nếu văn hóa không đứng lên, dân tộc sẽ suy yếu từ bên trong.
              </p>
              <p className="text-gray-800 leading-relaxed ml-6 mb-4">
                → Nếu tinh thần bị nô dịch, thì độc lập chính trị cũng chỉ là hình thức.
              </p>
              <div className="bg-[#FFD700]/10 border-l-4 border-[#FFD700] p-6 rounded-r-lg mb-4">
                <p className="text-gray-800 italic">
                  Bác nói: <strong>"Văn hóa nghệ thuật cũng là một mặt trận. Anh chị em là chiến sĩ trên mặt trận ấy."</strong>
                </p>
              </div>
              <p className="text-gray-800 leading-relaxed mb-4">
                Ngày nay, chúng ta không còn đối mặt với súng đạn, nhưng vẫn đang đứng trên mặt trận văn hóa mới, nơi kẻ thù không phải quân xâm lược mà là những thói hư tật xấu âm thầm gặm nhấm con người. Cuộc chiến này lặng lẽ hơn, nhưng hậu quả của nó cũng nặng nề không kém.
              </p>
            </section>

            <section id="section2" className="fade-in-section mb-16">
              <div className="h-1 bg-gradient-to-r from-[#FFD700] to-[#b30000] rounded-full mb-8"></div>
              <h2 className="text-3xl font-bold text-[#b30000] mb-6">
                PHẦN 2: NHẬN DIỆN "KẺ THÙ" – GIẶC NỘI XÂM LÀ AI?
              </h2>
              <p className="text-gray-800 leading-relaxed mb-4">
                Giặc nội xâm, theo tư tưởng Hồ Chí Minh, là những thói xấu trong chính con người Việt Nam, từ đó phá hoại phẩm chất đạo đức và làm suy yếu sức mạnh dân tộc.
              </p>
              <p className="text-gray-800 leading-relaxed mb-4">
                <strong>Đây là thứ kẻ thù "vô hình", không nhìn thấy bằng mắt thường nhưng tồn tại trong mỗi suy nghĩ, hành vi hàng ngày.</strong>
              </p>
              <p className="text-gray-800 leading-relaxed mb-6">
                Bác chỉ rõ bốn nhóm "giặc nội xâm" nguy hiểm:
              </p>

              <div className="space-y-6 mb-6">
                <div className="bg-gradient-to-r from-red-50 to-white p-6 rounded-xl shadow-md">
                  <h3 className="text-xl font-bold text-[#b30000] mb-3">1. Tham ô – lãng phí – tệ nạn mùa nào cũng có</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-800">
                    <li><strong>Tham ô</strong> làm mất niềm tin của nhân dân.</li>
                    <li><strong>Lãng phí</strong> làm thất thoát của công, của dân, của nước.</li>
                  </ul>
                  <p className="text-gray-800 mt-3">
                    Đáng sợ hơn, tham ô "mọc rễ" từ những hành vi rất nhỏ: gian lận trong lớp, chấm công hộ, sử dụng tiền quỹ sai mục đích, tiêu xài hoang phí đồng tiền của cha mẹ.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-red-50 to-white p-6 rounded-xl shadow-md">
                  <h3 className="text-xl font-bold text-[#b30000] mb-3">2. Lười biếng – quan liêu – bệnh mãn tính của nhiều thế hệ</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-800">
                    <li>Lười làm việc, lười học, lười suy nghĩ → dẫn đến phụ thuộc, thụ động, trì trệ.</li>
                    <li>Quan liêu là thói làm việc hình thức, xa rời thực tế, thiếu trách nhiệm.</li>
                  </ul>
                  <p className="text-gray-800 mt-3">
                    <strong>Một người trẻ lười biếng hôm nay → một cán bộ quan liêu ngày mai.</strong>
                  </p>
                </div>

                <div className="bg-gradient-to-r from-red-50 to-white p-6 rounded-xl shadow-md">
                  <h3 className="text-xl font-bold text-[#b30000] mb-3">3. Phù hoa – xa xỉ</h3>
                  <p className="text-gray-800 mb-3">
                    Đây là căn bệnh phổ biến nhất trong giới trẻ:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-800">
                    <li>sống ảo, khoe của</li>
                    <li>chạy theo trend độc hại</li>
                    <li>coi trọng hình thức hơn năng lực</li>
                    <li>"sống sang chảnh ảo" nhưng bên trong rỗng</li>
                  </ul>
                  <p className="text-gray-800 mt-3">
                    <strong>Hậu quả:</strong> Con người đánh mất giá trị thật, trở thành "nô lệ" của mạng xã hội.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-red-50 to-white p-6 rounded-xl shadow-md">
                  <h3 className="text-xl font-bold text-[#b30000] mb-3">4. Tâm lý nô lệ – sự tha hóa nguy hiểm nhất</h3>
                  <p className="text-gray-800 mb-3">
                    <strong>"Tự ti – sính ngoại – mất gốc"</strong>
                  </p>
                  <p className="text-gray-800 ml-6 mb-2">
                    → Nghe tiếng Việt thì ngại, nhưng nói tiếng nước ngoài sai vẫn tự hào.
                  </p>
                  <p className="text-gray-800 ml-6 mb-3">
                    → Thích đi theo trào lưu phương Tây mù quáng nhưng lại thờ ơ văn hóa dân tộc.
                  </p>
                  <p className="text-gray-800">
                    Hoặc ngược lại: bảo thủ, cực đoan, từ chối cái mới cũng là tâm lý nô lệ tinh thần.
                  </p>
                </div>
              </div>

              <div className="bg-yellow-50 border-2 border-[#FFD700] p-6 rounded-xl">
                <h3 className="text-xl font-bold text-[#b30000] mb-4">⇒ Liên hệ thực tế sinh viên – "Chiến trường" sát nhất</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-800">
                  <li><strong>Lãng phí:</strong> thời gian trôi qua trên game, mạng xã hội, "lướt TikTok cả ngày".</li>
                  <li><strong>Tham ô học thuật:</strong> đạo văn, nhờ bạn làm hộ bài nhóm, quay cóp thi cử.</li>
                  <li><strong>Lười biếng:</strong> trì hoãn, deadline dí mới làm.</li>
                  <li><strong>Phù phiếm:</strong> sống ảo, thích được công nhận qua "like" và "view".</li>
                </ul>
                <p className="text-gray-800 mt-4 font-semibold">
                  → Đây chính là những mầm bệnh âm thầm hủy hoại tương lai người trẻ.
                </p>
              </div>
            </section>

            <section id="section3" className="fade-in-section mb-16">
              <div className="h-1 bg-gradient-to-r from-[#FFD700] to-[#b30000] rounded-full mb-8"></div>
              <h2 className="text-3xl font-bold text-[#b30000] mb-6">
                PHẦN 3: VŨ KHÍ CHIẾN ĐẤU – "PHÒ CHÍNH TRỪ TÀ" & ĐỜI SỐNG MỚI
              </h2>

              <h3 className="text-2xl font-bold text-[#8b0000] mb-4">1. "PHÒ CHÍNH TRỪ TÀ" – giá trị cốt lõi của mặt trận văn hóa</h3>

              <div className="bg-red-50 p-6 rounded-xl mb-6">
                <h4 className="text-xl font-bold text-[#b30000] mb-3">TRỪ TÀ: chống lại cái xấu</h4>
                <p className="text-gray-800 mb-3">Sinh viên cần:</p>
                <ul className="list-disc list-inside space-y-2 text-gray-800">
                  <li>chống gian lận</li>
                  <li>chống lười biếng</li>
                  <li>chống vô kỷ luật</li>
                  <li>chống vô cảm trong tập thể</li>
                  <li>chống nói xấu, công kích cá nhân trên mạng</li>
                </ul>
                <p className="text-gray-800 mt-3 italic">
                  "Tà" không phải chỉ là tội ác lớn, đôi khi chỉ là sự cẩu thả, thói quen xấu, tâm lý ỷ lại.
                </p>
              </div>

              <div className="bg-yellow-50 p-6 rounded-xl mb-6">
                <h4 className="text-xl font-bold text-[#b30000] mb-3">PHÒ CHÍNH: xây dựng cái đẹp</h4>
                <ul className="list-disc list-inside space-y-2 text-gray-800">
                  <li>Biểu dương người tốt</li>
                  <li>Lan tỏa hành động tử tế</li>
                  <li>Tôn vinh sự nỗ lực</li>
                  <li>Khuyến khích tinh thần cống hiến, sẻ chia</li>
                </ul>
                <div className="bg-[#FFD700]/20 border-l-4 border-[#FFD700] p-4 mt-4 rounded-r">
                  <p className="text-gray-800 italic">
                    Bác dặn: <strong>"Muốn diệt cái xấu phải xây cái tốt."</strong>
                  </p>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-[#8b0000] mb-4">2. "ĐỜI SỐNG MỚI": CẦN – KIỆM – LIÊM – CHÍNH</h3>
              <p className="text-gray-800 mb-6">
                Đây là vũ khí đạo đức mạnh nhất chống lại giặc nội xâm.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white border-2 border-[#FFD700] p-6 rounded-xl shadow-lg">
                  <h4 className="text-xl font-bold text-[#b30000] mb-2">• CẦN</h4>
                  <p className="text-gray-800">
                    Nỗ lực, chủ động, sáng tạo → không đợi người nhắc.
                  </p>
                </div>
                <div className="bg-white border-2 border-[#FFD700] p-6 rounded-xl shadow-lg">
                  <h4 className="text-xl font-bold text-[#b30000] mb-2">• KIỆM</h4>
                  <p className="text-gray-800">
                    Không hoang phí thời gian, tiền bạc, công sức → biết đủ, biết quý trọng.
                  </p>
                </div>
                <div className="bg-white border-2 border-[#FFD700] p-6 rounded-xl shadow-lg">
                  <h4 className="text-xl font-bold text-[#b30000] mb-2">• LIÊM</h4>
                  <p className="text-gray-800">
                    Không gian dối, không tham lam → trung thực trong học tập, công việc.
                  </p>
                </div>
                <div className="bg-white border-2 border-[#FFD700] p-6 rounded-xl shadow-lg">
                  <h4 className="text-xl font-bold text-[#b30000] mb-2">• CHÍNH</h4>
                  <p className="text-gray-800">
                    Sống thẳng thắn, công bằng → dám nói đúng, làm đúng.
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-[#b30000] to-[#8b0000] text-white p-6 rounded-xl text-center">
                <p className="text-xl font-semibold">
                  Nếu mỗi sinh viên thực hành 4 phẩm chất này → giặc nội xâm sẽ suy yếu.
                </p>
              </div>
            </section>

            <section id="section4" className="fade-in-section mb-16">
              <div className="h-1 bg-gradient-to-r from-[#FFD700] to-[#b30000] rounded-full mb-8"></div>
              <h2 className="text-3xl font-bold text-[#b30000] mb-6">
                PHẦN 4: VẬN DỤNG THỰC TIỄN – HÀNH ĐỘNG CỦA SINH VIÊN
              </h2>
              <p className="text-gray-800 leading-relaxed mb-6">
                Để không chỉ hiểu mà còn thực hành, sinh viên cần hành động rõ ràng:
              </p>

              <div className="space-y-6">
                <div className="bg-gradient-to-r from-blue-50 to-white p-6 rounded-xl shadow-md border-l-4 border-blue-500">
                  <h3 className="text-xl font-bold text-[#b30000] mb-3">1. Rèn luyện Professionalism – thái độ chuyên nghiệp</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-800">
                    <li>đúng giờ</li>
                    <li>tôn trọng lời nói, lời hứa</li>
                    <li>hoàn thành công việc đúng hạn</li>
                    <li>giữ chữ tín, trách nhiệm</li>
                  </ul>
                  <p className="text-gray-800 mt-3 font-semibold">
                    → Đây là cách triệt tiêu lười biếng và bệnh đối phó.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-white p-6 rounded-xl shadow-md border-l-4 border-green-500">
                  <h3 className="text-xl font-bold text-[#b30000] mb-3">2. Bản lĩnh trên không gian mạng</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-800">
                    <li>tỉnh táo trước tin giả</li>
                    <li>không theo trend độc hại</li>
                    <li>không phát tán nội dung xấu</li>
                    <li>lan tỏa giá trị tích cực</li>
                  </ul>
                  <p className="text-gray-800 mt-3 font-semibold">
                    Không gian mạng là mặt trận nóng nhất của sinh viên thời nay.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-yellow-50 to-white p-6 rounded-xl shadow-md border-l-4 border-yellow-500">
                  <h3 className="text-xl font-bold text-[#b30000] mb-3">3. Giữ bản sắc văn hóa Việt trong hội nhập</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-800">
                    <li>học ngoại ngữ nhưng trân trọng tiếng Việt</li>
                    <li>học công nghệ nhưng hiểu lịch sử</li>
                    <li>hội nhập nhưng giữ đạo lý sống Việt Nam</li>
                  </ul>
                  <div className="bg-[#FFD700]/20 border-l-4 border-[#FFD700] p-4 mt-4 rounded-r">
                    <p className="text-gray-800 italic">
                      <strong>"Hòa nhập nhưng không hòa tan"</strong> chính là chuẩn mực của công dân toàn cầu có bản sắc.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section id="section5" className="fade-in-section mb-16">
              <div className="h-1 bg-gradient-to-r from-[#FFD700] to-[#b30000] rounded-full mb-8"></div>
              <h2 className="text-3xl font-bold text-[#b30000] mb-6">
                PHẦN 5: KẾT LUẬN – MỖI SINH VIÊN LÀ MỘT CHIẾN SĨ
              </h2>
              <div className="bg-[#FFD700]/10 border-l-4 border-[#FFD700] p-6 rounded-r-lg mb-6">
                <p className="text-gray-800 text-lg italic">
                  Hồ Chí Minh khẳng định: <strong>"Văn hoá soi đường cho quốc dân đi."</strong>
                </p>
              </div>
              <p className="text-gray-800 leading-relaxed mb-4">
                Vì vậy, mỗi sinh viên không chỉ là người thụ hưởng văn hóa mà phải là người xây dựng, bảo vệ, lan tỏa văn hóa.
              </p>
              <p className="text-gray-800 leading-relaxed mb-4">
                Cuộc chiến chống giặc nội xâm:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-800 mb-6 ml-6">
                <li>không có tiếng súng,</li>
                <li>nhưng diễn ra mỗi ngày,</li>
                <li>trong từng quyết định nhỏ,</li>
                <li>từng hành động, từng suy nghĩ của mỗi người.</li>
              </ul>
              <div className="bg-gradient-to-r from-[#b30000] to-[#8b0000] text-white p-8 rounded-2xl text-center shadow-2xl">
                <p className="text-2xl font-bold mb-2">
                  Chiến thắng giặc nội xâm chính là chiến thắng bản thân,
                </p>
                <p className="text-xl">
                  và đó là chiến thắng khó nhất nhưng ý nghĩa nhất.
                </p>
              </div>
            </section>

            <section id="section6" className="fade-in-section mb-16">
              <div className="h-1 bg-gradient-to-r from-[#FFD700] to-[#b30000] rounded-full mb-8"></div>
              <h2 className="text-3xl font-bold text-[#b30000] mb-6">
                PHẦN 6: TÀI LIỆU THAM KHẢO & TRÍCH DẪN
              </h2>

              <h3 className="text-2xl font-semibold text-[#8b0000] mb-4">
                Tài liệu tham khảo
              </h3>
              <p className="text-gray-600 mb-6 italic">
                Nguồn tư liệu và trích dẫn sử dụng trong bài trình chiếu
              </p>

              <div className="bg-gray-50 p-6 rounded-xl mb-8">
                <ol className="list-decimal list-inside space-y-3 text-gray-800">
                  <li>Hồ Chí Minh toàn tập — Tập 5, 10, 12 — Nhà xuất bản Chính trị quốc gia, Hà Nội</li>
                  <li>Tư tưởng Hồ Chí Minh về văn hóa — Viện nghiên cứu tư tưởng Hồ Chí Minh</li>
                  <li>Văn kiện Đại hội XIII của Đảng — nội dung về văn hóa, con người Việt Nam</li>
                  <li>Giáo trình Tư tưởng Hồ Chí Minh — Nhà xuất bản Chính trị quốc gia</li>
                </ol>
              </div>

              <h3 className="text-2xl font-semibold text-[#8b0000] mb-4">
                Kết luận
              </h3>
              <div className="bg-green-50 p-6 rounded-xl mb-8 border-l-4 border-green-500">
                <p className="text-gray-800 leading-relaxed mb-4">
                  Bài thuyết trình đã làm rõ tầm quan trọng của 'mặt trận văn hóa' trong tư tưởng Hồ Chí Minh và vai trò của sinh viên trong cuộc chiến chống 'giặc nội xâm' thời đại mới.
                </p>
                <p className="text-gray-800 font-semibold mb-3">Những điểm chính:</p>
                <ul className="list-disc list-inside space-y-2 text-gray-800">
                  <li>Văn hóa là nền tảng tinh thần của dân tộc</li>
                  <li>Giặc nội xâm là thách thức hiện thực với mỗi sinh viên</li>
                  <li>'Phò chính trừ tà' là phương châm hành động</li>
                  <li>Cần – Kiệm – Liêm – Chính là phẩm chất cần rèn luyện</li>
                  <li>Mỗi sinh viên là chiến sĩ trên mặt trận văn hóa</li>
                </ul>
                <p className="text-[#b30000] font-bold text-xl mt-4 text-center">
                  Chiến thắng bản thân chính là chiến thắng vĩ đại nhất!
                </p>
              </div>

              <h3 className="text-2xl font-semibold text-[#8b0000] mb-4">
                Trích dẫn
              </h3>
              <div className="space-y-4">
                <div className="bg-white border-l-4 border-[#FFD700] p-6 rounded-r-xl shadow-md">
                  <p className="text-gray-700 italic text-lg">
                    "Văn hoá soi đường cho quốc dân đi."
                  </p>
                  <p className="text-[#b30000] font-semibold mt-2">— Hồ Chí Minh</p>
                </div>

                <div className="bg-white border-l-4 border-[#FFD700] p-6 rounded-r-xl shadow-md">
                  <p className="text-gray-700 italic text-lg">
                    "Văn hóa nghệ thuật cũng là một mặt trận. Anh chị em là chiến sĩ trên mặt trận ấy."
                  </p>
                  <p className="text-[#b30000] font-semibold mt-2">— Hồ Chí Minh</p>
                </div>

                <div className="bg-white border-l-4 border-[#FFD700] p-6 rounded-r-xl shadow-md">
                  <p className="text-gray-700 italic text-lg">
                    "Muốn diệt cái xấu phải xây cái tốt."
                  </p>
                  <p className="text-[#b30000] font-semibold mt-2">— Hồ Chí Minh</p>
                </div>

                <div className="bg-white border-l-4 border-[#FFD700] p-6 rounded-r-xl shadow-md">
                  <p className="text-gray-700 italic text-lg">
                    "Vì lợi ích mười năm thì phải trồng cây, vì lợi ích trăm năm thì phải trồng người."
                  </p>
                  <p className="text-[#b30000] font-semibold mt-2">— Hồ Chí Minh</p>
                </div>
              </div>
            </section>
          </article>
        </div>
      </div>

      <div className="fixed bottom-8 right-8 z-50">
        <button
          onClick={() => navigate('/minigame')}
          className="cta-button-floating"
        >
          CHUYỂN SANG MINI GAME
        </button>
      </div>
    </div>
  );
}
