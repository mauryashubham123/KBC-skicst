import { kbc } from "@/lib/helpers/api_urls";
import { EventType } from "@/types/typedef";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";


export const EventQuestionShow = ({ event }: { event?: EventType }) => {
   const [answers, setAnswers] = useState<Record<number, string>>({});

const submitAnswerMutation = useMutation({
  mutationFn: kbc.audiance_apis.storeAnswers,
  onSuccess: () => {toast.success("उत्तर सफलतापूर्वक सबमिट हुआ!");},
  onError: (error: any) => {toast.error(error?.response?.data?.message || "उत्तर सबमिट नहीं हो सका");},});
  const handleOptionChange = (questionId: number, selectedOption: string) => {setAnswers((prev) => ({...prev,[questionId]: selectedOption,}));};
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  if (!event?.id) return;
  const formData = new FormData();
  formData.append('event_id', String(event.id));
  Object.entries(answers).forEach(([questionId, answer], index) => {formData.append(`answers[${index}][question_id]`, questionId);formData.append(`answers[${index}][answer]`, answer);});
  submitAnswerMutation.mutate(formData);
  };

  if (!event || !event.questions || event.questions.length === 0) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="text-center text-gray-500">
          <p>कोई प्रश्न उपलब्ध नहीं है</p>
        </div>
      </div>
    );
  }
  return (
    <form onSubmit={handleSubmit} className="">
      {/* Questions Form */}
      <div className="space-y-8">
        {event.questions?.map((question:any, index:number) => (
          <div key={question.id} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            {/* Question Header */}
            <div className="mb-4">
              <div className="flex items-center gap-3 mb-3">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  प्रश्न {index + 1}
                </span>
                
              </div>
              <h3 className="text-lg font-semibold text-gray-800">
                {question.body}
              </h3>
            </div>

            {/* Options */}
            <div className="space-y-3">
              {question.options && question.options.map((option:[], optionIndex:number) => (
                <label
                  key={optionIndex}
                  className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors hover:bg-gray-50 ${
                    answers[question.id] === option
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200'
                  }`}
                >
                  <input
                    type="radio"
                    name={`question-${question.id}`}
                    value={option}
                    checked={answers[question.id] === option}
                    onChange={(e) => handleOptionChange(question.id, e.target.value)}
                    className="mr-3 text-blue-600"
                  />
                  <span className="flex-1 text-gray-700">{option}</span>
                  {answers[question.id] === option && (
                    <span className="text-blue-600 ml-2">✓</span>
                  )}
                </label>
              ))}
            </div>
          </div>
        ))}

        {/* Submit Section */}
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-gray-700">
                प्रगति: {Object.keys(answers).length} / {event.questions.length} प्रश्न पूर्ण
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all"
                  style={{
                    width: `${(Object.keys(answers).length / event.questions.length) * 100}%`
                  }}
                ></div>
              </div>
            </div>
          </div>
          
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={Object.keys(answers).length === 0}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                Object.keys(answers).length === 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              उत्तर जमा करें ({Object.keys(answers).length})
            </button>
            
          </div>
        </div>
      </div>
    </form>
  );
}
