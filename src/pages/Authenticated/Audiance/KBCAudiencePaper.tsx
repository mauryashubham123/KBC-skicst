
import { useState, useEffect } from 'react';
import { Clock, Trophy, User, CheckCircle, AlertCircle, Timer, Users, Star, Award, Zap, Play, ArrowRight, Crown, Sparkles, Target, School, MapPin, Brain, BookOpen, Lightbulb, Youtube, Image, Camera, Video } from 'lucide-react';

export default function KBCAudiencePaper() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [timeLeft, setTimeLeft] = useState(30);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);

  const questions = [
    {
      id: 1,
      question: "भारत का राष्ट्रीय पक्षी कौन सा है?",
      options: ["मोर", "कौआ", "तोता", "बाज"],
      correct: "मोर"
    },
    {
      id: 2,
      question: "भारत की राजधानी क्या है?",
      options: ["मुंबई", "नई दिल्ली", "कोलकाता", "चेन्नई"],
      correct: "नई दिल्ली"
    },
    {
      id: 3,
      question: "गंगा नदी का उद्गम स्थल कहाँ है?",
      options: ["गोमुख", "यमुनोत्री", "केदारनाथ", "बद्रीनाथ"],
      correct: "गोमुख"
    },
    {
      id: 4,
      question: "भारत में कुल कितने राज्य हैं?",
      options: ["27", "28", "29", "30"],
      correct: "28"
    },
    {
      id: 5,
      question: "महात्मा गांधी का जन्म कहाँ हुआ था?",
      options: ["अहमदाबाद", "राजकोट", "पोरबंदर", "सूरत"],
      correct: "पोरबंदर"
    }
  ];

  useEffect(() => {
    let timer;
    if (gameStarted && !gameCompleted && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleTimeUp();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameStarted, gameCompleted, timeLeft]);

  const startGame = () => {
    setGameStarted(true);
    setTimeLeft(30);
  };

  const handleTimeUp = () => {
    setAnsweredQuestions(prev => [...prev, { questionId: questions[currentQuestion].id, correct: false, userAnswer: null }]);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setTimeLeft(30);
      setSelectedAnswer('');
    } else {
      setGameCompleted(true);
      setShowResult(true);
    }
  };

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
    const isCorrect = answer === questions[currentQuestion].correct;
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
    
    setAnsweredQuestions(prev => [...prev, { 
      questionId: questions[currentQuestion].id, 
      correct: isCorrect, 
      userAnswer: answer,
      correctAnswer: questions[currentQuestion].correct
    }]);
    
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setTimeLeft(30);
        setSelectedAnswer('');
      } else {
        setGameCompleted(true);
        setShowResult(true);
      }
    }, 1000);
  };

  const resetGame = () => {
    setCurrentQuestion(0);
    setSelectedAnswer('');
    setTimeLeft(30);
    setScore(0);
    setGameStarted(false);
    setGameCompleted(false);
    setShowResult(false);
    setAnsweredQuestions([]);
  };

  const goToQuestion = (index) => {
    if (index <= answeredQuestions.length) {
      setCurrentQuestion(index);
    }
  };

  // Enhanced Animated Background Illustration Component
  const AnimatedBackgroundIllustration = () => (
    <div className="absolute inset-0 overflow-hidden opacity-15">
      {/* Floating Brain */}
      <div className="absolute top-20 left-16 animate-bounce">
        <div className="transform rotate-12 hover:rotate-45 transition-transform duration-3000">
          <Brain className="w-32 h-32 text-blue-300 animate-pulse" />
        </div>
      </div>
      
      {/* Spinning BookOpen */}
      <div className="absolute top-40 right-20 animate-spin" style={{ animationDuration: '8s' }}>
        <BookOpen className="w-28 h-28 text-green-300" />
      </div>
      
      {/* Pulsing Lightbulb */}
      <div className="absolute bottom-40 left-12 animate-pulse">
        <div className="transform rotate-45 hover:rotate-90 transition-transform duration-2000">
          <Lightbulb className="w-24 h-24 text-yellow-300" />
          <div className="absolute -inset-2 bg-yellow-300/20 rounded-full animate-ping"></div>
        </div>
      </div>
      
      {/* Bouncing Target */}
      <div className="absolute bottom-20 right-16 animate-bounce" style={{ animationDelay: '1s' }}>
        <Target className="w-20 h-20 text-purple-300 animate-spin" style={{ animationDuration: '4s' }} />
      </div>
      
      {/* Twinkling Stars */}
      <div className="absolute top-1/2 left-1/3 animate-ping">
        <Star className="w-16 h-16 text-indigo-300" />
      </div>
      
      <div className="absolute top-1/4 left-1/2 animate-pulse" style={{ animationDelay: '2s' }}>
        <Star className="w-12 h-12 text-pink-300" />
      </div>
      
      {/* Floating Trophy */}
      <div className="absolute top-1/3 right-1/3 animate-bounce" style={{ animationDelay: '0.5s' }}>
        <div className="transform rotate-12 hover:rotate-0 transition-transform duration-2000">
          <Trophy className="w-20 h-20 text-amber-300" />
          <div className="absolute -inset-1 bg-amber-300/30 rounded-full animate-pulse"></div>
        </div>
      </div>
      
      {/* Additional floating elements */}
      <div className="absolute top-3/4 left-1/4 animate-float">
        <Sparkles className="w-14 h-14 text-emerald-300 animate-pulse" />
      </div>
      
      <div className="absolute top-1/6 right-1/4 animate-bounce" style={{ animationDelay: '1.5s' }}>
        <Award className="w-18 h-18 text-rose-300 animate-spin" style={{ animationDuration: '6s' }} />
      </div>

      {/* CSS Animation Keyframes */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );

  // Result Screen Background Illustration
  const ResultBackgroundIllustration = ({ percentage }) => {
    const isChampion = percentage >= 80;
    const isGood = percentage >= 60;
    
    return (
      <div className="absolute inset-0 overflow-hidden opacity-20">
        {/* Confetti effect for champions */}
        {isChampion && (
          <>
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-bounce"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${2 + Math.random() * 2}s`
                }}
              >
                <Sparkles className="w-6 h-6 text-yellow-300 animate-pulse" />
              </div>
            ))}
          </>
        )}
        
        {/* Floating trophies */}
        <div className="absolute top-10 left-10 animate-bounce">
          <Trophy className="w-24 h-24 text-amber-300 animate-pulse" />
        </div>
        
        <div className="absolute bottom-10 right-10 animate-bounce" style={{ animationDelay: '1s' }}>
          <Crown className="w-20 h-20 text-yellow-400 animate-spin" style={{ animationDuration: '8s' }} />
        </div>
        
        <div className="absolute top-1/2 left-10 animate-pulse">
          <Star className="w-16 h-16 text-blue-300" />
        </div>
        
        <div className="absolute top-20 right-20 animate-bounce" style={{ animationDelay: '0.5s' }}>
          <Award className="w-18 h-18 text-purple-300" />
        </div>

        {/* Celebration particles */}
        {isChampion && (
          <div className="absolute inset-0">
            {[...Array(15)].map((_, i) => (
              <div
                key={`particle-${i}`}
                className="absolute w-2 h-2 bg-gradient-to-r from-yellow-400 to-red-500 rounded-full animate-ping"
                style={{
                  left: `${10 + Math.random() * 80}%`,
                  top: `${10 + Math.random() * 80}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${1 + Math.random() * 2}s`
                }}
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 relative overflow-hidden">
        <AnimatedBackgroundIllustration />
        
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <Crown className="w-16 h-16 text-yellow-400 mr-4 animate-bounce" />
              <div>
                <h1 className="text-5xl md:text-6xl font-bold text-white tracking-wider drop-shadow-2xl animate-pulse">
                  KAUN BANEGA CHAMPION
                </h1>
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-transparent bg-clip-text">
                  <h2 className="text-3xl md:text-4xl font-bold animate-bounce">2025</h2>
                </div>
              </div>
              <Crown className="w-16 h-16 text-yellow-400 ml-4 animate-bounce" style={{ animationDelay: '0.5s' }} />
            </div>
            <div className="flex items-center justify-center text-slate-300 animate-fade-in">
              <School className="w-6 h-6 mr-2 animate-pulse" />
              <span className="text-xl font-semibold">SKICST Institute</span>
            </div>
          </div>

          {/* Media Links Section */}
          {/* <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="bg-red-600/80 backdrop-blur-sm rounded-lg p-3 flex items-center space-x-2 hover:scale-105 transition-transform cursor-pointer">
              <Youtube className="w-5 h-5 text-white" />
              <span className="text-white text-sm font-medium">YouTube चैनल</span>
            </div>
            <div className="bg-blue-600/80 backdrop-blur-sm rounded-lg p-3 flex items-center space-x-2 hover:scale-105 transition-transform cursor-pointer">
              <Image className="w-5 h-5 text-white" />
              <span className="text-white text-sm font-medium">फोटो गैलरी</span>
            </div>
            <div className="bg-green-600/80 backdrop-blur-sm rounded-lg p-3 flex items-center space-x-2 hover:scale-105 transition-transform cursor-pointer">
              <Video className="w-5 h-5 text-white" />
              <span className="text-white text-sm font-medium">वीडियो</span>
            </div>
          </div> */}

          {/* Game Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 w-full max-w-4xl">
            <div className="bg-slate-800/70 backdrop-blur-sm rounded-xl p-6 text-center border border-slate-600/30 hover:scale-105 transition-transform">
              <Target className="w-10 h-10 text-blue-400 mx-auto mb-3 animate-pulse" />
              <h3 className="text-lg font-bold text-white mb-2">कुल प्रश्न</h3>
              <p className="text-3xl font-bold text-blue-400">{questions.length}</p>
            </div>
            
            <div className="bg-slate-800/70 backdrop-blur-sm rounded-xl p-6 text-center border border-slate-600/30 hover:scale-105 transition-transform">
              <Timer className="w-10 h-10 text-green-400 mx-auto mb-3 animate-spin" style={{ animationDuration: '3s' }} />
              <h3 className="text-lg font-bold text-white mb-2">प्रति प्रश्न</h3>
              <p className="text-3xl font-bold text-green-400">30 सेकंड</p>
            </div>
            
            <div className="bg-slate-800/70 backdrop-blur-sm rounded-xl p-6 text-center border border-slate-600/30 hover:scale-105 transition-transform">
              <Award className="w-10 h-10 text-purple-400 mx-auto mb-3 animate-bounce" />
              <h3 className="text-lg font-bold text-white mb-2">कुल समय</h3>
              <p className="text-3xl font-bold text-purple-400">{Math.ceil(questions.length * 30 / 60)} मिनट</p>
            </div>
          </div>

          {/* Rules */}
          <div className="bg-slate-800/60 backdrop-blur-md rounded-2xl p-8 mb-8 w-full max-w-4xl border border-slate-600/30 hover:bg-slate-800/70 transition-all">
            <h3 className="text-2xl font-bold text-white mb-6 text-center flex items-center justify-center">
              <AlertCircle className="w-7 h-7 mr-3 text-yellow-400 animate-pulse" />
              नियम और निर्देश
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start space-x-3 hover:scale-105 transition-transform">
                <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0 animate-pulse" />
                <p className="text-slate-200">प्रत्येक प्रश्न के लिए 30 सेकंड</p>
              </div>
              <div className="flex items-start space-x-3 hover:scale-105 transition-transform">
                <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0 animate-pulse" />
                <p className="text-slate-200">कुल 5 प्रश्न</p>
              </div>
              <div className="flex items-start space-x-3 hover:scale-105 transition-transform">
                <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0 animate-pulse" />
                <p className="text-slate-200">सही उत्तर के लिए 1 अंक</p>
              </div>
              <div className="flex items-start space-x-3 hover:scale-105 transition-transform">
                <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0 animate-pulse" />
                <p className="text-slate-200">समय समाप्त होने पर अगला प्रश्न</p>
              </div>
            </div>
          </div>

          {/* Start Button */}
          <button
            onClick={startGame}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-xl font-bold py-4 px-10 rounded-xl shadow-lg transform hover:scale-110 transition-all duration-300 flex items-center space-x-3 animate-pulse hover:animate-none"
          >
            <Play className="w-6 h-6 animate-bounce" />
            <span>खेल शुरू करें</span>
            <ArrowRight className="w-6 h-6 animate-bounce" style={{ animationDelay: '0.5s' }} />
          </button>
        </div>
      </div>
    );
  }

  if (showResult) {
    const percentage = (score / questions.length) * 100;
    let resultMessage = "";
    let resultIcon = null;
    let bgColor = "";

    if (percentage >= 80) {
      resultMessage = "बधाई हो! आप एक सच्चे चैम्पियन हैं! 🏆";
      resultIcon = <Crown className="w-20 h-20 text-yellow-400 animate-bounce" />;
      bgColor = "from-yellow-600 to-orange-600";
    } else if (percentage >= 60) {
      resultMessage = "बहुत बढ़िया! आपने अच्छा प्रदर्शन किया है! 👏";
      resultIcon = <Trophy className="w-20 h-20 text-blue-400 animate-pulse" />;
      bgColor = "from-blue-600 to-purple-600";
    } else {
      resultMessage = "अभ्यास करते रहें! आप बेहतर कर सकते हैं! 💪";
      resultIcon = <Target className="w-20 h-20 text-green-400 animate-spin" style={{ animationDuration: '3s' }} />;
      bgColor = "from-green-600 to-teal-600";
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 flex items-center justify-center p-6 relative overflow-hidden">
        <ResultBackgroundIllustration percentage={percentage} />
        
        <div className="bg-slate-800/80 backdrop-blur-md rounded-2xl p-10 text-center w-full max-w-2xl border border-slate-600/30 relative z-10 hover:scale-105 transition-transform">
          <div className="mb-6 relative">
            {resultIcon}
            {percentage >= 80 && (
              <div className="absolute -inset-4">
                <div className="w-full h-full border-4 border-yellow-400 rounded-full animate-ping opacity-75"></div>
              </div>
            )}
          </div>
          
          <h2 className="text-3xl font-bold text-white mb-4 animate-fade-in">परिणाम</h2>
          
          <div className={`text-5xl font-bold mb-4 bg-gradient-to-r ${bgColor} text-transparent bg-clip-text animate-pulse`}>
            {score}/{questions.length}
          </div>
          
          <div className="text-xl font-semibold text-slate-300 mb-6 animate-bounce">
            स्कोर: {percentage.toFixed(0)}%
          </div>
          
          <p className="text-lg text-slate-200 mb-6 animate-fade-in">{resultMessage}</p>
          
          {/* Enhanced info section with media links */}
          <div className="bg-slate-700/50 rounded-xl p-4 mb-6 border border-slate-600/30">
            <div className="flex items-center justify-center space-x-2 text-blue-300 mb-4">
              <AlertCircle className="w-5 h-5 animate-pulse" />
              <span className="font-semibold">महत्वपूर्ण सूचना</span>
            </div>
            <p className="text-slate-300 text-center mb-4">
              आपको सभी प्रश्नों के सही उत्तर 24 घंटे के अंदर मिल जाएंगे
            </p>
            
            {/* Media links in result */}
            <div className="flex flex-wrap justify-center gap-3">
              <div className="bg-red-600/60 backdrop-blur-sm rounded-lg p-2 flex items-center space-x-1 hover:scale-105 transition-transform cursor-pointer">
                <Youtube className="w-4 h-4 text-white" />
                <span className="text-white text-xs">Video Solution</span>
              </div>
              <div className="bg-blue-600/60 backdrop-blur-sm rounded-lg p-2 flex items-center space-x-1 hover:scale-105 transition-transform cursor-pointer">
                <Camera className="w-4 h-4 text-white" />
                <span className="text-white text-xs">Screenshots</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-center mb-8 text-slate-400 animate-pulse">
            <School className="w-5 h-5 mr-2" />
            <span>SKICST Institute</span>
          </div>
          
          <button
            onClick={resetGame}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-3 px-8 rounded-xl shadow-lg transform hover:scale-110 transition-all duration-300 animate-pulse hover:animate-none"
          >
            फिर से खेलें
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 relative overflow-hidden">
      <AnimatedBackgroundIllustration />
      
      {/* Mobile Layout */}
      <div className="lg:hidden relative z-10">
        {/* Mobile Header */}
        <div className="bg-slate-800/90 backdrop-blur-md p-4 border-b border-slate-600/30">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center space-x-3">
              <Crown className="w-6 h-6 text-yellow-400 animate-pulse" />
              <span className="text-white font-bold">KBC Champion</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Trophy className="w-5 h-5 text-yellow-400 animate-bounce" />
                <span className="text-white font-bold">{score}/{questions.length}</span>
              </div>
              <div className={`flex items-center space-x-1 ${timeLeft <= 10 ? 'text-red-400 animate-pulse' : 'text-white'}`}>
                <Clock className="w-5 h-5 animate-spin" style={{ animationDuration: '2s' }} />
                <span className="font-bold text-xl">{timeLeft}s</span>
              </div>
            </div>
          </div>
          
          {/* Progress */}
          <div className="bg-slate-700 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-full transition-all duration-500"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Mobile Question */}
        <div className="p-4">
          <div className="bg-slate-800/70 backdrop-blur-sm rounded-xl p-6 mb-4 border border-slate-600/30 hover:bg-slate-800/80 transition-all">
            <div className="text-center mb-6">
              <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                प्रश्न {currentQuestion + 1} / {questions.length}
              </span>
            </div>
            <h2 className="text-xl font-bold text-white mb-6 leading-relaxed text-center">
              {questions[currentQuestion].question}
            </h2>

            {/* Mobile Options */}
            <div className="space-y-3">
              {questions[currentQuestion].options.map((option, index) => {
                const letters = ['A', 'B', 'C', 'D'];
                const isSelected = selectedAnswer === option;
                const isCorrect = option === questions[currentQuestion].correct;
                
                let buttonClass = "bg-slate-700/60 hover:bg-slate-600/80 border border-slate-500/30 text-white hover:scale-105";
                
                if (selectedAnswer && isSelected) {
                  buttonClass = "bg-blue-600 border-blue-400 text-white scale-105";
                }

                return (
                  <button
                    key={index}
                    onClick={() => !selectedAnswer && handleAnswerSelect(option)}
                    disabled={selectedAnswer !== ''}
                    className={`${buttonClass} p-4 rounded-lg w-full text-left transition-all duration-300 backdrop-blur-sm`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm animate-pulse">
                        {letters[index]}
                      </span>
                      <span className="flex-1 font-medium">{option}</span>
                      {selectedAnswer && isSelected && <CheckCircle className="w-5 h-5 text-blue-300 animate-bounce" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="bg-slate-800/70 backdrop-blur-sm rounded-xl p-4 border border-slate-600/30">
            <div className="flex justify-center space-x-2 flex-wrap">
              {questions.map((_, index) => {
                const isAnswered = index < answeredQuestions.length;
                const isCurrent = index === currentQuestion;
                const isCorrect = answeredQuestions[index]?.correct;
                
                let bgClass = "bg-slate-600 hover:scale-110";
                if (isCurrent) bgClass = "bg-blue-600 animate-pulse scale-110";
                else if (isAnswered) bgClass = "bg-slate-500 hover:scale-105";

                return (
                  <button
                    key={index}
                    onClick={() => goToQuestion(index)}
                    disabled={index > answeredQuestions.length}
                    className={`${bgClass} text-white w-10 h-10 rounded-lg font-bold text-sm transition-all duration-300 disabled:opacity-50`}
                  >
                    {index + 1}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex min-h-screen relative z-10">
        {/* Left Sidebar - Navigation */}
        <div className="w-80 bg-slate-800/90 backdrop-blur-md border-r border-slate-600/30">
          <div className="p-6">
            {/* Header */}
            <div className="flex items-center space-x-3 mb-8">
              <Crown className="w-8 h-8 text-yellow-400 animate-bounce" />
              <div>
                <h1 className="text-xl font-bold text-white">KBC Champion</h1>
                <p className="text-slate-400 text-sm animate-pulse">SKICST Institute</p>
              </div>
            </div>

            {/* Stats */}
            <div className="bg-slate-700/50 rounded-xl p-4 mb-6">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center space-x-2">
                  <Trophy className="w-5 h-5 text-yellow-400" />
                  <span className="text-white font-medium">स्कोर</span>
                </div>
                <span className="text-2xl font-bold text-yellow-400">{score}/{questions.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-blue-400" />
                  <span className="text-white font-medium">समय</span>
                </div>
                <span className={`text-2xl font-bold ${timeLeft <= 10 ? 'text-red-400 animate-pulse' : 'text-blue-400'}`}>
                  {timeLeft}s
                </span>
              </div>
            </div>

            {/* Progress */}
            <div className="mb-6">
              <div className="flex justify-between text-sm text-slate-400 mb-2">
                <span>प्रगति</span>
                <span>{currentQuestion + 1}/{questions.length}</span>
              </div>
              <div className="bg-slate-700 rounded-full h-3 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-full transition-all duration-500"
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question Navigation */}
            <div>
              <h3 className="text-white font-medium mb-4">प्रश्न नेवीगेशन</h3>
              <div className="grid grid-cols-5 gap-2">
                {questions.map((_, index) => {
                  const isAnswered = index < answeredQuestions.length;
                  const isCurrent = index === currentQuestion;
                  const isCorrect = answeredQuestions[index]?.correct;
                  
                  let bgClass = "bg-slate-600 hover:bg-slate-500";
                  if (isCurrent) bgClass = "bg-blue-600";
                  else if (isAnswered) bgClass = "bg-slate-500";

                  return (
                    <button
                      key={index}
                      onClick={() => goToQuestion(index)}
                      disabled={index > answeredQuestions.length}
                      className={`${bgClass} text-white h-12 rounded-lg font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center`}
                    >
                      {index + 1}
                      {isAnswered && (
                        <div className="ml-1">
                          <CheckCircle className="w-4 h-4" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Right Content - Question */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-4xl">
            <div className="bg-slate-800/70 backdrop-blur-md rounded-2xl p-8 border border-slate-600/30">
              {/* Question Header */}
              <div className="text-center mb-8">
                <span className="bg-blue-600 text-white px-4 py-2 rounded-full font-bold text-lg">
                  प्रश्न {currentQuestion + 1}
                </span>
              </div>

              {/* Question */}
              <h2 className="text-3xl font-bold text-white mb-10 text-center leading-relaxed">
                {questions[currentQuestion].question}
              </h2>

              {/* Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {questions[currentQuestion].options.map((option, index) => {
                  const letters = ['A', 'B', 'C', 'D'];
                  const isSelected = selectedAnswer === option;
                  const isCorrect = option === questions[currentQuestion].correct;
                  
                  let buttonClass = "bg-slate-700/60 hover:bg-slate-600/80 border border-slate-500/30";
                  
                  if (selectedAnswer && isSelected) {
                    buttonClass = "bg-blue-600 border-blue-400";
                  }

                  return (
                    <button
                      key={index}
                      onClick={() => !selectedAnswer && handleAnswerSelect(option)}
                      disabled={selectedAnswer !== ''}
                      className={`${buttonClass} text-white p-6 rounded-xl text-lg font-medium transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 backdrop-blur-sm`}
                    >
                      <div className="flex items-center space-x-4">
                        <span className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
                          {letters[index]}
                        </span>
                        <span className="flex-1 text-left">{option}</span>
                        {selectedAnswer && isSelected && <CheckCircle className="w-6 h-6 text-blue-300" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}