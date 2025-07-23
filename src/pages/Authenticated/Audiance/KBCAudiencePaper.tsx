import { useState, useEffect, useRef } from 'react';
import { Clock, Trophy, CheckCircle, Timer, Star, Award, Zap, ChevronLeft, ChevronRight, AlertTriangle } from 'lucide-react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { kbc } from '@/lib/helpers/api_urls';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

// const questions = [
//     {
//         id: 1,
//         question: "भारत की राजधानी कौन सी है? | What is the capital of India?",
//         options: ["मुंबई | Mumbai", "दिल्ली | Delhi", "कोलकाता | Kolkata", "चेन्नई | Chennai"],
//         correct: 1
//     },
//     {
//         id: 2,
//         question: "सूर्य से सबसे नजदीक का ग्रह कौन सा है? | Which is the closest planet to the Sun?",
//         options: ["शुक्र | Venus", "बुध | Mercury", "पृथ्वी | Earth", "मंगल | Mars"],
//         correct: 1
//     },
//     {
//         id: 3,
//         question: "भारत में कुल कितने राज्य हैं? | How many states are there in India?",
//         options: ["27", "28", "29", "30"],
//         correct: 1
//     },
//     {
//         id: 4,
//         question: "विश्व का सबसे बड़ा महासागर कौन सा है? | Which is the largest ocean in the world?",
//         options: ["अटलांटिक | Atlantic", "हिंद | Indian", "आर्कटिक | Arctic", "प्रशांत | Pacific"],
//         correct: 3
//     },
//     {
//         id: 5,
//         question: "कंप्यूटर का मस्तिष्क किसे कहा जाता है? | What is called the brain of computer?",
//         options: ["RAM", "हार्ड डिस्क | Hard Disk", "CPU", "मॉनिटर | Monitor"],
//         correct: 2
//     },
//     {
//         id: 6,
//         question: "भारत का राष्ट्रीय पक्षी कौन सा है? | What is the national bird of India?",
//         options: ["कबूतर | Pigeon", "मोर | Peacock", "तोता | Parrot", "गरुड़ | Eagle"],
//         correct: 1
//     },
//     {
//         id: 7,
//         question: "गंगा नदी कहाँ से निकलती है? | Where does the Ganges river originate?",
//         options: ["गंगोत्री | Gangotri", "यमुनोत्री | Yamunotri", "केदारनाथ | Kedarnath", "बद्रीनाथ | Badrinath"],
//         correct: 0
//     },
//     {
//         id: 8,
//         question: "भारत में सबसे लंबी नदी कौन सी है? | Which is the longest river in India?",
//         options: ["यमुना | Yamuna", "गोदावरी | Godavari", "गंगा | Ganga", "नर्मदा | Narmada"],
//         correct: 2
//     },
//     {
//         id: 9,
//         question: "विश्व का सबसे ऊंचा पर्वत शिखर कौन सा है? | Which is the highest mountain peak in the world?",
//         options: ["कंचनजंगा | Kanchenjunga", "माउंट एवरेस्ट | Mount Everest", "अन्नपूर्णा | Annapurna", "धौलागिरी | Dhaulagiri"],
//         correct: 1
//     },
//     {
//         id: 10,
//         question: "भारत का सबसे बड़ा राज्य कौन सा है? | Which is the largest state of India?",
//         options: ["महाराष्ट्र | Maharashtra", "राजस्थान | Rajasthan", "मध्य प्रदेश | Madhya Pradesh", "उत्तर प्रदेश | Uttar Pradesh"],
//         correct: 1
//     }
// ];

export default function KBCQuiz() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [timeLeft, setTimeLeft] = useState(20 * 60); // 20 minutes for 10 questions
    const [answers, setAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [isStarted, setIsStarted] = useState(false);
    const [showWarning, setShowWarning] = useState(false);
    const [lastWarningTime, setLastWarningTime] = useState(null);
    const { event_id } = useParams();
    const counterRef = useRef(0);

    const eventUpdates = useQuery({
        queryKey: ['eventUpdate'],
        queryFn: () => kbc.audiance_apis.getEventUpdates(`event_id=${event_id}&since=${Date.now()}&counter=${counterRef.current}`),
        staleTime: Infinity,
    });

    const questions = eventUpdates.data?.data?.event?.questions || [];
    useEffect(() => {
        if (eventUpdates.data) {
            if (eventUpdates.data.data.event && counterRef.current === 0) {
                counterRef.current++;
                setCurrentQuestion(0);
                setTimeLeft(20 * 60);
                setAnswers({});
                setSubmitted(false);
                setIsStarted(true);
            }
            eventUpdates.refetch();
        }
    }, [eventUpdates.data]);



    // Audio context for alarms
    const playAlarm = (frequency = 800, duration = 200) => {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
            oscillator.type = 'sine';

            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);

            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + duration / 1000);
        } catch (error) {
            console.log('Audio not supported');
        }
    };

    useEffect(() => {
        let timer;
        if (isStarted && timeLeft > 0 && !submitted) {
            timer = setInterval(() => {
                setTimeLeft(time => {
                    const newTime = time - 1;

                    // Warning alarms at different intervals
                    if (newTime === 300) { // 5 minutes left
                        playAlarm(1000, 500);
                        setShowWarning(true);
                        setLastWarningTime('5 मिनट बचे!');
                        setTimeout(() => setShowWarning(false), 3000);
                    } else if (newTime === 120) { // 2 minutes left
                        playAlarm(1200, 600);
                        setShowWarning(true);
                        setLastWarningTime('2 मिनट बचे!');
                        setTimeout(() => setShowWarning(false), 3000);
                    } else if (newTime === 60) { // 1 minute left
                        playAlarm(1400, 700);
                        setShowWarning(true);
                        setLastWarningTime('1 मिनट बचा!');
                        setTimeout(() => setShowWarning(false), 3000);
                    } else if (newTime <= 10 && newTime > 0) { // Last 10 seconds
                        playAlarm(1600, 300);
                    }

                    if (newTime <= 0) {
                        playAlarm(2000, 1000); // Final alarm
                        handleSubmit();
                        return 0;
                    }
                    return newTime;
                });
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [isStarted, timeLeft, submitted]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const submitAnswerMutation = useMutation({
        mutationFn: (payload) => kbc.audiance_apis.storeAnswer(payload),
        onSuccess: () => {
            toast.success('Answer submitted successfully!');
        },
        onError: (e) => {
            toast.error(e?.response?.data?.message || e.message || 'Failed to submit answer');
        }
    });


    const handleAnswerSelect = (answerIndex) => {
        if (!submitted) {
            setAnswers(prev => ({
                ...prev,
                [questions[currentQuestion].id]: answerIndex
            }));

            const payload = {
                event_id: event_id,
                answers: [
                    {
                        question_id: questions[currentQuestion].id,
                        answer: answerIndex.toString()
                    }
                ]
            };
           
            // Submit
            playAlarm(600, 150);
        };
        // submitAnswerMutation.mutate(payload);
    }
     console.log(answers)
        const calculateScore = () => {
            let correct = 0;
            questions.forEach(q => {
                if (answers[q.id] === q.correct) {
                    correct++;
                }
            });
            return correct;
        };

        const handleSubmit = () => {
            setSubmitted(true);
            setShowResults(true);
            playAlarm(800, 1000); // Submission sound
        };

        const nextQuestion = () => {
            if (currentQuestion < questions.length - 1) {
                setCurrentQuestion(currentQuestion + 1);
                playAlarm(400, 100); // Navigation sound
            }
        };

        const prevQuestion = () => {
            if (currentQuestion > 0) {
                setCurrentQuestion(currentQuestion - 1);
                playAlarm(400, 100); // Navigation sound
            }
        };

        const goToQuestion = (index) => {
            setCurrentQuestion(index);
            playAlarm(400, 100); // Navigation sound
        };

        if (!isStarted) {
            return (
                <div className="min-h-screen bg-gradient-to-br from-yellow-900 via-orange-900 to-red-900 flex items-center justify-center p-4 relative overflow-hidden">
                    {/* Animated Background Elements */}
                    <div className="absolute inset-0">
                        <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-400 rounded-full opacity-20 animate-pulse"></div>
                        <div className="absolute top-1/2 right-20 w-24 h-24 bg-orange-400 rounded-full opacity-30 animate-bounce"></div>
                        <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-red-400 rounded-full opacity-10 animate-pulse"></div>
                        <div className="absolute top-1/4 left-1/2 w-20 h-20 bg-yellow-300 rounded-full opacity-25 animate-ping"></div>
                    </div>

                    <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-3xl p-6 md:p-12 max-w-2xl w-full shadow-2xl border-4 border-yellow-400 relative z-10 max-h-[90vh] overflow-y-auto">
                        <div className="text-center">
                            {/* KBC Logo Style */}
                            <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8 shadow-2xl border-4 border-yellow-300 animate-pulse">
                                <Trophy className="w-12 h-12 md:w-16 md:h-16 text-white" />
                            </div>

                            <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 bg-clip-text text-transparent mb-3 md:mb-4 font-serif">
                                कौन बनेगा चैंपियन
                            </h1>
                            <h2 className="text-lg md:text-2xl font-bold text-orange-800 mb-6 md:mb-8 font-serif">
                                KAUN BANEGA CHAMPION
                            </h2>

                            <div className="bg-gradient-to-r from-yellow-100 to-orange-100 p-4 md:p-8 rounded-2xl border-2 border-yellow-300 mb-6 md:mb-8">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                                    <div className="bg-white p-3 md:p-4 rounded-xl shadow-lg">
                                        <div className="text-2xl md:text-3xl font-bold text-orange-600">10</div>
                                        <div className="text-orange-800 font-semibold text-sm md:text-base">प्रश्न</div>
                                    </div>
                                    <div className="bg-white p-3 md:p-4 rounded-xl shadow-lg">
                                        <div className="text-2xl md:text-3xl font-bold text-red-600">20</div>
                                        <div className="text-red-800 font-semibold text-sm md:text-base">मिनट</div>
                                    </div>
                                    <div className="bg-white p-3 md:p-4 rounded-xl shadow-lg">
                                        <div className="text-2xl md:text-3xl font-bold text-yellow-600">₹1Cr</div>
                                        <div className="text-yellow-800 font-semibold text-sm md:text-base">इनाम</div>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => setIsStarted(true)}
                                className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 hover:from-yellow-600 hover:via-orange-600 hover:to-red-600 text-white px-8 md:px-12 py-4 md:py-6 text-lg md:text-2xl font-bold rounded-2xl transition-all duration-300 shadow-2xl transform hover:scale-105 border-2 border-yellow-400"
                            >
                                <div className="flex items-center gap-2 md:gap-3">
                                    <Zap className="w-6 h-6 md:w-8 md:h-8" />
                                    खेल शुरू करें | START GAME
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            );
        }

        if (showResults) {
            const score = calculateScore();
            const percentage = ((score / questions.length) * 100).toFixed(1);

            return (
                <div className="min-h-screen bg-gradient-to-br from-yellow-900 via-orange-900 to-red-900 p-4 flex items-center justify-center relative overflow-hidden">
                    {/* Celebration Background */}
                    <div className="absolute inset-0">
                        {[...Array(20)].map((_, i) => (
                            <div
                                key={i}
                                className="absolute animate-bounce"
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`,
                                    animationDelay: `${Math.random() * 2}s`,
                                    animationDuration: `${2 + Math.random() * 3}s`
                                }}
                            >
                                <Star className="w-4 h-4 md:w-6 md:h-6 text-yellow-400 opacity-70" />
                            </div>
                        ))}
                    </div>

                    <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-3xl p-6 md:p-12 max-w-2xl w-full shadow-2xl border-4 border-yellow-400 relative z-10 max-h-[90vh] overflow-y-auto">
                        <div className="text-center">
                            <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-green-400 via-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8 shadow-2xl border-4 border-green-300 animate-pulse">
                                <Award className="w-12 h-12 md:w-16 md:h-16 text-white" />
                            </div>

                            <h1 className="text-2xl md:text-4xl font-bold text-orange-800 mb-3 md:mb-4 font-serif">
                                🎉 बधाई हो! 🎉
                            </h1>
                            <h2 className="text-lg md:text-2xl font-bold text-yellow-700 mb-6 md:mb-8">
                                CONGRATULATIONS!
                            </h2>

                            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 md:p-8 rounded-2xl border-2 border-green-300 mb-6 md:mb-8">
                                <div className="text-4xl md:text-6xl font-bold text-green-600 mb-2">{score}/{questions.length}</div>
                                <div className="text-lg md:text-2xl font-bold text-green-700 mb-4">आपका स्कोर</div>
                                <div className="text-2xl md:text-4xl font-bold text-yellow-600">{percentage}%</div>
                                <div className="text-yellow-700 font-semibold">सफलता दर</div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 md:mb-8">
                                <button
                                    onClick={() => window.location.reload()}
                                    className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-2xl font-bold transition-all duration-300 shadow-xl transform hover:scale-105"
                                >
                                    फिर खेलें
                                </button>
                                <button
                                    onClick={() => {
                                        setIsStarted(false);
                                        setSubmitted(false);
                                        setShowResults(false);
                                        setCurrentQuestion(0);
                                        setAnswers({});
                                        setTimeLeft(20 * 60);
                                    }}
                                    className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-2xl font-bold transition-all duration-300 shadow-xl transform hover:scale-105"
                                >
                                    मुख्य मेन्यू
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        const currentQ = questions[currentQuestion];
        const isAnswered = answers[currentQ.id] !== undefined;

        return (
            <div className="h-screen bg-gradient-to-br from-yellow-900 via-orange-900 to-red-900 relative overflow-hidden flex flex-col">
                {/* Time Warning Modal */}
                {showWarning && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-red-500 text-white p-6 rounded-2xl shadow-2xl border-4 border-red-600 animate-pulse">
                            <div className="flex items-center gap-3 text-2xl font-bold">
                                <AlertTriangle className="w-8 h-8" />
                                {lastWarningTime}
                            </div>
                        </div>
                    </div>
                )}

                {/* Animated Background */}
                <div className="absolute inset-0">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-yellow-600/10 to-red-600/10"></div>
                    {[...Array(8)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute rounded-full bg-yellow-400 opacity-5 animate-pulse"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                width: `${20 + Math.random() * 80}px`,
                                height: `${20 + Math.random() * 80}px`,
                                animationDelay: `${Math.random() * 3}s`
                            }}
                        ></div>
                    ))}
                </div>

                <div className="relative z-10 flex flex-1 overflow-hidden">
                    {/* Desktop Navigation Sidebar */}
                    <div className="hidden lg:block w-72 p-4">
                        <div className="bg-gradient-to-br from-yellow-50/95 to-orange-50/95 backdrop-blur-lg rounded-3xl p-5 shadow-2xl border-2 border-yellow-300 h-full flex flex-col">
                            {/* Timer */}
                            <div className="text-center mb-5">
                                <div className={`inline-flex items-center gap-2 px-4 py-3 rounded-2xl font-bold text-xl shadow-xl border-3 ${timeLeft <= 300 ? 'bg-red-500 text-white border-red-600 animate-pulse' :
                                    timeLeft <= 600 ? 'bg-orange-500 text-white border-orange-600' :
                                        'bg-green-500 text-white border-green-600'
                                    }`}>
                                    <Timer className="w-6 h-6" />
                                    <span className="font-mono">{formatTime(timeLeft)}</span>
                                </div>
                            </div>

                            {/* Question Navigation */}
                            <div className="flex-1 overflow-y-auto">
                                <h3 className="text-lg font-bold text-orange-800 text-center mb-3">प्रश्न नेवीगेशन</h3>
                                <div className="space-y-2 max-h-96 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-yellow-400 scrollbar-track-yellow-100">
                                    {questions.map((q, index) => (
                                        <button
                                            key={q.id}
                                            onClick={() => goToQuestion(index)}
                                            className={`w-full p-3 rounded-xl font-bold transition-all duration-300 flex items-center justify-between text-sm ${currentQuestion === index
                                                ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg transform scale-105'
                                                : answers[q.id] !== undefined
                                                    ? 'bg-green-100 text-green-800 border-2 border-green-300 hover:bg-green-200'
                                                    : 'bg-white text-gray-700 border-2 border-gray-200 hover:bg-yellow-50 hover:border-yellow-300'
                                                }`}
                                        >
                                            <span>प्रश्न {index + 1}</span>
                                            {answers[q.id] !== undefined && (
                                                <CheckCircle className="w-4 h-4" />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Progress */}
                            <div className="mt-4 p-3 bg-white rounded-xl border-2 border-yellow-300">
                                <div className="text-center mb-2">
                                    <span className="font-bold text-orange-800 text-sm">प्रगति: {Object.keys(answers).length}/{questions.length}</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className="bg-gradient-to-r from-yellow-500 to-orange-500 h-full rounded-full transition-all duration-300"
                                        style={{ width: `${(Object.keys(answers).length / questions.length) * 100}%` }}
                                    ></div>
                                </div>
                            </div>

                            {/* Submit Button */}
                            {Object.keys(answers).length === questions.length && (
                                <button
                                    onClick={handleSubmit}
                                    className="mt-4 w-full py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold rounded-2xl transition-all duration-300 shadow-xl transform hover:scale-105 flex items-center justify-center gap-2"
                                >
                                    <Award className="w-5 h-5" />
                                    जवाब जमा करें
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 p-4 flex flex-col pb-20 lg:pb-4 overflow-hidden">
                        <div className="flex-1 flex items-center justify-center overflow-y-auto">
                            <div className="w-full max-w-4xl">
                                <div className="bg-gradient-to-br from-yellow-50/95 to-orange-50/95 backdrop-blur-lg rounded-3xl p-4 md:p-6 lg:p-8 shadow-2xl border-2 border-yellow-300 max-h-full overflow-y-auto">
                                    {/* Question Header */}
                                    <div className="flex items-center justify-between mb-4 md:mb-6">
                                        <div className="flex items-center gap-2 mt-5 md:gap-3">
                                            <div className="w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                                                <span className="text-white font-bold text-sm md:text-lg lg:text-xl">{currentQuestion + 1}</span>
                                            </div>
                                            <div>
                                                <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-orange-800">प्रश्न {currentQuestion + 1} / {questions.length}</h2>
                                            </div>
                                        </div>

                                        {/* Mobile Timer */}
                                        <div className="lg:hidden">
                                            <div className={`flex items-center gap-1 px-2 py-1 md:px-3 md:py-2 rounded-xl font-bold text-xs md:text-sm ${timeLeft <= 300 ? 'bg-red-500 text-white animate-pulse' :
                                                timeLeft <= 600 ? 'bg-orange-500 text-white' :
                                                    'bg-green-500 text-white'
                                                }`}>
                                                <Timer className="w-3 h-3 md:w-4 md:h-4" />
                                                <span className="font-mono">{formatTime(timeLeft)}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Question */}
                                    <div className="mb-4 md:mb-6">
                                        <h3 className="text-base md:text-lg lg:text-2xl font-bold text-gray-800 leading-relaxed text-center p-3 md:p-4 lg:p-6 bg-white rounded-2xl border-2 border-yellow-300 shadow-lg">
                                            {currentQ.body}
                                        </h3>
                                    </div>

                                    {/* Options */}
                                    <div className="grid gap-2 md:gap-3 mb-2 md:mb-3 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-yellow-400 scrollbar-track-yellow-100">
                                        {currentQ.options.map((option, optionIndex) => (
                                            <button
                                                key={optionIndex}
                                                onClick={() => handleAnswerSelect(optionIndex)}
                                                className={`text-left p-1 md:p-4 lg:p-6 rounded-2xl border-3 transition-all duration-300 font-semibold text-sm md:text-base lg:text-lg ${answers[currentQ.id] === optionIndex
                                                    ? 'bg-gradient-to-r from-yellow-400 to-orange-400 border-yellow-500 text-white shadow-xl transform scale-105'
                                                    : 'bg-white border-gray-300 hover:border-yellow-400 hover:bg-yellow-50 text-gray-800 hover:shadow-lg'
                                                    }`}
                                            >
                                                <div className="flex items-center gap-2 md:gap-3">
                                                    <div className={`w-6 h-6 md:w-4 md:h-4 lg:w-8 lg:h-8 rounded-full border-3 flex items-center justify-center font-bold transition-all duration-300 text-sm md:text-base ${answers[currentQ.id] === optionIndex
                                                        ? 'bg-white text-orange-600 border-white'
                                                        : 'border-gray-400 text-gray-600'
                                                        }`}>
                                                        {String.fromCharCode(65 + optionIndex)}
                                                    </div>
                                                    <span className="flex-1">{option}</span>
                                                </div>
                                            </button>
                                        ))}
                                    </div>

                                    {/* Desktop Navigation & Submit */}
                                    <div className="hidden lg:flex flex-col sm:flex-row gap-4 justify-between items-center">
                                        <div className="flex gap-2">
                                            <button
                                                onClick={prevQuestion}
                                                disabled={currentQuestion === 0}
                                                className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 flex items-center gap-2 ${currentQuestion === 0
                                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                                    : 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg transform hover:scale-105'
                                                    }`}
                                            >
                                                <ChevronLeft className="w-5 h-5" />
                                                पिछला
                                            </button>

                                            <button
                                                onClick={nextQuestion}
                                                disabled={currentQuestion === questions.length - 1}
                                                className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 flex items-center gap-2 ${currentQuestion === questions.length - 1
                                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                                    : 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg transform hover:scale-105'
                                                    }`}
                                            >
                                                अगला
                                                <ChevronRight className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }