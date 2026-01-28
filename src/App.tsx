import { useState } from "react";
import quizData from "./data/quiz.json";
import quizFullData from "./data/quizfull.json";
import QuizCard from "./components/component/QuizCard";

import { Button } from "./components/ui/button";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { startQuizData } from "./utils/quizHelper";
import { useTimer } from "./hook/useTimer"; // 👈 import hook

function App() {
  const [quiz, setQuiz] = useState<any[] | null>(null);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);

  // 👉 dùng hook timer
  const {
    timeLeft,
    start,
    reset
  } = useTimer(null);

  function startQuiz(data: any[], num: number, minutes?: number) {
    const random = startQuizData(data, num);

    setQuiz(random);
    setIndex(0);
    setAnswers(Array(num).fill(null));

    if (minutes !== undefined) {
      start(minutes * 60);   // ⏱ có giới hạn
    } else {
      reset(null);           // 🚫 không giới hạn (luyện tập)
    }
  }

  // 👉 Chọn đáp án
  function choose(i: number) {
    if (!quiz) return;

    setAnswers(prev => {
      const copy = [...prev];
      copy[index] = i;
      return copy;
    });
  }

  function nextQuestion() {
    setIndex(i => i + 1);
  }

  function prevQuestion() {
    setIndex(i => i - 1);
  }

  // ⌛ Hết giờ (chỉ khi có timer)
  if (quiz && timeLeft !== null && timeLeft <= 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl mb-2">Hết giờ ⏰</h2>

          <Button onClick={() => setQuiz(null)} className="mt-4">
            Quay lại chọn đề
          </Button>
        </div>
      </div>
    );
  }

  // 🟡 Màn hình chọn đề
  if (!quiz) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gray-100">
        <h2 className="text-2xl mb-4">Chọn đề thi</h2>

        {/* Có timer */}
        <Button onClick={() => startQuiz(quizData, 70, 60)}>
          Đề 1 - 70 câu mới (60 phút)
        </Button>

        <Button onClick={() => startQuiz(quizFullData, 70, 60)}>
          Đề 2 (60 phút)
        </Button>
        <Button onClick={() => startQuiz(quizFullData, 70, 60)}>
          Đề 3 (60 phút)
        </Button>
        <Button onClick={() => startQuiz(quizFullData, 70, 60)}>
          Đề 4 (60 phút)
        </Button>
        {/* Không timer */}
        <Button onClick={() => startQuiz(quizFullData, 340)}>
          Luyện tập 340 câu
        </Button>
      </div>
    );
  }

  // 🟢 Hết câu
  if (index >= quiz.length) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-6 rounded-xl shadow">
          <h2>Hoàn thành bài 🎉</h2>

          <Button onClick={() => setQuiz(null)} className="mt-4">
            Quay lại chọn đề
          </Button>
        </div>
      </div>
    );
  }

  const current = quiz[index];

  // ⏱ Format time (nếu có)
  const minutes = timeLeft !== null ? Math.floor(timeLeft / 60) : 0;
  const seconds = timeLeft !== null ? timeLeft % 60 : 0;

  return (
    <div>
      

      {/* Timer chỉ hiện khi có */}
      {timeLeft !== null && (
        <div className="fixed top-16 left-0 right-0 bg-black text-white p-3 text-center z-10">
          Thời gian còn lại: {minutes}:{seconds.toString().padStart(2, "0")}
        </div>
      )}

      <div className="pt-32">
        <QuizCard
          index={index}
          total={quiz.length}
          question={current.question}
          options={current.options}
          answer={current.answer}
          selected={answers[index]}
          onChoose={choose}
        />

        <div className="flex justify-center gap-4 mt-6">
          <Button
            disabled={index === 0}
            onClick={prevQuestion}
            className={index === 0 ? "bg-gray-400" : "bg-slate-500 hover:bg-slate-600"}
          >
            <GrFormPrevious />
          </Button>

          <Button
            disabled={answers[index] === null}
            onClick={nextQuestion}
            className={
              answers[index] === null
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }
          >
            <GrFormNext />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default App;
