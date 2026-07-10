import { useState, useEffect } from 'react';
import { Loader2, Trophy, Clock, CheckCircle, Gift, Info, Users, Star, Play, X, Printer } from 'lucide-react';
import logoSmImg from "@/assets/logofile.png";
import championImg from "@/assets/champion.png";
import { useAuth } from '@/Auth/AuthProvider';
import PaymentReceipt from './components/PaymentReceipt';
import { toast } from 'sonner';
type Obstacle = {
  x: number;
  width: number;
  height: number;
  y: number;
};

export default function AudienceDashboard() {
  const { user } = useAuth();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const [isLoading, setIsLoading] = useState(true);
  const [registrationStatus, setRegistrationStatus] = useState('pending');
  const [showNotification, setShowNotification] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [gameActive, setGameActive] = useState(false);
  const [dinoPosition, setDinoPosition] = useState(0);
  const [isJumping, setIsJumping] = useState(false);
  const [obstacles, setObstacles] = useState<Obstacle[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  // Competition dates
  const reportingTime = new Date('2026-07-20T10:00:00'); // 10:00 AM
  const competitionTime = new Date('2026-07-20T12:00:00'); // 12:00 PM

  const handlePrintReceipt = () => {
    if (!user) {
      toast.error("User details not found!");
      return;
    }
    const printContent = document.getElementById("kbc-receipt-print-area")?.innerHTML;
    const printWindow = window.open("", "_blank", "width=450,height=600");
    if (!printWindow) {
      toast.error("Popup blocked! Please allow popups to print/download the receipt.");
      return;
    }
    printWindow.document.write(`
      <html>
        <head>
          <title>KBC 2026 - Payment Receipt</title>
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
            @media print {
              body { margin: 0; padding: 10px; background: white; }
              @page { size: auto; margin: 0mm; }
            }
            body { font-family: monospace, sans-serif; background: #f8fafc; padding: 20px; }
          </style>
        </head>
        <body onload="setTimeout(function() { window.print(); window.close(); }, 500);">
          <div class="max-w-sm mx-auto">
            ${printContent}
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = reportingTime.getTime() - now;

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => {
      clearTimeout(loadingTimer);
      clearInterval(timer);
    };
  }, []);

  // Check if competition is active (after 12:00 PM on 20 July)
  const isCompetitionActive = () => {
    const now = new Date().getTime();
    return now >= competitionTime.getTime();
  };

  // Get button text based on time
  const getButtonText = () => {
    const now = new Date().getTime();
    const reportingDistance = reportingTime.getTime() - now;
    const competitionDistance = competitionTime.getTime() - now;

    if (competitionDistance > 0) {
      // Before competition time
      if (reportingDistance > 0) {
        // Before reporting time
        const hours = Math.floor(reportingDistance / (1000 * 60 * 60));
        const minutes = Math.floor((reportingDistance % (1000 * 60 * 60)) / (1000 * 60));
        return `रिपोर्टिंग ${hours}घं ${minutes}मिनट में | Reporting in ${hours}h ${minutes}m`;
      } else {
        // After reporting, before competition
        const hours = Math.floor(competitionDistance / (1000 * 60 * 60));
        const minutes = Math.floor((competitionDistance % (1000 * 60 * 60)) / (1000 * 60));
        return `प्रतियोगिता ${hours}घं ${minutes}मिनट में शुरू | Competition starts in ${hours}h ${minutes}m`;
      }
    }
    return "अभी प्रतियोगिता में भाग लें! | Join Competition Now!";
  };

  // Dino Game Logic
  useEffect(() => {
    if (!gameActive) return;

    const gameLoop = setInterval(() => {
      if (!gameOver) {
        setScore(prev => prev + 1);

        setObstacles(prev => {
          const newObstacles = prev.map(obs => ({ ...obs, x: obs.x - 5 }))
            .filter(obs => obs.x > -50);

          if (Math.random() < 0.02) {
            newObstacles.push({ x: 800, y: 150, width: 20, height: 40 });
          }

          return newObstacles;
        });

        setObstacles(prev => {
          const collision = prev.some(obs =>
            obs.x < 80 && obs.x + obs.width > 50 &&
            dinoPosition < obs.height
          );

          if (collision) {
            setGameOver(true);
            setGameActive(false);
          }

          return prev;
        });
      }
    }, 50);

    return () => clearInterval(gameLoop);
  }, [gameActive, gameOver, dinoPosition]);

  const jump = () => {
    if (isJumping || gameOver) return;

    setIsJumping(true);
    setDinoPosition(60);

    setTimeout(() => {
      setDinoPosition(0);
      setIsJumping(false);
    }, 500);
  };

  const startGame = () => {
    setGameActive(true);
    setGameOver(false);
    setScore(0);
    setObstacles([]);
    setDinoPosition(0);
  };

  const resetGame = () => {
    setGameActive(false);
    setGameOver(false);
    setScore(0);
    setObstacles([]);
    setDinoPosition(0);
  };

  useEffect(() => {
    const handleKeyPress = (e: any) => {
      if (e.code === 'Space' && gameActive) {
        e.preventDefault();
        jump();
      }
      if (e.code === 'Escape' && showInstructions) {
        setShowInstructions(false);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameActive, isJumping, gameOver, showInstructions]);

  const handleRegistration = () => {
    setRegistrationStatus('loading');
    setTimeout(() => {
      setRegistrationStatus('registered');
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    }, 2000);
  };

  const handleCompetitionJoin = () => {
    if (isCompetitionActive()) {
      // Redirect to competition or show competition interface
      alert("प्रतियोगिता शुरू हो रही है! शुभकामनाएं! | Competition is starting! Best of luck!");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-orange-500 animate-spin mx-auto mb-4" />
          <p className="text-slate-700 text-xl font-semibold">
            KBC अनुभव लोड हो रहा है...<br />
            <span className="text-base text-slate-600">Loading KBC Experience...</span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-orange-50">
      {/* Notification */}
      {showNotification && (
        <div className="fixed top-4 right-4 bg-emerald-50 border-l-4 border-emerald-500 text-emerald-800 px-6 py-4 rounded-lg shadow-lg z-50">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-500" />
            <div>
              <p className="font-medium">पंजीकरण सफल हुआ!</p>
              <p className="text-sm text-emerald-700">Registration successful!</p>
            </div>
          </div>
        </div>
      )}

      {/* Instructions Modal */}
      {showInstructions && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
            <button
              onClick={() => setShowInstructions(false)}
              className="absolute top-4 right-4 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full p-2 transition-colors duration-200"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-4xl font-bold text-slate-800 mb-6 text-center flex items-center justify-center gap-3">
              <Info className="w-8 h-8 text-orange-500" />
              <div>
                KBC नियम और शर्तें
                <p className="text-lg font-medium text-slate-600 mt-1">Rules & Terms</p>
              </div>
            </h2>

            <div className="space-y-6 text-slate-700">
              <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-lg">
                <h3 className="font-bold text-xl mb-3 flex items-center gap-2 text-slate-800">
                  <Star className="w-6 h-6 text-orange-500" />
                  <div>
                    प्रतियोगिता का प्रारूप
                    <span className="block text-sm font-medium text-slate-600">Competition Format</span>
                  </div>
                </h3>
                <ul className="space-y-2 text-base">
                  <li>• कुल 15 सवाल बढ़ती कठिनाई के साथ | 15 questions with increasing difficulty</li>
                  <li>• बहुविकल्पीय प्रश्न (A, B, C, D) | Multiple choice questions</li>
                  <li>• समय सीमा: प्रति प्रश्न 30 सेकंड | Time limit: 30 seconds per question</li>
                  <li>• हर सही जवाब के साथ इनाम राशि बढ़ती है | Prize money increases with each correct answer</li>
                </ul>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
                <h3 className="font-bold text-xl mb-3 flex items-center gap-2 text-slate-800">
                  <Users className="w-6 h-6 text-blue-500" />
                  <div>
                    उपलब्ध लाइफलाइन
                    <span className="block text-sm font-medium text-slate-600">Available Lifelines</span>
                  </div>
                </h3>
                <ul className="space-y-2 text-base">
                  <li>• <strong>50:50</strong> - दो गलत विकल्प हटा दें | Remove two wrong options</li>
                  <li>• <strong>ऑडियंस पोल</strong> - दर्शकों से मदद लें | Get help from audience</li>
                  <li>• <strong>फोन अ फ्रेंड</strong> - मदद के लिए कॉल करें (30 सेकंड) | Call for help (30 seconds)</li>
                </ul>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg">
                <h3 className="font-bold text-xl mb-3 flex items-center gap-2 text-slate-800">
                  <Clock className="w-6 h-6 text-red-500" />
                  <div>
                    महत्वपूर्ण नियम
                    <span className="block text-sm font-medium text-slate-600">Important Rules</span>
                  </div>
                </h3>
                <ul className="space-y-2 text-base">
                  <li>• समय खत्म होने से पहले अंतिम उत्तर की पुष्टि करनी होगी | Must confirm final answer before time runs out</li>
                  <li>• प्रत्येक लाइफलाइन का उपयोग केवल एक बार किया जा सकता है | Each lifeline can be used only once</li>
                  <li>• आप कभी भी छोड़ (Quit) सकते हैं और उस लेवल का पुरस्कार ले सकते हैं | You can quit anytime and take the current level prize</li>
                  <li>• गलत उत्तर देने पर: अंतिम सही पार किए गए लेवल का पुरस्कार मिलेगा | Wrong answer: you get the prize of the last successfully completed Level</li>
                </ul>
                <div className="mt-4 pt-4 border-t border-red-200">
                  <h4 className="font-bold text-slate-800 mb-2">लेवल और पुरस्कार (Levels & Prizes):</h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-slate-700">
                    <li>🏆 <strong>1st Level (Q1-2):</strong> Pen + Key Chain 🖊️🔑</li>
                    <li>🏆 <strong>2nd Level (Q3-4):</strong> Mobile Stand 📱</li>
                    <li>🏆 <strong>3rd Level (Q5-7):</strong> Bottle 🧴</li>
                    <li>🏆 <strong>4th Level (Q8-9):</strong> Coffee Mug ☕</li>
                    <li>🏆 <strong>5th Level (Q10-12):</strong> Selfie Stick 🤳</li>
                    <li>🏆 <strong>6th Level (Q13):</strong> Bluetooth Ear Phone 🎧</li>
                    <li>🏆 <strong>7th Level (Q14):</strong> Buffer Sound 🔊</li>
                    <li>🏆 <strong>8th Level (Q15):</strong> Computer (कंप्यूटर) 🖥️🏆</li>
                  </ul>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowInstructions(false)}
              className="w-full mt-8 bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg text-lg"
            >
              समझ गया! चलो खेलते हैं | Got it! Let's Play
            </button>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 py-8">
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
        {/* Countdown Timer */}
        <div className="bg-white rounded-2xl p-8 mb-8 shadow-lg border border-slate-200">
          <div className="relative flex items-center justify-center gap-3 mb-2">
            <h3 className="text-3xl font-bold text-slate-800 text-center">
              रिपोर्टिंग शुरू होगी में
            </h3>
            {user && (
              <button
                onClick={handlePrintReceipt}
                className="inline-flex items-center justify-center p-2 text-slate-500 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200/60 shadow-xs cursor-pointer bg-white"
                title="रसीद प्रिंट करें / Print Receipt"
              >
                <Printer className="w-5 h-5" />
              </button>
            )}
          </div>
          <p className="text-center text-slate-600 mb-8">Reporting starts in</p>
          <div className="grid grid-cols-4 gap-6 md:max-w-2xl max-w-sm mx-auto">
            {[
              { label: 'दिन | Days', value: timeLeft.days },
              { label: 'घंटे | Hours', value: timeLeft.hours },
              { label: 'मिनट | Minutes', value: timeLeft.minutes },
              { label: 'सेकंड | Seconds', value: timeLeft.seconds }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-300 rounded-2xl  mb-3 shadow-lg">
                  <div className="md:text-4xl text-xl font-bold text-orange-600">
                    {item.value.toString().padStart(2, '0')}
                  </div>
                </div>
                <p className="text-sm text-slate-600 font-medium">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Rules & Instructions Button */}
        <div className="text-center mb-8">
          <button
            onClick={() => setShowInstructions(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-5 px-10 rounded-2xl transition-all duration-300 shadow-lg flex items-center gap-4 mx-auto text-lg hover:shadow-xl transform hover:scale-105"
          >
            <Info className="w-7 h-7" />
            <div>
              नियम और निर्देश पढ़ें
              <span className="block text-sm font-medium">Read Rules & Instructions</span>
            </div>
          </button>
        </div>
        {/* Event Info */}
        <div className="bg-white rounded-2xl p-8 mb-8 shadow-lg border border-slate-200">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-4xl font-bold text-slate-800 mb-4">
                क्विज़ प्रतियोगिता जल्द शुरू!
                <span className="block text-xl font-medium text-slate-600 mt-2">
                  Quiz Competition Starting Soon!
                </span>
              </h2>
              <p className="text-slate-700 mb-6 text-lg leading-relaxed">
                शानदार इनाम और रोमांचक क्विज़ प्रतियोगिता में हिस्सा लें और बनें अगले चैंपियन!
                <span className="block text-slate-600 mt-2">
                  Join our exciting quiz competition with amazing prizes and become the next champion!
                </span>
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-4 text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <Clock className="w-6 h-6 text-orange-500" />
                  <div>
                    <span className="font-bold">प्रतियोगिता: 20 जुलाई 2026 - सुबह 10:30 बजे</span>
                    <span className="block text-sm text-slate-600">Competition: 20 July 2026 - 10:30 AM</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-br from-orange-100 to-red-100 border-2 border-orange-300 rounded-2xl p-8 shadow-lg">
                <Gift className="w-16 h-16 text-orange-600 mx-auto mb-4" />
                <p className="text-slate-700 font-bold text-lg mb-2">
                  इनाम पूल | Prize Pool
                </p>
                <p className="flex gap-3 justify-center text-4xl font-bold text-orange-600 my-3">
                  <Trophy className='w-10 h-10' />
                  चैंपियन ट्रॉफी
                </p>
                <p className="text-slate-600 font-medium">
                  प्लस नकद इनाम! | Plus Cash Prizes!
                </p>
              </div>
            </div>
          </div>
        </div>


        {/* Mini Game Section */}
        <div className="bg-white rounded-2xl p-8 mb-8 shadow-lg border border-slate-200">
          <h3 className="text-3xl font-bold text-slate-800 text-center mb-2">
            इंतज़ार का समय? मिनी गेम खेलें! 🦕
          </h3>
          <p className="text-center text-slate-600 mb-6">Waiting time? Play mini game!</p>

          {!gameActive && !gameOver && (
            <div className="text-center">
              <p className="text-slate-700 mb-6 text-lg">
                SPACE दबाएं कूदने के लिए या बटन क्लिक करें
                <span className="block text-sm text-slate-600">Press SPACE to jump or click button</span>
              </p>
              <button
                onClick={startGame}
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-2xl font-bold transition-all duration-300 shadow-lg text-lg hover:shadow-xl transform hover:scale-105"
              >
                गेम शुरू करें | Start Game
              </button>
            </div>
          )}

          {gameActive && (
            <div className="text-center mb-6">
              <p className="text-slate-800 font-bold text-xl">
                स्कोर | Score: {score} | SPACE दबाएं कूदने के लिए (Press SPACE to jump)
              </p>
            </div>
          )}

          {gameOver && (
            <div className="text-center mb-6">
              <p className="text-slate-800 mb-4 font-bold text-xl">
                गेम ओवर! स्कोर | Game Over! Score: {score}
              </p>
              <button
                onClick={resetGame}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-2xl font-bold transition-all duration-300 shadow-lg text-lg hover:shadow-xl transform hover:scale-105"
              >
                फिर से खेलें | Play Again
              </button>
            </div>
          )}

          {/* Game Canvas */}
          <div
            className="relative w-full h-56 bg-gradient-to-b from-sky-100 to-green-100 border-2 border-slate-300 rounded-2xl overflow-hidden cursor-pointer shadow-inner"
            onClick={gameActive ? jump : startGame}
          >
            <div className="absolute bottom-0 w-full h-3 bg-green-400"></div>

            <div
              className={`absolute bottom-10 left-16 w-10 h-10 bg-emerald-500 rounded-full transition-all duration-300 shadow-lg ${isJumping ? 'transform -translate-y-16' : ''
                }`}
              style={{ bottom: `${40 + dinoPosition}px` }}
            >
              <div className="w-full h-full flex items-center justify-center text-white text-lg font-bold">
                🦕
              </div>
            </div>

            {obstacles.map((obstacle, index) => (
              <div
                key={index}
                className="absolute bg-red-500 rounded-lg shadow-lg"
                style={{
                  left: `${obstacle.x}px`,
                  bottom: '40px',
                  width: `${obstacle.width}px`,
                  height: `${obstacle.height}px`
                }}
              >
                <div className="w-full h-full flex items-center justify-center text-white text-lg">
                  🌵
                </div>
              </div>
            ))}

            <div className="absolute top-6 left-1/4 text-white text-3xl drop-shadow-lg">☁️</div>
            <div className="absolute top-10 right-1/3 text-white text-2xl drop-shadow-lg">☁️</div>
          </div>
        </div>

        {/* Registration/Competition Button */}
        <div className="bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-300 rounded-2xl p-10 text-center shadow-lg">
          <h3 className="text-4xl font-bold text-slate-800 mb-2">चैंपियन बनने के लिए तैयार हैं?</h3>
          <p className="text-slate-600 text-lg mb-4">Ready to become a champion?</p>
          <p className="text-slate-700 mb-8 text-lg leading-relaxed">
            अभी पंजीकरण करें और अंतिम क्विज़ अनुभव के लिए तैयार हो जाएं!
            <span className="block text-slate-600 mt-2">
              Register now and get ready for the ultimate quiz experience!
            </span>
          </p>

          {registrationStatus === 'pending' && (
            <button
              onClick={handleRegistration}
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-5 px-12 rounded-2xl transition-all duration-300 shadow-lg text-xl hover:shadow-xl transform hover:scale-105"
            >
              <div>
                अभी पंजीकरण करें - निःशुल्क प्रवेश
                <span className="block text-sm font-medium">Register Now - Free Entry</span>
              </div>
            </button>
          )}

          {registrationStatus === 'loading' && (
            <button
              disabled
              className="bg-slate-400 text-white font-bold py-5 px-12 rounded-2xl flex items-center gap-4 mx-auto text-xl cursor-not-allowed"
            >
              <Loader2 className="w-6 h-6 animate-spin" />
              <div>
                पंजीकरण प्रक्रिया में...
                <span className="block text-sm">Registration in process...</span>
              </div>
            </button>
          )}

          {registrationStatus === 'registered' && (
            <div className="space-y-6">
              <div className="bg-emerald-50 border-l-4 border-emerald-500 rounded-lg p-6 shadow-lg">
                <div className="flex items-center justify-center gap-4 text-emerald-800">
                  <CheckCircle className="w-8 h-8 text-emerald-500" />
                  <div className="text-center">
                    <span className="font-bold text-2xl block">सफलतापूर्वक पंजीकृत!</span>
                    <span className="text-lg text-emerald-700">Successfully Registered!</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleCompetitionJoin}
                disabled={!isCompetitionActive()}
                className={`w-full font-bold py-5 px-8 rounded-2xl transition-all duration-300 shadow-lg text-xl flex items-center justify-center gap-4 ${isCompetitionActive()
                  ? 'bg-emerald-500 hover:bg-emerald-600 text-white hover:shadow-xl transform hover:scale-105 cursor-pointer'
                  : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                  }`}
              >
                {isCompetitionActive() ? (
                  <>
                    <Play className="w-7 h-7" />
                    <div>
                      अभी प्रतियोगिता में भाग लें!
                      <span className="block text-sm font-medium">Join Competition Now!</span>
                    </div>
                  </>
                ) : (
                  <>
                    <Clock className="w-7 h-7" />
                    <div className="text-center">
                      {getButtonText()}
                    </div>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-8 mt-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-slate-600 text-base">
            © 2026 KBC - कौन बनेगा चैंपियन। सभी अधिकार सुरक्षित।
          </p>
          <p className="text-slate-500 text-sm mt-2">
            ज्ञान और सपनों द्वारा संचालित | Powered by Knowledge and Dreams
          </p>
        </div>
      </footer>
      {/* Hidden printable receipt */}
      {user && (
        <div className="hidden">
          <div id="kbc-receipt-print-area">
            <PaymentReceipt user={user} logoSrc={logoSmImg} />
          </div>
        </div>
      )}
    </div>
  );
}