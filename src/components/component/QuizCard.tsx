import { Button } from "../ui/button";

type Props = {
  index: number;
  total: number;
  question: string;
  options: string[];
  answer: number;
  selected: number | null;
  onChoose: (i: number) => void;
};

const labels = ["A", "B", "C", "D"];

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
    <div className="flex justify-center bg-gray-100 px-4 py-6">

      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-4xl">

        {/* Header */}
        <p className="text-sm text-gray-500 mb-3">
          Câu {index + 1} / {total}
        </p>

        {/* Question (scroll nếu quá dài) */}
        <div className="max-h-56 overflow-y-auto pr-2 mb-6">
          <h2 className="text-lg md:text-xl font-semibold leading-relaxed whitespace-pre-line">
            {question}
          </h2>
        </div>

        {/* Options */}
        <div className="space-y-4">
          {options.map((op, i) => {

            let style =
              "border-gray-300 bg-white hover:bg-gray-50";

            if (hasAnswered) {
              if (i === answer) {
                style = "bg-green-100 border-green-500 text-green-800";
              }
              else if (i === selected && selected !== answer) {
                style = "bg-red-100 border-red-500 text-red-800";
              }
            }

            return (
              <Button
                key={i}
                variant="outline"
                disabled={hasAnswered}
                onClick={() => onChoose(i)}
                className={`
          w-full
          flex items-center gap-4
          text-left
          px-4 py-8
          rounded-xl
          border-2
          transition-colors
          leading-relaxed
          whitespace-normal
         
          ${style}
        `}
              >

                {/* Circle label */}
                <div className={`
          w-9 h-9 min-w-[36px]
          rounded-full
          flex items-center justify-center
          font-semibold
          shrink-0
          ${hasAnswered && i === answer
                    ? "bg-green-500 text-white"
                    : hasAnswered && i === selected && selected !== answer
                      ? "bg-red-500 text-white"
                      : "bg-gray-200 text-gray-700"}
        `}>
                  {labels[i]}
                </div>

                {/* Option text */}
                <span className="flex-1 text-base break-words">
                  {op}
                </span>

              </Button>
            );
          })}
        </div>


      </div>
    </div>
  );
};

export default QuizCard;
