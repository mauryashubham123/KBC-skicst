import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { setBreadcrumb } from "@/redux/Features/uiSlice";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { KbcEventType } from "@/types/user";
import { kbc } from "@/lib/helpers/api_urls";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw, Eye, EyeOff, CheckCircle2, Circle } from "lucide-react";
import { cn } from "@/lib/utils";
import { TableEmptyState } from "@/components/Custom/table-empty-state";
import { SearchDialog } from "@/components/Custom/search-dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { QuestionType } from "@/types/typedef";
import { CustomSelect } from "@/components/Custom/CustomSelect";



type QuestionQueryResponseType = {
    questions: QuestionType[];
};

const QuestionPaperPage = () => {
    const dispatch = useAppDispatch();
    const queryClient = useQueryClient();

    // Load from localStorage
    const [selectedEventId, setSelectedEventId] = useState(() => {
        const config = localStorage.getItem('questionpaperconfig');
        return config ? JSON.parse(config).selectedEventId === 'all'?'': JSON.parse(config).selectedEventId : '';
    });

    const [course, setCourse] = useState(() => {
        const config = localStorage.getItem('questionpaperconfig');
        return config ? JSON.parse(config).course === 'all'?'': JSON.parse(config).course : '';
    });

    const [subject, setSubject] = useState(() => {
        const config = localStorage.getItem('questionpaperconfig');
        return config ? JSON.parse(config).subject === 'all'?'': JSON.parse(config).subject : '';
    });

    const [topic, setTopic] = useState(() => {
        const config = localStorage.getItem('questionpaperconfig');
        return config ? JSON.parse(config).topic === 'all'?'': JSON.parse(config).topic : '';
    });

    const [difficulty, setDifficulty] = useState(() => {
        const config = localStorage.getItem('questionpaperconfig');
        return config ? JSON.parse(config).difficulty === 'all'?'': JSON.parse(config).difficulty : '';
    });

    const [searchText, setSearchText] = useState(() => {
        const config = localStorage.getItem('questionpaperconfig');
        return config ? JSON.parse(config).searchText : '';
    });

    const [selectedMode, setSelectedMode] = useState<string>('mode1');
    const [selectedMode2Question,setSelectedMode2Question] = useState<string|number>();
 

    const [selectedQuestionId, setSelectedQuestionId] = useState<(string | number)[]>([]);


    // Save to localStorage whenever filters change
    useEffect(() => {
        localStorage.setItem('questionpaperconfig', JSON.stringify({
            selectedEventId,
            course,
            subject,
            topic,
            difficulty,
            searchText
        }));
    }, [selectedEventId, course, subject, topic, difficulty, searchText]);

    // Build query parameters
    const buildQueryParams = () => {
        const params = new URLSearchParams();
        if (course) params.append('course', course);
        if (subject) params.append('subject', subject);
        if (topic) params.append('topic', topic);
        if (difficulty) params.append('difficulty', difficulty);
        if (searchText) params.append('search', searchText);
        return params.toString();
    };

    // Fetch events for dropdown
    const eventListQuery = useQuery<any, any, { events: KbcEventType[] }>({
        queryKey: ['events'],
        queryFn: () => kbc.event_apis.getEventList(),
        select: (res) => res.data,
        staleTime: 5 * 60 * 1000,
    });

    // Fetch questions with filters
    const questionListQuery = useQuery<any, any, QuestionQueryResponseType>({
        queryKey: ['questions', course, subject, topic, difficulty, searchText],
        queryFn: () => kbc.event_apis.getQuestionList(buildQueryParams()),
        select: (res) => res.data,
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
    });
    // Set question for event mutation
    const setQuestionMutation = useMutation({
        mutationFn: (formData:FormData) => selectedMode == 'mode1'
            ? kbc.event_apis.assignQuestions(formData) 
            : kbc.event_apis.setEventQuestion(`live_question_id=${selectedMode2Question}&id=${selectedEventId}`),
        onSuccess: (res) => {
            toast.success(res.message || 'Question set successfully for event');
            queryClient.invalidateQueries({ queryKey: ['events'] });
            setSelectedQuestionId([]);
        },
        onError: (e: any) => {
            toast.error(e?.response?.data?.message || e.message || 'Failed to set question');
        }
    });

    // Reveal answer mutation
    const revealAnswerMutation = useMutation({
        mutationFn: () =>
            kbc.event_apis.revealEventQuestionAnswer(`id=${selectedEventId}`),
        onSuccess: (res) => {
            toast.success(res.message || 'Answer revealed successfully');
            queryClient.invalidateQueries({ queryKey: ['events'] });
        },
        onError: (e: any) => {
            toast.error(e?.response?.data?.message || e.message || 'Failed to reveal answer');
        }
    });

    const selectedEvent = eventListQuery.data?.events?.find(e => e.id.toString() === selectedEventId);

    const handleSetQuestion = () => {
        const formData = new FormData();
        formData.append('event_id', selectedEventId);
        selectedQuestionId.forEach(id => formData.append('question_ids[]', id.toString()));
        if (!selectedEventId) {
            toast.error('Please select an event first');
            return;
        }
        if(selectedMode == 'mode1'){
            if (!selectedQuestionId.length) {
                toast.error('Please select a question to set');
                return;
            }
        }else{
            if(!selectedMode2Question){
                toast.error('Please select a question to set');
                return
            }
        }
        setQuestionMutation.mutate(formData);
    };

    useEffect(() => {
        dispatch(setBreadcrumb([
            { label: 'Dashboard', link: '/dashboard' },
            { label: 'Event Management', link: '/events' },
            { label: 'Set Question Paper', type: 'page' }
        ]));
    }, []);

    return (
        <div className="container px-4 sm:px-8">
            <div className="my-3 grid gap-2">
                <h1 className="text-2xl md:text-2xl font-bold">Set Question Paper</h1>
                <p className="text-muted-foreground text-xs md:text-sm">
                    Select questions from your question bank and set them for KBC events.
                </p>
            </div>

            {/* Event Selection */}
            <Card className="mt-6">
                <CardHeader>
                    <h3 className="font-semibold">Select Event</h3>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4">
                        <div className="flex gap-4">
                            <div className="w-full grid gap-2">
                                <Label htmlFor="event-select">Choose Event *</Label>
                                <Select value={selectedEventId} onValueChange={setSelectedEventId}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select an event..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {eventListQuery.data?.events?.map((event) => (
                                            <SelectItem key={event.id} value={event.id.toString()}>
                                                <div className="flex items-center gap-2">
                                                    <span>{event.name}</span>
                                                    <Badge variant={event.is_active ? "default" : "secondary"} className="text-xs">
                                                        {event.is_active ? 'Active' : 'Inactive'}
                                                    </Badge>
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                            </div>
                            <div className="w-full grid gap-2">
                                <Label>Select A mode *</Label>
                                <CustomSelect 
                                    options={[
                                        {label:'1st Mode',value:'mode1'},
                                        {label:'2nd Mode',value:'mode2'}
                                    ]}
                                    value={selectedMode}
                                    onValueChange={e=>setSelectedMode(e)}
                                />
                            </div>
                        </div>

                        {/* Event Info */}
                        {selectedEvent && (
                            <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <h4 className="font-medium text-blue-900 dark:text-blue-100">
                                            {selectedEvent.name}
                                        </h4>
                                        <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                                            {selectedEvent.description}
                                        </p>
                                        {selectedEvent.liveQuestion && (
                                            <div className="mt-2 p-2 bg-white dark:bg-blue-900 rounded border">
                                                <p className="text-sm font-medium">Current Live Question:</p>
                                                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                                                    {selectedEvent.liveQuestion.body}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex gap-2">
                                        <Badge className={selectedEvent.is_active ? 'bg-green-600' : 'bg-gray-600'}>
                                            {selectedEvent.is_active ? 'Active' : 'Inactive'}
                                        </Badge>
                                        {selectedEvent.liveQuestion && (
                                            <Button
                                                onClick={() => revealAnswerMutation.mutate()}
                                                disabled={revealAnswerMutation.isPending || selectedEvent.answer_reveal}
                                                variant="secondary"
                                                size="sm"
                                            >
                                                {selectedEvent.answer_reveal ? (
                                                    <>
                                                        <EyeOff className="size-3 mr-1" />
                                                        Revealed
                                                    </>
                                                ) : (
                                                    <>
                                                        <Eye className="size-3 mr-1" />
                                                        Reveal Answer
                                                    </>
                                                )}
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Question Filters and Actions */}
            <div className="flex flex-wrap gap-4 justify-between md:items-center items-end mt-6">
                <div className="flex gap-2 items-end">
                    {/* Course Filter */}
                    <div className="min-w-40">
                        <Label>Course</Label>
                        <Select value={course} onValueChange={(e)=>setCourse(e==='all'?'':e)}>
                            <SelectTrigger>
                                <SelectValue placeholder="All Courses" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Courses</SelectItem>
                                <SelectItem value="science">Science</SelectItem>
                                <SelectItem value="math">Mathematics</SelectItem>
                                <SelectItem value="history">History</SelectItem>
                                <SelectItem value="geography">Geography</SelectItem>
                                <SelectItem value="english">English</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Subject Filter */}
                    <div className="min-w-40">
                        <Label>Subject</Label>
                        <Select value={subject} onValueChange={(e)=>setSubject(e==='all'?'':e)}>
                            <SelectTrigger>
                                <SelectValue placeholder="All Subjects" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Subjects</SelectItem>
                                <SelectItem value="physics">Physics</SelectItem>
                                <SelectItem value="chemistry">Chemistry</SelectItem>
                                <SelectItem value="biology">Biology</SelectItem>
                                <SelectItem value="algebra">Algebra</SelectItem>
                                <SelectItem value="geometry">Geometry</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Topic Filter */}
                    <div className="min-w-40">
                        <Label>Set Paper Series</Label>
                        <Select value={topic} onValueChange={(e)=>setTopic(e==='all'?'':e)}>
                            <SelectTrigger>
                                <SelectValue placeholder="All Set Papers" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Set Papers</SelectItem>
                                {Array.from({ length: 15 }, (_, i) => (
                                    <SelectItem key={i + 1} value={`set-paper-${i + 1}`}>
                                        Set Paper {i + 1}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Difficulty Filter */}
                    <div className="min-w-36">
                        <Label>Difficulty</Label>
                        <Select value={difficulty} onValueChange={(e)=>setDifficulty(e==='all'?'':e)}>
                            <SelectTrigger>
                                <SelectValue placeholder="All Levels" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Levels</SelectItem>
                                <SelectItem value="easy">Easy</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="hard">Hard</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <Button
                        onClick={() => questionListQuery.refetch()}
                        variant="secondary"
                        size="icon"
                    >
                        <RefreshCw className={cn("size-4", questionListQuery.isLoading ? 'animate-spin' : '')} />
                    </Button>
                </div>

                <div className="flex gap-2">
                    <SearchDialog
                        onSearch={setSearchText}
                        defaultValue={searchText}
                        placeholder="Search questions..."
                    />
                    <Button
                        onClick={handleSetQuestion}
                        disabled={setQuestionMutation.isPending || !selectedEventId || !selectedQuestionId}
                        className="flex gap-2"
                    >
                        {setQuestionMutation.isPending ? (
                            <>
                                <div className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                Setting...
                            </>
                        ) : (
                            <>
                                <CheckCircle2 className="size-4" />
                                Set Question
                            </>
                        )}
                    </Button>
                </div>
            </div>

            {/* Loading State */}
            {questionListQuery.isLoading && <QuestionListSkeleton />}

            {/* Empty State */}
            {questionListQuery.data && questionListQuery.data.questions.length === 0 && (
                <div className="mt-8">
                    <TableEmptyState message="No questions found with current filters. Try adjusting your search criteria." />
                </div>
            )}

            {/* Questions List */}
            {questionListQuery.data && questionListQuery.data.questions.length > 0 && (
                <div className="mt-6 space-y-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>Found {questionListQuery.data.questions.length} questions</span>
                        {selectedQuestionId && <span>• 1 question selected</span>}
                    </div>

                    <div className="grid gap-4">
                        {questionListQuery.data.questions.map((question, index) => (
                            <QuestionSelectionCard
                                key={question.id}
                                question={question}
                                index={index}
                                isSelected={ selectedMode === 'mode1'? selectedQuestionId?.includes(question.id ?? ''):(selectedMode2Question == question.id)}
                                onSelect={(id) =>{
                                        selectedMode === 'mode1'?
                                        setSelectedQuestionId((prev) =>
                                            prev.includes(id)
                                                ? prev.filter((qId) => qId !== id)
                                                : [...prev, id]
                                        ):setSelectedMode2Question(id)
                                    }
                                }

                                isCurrentLive={selectedEvent?.liveQuestion?.id === question.id}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

// Question Selection Card Component
const QuestionSelectionCard = ({
    question,
    index,
    isSelected,
    onSelect,
    isCurrentLive
}: {
    question: QuestionType;
    index: number;
    isSelected: boolean;
    onSelect: (id: string) => void;
    isCurrentLive: boolean;
}) => {
    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'easy': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
            case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
            case 'hard': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
            default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
        }
    };

    return (
        <Card
            className={cn(
                "cursor-pointer transition-all hover:shadow-md",
                isSelected && "ring-2 ring-blue-500 bg-blue-50/50 dark:bg-blue-950/50",
                isCurrentLive && "ring-2 ring-green-500 bg-green-50/50 dark:bg-green-950/50"
            )}
            onClick={() => onSelect(question.id as string)}
        >
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div className="flex items-start gap-3 flex-1">
                        <div className="mt-1">
                            {isSelected ? (
                                <CheckCircle2 className="size-5 text-blue-600" />
                            ) : (
                                <Circle className="size-5 text-gray-400" />
                            )}
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="font-semibold">Q{index + 1}.</span>
                                {isCurrentLive && (
                                    <Badge className="bg-green-600 text-xs">
                                        Currently Live
                                    </Badge>
                                )}
                            </div>
                            <h3 className="font-medium text-base mb-3 leading-relaxed">
                                {question.body || question.question || 'No question text available'}
                            </h3>

                            {/* Options */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                                {question?.options?.map((option, idx) => (
                                    <div
                                        key={option}
                                        className={cn(
                                            "text-sm p-2 rounded border",
                                            question.correct_answer === option
                                                ? "bg-green-100 border-green-300 dark:bg-green-900/20 dark:border-green-700"
                                                : "bg-gray-50 border-gray-200 dark:bg-gray-900 dark:border-gray-700"
                                        )}
                                    >
                                        <span className="font-medium">{idx + 1}.</span> {option}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 items-end">
                        <Badge className={getDifficultyColor(question.difficulty)}>
                            {question.difficulty}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                            {question.points} pts
                        </span>
                        {(question.course || question.subject || question.topic) && (
                            <div className="text-xs text-muted-foreground text-right">
                                {question.course && <div>{question.course}</div>}
                                {question.subject && <div>{question.subject}</div>}
                                {question.topic && <div>{question.topic}</div>}
                            </div>
                        )}
                    </div>
                </div>
            </CardHeader>
        </Card>
    );
};

// Skeleton Component
const QuestionListSkeleton = () => {
    return (
        <div className="mt-6 space-y-4">
            {Array.from([1, 2, 3, 4]).map((i) => (
                <Card key={i}>
                    <CardHeader>
                        <div className="flex gap-3">
                            <Skeleton className="size-5 rounded-full" />
                            <div className="flex-1 space-y-3">
                                <div className="flex items-center gap-2">
                                    <Skeleton className="w-8 h-5" />
                                    <Skeleton className="w-20 h-5" />
                                </div>
                                <Skeleton className="w-full h-6" />
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    {Array.from([1, 2, 3, 4]).map((j) => (
                                        <Skeleton key={j} className="w-full h-10" />
                                    ))}
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <Skeleton className="w-16 h-5" />
                                <Skeleton className="w-12 h-4" />
                            </div>
                        </div>
                    </CardHeader>
                </Card>
            ))}
        </div>
    );
};

export default QuestionPaperPage;