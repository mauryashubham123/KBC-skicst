import { CustomSelect } from "@/components/Custom/CustomSelect";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { kbc } from "@/lib/helpers/api_urls";
import { QuestionType } from "@/types/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, PlusCircle, X } from "lucide-react";
import React, { FormEvent, ReactNode, useState } from "react";
import { toast } from "sonner";

interface CreateQuestionDialogProps {
    defaultQuestion?: QuestionType;
    children?: ReactNode;
}

const CreateQuestionDialog: React.FC<CreateQuestionDialogProps> = ({ defaultQuestion, children }) => {
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState<string[]>(
        defaultQuestion?.options || ['', '', '', '']
    );
    const queryClient = useQueryClient();

    const questionMutation = useMutation({
        mutationFn: (data: FormData) =>
            defaultQuestion
                ? kbc.event_apis.updateQuestion(data, defaultQuestion.id)
                : kbc.event_apis.createQuestion(data),
        onSuccess: (res) => {
            toast.success(res.message);
            queryClient.invalidateQueries({ queryKey: ['questions'], exact: false });
            setOpen(false);
            if (!defaultQuestion) {
                setOptions(['', '', '', '']);
            }
        },
        onError: (e: any) => toast.error(e?.response?.data?.message || e.message)
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        // Add options to formData
        options.forEach((option, index) => {
            if (option.trim()) {
                formData.append(`options[${index}]`, option.trim());
            }
        });

        questionMutation.mutate(formData);
    };

    const difficultyOptions = [
        { label: 'Easy', value: 'easy' },
        { label: 'Medium', value: 'medium' },
        { label: 'Hard', value: 'hard' }
    ];

    const addOption = () => {
        if (options.length < 10) {
            setOptions([...options, '']);
        }
    };

    const removeOption = (index: number) => {
        if (options.length > 4) {
            setOptions(options.filter((_, i) => i !== index));
        }
    };

    const updateOption = (index: number, value: string) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    return (
        <Dialog open={questionMutation.isPending || open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children ? children :
                    <Button className="flex gap-2">
                        <PlusCircle className="size-4 inline" />
                        <span className="hidden md:inline">
                            {defaultQuestion ? 'Update Question' : 'Add New Question'}
                        </span>
                    </Button>
                }
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>
                        {defaultQuestion ? 'Update Question' : 'Add New Question'}
                    </DialogTitle>
                    <DialogDescription>
                        {defaultQuestion
                            ? 'Update the question details and click update to save changes.'
                            : 'Enter the details for the new question. Click save when you\'re done.'
                        }
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="mt-4">
                    <div className="grid gap-4">
                        {/* Question Body */}
                        <div className="grid gap-2">
                            <Label htmlFor="body">
                                Question <span className="text-destructive">*</span>
                            </Label>
                            <Textarea
                                disabled={questionMutation.isPending}
                                defaultValue={defaultQuestion?.body || ''}
                                name="body"
                                id="body"
                                placeholder="Enter the question"
                                rows={3}
                                maxLength={1000}
                            />
                        </div>

                        {/* Course, Subject, Topic */}
                        <div className="grid gap-4 grid-cols-3">
                            <div className="grid gap-2">
                                <Label htmlFor="course">Qulificatication</Label>
                                <CustomSelect defaultValue={defaultQuestion?.value} name="course" options={[{ label: 'class 8', value: '8' }, { label: 'class 9', value: '9' }, { label: 'class 10', value: '10' },
                                { label: 'class 11', value: '11' }, { label: 'class 12', value: '12' }, { label: 'Graduation', value: '13' }, { label: 'Post Graduation', value: '14' }
                                ]} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="subject">Subject</Label>
                                <Input
                                    disabled={questionMutation.isPending}
                                    defaultValue={defaultQuestion?.subject || ''}
                                    name="subject"
                                    id="subject"
                                    placeholder="Subject name"
                                    maxLength={255}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="topic">Set Paper series</Label>
                                <CustomSelect
                                    key={defaultQuestion?.topic || 0}
                                    name="topic"
                                    disabled={questionMutation.isPending}
                                    defaultValue={defaultQuestion?.difficulty}
                                    id="topic"
                                    options={[{ label: 'Set Paper 1', value: 'set-paper-1' }, { label: 'Set Paper 2', value: 'set-paper-2' }, { label: 'Set Paper 3', value: 'set-paper-3' }, { label: 'Set Paper 4', value: 'set-paper-4' }, { label: 'Set Paper 5', value: 'set-paper-5' }, { label: 'Set Paper 6', value: 'set-paper-6' }, { label: 'Set Paper 7', value: 'set-paper-7' }, { label: 'Set Paper 8', value: 'set-paper-8' }, { label: 'Set Paper 9', value: 'set-paper-9' }, { label: 'Set Paper 10', value: 'set-paper-10' }, { label: 'Set Paper 11', value: 'set-paper-11' }, { label: 'Set Paper 12', value: 'set-paper-12' }, { label: 'Set Paper 13', value: 'set-paper-13' }, { label: 'Set Paper 14', value: 'set-paper-14' }, { label: 'Set Paper 15', value: 'set-paper-15' }]}
                                />

                            </div>
                        </div>

                        {/* Difficulty */}
                        <div className="grid gap-2">
                            <Label htmlFor="difficulty">
                                Difficulty Level <span className="text-destructive">*</span>
                            </Label>
                            <CustomSelect
                                key={defaultQuestion?.id || 0}
                                name="difficulty"
                                disabled={questionMutation.isPending}
                                defaultValue={defaultQuestion?.difficulty}
                                id="difficulty"
                                options={difficultyOptions}
                            />
                        </div>

                        {/* Options */}
                        <div className="grid gap-2">
                            <div className="flex justify-between items-center">
                                <Label>
                                    Options <span className="text-destructive">*</span>
                                    <span className="text-sm text-muted-foreground ml-2">
                                        (Minimum 4, Maximum 10)
                                    </span>
                                </Label>
                                {options.length < 10 && (
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={addOption}
                                        disabled={questionMutation.isPending}
                                    >
                                        <PlusCircle className="size-3 mr-1" />
                                        Add Option
                                    </Button>
                                )}
                            </div>
                            <div className="grid gap-2">
                                {options.map((option, index) => (
                                    <div key={index} className="flex gap-2 items-center">
                                        <span className="text-sm font-medium w-6">
                                            {String.fromCharCode(65 + index)}.
                                        </span>
                                        <Input
                                            disabled={questionMutation.isPending}
                                            value={option}
                                            onChange={(e) => updateOption(index, e.target.value)}
                                            placeholder={`Option ${String.fromCharCode(65 + index)}`}
                                            maxLength={255}
                                        />
                                        {options.length > 4 && (
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                onClick={() => removeOption(index)}
                                                disabled={questionMutation.isPending}
                                            >
                                                <X className="size-3" />
                                            </Button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Correct Answer */}
                        <div className="grid gap-2">
                            <Label htmlFor="correct_answer">
                                Correct Answer <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                disabled={questionMutation.isPending}
                                defaultValue={defaultQuestion?.correct_answer || ''}
                                name="correct_answer"
                                id="correct_answer"
                                placeholder="Enter the correct answer"
                                maxLength={255}
                            />
                        </div>

                        <DialogFooter className="gap-2">
                            <DialogClose asChild>
                                <Button variant="secondary">Cancel</Button>
                            </DialogClose>
                            <Button disabled={questionMutation.isPending} type="submit">
                                {questionMutation.isPending && (
                                    <Loader2 className="animate-spin inline size-4 mr-2" />
                                )}
                                {defaultQuestion ? 'Update' : 'Save'}
                            </Button>
                        </DialogFooter>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateQuestionDialog;