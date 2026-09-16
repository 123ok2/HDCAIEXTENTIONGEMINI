import React, { useState } from 'react';
import { 
  Download, 
  Copy, 
  Check, 
  ExternalLink, 
  FolderArchive, 
  Upload, 
  Sparkles,
  AlertCircle,
  RotateCw,
  Github,
  ShieldCheck,
  CheckCircle2,
  HelpCircle,
  Zap,
  ArrowDown,
  Layers
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { 
  StepOneVisual, 
  StepTwoVisual, 
  StepThreeVisual, 
  GeminiUsageVisual 
} from './components/VisualGuides';
import { OutputPreview } from './components/OutputPreview';

const REPO_URL = 'https://github.com/123ok2/extentiongemini';
const DIRECT_ZIP_URL = '/extentiongemini.zip';
const GEMINI_URL = 'https://gemini.google.com';

export default function App() {
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  // Trạng thái checklist từng bước (Nịnh người dùng, tạo cảm giác hoàn thành)
  const [completedSteps, setCompletedSteps] = useState<{ [key: number]: boolean }>({
    1: false,
    2: false,
    3: false,
  });

  const toggleStep = (stepNumber: number) => {
    const nextState = !completedSteps[stepNumber];
    const newSteps = { ...completedSteps, [stepNumber]: nextState };
    setCompletedSteps(newSteps);

    // Nếu vừa hoàn thành bước cuối hoặc hoàn thành cả 3 bước thì bắn pháo hoa
    if (newSteps[1] && newSteps[2] && newSteps[3]) {
      triggerConfetti();
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText('chrome://extensions');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // Fallback nếu browser chặn
    }
  };

  const handleDownloadClick = () => {
    setDownloading(true);
    triggerConfetti();
    setTimeout(() => {
      setDownloading(false);
      // Tự động tick bước 1 nếu chưa tick
      setCompletedSteps(prev => ({ ...prev, 1: true }));
    }, 1500);
  };

  const completedCount = Object.values(completedSteps).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / 3) * 100);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans antialiased selection:bg-blue-100 selection:text-blue-900">
      
      {/* 1. THANH ĐIỀU HƯỚNG CỐ ĐỊNH CHUẨN FORM (GLASSMORPHISM) */}
      <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b border-slate-200/80 transition-all">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-600 text-white font-serif text-lg font-bold flex items-center justify-center shadow-xs">
              ∫
            </div>
            <div>
              <span className="font-bold text-slate-900 text-sm tracking-tight flex items-center gap-1.5">
                Gemini Study Exporter
                <span className="text-[10px] bg-teal-50 text-teal-700 font-bold px-1.5 py-0.2 rounded border border-teal-200/60">
                  v2.5.0
                </span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="#install-steps"
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors hidden sm:inline-block"
            >
              3 Bước Cài Đặt
            </a>
            <a
              href="#gemini-usage"
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors hidden sm:inline-block"
            >
              Cách Dùng
            </a>
            <a
              href={DIRECT_ZIP_URL}
              download="extentiongemini.zip"
              onClick={handleDownloadClick}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Tải File .ZIP</span>
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">

        {/* 2. HERO SECTION NỊNH NGƯỜI DÙNG & TỐI GIẢN */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-xs text-center space-y-6 relative overflow-hidden">
          {/* Vệt sáng trang trí tinh tế */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-b from-blue-50/80 via-teal-50/40 to-transparent rounded-full blur-2xl pointer-events-none" />

          {/* Huy hiệu tin cậy */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Tiện Ích Xuất Bài Học Gemini Chuẩn Xác 100%</span>
          </div>

          <div className="space-y-2 max-w-xl mx-auto relative">
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Cài Đặt Dễ Dàng Cho Người Mới
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              Xuất mọi cuộc trò chuyện trên <strong className="text-slate-900">Google Gemini</strong> sang <strong>Word, PDF, Markdown</strong> mà vẫn giữ nguyên từng công thức Toán LaTeX, Bảng và Code.
            </p>
          </div>

          {/* Nút tải chính to, nổi bật */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 relative">
            <a
              id="download-btn-hero"
              href={DIRECT_ZIP_URL}
              download="extentiongemini.zip"
              onClick={handleDownloadClick}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold text-sm sm:text-base shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/30 transition-all transform active:scale-98"
            >
              <Download className="w-5 h-5" />
              <span>{downloading ? 'Đang tải file xuống...' : 'Tải Tiện Ích Về Máy (.ZIP - 55 KB)'}</span>
            </a>

            <a
              href={REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-4 rounded-2xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold transition-colors"
            >
              <Github className="w-4 h-4 text-slate-500" />
              <span>Mã Nguồn GitHub</span>
            </a>
          </div>

          {/* 4 Tiêu chí an tâm cho người mới */}
          <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-2 text-slate-600 text-xs">
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              <span>Cài trong 60 giây</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>100% Offline an toàn</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />
              <span>Giữ nguyên LaTeX</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-purple-500" />
              <span>Chrome, Edge, Cốc Cốc</span>
            </div>
          </div>
        </section>

        {/* 3. BẢNG THEO DÕI TIẾN TRÌNH CÀI ĐẶT (INTERACTIVE CHECKLIST) */}
        <section className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-xs space-y-3">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900">Tiến trình cài đặt của bạn:</span>
              <span className="text-blue-700 font-bold bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200/60 text-[11px]">
                {completedCount}/3 Bước ({progressPercent}%)
              </span>
            </div>
            {progressPercent === 100 && (
              <span className="text-emerald-700 font-bold flex items-center gap-1 text-[11px]">
                🎉 Xuất sắc! Bạn đã sẵn sàng!
              </span>
            )}
          </div>

          {/* Thanh tiến trình đẹp mắt */}
          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-600 to-teal-500 transition-all duration-500 ease-out rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* 3 Nút tick tương tác */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-xs">
            <button
              onClick={() => toggleStep(1)}
              className={`p-2.5 rounded-xl border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                completedSteps[1] 
                  ? 'bg-emerald-50/70 border-emerald-300 text-emerald-900 font-medium' 
                  : 'bg-slate-50/60 border-slate-200 text-slate-700 hover:bg-slate-100/70'
              }`}
            >
              <div className={`w-4 h-4 rounded-md flex items-center justify-center text-[10px] font-bold ${
                completedSteps[1] ? 'bg-emerald-600 text-white' : 'border border-slate-400 bg-white'
              }`}>
                {completedSteps[1] ? '✓' : ''}
              </div>
              <span className="truncate">1. Đã giải nén .zip</span>
            </button>

            <button
              onClick={() => toggleStep(2)}
              className={`p-2.5 rounded-xl border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                completedSteps[2] 
                  ? 'bg-emerald-50/70 border-emerald-300 text-emerald-900 font-medium' 
                  : 'bg-slate-50/60 border-slate-200 text-slate-700 hover:bg-slate-100/70'
              }`}
            >
              <div className={`w-4 h-4 rounded-md flex items-center justify-center text-[10px] font-bold ${
                completedSteps[2] ? 'bg-emerald-600 text-white' : 'border border-slate-400 bg-white'
              }`}>
                {completedSteps[2] ? '✓' : ''}
              </div>
              <span className="truncate">2. Đã bật Developer Mode</span>
            </button>

            <button
              onClick={() => toggleStep(3)}
              className={`p-2.5 rounded-xl border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                completedSteps[3] 
                  ? 'bg-emerald-50/70 border-emerald-300 text-emerald-900 font-medium' 
                  : 'bg-slate-50/60 border-slate-200 text-slate-700 hover:bg-slate-100/70'
              }`}
            >
              <div className={`w-4 h-4 rounded-md flex items-center justify-center text-[10px] font-bold ${
                completedSteps[3] ? 'bg-emerald-600 text-white' : 'border border-slate-400 bg-white'
              }`}>
                {completedSteps[3] ? '✓' : ''}
              </div>
              <span className="truncate">3. Đã nạp tiện ích</span>
            </button>
          </div>
        </section>

        {/* 4. 3 BƯỚC CÀI ĐẶT CHI TIẾT (CHUẨN FORM & KÈM HÌNH MINH HỌA) */}
        <section id="install-steps" className="space-y-6 scroll-mt-20">
          <div className="flex items-center justify-between px-1">
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 flex items-center gap-2">
                <span>🛠️</span>
                <span>3 Bước Thực Hiện Cụ Thể</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Chỉ cần làm đúng 3 thao tác dưới đây là tiện ích sẽ chạy vĩnh viễn trên máy.
              </p>
            </div>
          </div>

          {/* BƯỚC 1 */}
          <div className="bg-white rounded-2xl p-5 sm:p-7 border border-slate-200/90 shadow-xs space-y-3.5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <span className="w-8 h-8 rounded-xl bg-blue-600 text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-xs">
                  1
                </span>
                <div>
                  <h3 className="text-slate-900 text-base font-bold">
                    Bước 1: Giải nén file extentiongemini.zip vừa tải
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                    Vào thư mục <strong>Downloads (Tải về)</strong> trên máy tính của bạn &rarr; Click chuột phải vào file <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-slate-900 font-bold">extentiongemini.zip</code> &rarr; chọn <strong>"Extract All..."</strong> (hoặc <em>"Giải nén tại đây"</em>).
                  </p>
                </div>
              </div>

              <button
                onClick={() => toggleStep(1)}
                className={`text-xs px-2.5 py-1 rounded-lg border font-semibold shrink-0 transition-colors ${
                  completedSteps[1] 
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {completedSteps[1] ? '✓ Đã xong bước 1' : 'Đánh dấu đã xong'}
              </button>
            </div>

            {/* HÌNH ẢNH MINH HỌA BƯỚC 1 */}
            <StepOneVisual />
          </div>

          {/* BƯỚC 2 */}
          <div className="bg-white rounded-2xl p-5 sm:p-7 border border-slate-200/90 shadow-xs space-y-3.5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <span className="w-8 h-8 rounded-xl bg-blue-600 text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-xs">
                  2
                </span>
                <div className="space-y-2">
                  <h3 className="text-slate-900 text-base font-bold">
                    Bước 2: Mở trang Tiện ích & Gạt BẬT Chế độ nhà phát triển
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Dán địa chỉ <code className="bg-blue-50 text-blue-700 font-mono px-2 py-0.5 rounded font-bold">chrome://extensions</code> vào thanh địa chỉ trình duyệt rồi bấm <strong>Enter</strong>.
                  </p>

                  <div className="flex flex-wrap items-center gap-2 pt-0.5">
                    <button
                      id="copy-address-btn"
                      onClick={handleCopy}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs transition-colors border border-blue-200 shadow-2xs"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700">Đã sao chép link!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-blue-600" />
                          <span>Sao chép: chrome://extensions</span>
                        </>
                      )}
                    </button>
                    <span className="text-[11px] text-slate-500">
                      (Hoặc bấm 3 chấm góc phải trình duyệt &gt; Tiện ích &gt; Quản lý tiện ích)
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => toggleStep(2)}
                className={`text-xs px-2.5 py-1 rounded-lg border font-semibold shrink-0 transition-colors ${
                  completedSteps[2] 
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {completedSteps[2] ? '✓ Đã xong bước 2' : 'Đánh dấu đã xong'}
              </button>
            </div>

            {/* HÌNH ẢNH MINH HỌA BƯỚC 2 */}
            <StepTwoVisual />
          </div>

          {/* BƯỚC 3 */}
          <div className="bg-white rounded-2xl p-5 sm:p-7 border border-slate-200/90 shadow-xs space-y-3.5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <span className="w-8 h-8 rounded-xl bg-blue-600 text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-xs">
                  3
                </span>
                <div>
                  <h3 className="text-slate-900 text-base font-bold">
                    Bước 3: Bấm "Tải tiện ích đã giải nén" & chọn thư mục
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                    Nhìn sang <strong>góc trên cùng bên trái màn hình</strong>, bấm nút <strong>"Tải tiện ích đã giải nén"</strong> (Load unpacked) &rarr; chọn đúng thư mục <code className="bg-emerald-50 text-emerald-800 px-1.5 py-0.5 rounded font-mono font-bold">extentiongemini-main</code>. Thẻ tiện ích biểu tượng <strong>∫</strong> sẽ xuất hiện như hình bên dưới!
                  </p>
                </div>
              </div>

              <button
                onClick={() => toggleStep(3)}
                className={`text-xs px-2.5 py-1 rounded-lg border font-semibold shrink-0 transition-colors ${
                  completedSteps[3] 
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {completedSteps[3] ? '✓ Đã xong bước 3' : 'Đánh dấu đã xong'}
              </button>
            </div>

            {/* HÌNH ẢNH MINH HỌA BƯỚC 3 */}
            <StepThreeVisual />

            <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div className="leading-relaxed">
                <strong>Lưu ý cho người mới:</strong> Không xóa hoặc di chuyển thư mục <code className="bg-amber-100 font-mono px-1 rounded">extentiongemini-main</code> sau khi cài, vì Chrome sẽ luôn tải trực tiếp tiện ích từ thư mục này.
              </div>
            </div>
          </div>
        </section>

        {/* 5. CÁCH SỬ DỤNG TRÊN GEMINI (CHUẨN FORM & HÌNH ẢNH) */}
        <section id="gemini-usage" className="bg-white rounded-2xl p-5 sm:p-7 border border-slate-200/90 shadow-xs space-y-4 scroll-mt-20">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg">✨</span>
                <h2 className="text-base sm:text-lg font-bold text-slate-900">
                  Cách Dùng Trên Google Gemini (30 Giây)
                </h2>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Vào <a href={GEMINI_URL} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline font-semibold">gemini.google.com</a> và bấm <strong>F5</strong> tải lại trang một lần.
              </p>
            </div>

            <a
              id="open-gemini-btn"
              href={GEMINI_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors shrink-0 shadow-xs"
            >
              <span>Mở gemini.google.com</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* HÌNH ẢNH MINH HỌA GEMINI */}
          <GeminiUsageVisual />

          {/* 2 Cách thao tác linh hoạt */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 space-y-1.5">
              <strong className="text-slate-900 text-sm block flex items-center gap-1.5">
                <span className="text-blue-600">⚡</span> Cách 1: Tải Toàn Bộ Cuộc Trò Chuyện
              </strong>
              <p className="text-slate-600 leading-relaxed">
                Nhìn vào góc dưới bên phải màn hình Gemini, bấm thanh công cụ nổi <strong>"⚡ Tải Tất Cả"</strong> để lưu trọn vẹn từ câu hỏi đầu tiên tới cuối cùng.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 space-y-1.5">
              <strong className="text-slate-900 text-sm block flex items-center gap-1.5">
                <span className="text-emerald-600">☑</span> Cách 2: Tải Chọn Lọc Từng Câu Trả Lời
              </strong>
              <p className="text-slate-600 leading-relaxed">
                Ở mỗi câu trả lời của Gemini, tick vào ô <strong>"Chọn phần này"</strong> để chỉ xuất riêng những lời giải hoặc đoạn code bạn cần nộp bài.
              </p>
            </div>
          </div>
        </section>

        {/* 6. XEM TRƯỚC TÀI LIỆU SAU KHI XUẤT (NỊNH NGƯỜI DÙNG) */}
        <OutputPreview />

        {/* 7. GIẢI ĐÁP THẮC MẮC PHỔ BIẾN CHO NGƯỜI MỚI (FAQ) */}
        <section className="bg-white rounded-2xl p-5 sm:p-7 border border-slate-200/90 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <HelpCircle className="w-5 h-5 text-blue-600" />
            <h3 className="font-bold text-slate-900 text-base">
              Câu Hỏi Người Mới Thường Gặp
            </h3>
          </div>

          <div className="space-y-3 text-xs sm:text-sm">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
              <strong className="text-slate-900 block font-semibold">
                ❓ Báo lỗi: "Không thể tải tệp kê khai" (Manifest file is missing)?
              </strong>
              <p className="text-slate-600 leading-relaxed text-xs">
                &rarr; Bạn đã bấm nhầm thư mục bọc ngoài cùng. Hãy đảm bảo khi bấm <em>"Tải tiện ích đã giải nén"</em>, bạn chọn đúng thư mục <code className="bg-slate-200/70 font-mono px-1 rounded text-slate-800">extentiongemini-main</code> (thư mục có chứa file <code>manifest.json</code> ở ngay bên trong).
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
              <strong className="text-slate-900 block font-semibold">
                ❓ Sau khi tắt máy tính thì có cần cài lại không?
              </strong>
              <p className="text-slate-600 leading-relaxed text-xs">
                &rarr; <strong>Không cần!</strong> Chrome sẽ tự động ghi nhớ và kích hoạt tiện ích mỗi lần bạn mở trình duyệt. Bạn chỉ cần cài một lần duy nhất.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
              <strong className="text-slate-900 block font-semibold">
                ❓ Tiện ích có an toàn cho tài khoản Google của tôi không?
              </strong>
              <p className="text-slate-600 leading-relaxed text-xs">
                &rarr; <strong>Tuyệt đối 100% an toàn!</strong> Tiện ích hoạt động thuần túy trên máy cá nhân của bạn (Client-Side), không gửi bất kỳ dữ liệu hay mật khẩu nào ra máy chủ bên ngoài. Mã nguồn công khai hoàn toàn trên GitHub.
              </p>
            </div>
          </div>
        </section>

        {/* 8. FOOTER KẾT TRANG */}
        <footer className="text-center space-y-2 py-6 text-xs text-slate-400">
          <p>
            Phát triển phục vụ cộng đồng học tập & nghiên cứu Google Gemini • 100% Mã nguồn mở
          </p>
          <div className="flex items-center justify-center gap-4 text-slate-500 font-medium">
            <a href={REPO_URL} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">
              GitHub Repository
            </a>
            <span>•</span>
            <a href={GEMINI_URL} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">
              Trang Chủ Gemini
            </a>
            <span>•</span>
            <a href={DIRECT_ZIP_URL} download="extentiongemini.zip" className="hover:text-blue-600 transition-colors">
              Tải file .zip (55 KB)
            </a>
          </div>
        </footer>

      </main>
    </div>
  );
}
