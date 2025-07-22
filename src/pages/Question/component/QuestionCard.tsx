import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { QuestionType } from "@/types/user";
import { Edit, Trash2, CheckCircle } from "lucide-react";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { kbc } from "@/lib/helpers/api_urls";
import { toast } from "sonner";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import CreateQuestionDialog from "./create-paper";

interface QuestionCardProps {
    question: QuestionType;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question }) => {
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const queryClient = useQueryClient();

    const deleteMutation = useMutation({
        mutationFn: () => kbc.event_apis.deleteQuestion(question.id),
        onSuccess: (res) => {
            toast.success(res.message || 'Question deleted successfully');
            queryClient.invalidateQueries({ queryKey: ['questions'] });
            setDeleteDialogOpen(false);
        },
        onError: (e: any) => {
            toast.error(e?.response?.data?.message || e.message || 'Failed to delete question');
        }
    });

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty.toLowerCase()) {
            case 'easy': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
            case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
            case 'hard': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
            default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
        }
    };

    return (
        <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
                <div className="flex justify-between items-start gap-3">
                    <div className="flex-1">
                        <p className="text-sm font-medium leading-relaxed mb-3">
                            {question.body}
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {question.course && (
                                <Badge variant="outline" className="text-xs">
                                    {question.course}
                                </Badge>
                            )}
                            {question.subject && (
                                <Badge variant="outline" className="text-xs">
                                    {question.subject}
                                </Badge>
                            )}
                            {question.topic && (
                                <Badge variant="outline" className="text-xs">
                                    {question.topic}
                                </Badge>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <Badge className={getDifficultyColor(question.difficulty)}>
                            {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
                        </Badge>
                    </div>
                </div>
            </CardHeader>
            
            <CardContent>
                <div className="space-y-2 mb-4">
                    {question.options?.map((option: string, index: number) => {
                        const isCorrect = option === question.correct_answer;
                        return (
                            <div
                                key={index}
                                className={`flex items-center gap-2 p-2 rounded-md border text-sm ${
                                    isCorrect 
                                        ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950' 
                                        : 'border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900'
                                }`}
                            >
                                <span className="font-medium min-w-[20px]">
                                    {String.fromCharCode(65 + index)}.
                                </span>
                                <span className="flex-1">{option}</span>
                                {isCorrect && (
                                    <CheckCircle className="size-4 text-green-600 dark:text-green-400" />
                                )}
                            </div>
                        );
                    })}
                </div>
                
                <div className="flex justify-end gap-2">
                    <CreateQuestionDialog defaultQuestion={question}>
                        <Button variant="outline" size="sm">
                            <Edit className="size-3 mr-1" />
                            Edit
                        </Button>
                    </CreateQuestionDialog>
                    
                    <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                        <AlertDialogTrigger asChild>
                            <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                                <Trash2 className="size-3 mr-1" />
                                Delete
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Delete Question</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Are you sure you want to delete this question? This action cannot be undone.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={() => deleteMutation.mutate()}
                                    disabled={deleteMutation.isPending}
                                    className="bg-red-600 hover:bg-red-700"
                                >
                                    {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </CardContent>
        </Card>
    );
};

export default QuestionCard;