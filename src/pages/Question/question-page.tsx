import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { setBreadcrumb } from "@/redux/Features/uiSlice";
import { useQuery } from "@tanstack/react-query";
import { QuestionType } from "@/types/user";
import { kbc } from "@/lib/helpers/api_urls";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCwIcon } from "lucide-react";
import { CustomSelect } from "@/components/Custom/CustomSelect";
import { SearchDialog } from "@/components/Custom/search-dialog";
import { cn } from "@/lib/utils";
import { TableEmptyState } from "@/components/Custom/table-empty-state";
import { Input } from "@/components/ui/input";
import QuestionCard from "./component/QuestionCard";
import CreateQuestionDialog from "./component/create-paper";

type QuestionQueryResponseType = {
    questions: QuestionType[];
}

const QuestionPage = () => {
    const dispatch = useAppDispatch();

    // Filter states
    const [course, setCourse] = useState<string>(() => {
        const config = localStorage.getItem('questionpageconfig');
        return config ? JSON.parse(config).course : '';
    });

    const [subject, setSubject] = useState<string>(() => {
        const config = localStorage.getItem('questionpageconfig');
        return config ? JSON.parse(config).subject : '';
    });

    const [topic, setTopic] = useState<string>(() => {
        const config = localStorage.getItem('questionpageconfig');
        return config ? JSON.parse(config).topic : '';
    });

    const [difficulty, setDifficulty] = useState<string>(() => {
        const config = localStorage.getItem('questionpageconfig');
        return config ? JSON.parse(config).difficulty : '';
    });

    const [searchText, setSearchText] = useState(() => {
        const config = localStorage.getItem('questionpageconfig');
        return config ? JSON.parse(config).searchText : '';
    });

    useEffect(() => {
        localStorage.setItem('questionpageconfig', JSON.stringify({
            course,
            subject,
            topic,
            difficulty,
            searchText
        }));
    }, [course, subject, topic, difficulty, searchText]);

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

    const questionListQuery = useQuery<any, any, QuestionQueryResponseType>({
        queryKey: ['questions', course, subject, topic, difficulty, searchText],
        queryFn: () => kbc.event_apis.getQuestionList(buildQueryParams()),
        select: (res) => res.data,
        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 10 * 60 * 1000, // 10 minutes
    });

    const difficultyOptions = [
        { label: 'All Difficulty', value: '' },
        { label: 'Easy', value: 'easy' },
        { label: 'Medium', value: 'medium' },
        { label: 'Hard', value: 'hard' }
    ];

    const clearFilters = () => {
        setCourse('');
        setSubject('');
        setTopic('');
        setDifficulty('');
        setSearchText('');
    };

    useEffect(() => {
        dispatch(setBreadcrumb([
            { label: 'Dashboard', link: '/dashboard' },
            { label: 'Question Bank', type: 'page' }
        ]));
    }, []);

    return (
        <div className="container px-4 sm:px-8">
            <div className="my-3 grid gap-2">
                <h1 className="text-2xl md:text-2xl font-bold">Question Bank</h1>
                <p className="text-muted-foreground text-xs md:text-sm">
                    All questions are listed here. Click new question button to add new question or click edit icon on the question to update.
                </p>
            </div>

            {/* Filters Section */}
            <div className="flex flex-wrap gap-2 justify-between md:items-center items-end mt-6">
                <div className="flex gap-2 flex-wrap">
                    <div className="grid gap-1">
                        <Input
                            placeholder="Course"
                            value={course}
                            onChange={(e) => setCourse(e.target.value)}
                            className="w-32"
                        />
                    </div>
                    <div className="grid gap-1">
                        <Input
                            placeholder="Subject"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            className="w-32"
                        />
                    </div>
                    {/* <div className="grid gap-1">
                        <CustomSelect
                            name="topic"
                            value={topic}
                            onValueChange={setTopic}
                            id="topic"
                            options={[{label:"All Set Paper",value:''},{ label: 'Set Paper 1', value: 'set-paper-1' }, { label: 'Set Paper 2', value: 'set-paper-2' }, { label: 'Set Paper 3', value: 'set-paper-3' }, { label: 'Set Paper 4', value: 'set-paper-4' }, { label: 'Set Paper 5', value: 'set-paper-5' }, { label: 'Set Paper 6', value: 'set-paper-6' }, { label: 'Set Paper 7', value: 'set-paper-7' }, { label: 'Set Paper 8', value: 'set-paper-8' }, { label: 'Set Paper 9', value: 'set-paper-9' }, { label: 'Set Paper 10', value: 'set-paper-10' }, { label: 'Set Paper 11', value: 'set-paper-11' }, { label: 'Set Paper 12', value: 'set-paper-12' }, { label: 'Set Paper 13', value: 'set-paper-13' }, { label: 'Set Paper 14', value: 'set-paper-14' }, { label: 'Set Paper 15', value: 'set-paper-15' }]}
                        />
                    </div>
                    <CustomSelect
                        options={[{label: 'All Difficulty', value: ''}, ...difficultyOptions]}
                        dropdownClassName="bg-background/40 backdrop-blur-sm"
                        className="w-36"
                        name="difficulty"
                        id="difficulty"
                        value={difficulty}
                        onValueChange={setDifficulty}
                    /> */}
                    <Button
                        onClick={clearFilters}
                        variant="outline"
                        size="sm"
                        className="text-xs"
                    >
                        Clear
                    </Button>
                </div>

                <div className="flex gap-2">
                    <Button
                        onClick={() => questionListQuery.refetch()}
                        variant="secondary"
                        size="icon"
                    >
                        <RefreshCwIcon className={cn("size-4", questionListQuery.isLoading || questionListQuery.isRefetching ? 'animate-spin' : '')} />
                    </Button>
                    <SearchDialog
                        onSearch={setSearchText}
                        defaultValue={searchText}
                        placeholder="Search questions..."
                    />
                    <CreateQuestionDialog />
                </div>
            </div>

            {/* Loading State */}
            {questionListQuery.isLoading && <QuestionPageSkeleton />}

            {/* Empty State */}
            {questionListQuery.data && questionListQuery.data.questions.length < 1 && <TableEmptyState />}

            {/* Questions List */}
            {questionListQuery.data && questionListQuery.data.questions.length > 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                    {questionListQuery.data.questions.map((question) => (
                        <QuestionCard key={question.id} question={question} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default QuestionPage;

const QuestionPageSkeleton = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            {Array.from([1, 2, 3, 4, 5, 6, 7, 8]).map((i) => (
                <Card key={i}>
                    <CardHeader>
                        <div className="flex justify-between items-start">
                            <div className="grid gap-2 flex-1">
                                <Skeleton className="w-full h-4" />
                                <Skeleton className="w-3/4 h-4" />
                            </div>
                            <Skeleton className="w-16 h-6 rounded-full" />
                        </div>
                        <div className="flex gap-2 mt-2">
                            <Skeleton className="w-20 h-5" />
                            <Skeleton className="w-24 h-5" />
                            <Skeleton className="w-18 h-5" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-2">
                            <Skeleton className="w-full h-8" />
                            <Skeleton className="w-full h-8" />
                            <Skeleton className="w-full h-8" />
                            <Skeleton className="w-full h-8" />
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};