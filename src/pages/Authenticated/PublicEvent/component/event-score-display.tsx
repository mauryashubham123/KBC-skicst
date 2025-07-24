import React, { useState, useEffect } from 'react';
import { Trophy, Star, Medal, CheckCircle, Clock, Users, Target } from 'lucide-react';

// Main Score Display Component
const EventScoreDisplay = ({ event, answers }) => {
  const [showAnimation, setShowAnimation] = useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  // Motivational messages based on score
  const getMotivationalMessages = () => {
    if (event.score >= 90) {
      return [
        "🌟 अद्भुत! आप एक सच्चे चैंपियन हैं!",
        "🏆 आपका प्रदर्शन शानदार रहा!",
        "✨ आप इस quiz के विजेता हैं!"
      ];
    } else if (event.score >= 70) {
      return [
        "👏 बहुत बढ़िया! आपने अच्छा प्रदर्शन किया!",
        "🎯 आप सही राह पर हैं!",
        "💪 आपकी मेहनत रंग लाई!"
      ];
    } else if (event.score >= 50) {
      return [
        "📚 अच्छी कोशिश! और भी बेहतर कर सकते हैं!",
        "🌱 आप सीख रहे हैं, यही सबसे जरूरी है!",
        "🎪 अभ्यास से आप और भी बेहतर बनेंगे!"
      ];
    } else {
      return [
        "🤗 कोई बात नहीं! अगली बार जरूर बेहतर करेंगे!",
        "📖 सीखना एक यात्रा है, आगे बढ़ते रहें!",
        "💫 हर गलती एक सीख है!"
      ];
    }
  };

  const messages = getMotivationalMessages();

  // Animation effects
  useEffect(() => {
    setShowAnimation(true);
    
    // Cycle through messages
    const messageInterval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
    }, 3000);

    return () => clearInterval(messageInterval);
  }, [messages.length]);

  // Get trophy icon based on score
  const getTrophyIcon = (answers) => {
    if (answers?.score >= 90) return <Trophy className="w-16 h-16 text-yellow-500" />;
    if (answers?.score >= 70) return <Medal className="w-16 h-16 text-orange-500" />;
    if (answers?.score >= 50) return <Star className="w-16 h-16 text-blue-500" />;
    return <Target className="w-16 h-16 text-gray-500" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 p-6">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-32 h-32 bg-yellow-300 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-32 left-16 w-24 h-24 bg-orange-400 rounded-full opacity-15 animate-bounce"></div>
        <div className="absolute top-1/3 left-1/4 w-16 h-16 bg-amber-400 rounded-full opacity-25 animate-ping"></div>
        <div className="absolute bottom-20 right-1/3 w-20 h-20 bg-yellow-500 rounded-full opacity-20 animate-pulse"></div>
        
        {/* Floating Icons */}
        <div className="absolute top-1/4 right-1/4 animate-bounce">
          <Star className="w-8 h-8 text-yellow-400 opacity-30" />
        </div>
        <div className="absolute bottom-1/3 left-1/3 animate-pulse">
          <Trophy className="w-6 h-6 text-amber-500 opacity-25" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Main Score Card */}
        <div className={`bg-white rounded-2xl shadow-2xl border border-amber-200 overflow-hidden transform transition-all duration-1000 ${
          showAnimation ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}>
          
          {/* Header Section */}
          <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white p-8 text-center">
            <div className={`transform transition-all duration-1000 delay-300 ${
              showAnimation ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              <div className="mb-4 flex justify-center">
                <div className="animate-bounce">
                  {getTrophyIcon(answers.score)}
                </div>
              </div>
              <h1 className="text-3xl font-bold mb-2">🎉 Quiz पूर्ण! 🎉</h1>
              <p className="text-amber-100 text-lg">आपका स्कोर तैयार है!</p>
            </div>
          </div>

          {/* Score Section */}
          <div className="p-8">
            <div className={`text-center mb-8 transform transition-all duration-1000 delay-500 ${
              showAnimation ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              {/* Main Score Display */}
              <div className="bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl p-8 mb-6 border border-amber-200">
                <div className="text-6xl font-bold text-amber-700 mb-2 animate-pulse">
                  {answers?.score}
                </div>
                <div className="text-xl text-gray-700 mb-4">
                  स्कोर 
                </div>
                
                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                  <div
                    className="bg-gradient-to-r from-amber-500 to-orange-500 h-4 rounded-full transition-all duration-2000 ease-out"
                    style={{ width: `${answers?.score}%` }}
                  ></div>
                </div>
              </div>

              {/* Motivational Message */}
              <div className={`bg-amber-50 rounded-xl p-6 border border-amber-200 transform transition-all duration-500 ${
                showAnimation ? 'scale-100' : 'scale-95'
              }`}>
                <div className="text-2xl font-bold text-amber-800 mb-2 animate-pulse">
                  {messages[currentMessageIndex]}
                </div>
                <div className="flex justify-center gap-2 mt-4">
                  {messages.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentMessageIndex ? 'bg-amber-600' : 'bg-amber-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

     
          </div>
        </div>

        {/* Footer Message */}
        <div className={`text-center mt-8 transform transition-all duration-1000 delay-1300 ${
          showAnimation ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <p className="text-amber-700 text-lg font-semibold">
            🎓 धन्यवाद! आगे भी सीखते रहें! 🎓
          </p>
        </div>
      </div>
    </div>
  );
};

export default EventScoreDisplay;