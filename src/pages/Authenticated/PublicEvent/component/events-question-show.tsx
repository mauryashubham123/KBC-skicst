import { kbc } from "@/lib/helpers/api_urls";
import { EventType, QuestionType } from "@/types/typedef";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import QuizNavigation from "./quiz-navigation";
import { CheckCircle } from "lucide-react";


export const EventQuestionShow = ({ eventData }: { eventData: any }) => {
    const event : EventType = eventData?.data?.data?.event;
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);
    const queryClient = useQueryClient();
    // Simple Timer
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    if (currentQuestion < (event?.questions?.length || 0) - 1) {
                        setCurrentQuestion(curr => curr + 1);
                        return 30;
                    }
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [currentQuestion, event?.questions?.length ?? 0]);

    // Reset timer on question change
    useEffect(() => {
        setTimeLeft(30);
    }, [currentQuestion]);

    const submitAnswerMutation = useMutation({
        mutationFn: (data:FormData|string)=> event?.is_locked? kbc.audiance_apis.storeAnswer(data as string) : kbc.audiance_apis.storeAnswers(data as FormData),
        onSuccess: () => { 
            toast.success("उत्तर सफलतापूर्वक सबमिट हुआ!");
            queryClient.invalidateQueries({ queryKey: ['eventUpdate'], exact: true });
        },
        onError: (error: any) => { toast.error(error?.response?.data?.message || "उत्तर सबमिट नहीं हो सका"); },
    });

    const handleOptionChange = (questionId: number, selectedOption: string) => {
        setAnswers(prev => ({ ...prev, [questionId]: selectedOption }));
    };

    const handleQuestionSelect = (questionIndex: number) => {
        setCurrentQuestion(questionIndex);
    };

    const handleNext = () => {
        if (currentQuestion < (event?.questions?.length || 0) - 1) {
            setCurrentQuestion(currentQuestion + 1);
        }
    };

    const handlePrevious = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(event?.is_locked){
            if(!answers[event?.live_question_id]){
                toast.error("कृपया सभी प्रश्नों के उत्तर दें।");
                return;
            }
            const parameters = `event_id=${event?.id}&question_id=${event?.live_question_id}&answer=${answers[event?.live_question_id]}`;
            submitAnswerMutation.mutate(parameters);

        }else{
            const totalQuestions = event?.questions.length ?? 0;
            const answeredQuestions = Object.keys(answers).length;
    
            if (answeredQuestions < totalQuestions) {
                toast.error("कृपया सभी प्रश्नों के उत्तर दें।");
                return;
            }
            if (!event?.id) return;
            const formData = new FormData();
            formData.append('event_id', String(event.id));
            Object.entries(answers).forEach(([questionId, answer], index) => { formData.append(`answers[${index}][question_id]`, questionId); formData.append(`answers[${index}][answer]`, answer); });
            submitAnswerMutation.mutate(formData);
        }
    };

    if (!event?.questions?.length) {
        return (
            <div className="p-6 text-center">
                <p className="text-gray-500">{eventData?.data?.message} कोई प्रश्न उपलब्ध नहीं है</p>
            </div>
        );
    }

    const currentQ: QuestionType = event.questions[currentQuestion];

    // Simple background illustrations based on question type
    const getBackgroundPattern = (questionText: string) => {
        if (questionText.includes('गणित') || questionText.includes('संख्या')) {
            return 'bg-gradient-to-br from-blue-50 to-indigo-50';
        } else if (questionText.includes('विज्ञान') || questionText.includes('प्रकृति')) {
            return 'bg-gradient-to-br from-green-50 to-emerald-50';
        } else if (questionText.includes('इतिहास') || questionText.includes('भूगोल')) {
            return 'bg-gradient-to-br from-amber-50 to-orange-50';
        } else if (questionText.includes('भाषा') || questionText.includes('साहित्य')) {
            return 'bg-gradient-to-br from-purple-50 to-pink-50';
        }
        return 'bg-gradient-to-br from-amber-50 to-orange-50';
    };
    return event.is_locked 
    ? (
        <div className="">
            <div className="bg-white rounded-lg shadow-lg p-6 border border-amber-200 max-w-xl mx-auto">
                <div className="mb-6">
                    <div className="flex items-center gap-3 mb-3">
                        <span className="bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                            प्रश्न
                        </span>
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div className="bg-amber-600 h-2 rounded-full" style={{ width: `${100}%` }}/>
                        </div>
                    </div>
                    <h2 className="text-xl font-bold text-gray-800">
                        {event?.live_question?.body ?? 'No question found'}
                    </h2>
                </div>
                <div className="space-y-3 mb-6">
                    {event?.live_question?.options?.map((option:string, index:number) => (
                        <label
                            key={index}
                            className={`
                            flex items-center p-3 border rounded-lg cursor-pointer
                            ${answers[event?.live_question.id as number] === option
                                    ? 'border-amber-500 bg-amber-50'
                                    : 'border-gray-200 hover:border-amber-300'
                                }
                            `}
                        >
                            <input
                                type="radio"
                                name={`question-${event?.live_question?.id}`} value={option}
                                checked={answers[event?.live_question?.id as number] === option}
                                onChange={(e) => handleOptionChange(event?.live_question?.id as number, e.target.value)}
                                className="mr-3 text-amber-600"
                            />
                            <span className="flex-1 text-gray-700">{option}</span>
                            {answers[event?.live_question?.id as number] === option && (
                                <CheckCircle className="text-amber-600 w-5 h-5" />
                            )}
                        </label>
                    ))}
                </div>
                <div className="flex justify-between">
                    <div className="flex justify-end w-full">
                        <button onClick={handleSubmit} className="px-6 py-2 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700">
                            जमा करें 
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
    : (
        <div className={`min-h-screen p-4 ${getBackgroundPattern(currentQ.body ?? '')}`}>
            {/* Background Decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-10 right-10 w-32 h-32 bg-amber-200 rounded-full opacity-20"></div>
                <div className="absolute bottom-20 left-20 w-24 h-24 bg-orange-300 rounded-full opacity-15"></div>
                <div className="absolute top-1/2 left-10 w-16 h-16 bg-yellow-300 rounded-full opacity-10"></div>
                <div className="absolute bottom-10 right-1/3 w-20 h-20 bg-amber-300 rounded-full opacity-20"></div>
            </div>

            <div className="max-w-6xl mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">

                    {/* Left Panel */}
                    <div className="lg:col-span-1">
                        <QuizNavigation
                            questions={event.questions}
                            answers={answers}
                            currentQuestion={currentQuestion}
                            onQuestionSelect={handleQuestionSelect}
                            timeLeft={timeLeft}
                        />
                    </div>

                    {/* Right Panel - Current Question */}
                    <div className="lg:col-span-3">
                        <div className="bg-white rounded-lg shadow-lg p-6 border border-amber-200">

                            {/* Question Header */}
                            <div className="mb-6">
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                                        प्रश्न {currentQuestion + 1}
                                    </span>
                                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                                        <div
                                            className="bg-amber-600 h-2 rounded-full"
                                            style={{ width: `${((currentQuestion + 1) / event.questions.length) * 100}%` }}
                                        />
                                    </div>
                                </div>
                                <h2 className="text-xl font-bold text-gray-800">
                                    {currentQ.body}
                                </h2>
                            </div>

                            {/* Options */}
                            <div className="space-y-3 mb-6">
                                {currentQ.options?.map((option, index) => (
                                    <label
                                        key={index}
                                        className={`
                                        flex items-center p-3 border rounded-lg cursor-pointer
                                        ${answers[currentQ.id as number] === option
                                                ? 'border-amber-500 bg-amber-50'
                                                : 'border-gray-200 hover:border-amber-300'
                                            }
                                        `}
                                    >
                                        <input
                                            type="radio"
                                            name={`question-${currentQ.id}`}
                                            value={option}
                                            checked={answers[currentQ.id as number] === option}
                                            onChange={(e) => handleOptionChange(currentQ.id as number, e.target.value)}
                                            className="mr-3 text-amber-600"
                                        />
                                        <span className="flex-1 text-gray-700">{option}</span>
                                        {answers[currentQ.id as number] === option && (
                                            <CheckCircle className="text-amber-600 w-5 h-5" />
                                        )}
                                    </label>
                                ))}
                            </div>

                            {/* Navigation Buttons */}
                            <div className="flex justify-between">
                                <button
                                    onClick={handlePrevious}
                                    disabled={currentQuestion === 0}
                                    className={`
                                        px-4 py-2 rounded-lg font-bold
                                        ${currentQuestion === 0
                                            ? 'bg-gray-200 text-gray-400'
                                            : 'bg-amber-600 text-white hover:bg-amber-700'
                                        }
                                    `}
                                >
                                    पिछला
                                </button>

                                <div className="flex gap-3">
                                    {currentQuestion < event.questions.length - 1 ? (
                                        <button
                                            onClick={handleNext}
                                            className="px-4 py-2 bg-amber-600 text-white rounded-lg font-bold hover:bg-amber-700"
                                        >
                                            अगला
                                        </button>
                                    ) : (
                                        <button
                                            onClick={handleSubmit}
                                            className="px-6 py-2 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700"
                                        >
                                            जमा करें ({Object.keys(answers).length})
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
