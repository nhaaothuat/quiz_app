
import { Button } from '../ui/button';

type Props = {
  index: number;
  total: number;
  question: string;
  options: string[];
  answer: number;
  selected: number | null;
  onChoose: (i: number) => void;
};

const QuizCard = ({
  index,
  total,
  question,
  options,
  answer,
  selected,
  onChoose
}: Props) => {

  const hasAnswered = selected !== null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full mx-4">

        <p className="text-sm text-gray-500 mb-2">
          Câu {index + 1} / {total}
        </p>

        <h2 className="text-xl font-semibold mb-6">
          {question}
        </h2>

        <div className="space-y-3">
          {options.map((op, i) => {

            let style = "";

            if (hasAnswered) {
              if (i === answer) {
                // đáp án đúng luôn xanh
                style = "bg-green-200 border-green-500";
              }
              else if (i === selected && selected !== answer) {
                // user chọn sai -> đỏ
                style = "bg-red-200 border-red-500";
              }
              else {
                // các đáp án khác mờ đi
                style = "opacity-60";
              }
            }

            return (
              <Button
                key={i}
                variant="outline"
                disabled={hasAnswered}   // 🚫 không cho click lại
                onClick={() => onChoose(i)}
                className={`
                  w-full justify-start text-left py-6 px-4
  whitespace-normal wrap-break-word leading-relaxed
  transition
                  ${style}
                `}
              >
                {op}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  )
}

export default QuizCard
