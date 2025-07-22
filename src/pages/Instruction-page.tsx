import  { useState } from 'react';
import {  Clock, Trophy, Users, BookOpen, Gift } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

export default function InstructionPage() {
  const [isChecked, setIsChecked] = useState(false);
const navigate = useNavigate();
  const handleSubmit = () => {
    if (isChecked) {
      navigate('/register-form',{ replace: true});
      window.scrollTo(0, 0);
    } else {
       toast.error('कृपया नियमों को पढ़ने के बाद चेकबॉक्स को चेक करें।');
    }
  };

  return (
    <div className="min-h-screen bg-amber-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-800 to-amber-900 text-white py-6 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">KAUN BANEGA CHAMPION - 2025</h1>
            <p className="text-xl text-amber-100">Rules & Instructions</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Welcome Message */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6 border-l-4 border-amber-600">
            <h2 className="text-2xl font-bold text-amber-800 mb-4">
              प्रिय छात्र/छात्राओं कौन बनेगा चैम्पियन क्विज (KBC -2025) में प्रतिभाग करने के लिए नियमों की सूची निम्नलिखित है –
            </h2>
          </div>

          {/* Rules Section */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="space-y-6">
              
              {/* Eligibility */}
              <div className="flex items-start space-x-4">
                <div className="bg-amber-100 p-2 rounded-full">
                  <Users className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">पात्रता:</h3>
                  <p className="text-gray-700">इस प्रतियोगिता में क्लास 8 से लेकर पोस्ट ग्रेजुएट तक के छात्र/छात्रा प्रतिभाग कर सकते हैं।</p>
                </div>
              </div>

              {/* Participation */}
              <div className="flex items-start space-x-4">
                <div className="bg-amber-100 p-2 rounded-full">
                  <BookOpen className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">प्रतिभागिता:</h3>
                  <p className="text-gray-700">इस प्रतियोगिता में संस्था के वर्तमान छात्र/छात्राओं के साथ कोई भी छात्र/छात्रा प्रतिभाग कर सकता है।</p>
                </div>
              </div>

              {/* Levels */}
              <div className="flex items-start space-x-4">
                <div className="bg-amber-100 p-2 rounded-full">
                  <Trophy className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">प्रतियोगिता के स्तर:</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <ul className="space-y-2 text-gray-700">
                      <li>• <strong>Level 1:</strong> क्लास 8th से 10th तक</li>
                      <li>• <strong>Level 2:</strong> क्लास 11h से 12th तक</li>
                      <li>• <strong>Level 3:</strong> ग्रेजुएशन और पोस्ट ग्रेजुएशन</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Schedule */}
              <div className="flex items-start space-x-4">
                <div className="bg-amber-100 p-2 rounded-full">
                  <Clock className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">कार्यक्रम:</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <ul className="space-y-2 text-gray-700">
                      <li>• <strong>रिपोर्टिंग:</strong> 25 जुलाई 2025, सुबह 10:00 बजे</li>
                      <li>• <strong>प्रतियोगिता:</strong> 25 जुलाई 2025, दोपहर 12:00 बजे</li>
                      <li>• <strong>फाइनल:</strong> 26 जुलाई 2025, सायं 4:00 बजे</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Selection Process */}
              <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                <h3 className="font-semibold text-amber-800 mb-2">चयन प्रक्रिया:</h3>
                <p className="text-gray-700 mb-2">
                  सभी प्रतियोगी छात्र/छात्राओं में केवल 10 लोगों को KBC के हॉट सीट पर बैठने का मौका मिलेगा। इसके लिए 25 जुलाई 2025 को दोपहर 12:00 बजे एक Online Test होगा।
                </p>
                <p className="text-gray-700">
                  जो प्रतिभागी कम समय में अधिक प्रश्नों का उत्तर देगा, उन्हीं 10 लोगों को KBC के हॉट सीट पर बैठने का मौका मिलेगा।
                </p>
              </div>

              {/* Question Structure */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">प्रश्न संरचना:</h3>
                <ul className="space-y-1 text-gray-700">
                  <li>• <strong>पहला चरण:</strong> 4 प्रश्न (सरल)</li>
                  <li>• <strong>दूसरा चरण:</strong> 3 प्रश्न (कुछ कठिन)</li>
                  <li>• <strong>तीसरा चरण:</strong> 3 प्रश्न (अधिक कठिन)</li>
                </ul>
              </div>

              {/* Prizes */}
              <div className="flex items-start space-x-4">
                <div className="bg-amber-100 p-2 rounded-full">
                  <Gift className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">पुरस्कार और छूट:</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-700 mb-2">
                      <strong>विजिटर स्टूडेंट्स के लिए विशेष छूट:</strong>
                    </p>
                    <ul className="space-y-1 text-gray-700">
                      <li>• पहला चरण पार करने पर: 30% फीस छूट</li>
                      <li>• दूसरा चरण पार करने पर: 50% फीस छूट</li>
                      <li>• तीसरा चरण पार करने पर: 70% फीस छूट</li>
                      <li>• चैम्पियन बनने पर: 100% फीस छूट</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Important Notes */}
              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <h3 className="font-semibold text-red-800 mb-2">महत्वपूर्ण नोट:</h3>
                <ul className="space-y-1 text-red-700">
                  <li>• इंस्टिट्यूट के 5 छात्र/छात्राओं को इस प्रतियोगिता में वरीयता दी जाएगी</li>
                  <li>• शेष 5 छात्र विजिटर स्टूडेंट्स हो सकते हैं</li>
                  <li>• विशेष स्थितियों में प्रतियोगिता की रूपरेखा या नियमों में बदलाव संभव है</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Agreement Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-3 mb-4">
              <input
                type="checkbox"
                id="agreement"
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
                className="w-5 h-5 text-amber-600 bg-gray-100 border-gray-300 rounded focus:ring-amber-500 focus:ring-2"
              />
              <label htmlFor="agreement" className="text-gray-700 cursor-pointer">
                मैंने सभी नियमों को ध्यान पूर्वक पढ़ा है और मैं इस प्रतियोगिता में सम्मिलित होना चाहता हूँ
              </label>
            </div>
            
            <button
              onClick={handleSubmit}
              disabled={!isChecked}
              className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-all duration-200 ${
                isChecked
                  ? 'bg-amber-600 hover:bg-amber-700 shadow-lg hover:shadow-xl'
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              {isChecked ? 'प्रतियोगिता में भाग लें' : 'कृपया नियमों को स्वीकार करें'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}