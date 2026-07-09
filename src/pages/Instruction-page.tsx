import { useState } from 'react';
import { Clock, Trophy, Users, ArrowRight, Sparkles, CheckCircle2, ShieldAlert, Globe, MapPin, Award, FileText, X, ZoomIn, Info } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import priceImg from "@/assets/price.jpeg";
import logoSmImg from "@/assets/logofile.png";
import championImg from "@/assets/champion.png";

export default function InstructionPage() {
  const [isChecked, setIsChecked] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (isChecked) {
      navigate('/register-form', { replace: true });
      window.scrollTo(0, 0);
    } else {
      toast.error('कृपया नियमों को पढ़ने के बाद चेकबॉक्स को चेक करें।');
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fffdec] via-[#fffbeb] to-[#fff9e6] text-gray-900 pb-16">

      {/* Main Container */}
      <div className="container mx-auto px-4 py-8 max-w-6xl">

        <div className="bg-gradient-to-r from-[#3e0b6b] via-[#1b0234] to-[#3e0b6b] text-white rounded-2xl shadow-xl p-6 md:p-8 mb-8 relative overflow-hidden border border-[#5a189a]/30">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-purple-500 rounded-full opacity-15 blur-xl"></div>
          <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-32 h-32 bg-indigo-500 rounded-full opacity-15 blur-2xl"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logos Row for Mobile (shown only on mobile) */}
            <div className="flex justify-center gap-6 items-center w-full md:hidden mb-4">
              {/* Champion Logo on mobile */}
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-[#3e0b6b] via-[#1b0234] to-[#3e0b6b] flex items-center justify-center p-2.5 shadow-lg border-2 border-purple-500/20">
                <img
                  src={championImg}
                  alt="Champion Icon"
                  className="w-full h-full object-contain"
                />
              </div>
              {/* Institute Logo on mobile */}
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-[#f1f1f1] via-[#f1f1f1] to-[#f1f1f1] flex items-center justify-center p-2.5 shadow-lg border-2 border-purple-500/20">
                <img
                  src={logoSmImg}
                  alt="SKICST Logo"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Left side: Champion Icon (Desktop only) */}
            <div className="hidden md:block flex-shrink-0">
              <div className="w-28 h-28 lg:w-32 lg:h-32 rounded-full bg-gradient-to-r from-[#3e0b6b] via-[#1b0234] to-[#3e0b6b] flex items-center justify-center p-3 shadow-xl border-2 border-purple-500/30 hover:scale-105 transition-transform duration-300">
                <img
                  src={championImg}
                  alt="Champion Icon"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Center Content */}
            <div className="flex-1 text-center flex flex-col items-center justify-center">
              <span className="bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs md:text-sm uppercase tracking-widest px-4 py-1.5 rounded-full font-bold">
                S.K. INSTITUTE OF COMPUTER SCIENCE & TECHNOLOGY
              </span>
              <h1 className="text-3xl md:text-4xl font-extrabold mt-4 mb-2 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-amber-300 to-yellow-100 drop-shadow-md">
                🏆  Kaun Banega Champion - 2026
              </h1>
              <p className="text-purple-200 text-sm md:text-lg mt-3 font-medium">
                Foundation Day Celebrating Program
              </p>
              <p className="text-purple-100 font-semibold text-md md:text-xl mt-1">
                "ज्ञान से आत्मविश्वास, कौशल से पहचान, सफलता से सम्मान"
              </p>
              <p className="text-purple-300 text-sm md:text-lg mt-2 font-medium">
                संकल्प और सिद्धि-2026
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mt-2 rounded-full"></div>
            </div>

            {/* Right side: Institute Logo (Desktop only) */}
            <div className="hidden md:block flex-shrink-0">
              <div className="w-28 h-28 lg:w-32 lg:h-32 rounded-full bg-gradient-to-r from-[#f1f1f1] via-[#f1f1f1] to-[#f1f1f1] flex items-center justify-center p-3 shadow-xl border-2 border-purple-500/30 hover:scale-105 transition-transform duration-300">
                <img
                  src={logoSmImg}
                  alt="SKICST Logo"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 2 Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Left Column: Rules, Instructions & Prize List (8 cols) */}
          <div className="lg:col-span-8 space-y-6">

            {/* Introduction Card */}
            <div className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-amber-600 hover:shadow-lg transition-shadow duration-300">
              <h2 className="text-xl md:text-2xl font-bold text-amber-800 mb-2 flex items-center">
                <Sparkles className="w-5 h-5 mr-2 text-amber-600 shrink-0 animate-pulse" />
                प्रतियोगिता के नियम एवं शर्तें
              </h2>
              <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                कौन बनेगा चैम्पियन क्विज प्रतियोगिता (KBC - 2026) में प्रतिभाग करने के लिए आधिकारिक नियम एवं दिशा-निर्देश नीचे दिए गए हैं। कृपया पंजीकरण फॉर्म भरने से पहले सभी निर्देशों को ध्यानपूर्वक पढ़ें।
              </p>
            </div>

            {/* 1. Eligibility Card */}
            <div className="bg-white rounded-2xl shadow-md p-6 md:p-8 hover:shadow-lg transition-shadow duration-300 space-y-4">
              <h3 className="text-lg md:text-xl font-bold text-gray-800 flex items-center border-b pb-3 border-gray-100">
                <Users className="w-5 h-5 mr-2.5 text-amber-600 shrink-0" />
                1. पात्रता (Eligibility Criteria)
              </h3>
              <ul className="space-y-3.5">
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-amber-600 mr-2.5 shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm md:text-base leading-relaxed">
                    इस प्रतियोगिता में कक्षा <strong>8वीं एवं उससे ऊपर</strong> के सभी छात्र-छात्राएं प्रतिभाग कर सकते हैं।
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-amber-600 mr-2.5 shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm md:text-base leading-relaxed">
                    इस प्रतियोगिता में S.K. Institute of Computer Science & Technology के छात्र-छात्राओं के साथ-साथ किसी भी अन्य स्कूल, कॉलेज या कोचिंग संस्थान के छात्र-छात्राएं भी प्रतिभाग कर सकते हैं।
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-amber-600 mr-2.5 shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm md:text-base leading-relaxed">
                    प्रतियोगिता में भाग लेने के लिए किसी विशेष संस्था से संबंधित होना अनिवार्य नहीं है। इच्छुक एवं योग्य विद्यार्थी निर्धारित पंजीकरण प्रक्रिया पूर्ण करके प्रतियोगिता में सम्मिलित हो सकते हैं।
                  </span>
                </li>
              </ul>
            </div>

            {/* 2. Registration Card */}
            <div className="bg-white rounded-2xl shadow-md p-6 md:p-8 hover:shadow-lg transition-shadow duration-300 space-y-4">
              <h3 className="text-lg md:text-xl font-bold text-gray-800 flex items-center border-b pb-3 border-gray-100">
                <FileText className="w-5 h-5 mr-2.5 text-amber-600 shrink-0" />
                2. पंजीकरण प्रक्रिया एवं शुल्क (Registration Process & Fee)
              </h3>
              <ul className="space-y-3.5">
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-amber-600 mr-2.5 shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm md:text-base leading-relaxed">
                    KBC (Kaun Banega Champion)-2026 प्रतियोगिता में सम्मिलित होने हेतु <strong>₹80/- (अस्सी रुपये मात्र)</strong> Registration Fee निर्धारित की गई है।
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-amber-600 mr-2.5 shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm md:text-base leading-relaxed">
                    इच्छुक प्रतिभागी अपना पंजीकरण <strong>Online माध्यम</strong> से भी कर सकते हैं।
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-amber-600 mr-2.5 shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm md:text-base leading-relaxed">
                    Online Registration के लिए प्रतिभागी हमारी संस्था की Official Website: <a href="https://www.skicst.org" target="_blank" rel="noopener noreferrer" className="text-amber-700 font-bold hover:underline">www.skicst.org</a> पर जाकर Registration Form भर सकते हैं।
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-amber-600 mr-2.5 shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm md:text-base leading-relaxed">
                    पंजीकरण पूर्ण होने के पश्चात प्रतिभागी को प्रतियोगिता में सम्मिलित होने हेतु आवश्यक जानकारी उपलब्ध कराई जायेगी।
                  </span>
                </li>
              </ul>
            </div>

            {/* 3. Preliminary Round Card */}
            <div className="bg-white rounded-2xl shadow-md p-6 md:p-8 hover:shadow-lg transition-shadow duration-300 space-y-4">
              <h3 className="text-lg md:text-xl font-bold text-gray-800 flex items-center border-b pb-3 border-gray-100">
                <Clock className="w-5 h-5 mr-2.5 text-amber-600 shrink-0" />
                3. प्रारंभिक चयन प्रक्रिया (Preliminary Round)
              </h3>
              <ul className="space-y-3.5">
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-amber-600 mr-2.5 shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm md:text-base leading-relaxed">
                    प्रतियोगिता के प्रथम चरण में सभी पंजीकृत प्रतिभागियों के लिए <strong>Preliminary Round</strong> आयोजित किया जायेगा।
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-amber-600 mr-2.5 shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm md:text-base leading-relaxed">
                    Preliminary Round की कुल अवधि <strong>15 मिनट</strong> होगी।
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-amber-600 mr-2.5 shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm md:text-base leading-relaxed">
                    इस चरण में प्रत्येक प्रतिभागी को <strong>20 प्रश्नों की Online परीक्षा</strong> दी जायेगी, जिसे निर्धारित समय में पूरा करना होगा।
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-amber-600 mr-2.5 shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm md:text-base leading-relaxed">
                    प्रतियोगिता के दिन प्रत्येक प्रतिभागी को एक <strong>User ID एवं Password</strong> प्रदान किया जायेगा, जिसके माध्यम से वह परीक्षा में सम्मिलित होगा।
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-amber-600 mr-2.5 shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm md:text-base leading-relaxed">
                    प्रतिभागियों द्वारा दिए गए सही उत्तरों एवं प्रश्न हल करने में लगे समय के आधार पर श्रेष्ठ प्रतिभागियों का चयन <strong>Hot Seat Round</strong> के लिए किया जायेगा।
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-amber-600 mr-2.5 shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm md:text-base leading-relaxed">
                    प्रारंभिक चयन प्रक्रिया के आधार पर <strong>न्यूनतम 10 प्रतिभागियों</strong> का चयन Hot Seat Round के लिए किया जायेगा।
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-amber-600 mr-2.5 shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm md:text-base leading-relaxed">
                    यदि Hot Seat Round के निर्धारित समय में अतिरिक्त समय उपलब्ध रहता है, तो अन्य योग्य प्रतिभागियों को भी Hot Seat पर प्रतिभाग करने का अवसर प्रदान किया जा सकता है।
                  </span>
                </li>
              </ul>
            </div>

            {/* 4. Hot Seat Round Card */}
            <div className="bg-white rounded-2xl shadow-md p-6 md:p-8 hover:shadow-lg transition-shadow duration-300 space-y-4">
              <h3 className="text-lg md:text-xl font-bold text-gray-800 flex items-center border-b pb-3 border-gray-100">
                <Trophy className="w-5 h-5 mr-2.5 text-amber-600 shrink-0" />
                4. हॉट सीट राउंड (Hot Seat Round)
              </h3>
              <ul className="space-y-3.5">
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-amber-600 mr-2.5 shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm md:text-base leading-relaxed">
                    चयनित प्रतिभागियों के लिए Hot Seat Round आयोजित किया जायेगा।
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-amber-600 mr-2.5 shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm md:text-base leading-relaxed">
                    Hot Seat Round की कुल अवधि <strong>2 घंटे</strong> निर्धारित की गई है।
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-amber-600 mr-2.5 shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm md:text-base leading-relaxed">
                    इस राउंड में कुल <strong>15 प्रश्न पूछे जायेंगे</strong>, जिन्हें कुल <strong>8 Levels</strong> में विभाजित किया गया है।
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-amber-600 mr-2.5 shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm md:text-base leading-relaxed">
                    प्रत्येक Level के लिए एक निश्चित पुरस्कार निर्धारित किया गया है।
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-amber-600 mr-2.5 shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm md:text-base leading-relaxed">
                    प्रतिभागी अपने ज्ञान, कौशल एवं सही उत्तरों के आधार पर विभिन्न Levels को पार करते हुए आकर्षक पुरस्कार प्राप्त कर सकते हैं।
                  </span>
                </li>
              </ul>
            </div>

            {/* 5. Prize Details & Image Card */}
            <div className="bg-white rounded-2xl shadow-md p-6 md:p-8 hover:shadow-lg transition-shadow duration-300 space-y-6">
              <h3 className="text-lg md:text-xl font-bold text-gray-800 flex items-center border-b pb-3 border-gray-100">
                <Award className="w-5 h-5 mr-2.5 text-amber-600 shrink-0" />
                5. पुरस्कार विवरण (Prize Details)
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                {/* Prize Table */}



              </div>

              {/* Ladder visual list */}
              <div className="mt-6">
                <span className="block text-xs uppercase tracking-wider text-amber-700 font-bold mb-3">
                  पुरस्कार सीढ़ी (Prize Ladder Quick View)
                </span>
                <div
                  onClick={() => setIsImageModalOpen(true)}
                  className="relative group cursor-zoom-in rounded-lg overflow-hidden border border-amber-300 shadow-md transition-all duration-300 hover:shadow-lg max-w-xs md:max-w-full"
                >
                  <img
                    src={priceImg}
                    alt="KBC Prize Poster"
                    className="w-full h-auto object-contain max-h-80 md:max-h-96 transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                    <span className="text-white bg-amber-600/90 text-xs px-3 py-1.5 rounded-full flex items-center font-bold">
                      <ZoomIn className="w-4 h-4 mr-1" />
                      बड़ा करके देखें
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 6. Prize Rules Card */}
            <div className="bg-white rounded-2xl shadow-md p-6 md:p-8 hover:shadow-lg transition-shadow duration-300 space-y-4">
              <h3 className="text-lg md:text-xl font-bold text-gray-800 flex items-center border-b pb-3 border-gray-100">
                <Info className="w-5 h-5 mr-2.5 text-amber-600 shrink-0" />
                6. पुरस्कार प्राप्त करने के नियम (Prize Rules)
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-amber-600 mr-2.5 shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm md:text-base leading-relaxed">
                    प्रतिभागी जिस Level तक पहुंचकर प्रतियोगिता से <strong>Quit</strong> करता है, उसे उसी Level का निर्धारित पुरस्कार प्रदान किया जायेगा।
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-amber-600 mr-2.5 shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm md:text-base leading-relaxed">
                    यदि कोई प्रतिभागी किसी प्रश्न का गलत उत्तर देता है, तो उसे <strong>उस अंतिम Level का पुरस्कार प्रदान किया जायेगा</strong>, जिसे उसने सही उत्तर देकर सफलतापूर्वक पार किया है।
                  </span>
                </li>

                {/* Example Callout Box */}
                <li className="bg-amber-50/60 border border-amber-100 rounded-xl p-4 md:p-5 mt-2 space-y-2">
                  <strong className="text-amber-900 text-sm md:text-base block">उदाहरण (Examples):</strong>
                  <div className="text-gray-700 text-xs md:text-sm leading-relaxed space-y-2">
                    <p>
                      • यदि कोई प्रतिभागी <strong>Question No. 7</strong> तक सही उत्तर देकर 3rd Level (Bottle) प्राप्त कर चुका है और <strong>Question No. 8</strong> का उत्तर गलत देता है, तो उसे 3rd Level का पुरस्कार (Bottle) ही प्रदान किया जायेगा।
                    </p>
                    <p>
                      • इसी प्रकार यदि कोई प्रतिभागी <strong>5th Level (Selfie Stick)</strong> तक पहुंच चुका है और अगले प्रश्न का उत्तर गलत देता है, तो उसे 5th Level का पुरस्कार (Selfie Stick) प्रदान किया जायेगा।
                    </p>
                  </div>
                </li>

                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-amber-600 mr-2.5 shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm md:text-base leading-relaxed">
                    यदि प्रतिभागी किसी Level पर पहुंचने के बाद प्रश्न का उत्तर दिए बिना Quit करता है, तो उसे उसी Level का पुरस्कार दिया जायेगा।
                  </span>
                </li>
              </ul>
            </div>

            {/* 7. General Rules Card */}
            <div className="bg-white rounded-2xl shadow-md p-6 md:p-8 hover:shadow-lg transition-shadow duration-300 space-y-4">
              <h3 className="text-lg md:text-xl font-bold text-gray-800 flex items-center border-b pb-3 border-gray-100">
                <ShieldAlert className="w-5 h-5 mr-2.5 text-amber-600 shrink-0" />
                7. सामान्य नियम एवं निर्देश (General Rules & Instructions)
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-amber-600 mr-2.5 shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm md:text-base leading-relaxed">
                    प्रतियोगिता को निष्पक्ष एवं पारदर्शी तरीके से संचालित किया जायेगा।
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-amber-600 mr-2.5 shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm md:text-base leading-relaxed">
                    प्रतियोगिता से संबंधित सभी निर्णय आयोजक समिति के पास सुरक्षित रहेंगे एवं उनका निर्णय अंतिम एवं मान्य होगा।
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-amber-600 mr-2.5 shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm md:text-base leading-relaxed border-l-2 border-red-200 pl-2">
                    किसी भी प्रकार की अनुचित गतिविधि (Unfair Means) पाए जाने पर प्रतिभागिता तुरंत निरस्त की जा सकती है।
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-amber-600 mr-2.5 shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm md:text-base leading-relaxed">
                    सभी प्रतिभागियों को प्रतियोगिता के निर्धारित समय एवं नियमों का पालन करना अनिवार्य होगा।
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-amber-600 mr-2.5 shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm md:text-base leading-relaxed">
                    प्रतियोगिता में भाग लेने वाले सभी प्रतिभागियों को संस्था द्वारा निर्धारित दिशा-निर्देशों का पालन करना होगा।
                  </span>
                </li>
              </ul>
            </div>

          </div>

          {/* Right Column: Schedule, Payment QR Code & Register Action (4 cols) */}
          <div className="lg:col-span-4 space-y-6">

            {/* Live Schedule Card */}
            <div className="bg-white rounded-2xl shadow-md p-6 border-t-4 border-amber-600 hover:shadow-lg transition-shadow duration-300">
              {/* price image  */}
              <div
                onClick={() => setIsImageModalOpen(true)}
                className="relative group cursor-zoom-in rounded-lg overflow-hidden border border-amber-300 shadow-md transition-all duration-300 hover:shadow-lg w-full max-w-md mx-auto lg:max-w-full"
              >
                <img
                  src={priceImg}
                  alt="KBC Prize Poster"
                  className="w-full h-auto object-contain max-h-[500px] md:max-h-[650px] lg:max-h-[750px] transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                  <span className="text-white bg-amber-600/90 text-xs px-3 py-1.5 rounded-full flex items-center font-bold">
                    <ZoomIn className="w-4 h-4 mr-1" />
                    बड़ा करके देखें
                  </span>
                </div>
              </div>
            </div>

            <div className="">

              <div className="overflow-hidden border border-amber-200 rounded-xl shadow-xs">
                <table className="min-w-full divide-y divide-amber-200 text-left text-sm">
                  <thead className="bg-amber-50">
                    <tr>
                      <th className="px-4 py-3 font-bold text-amber-900">प्रश्न संख्या (Q. No.)</th>
                      <th className="px-4 py-3 font-bold text-amber-900">Level</th>
                      <th className="px-4 py-3 font-bold text-amber-900">पुरस्कार (Prize)</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-amber-100">
                    <tr className="hover:bg-amber-50/40">
                      <td className="px-4 py-2.5 font-semibold text-gray-800">1, 2</td>
                      <td className="px-4 py-2.5 text-gray-600">1st Level</td>
                      <td className="px-4 py-2.5 font-medium text-gray-900">Pen + Key Chain 🖊️🔑</td>
                    </tr>
                    <tr className="hover:bg-amber-50/40">
                      <td className="px-4 py-2.5 font-semibold text-gray-800">3, 4</td>
                      <td className="px-4 py-2.5 text-gray-600">2nd Level</td>
                      <td className="px-4 py-2.5 font-medium text-gray-900">Mobile Stand 📱</td>
                    </tr>
                    <tr className="hover:bg-amber-50/40">
                      <td className="px-4 py-2.5 font-semibold text-gray-800">5, 6, 7</td>
                      <td className="px-4 py-2.5 text-gray-600">3rd Level</td>
                      <td className="px-4 py-2.5 font-medium text-gray-900">Bottle 🧴</td>
                    </tr>
                    <tr className="hover:bg-amber-50/40">
                      <td className="px-4 py-2.5 font-semibold text-gray-800">8, 9</td>
                      <td className="px-4 py-2.5 text-gray-600">4th Level</td>
                      <td className="px-4 py-2.5 font-medium text-gray-900">Coffee Mug ☕</td>
                    </tr>
                    <tr className="hover:bg-amber-50/40">
                      <td className="px-4 py-2.5 font-semibold text-gray-800">10, 11, 12</td>
                      <td className="px-4 py-2.5 text-gray-600">5th Level</td>
                      <td className="px-4 py-2.5 font-medium text-gray-900">Selfie Stick 🤳</td>
                    </tr>
                    <tr className="hover:bg-amber-50/40">
                      <td className="px-4 py-2.5 font-semibold text-gray-800">13</td>
                      <td className="px-4 py-2.5 text-gray-600">6th Level</td>
                      <td className="px-4 py-2.5 font-semibold text-amber-800">Bluetooth Ear Phone 🎧</td>
                    </tr>
                    <tr className="hover:bg-amber-50/40">
                      <td className="px-4 py-2.5 font-semibold text-gray-800">14</td>
                      <td className="px-4 py-2.5 text-gray-600">7th Level</td>
                      <td className="px-4 py-2.5 font-semibold text-amber-800">Buffer Sound 🔊</td>
                    </tr>
                    <tr className="bg-amber-50/60 hover:bg-amber-50">
                      <td className="px-4 py-3 font-extrabold text-amber-900">15</td>
                      <td className="px-4 py-3 font-bold text-amber-900">8th Level</td>
                      <td className="px-4 py-3 font-extrabold text-amber-950 bg-yellow-100 border border-yellow-200 rounded">Computer (कंप्यूटर) 🖥️ 🏆</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Agreement Section */}
            <div className="bg-white rounded-2xl shadow-md p-6 border border-amber-200 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-start space-x-3 mb-4">
                <input
                  type="checkbox"
                  id="agreement"
                  checked={isChecked}
                  onChange={(e) => setIsChecked(e.target.checked)}
                  className="w-5 h-5 text-amber-600 bg-gray-100 border-amber-300 rounded focus:ring-amber-500 focus:ring-2 mt-0.5 cursor-pointer accent-amber-600"
                />
                <label htmlFor="agreement" className="text-xs md:text-sm text-gray-700 cursor-pointer select-none leading-snug">
                  मैंने KBC-2026 के सभी नियमों को ध्यानपूर्वक पढ़ लिया है और मैं ₹80 पंजीकरण शुल्क और स्क्रीनशॉट वेरिफिकेशन की प्रक्रिया से सहमत हूँ।
                </label>
              </div>

              <button
                onClick={handleSubmit}
                disabled={!isChecked}
                className={`w-full py-3.5 px-6 rounded-xl font-bold text-white transition-all duration-200 flex items-center justify-center space-x-2 ${isChecked
                  ? 'bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 shadow-md hover:shadow-lg transform active:scale-98 cursor-pointer'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
              >
                <span>पंजीकरण फॉर्म भरें (Register Now)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

        {/* Organizer Footer Block */}
        <div className="bg-gradient-to-r from-[#310f54] via-[#0d011c] to-[#310f54] text-white rounded-2xl shadow-xl p-8 mt-12 border border-[#5a189a]/30 overflow-hidden relative">
          <div className="absolute top-0 right-0 -mt-6 -mr-6 w-32 h-32 bg-purple-500 rounded-full opacity-10 blur-2xl"></div>
          <div className="absolute bottom-0 left-0 -mb-6 -ml-6 w-36 h-36 bg-indigo-500 rounded-full opacity-5 blur-2xl"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center relative z-10 text-center md:text-left">
            {/* Left Section: Logo & Name */}
            <div className="space-y-3">
              <span className="bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full font-bold inline-block">
                ORGANIZER
              </span>
              <h4 className="text-lg md:text-xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-amber-300">
                S.K. Institute of Computer Science & Technology
              </h4>
              <p className="text-purple-200/80 text-xs md:text-sm italic">
                "ज्ञान से आत्मविश्वास, कौशल से पहचान, सफलता से सम्मान"
              </p>
            </div>

            {/* Middle Section: Address & Website */}
            <div className="space-y-3 flex flex-col items-center md:items-start">
              <span className="bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full font-bold inline-block">
                CONTACT DETAILS
              </span>
              <div className="space-y-2.5 text-xs md:text-sm text-purple-100">
                <p className="flex items-center justify-center md:justify-start">
                  <MapPin className="w-4 h-4 text-amber-400 mr-2 shrink-0" />
                  <span>Kotwan Road, Hanumanganj, Prayagraj</span>
                </p>
                <p className="flex items-center justify-center md:justify-start">
                  <Globe className="w-4 h-4 text-amber-400 mr-2 shrink-0" />
                  <span>Official Website: </span>
                  <a href="https://www.skicst.org" target="_blank" rel="noopener noreferrer" className="ml-1 text-yellow-300 hover:text-white font-bold hover:underline">
                    www.skicst.org
                  </a>
                </p>
              </div>
            </div>

            {/* Right Section: Branding / Theme */}
            <div className="space-y-3 flex flex-col items-center md:items-end">
              <div className="text-amber-400 text-3xl font-extrabold select-none tracking-wider font-serif">
                KBC - 2026
              </div>
              <p className="text-purple-200/60 text-xs">
                © {new Date().getFullYear()} S.K. Institute. All Rights Reserved.
              </p>
              <div className="w-16 h-0.5 bg-amber-500 rounded-full mt-1"></div>
            </div>
          </div>
        </div>

      </div>

      {/* Full-Screen Lightbox Modal for Prize Image Poster */}
      {isImageModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-xs transition-opacity duration-300"
          onClick={() => setIsImageModalOpen(false)}
        >
          <div className="absolute top-4 right-4 text-white z-50">
            <button
              onClick={() => setIsImageModalOpen(false)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              title="Close"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div
            className="relative max-w-4xl max-h-[90vh] w-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={priceImg}
              alt="KBC Prize Poster Fullscreen"
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl border border-white/10"
            />
          </div>
        </div>
      )}

    </div>
  );
}