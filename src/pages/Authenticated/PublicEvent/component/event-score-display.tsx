import { useState, useEffect } from 'react';
import { Trophy, Star, Medal, CheckCircle, Clock, Users, Target } from 'lucide-react';

// Main Score Display Component
const EventScoreDisplay = ({ event, userAnswers }: { event: any; userAnswers: any; isLoading: boolean }) => {
  const [showAnimation, setShowAnimation] = useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  // Motivational messages based on score
  const getMotivationalMessages = (scorePercentage: number) => {
    if (scorePercentage >= 90) {
      return [
        "🌟 अद्भुत! आप एक सच्चे चैंपियन हैं!",
        "🏆 आपका प्रदर्शन शानदार रहा!",
        "✨ आप इस quiz के विजेता हैं!"
      ];
    } else if (scorePercentage >= 70) {
      return [
        "👏 बहुत बढ़िया! आपने अच्छा प्रदर्शन किया!",
        "🎯 आप सही राह पर हैं!",
        "💪 आपकी मेहनत रंग लाई!"
      ];
    } else if (scorePercentage >= 50) {
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

  // Calculate dummy score (you can replace with real calculation)
  const calculateScore = () => {
    if (!userAnswers || !event?.questions) return { correct: 0, total: 0, percentage: 0 };
    
    // Dummy calculation for demo
    const total = event.questions.length;
    const correct = Math.floor(Math.random() * total); // Replace with real logic
    const percentage = Math.round((correct / total) * 100);
    
    return { correct, total, percentage };
  };

  const score = calculateScore();
  const messages = getMotivationalMessages(score.percentage);

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
  const getTrophyIcon = (percentage: number) => {
    if (percentage >= 90) return <Trophy className="w-16 h-16 text-yellow-500" />;
    if (percentage >= 70) return <Medal className="w-16 h-16 text-orange-500" />;
    if (percentage >= 50) return <Star className="w-16 h-16 text-blue-500" />;
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
                  {getTrophyIcon(score.percentage)}
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
                  {score.percentage}%
                </div>
                <div className="text-xl text-gray-700 mb-4">
                  {score.correct} / {score.total} सही उत्तर
                </div>
                
                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                  <div
                    className="bg-gradient-to-r from-amber-500 to-orange-500 h-4 rounded-full transition-all duration-2000 ease-out"
                    style={{ width: `${score.percentage}%` }}
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

            {/* Stats Cards */}
            <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 transform transition-all duration-1000 delay-700 ${
              showAnimation ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              <div className="bg-green-50 rounded-lg p-4 border border-green-200 text-center">
                <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-700">{score.correct}</div>
                <div className="text-sm text-green-600">सही उत्तर</div>
              </div>
              
              <div className="bg-red-50 rounded-lg p-4 border border-red-200 text-center">
                <Clock className="w-8 h-8 text-red-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-red-700">{score.total - score.correct}</div>
                <div className="text-sm text-red-600">गलत उत्तर</div>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200 text-center">
                <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-700">{score.total}</div>
                <div className="text-sm text-blue-600">कुल प्रश्न</div>
              </div>
            </div>

            {/* Event Info */}
            <div className={`bg-amber-50 rounded-lg p-6 border border-amber-200 transform transition-all duration-1000 delay-900 ${
              showAnimation ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              <h3 className="text-lg font-bold text-amber-800 mb-3 text-center">
                📊 Quiz विवरण
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Quiz नाम:</span>
                  <span className="font-semibold">{event?.title || 'KBC Quiz'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">कुल समय:</span>
                  <span className="font-semibold">{score.total * 30} सेकंड</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">औसत समय:</span>
                  <span className="font-semibold">30 सेकंड/प्रश्न</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">प्रदर्शन:</span>
                  <span className={`font-semibold ${
                    score.percentage >= 70 ? 'text-green-600' : 
                    score.percentage >= 50 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {score.percentage >= 70 ? 'उत्कृष्ट' : 
                     score.percentage >= 50 ? 'अच्छा' : 'सुधार की जरूरत'}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className={`text-center mt-8 transform transition-all duration-1000 delay-1100 ${
              showAnimation ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-8 py-3 rounded-lg font-bold hover:from-amber-700 hover:to-orange-700 transition-all duration-200 transform hover:scale-105 shadow-lg">
                  🏠 होम पेज पर जाएं
                </button>
                <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-lg font-bold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105 shadow-lg">
                  🔄 दोबारा खेलें
                </button>
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