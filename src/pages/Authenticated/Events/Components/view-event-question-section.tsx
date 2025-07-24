import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, BookOpen, File } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { EventType, QuestionType } from "@/types/typedef";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";



export default function ViewEventQuestionSection({event}: { event: EventType }) {
    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'easy': return 'bg-green-100 text-green-800 border-green-200';
            case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'hard': return 'bg-red-100 text-red-800 border-red-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };
    const navigate = useNavigate();
    return (
        <>
            {/* Live Question Section */}
            {event.live_question && (
                <Card className="mb-8 border-2 border-blue-200 bg-blue-50">
                    <CardHeader>
                        <CardTitle className="flex items-center text-blue-800">
                            <Zap className="h-5 w-5 mr-2" />
                            Live Question
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="bg-white p-4 rounded-lg border">
                            <div className="flex items-center justify-between mb-3">
                                <Badge className={getDifficultyColor(event.live_question.difficulty)}>
                                    {event.live_question.difficulty}
                                </Badge>
                                <Badge variant="outline">Course {event.live_question.course}</Badge>
                            </div>
                            <h3 className="text-lg font-semibold mb-4">{event.live_question.body}</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {event.live_question.options.map((option: string, index: number) => (
                                    <div
                                        key={index}
                                        className="p-3 bg-gray-50 rounded-md border border-gray-200 hover:bg-gray-100 transition-colors"
                                    >
                                        <span className="font-medium text-gray-700">
                                            {String.fromCharCode(65 + index)}. {option}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Questions Section */}
            <Card>
                <CardHeader>
                    <div className="flex justify-between">
                        <CardTitle className="flex items-center">
                            <BookOpen className="h-5 w-5 mr-2" />
                            Event Questions ({event.questions.length})
                        </CardTitle>
                        <div className="flex gap-2">
                            <Button
                                variant="secondary"
                                size="sm"
                                onClick={() => navigate(`/event-management/events/set-paper?event_id=${event.id}`)}
                            >
                                <File className="size-3 mr-1" />
                                Set Questions
                            </Button>
                            <Button
                                variant="secondary"
                                size="sm"
                            >
                                <File className="size-3 mr-1" />
                                Set Live Question
                            </Button>
                        </div>
                    </div>
                    <CardDescription>
                        All questions included in this event
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-32 lg:grid-cols-2">
                        {event.questions.map((question:QuestionType, index:number) => (
                            <div key={question.id}>
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center space-x-2">
                                        <Badge variant="outline" className="text-xs">
                                            Question {index + 1}
                                        </Badge>
                                        <Badge className={getDifficultyColor(question.difficulty)}>
                                            {question.difficulty}
                                        </Badge>
                                        <Badge variant="secondary">
                                            Course {question.course}
                                        </Badge>
                                    </div>
                                </div>

                                <h3 className="text-lg font-semibold mb-4 text-gray-900">
                                    {question.body}
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                                    {question.options?.map((option: string, optionIndex: number) => (
                                        <div
                                            key={optionIndex}
                                            className="p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors cursor-pointer"
                                        >
                                            <span className="font-medium text-gray-700">
                                                {String.fromCharCode(65 + optionIndex)}. {option}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                {index < event.questions.length - 1 && <Separator className="mt-6" />}
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </>
    );
}