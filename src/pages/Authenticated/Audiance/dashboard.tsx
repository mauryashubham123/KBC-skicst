import { useState, useEffect } from 'react';
import { Loader2, Trophy, Clock, Calendar, CheckCircle, Gift, Info, Users, Star, Play, X } from 'lucide-react';
import kbcheader from "@/assets/kbc_header.jpg";
type Obstacle = {
  x: number;
  width: number;
  height: number;
  y: number;
};

export default function AudienceDashboard() {
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
  const reportingTime = new Date('2025-07-25T10:00:00'); // 10:00 AM
  const competitionTime = new Date('2025-07-25T12:00:00'); // 12:00 PM

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

  // Check if competition is active (after 12:00 PM on 25 July)
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
                  <li>• आप कभी भी छोड़ सकते हैं और वर्तमान इनाम ले सकते हैं | You can quit anytime and take current prize</li>
                  <li>• प्रश्न 6-10 पर गलत उत्तर: ₹10,000 तक गिर जाएगा | Wrong answer on Q6-10: drops to ₹10,000</li>
                  <li>• प्रश्न 11-15 पर गलत उत्तर: ₹3,20,000 तक गिर जाएगा | Wrong answer on Q11-15: drops to ₹3,20,000</li>
                </ul>
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

      {/* Header */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-6x mx-auto">
          <div className="text-center">
           <div className="w-full">
								<img
									src={kbcheader}
									alt="KAUN BANEGA CHAMPION Header"
									className="w-full h-auto object-cover shadow-2xl"
								/>
							</div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
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
                  <Calendar className="w-6 h-6 text-orange-500" />
                  <div>
                    <span className="font-bold">रिपोर्टिंग: 25 जुलाई 2025 - सुबह 10:00 बजे</span>
                    <span className="block text-sm text-slate-600">Reporting: 25 July 2025 - 10:00 AM</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <Clock className="w-6 h-6 text-orange-500" />
                  <div>
                    <span className="font-bold">प्रतियोगिता: 25 जुलाई 2025 - दोपहर 12:00 बजे</span>
                    <span className="block text-sm text-slate-600">Competition: 25 July 2025 - 12:00 PM</span>
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

        {/* Countdown Timer */}
        <div className="bg-white rounded-2xl p-8 mb-8 shadow-lg border border-slate-200">
          <h3 className="text-3xl font-bold text-slate-800 text-center mb-2">
            रिपोर्टिंग शुरू होगी में
          </h3>
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
              className={`absolute bottom-10 left-16 w-10 h-10 bg-emerald-500 rounded-full transition-all duration-300 shadow-lg ${
                isJumping ? 'transform -translate-y-16' : ''
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
                className={`w-full font-bold py-5 px-8 rounded-2xl transition-all duration-300 shadow-lg text-xl flex items-center justify-center gap-4 ${
                  isCompetitionActive() 
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
            © 2025 KBC - कौन बनेगा चैंपियन। सभी अधिकार सुरक्षित।
          </p>
          <p className="text-slate-500 text-sm mt-2">
            ज्ञान और सपनों द्वारा संचालित | Powered by Knowledge and Dreams
          </p>
        </div>
      </footer>
    </div>
  );
}