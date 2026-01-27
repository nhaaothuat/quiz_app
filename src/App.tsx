import { useEffect, useState } from "react";
import quizData from "./data/quiz.json";
import QuizCard from "./components/component/QuizCard";
import Header from "./components/component/Header";

function shuffle(arr:any[]) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function App() {
  const [quiz, setQuiz] = useState<any[] | null>(null);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(0);

  function startQuiz(num:number, minutes:number) {
    const random = shuffle(quizData).slice(0, num);

    setQuiz(random);
    setIndex(0);
    setSelected(null);
    setTimeLeft(minutes * 60);
  }

  // ⏱ Timer
  useEffect(() => {
    if (!quiz || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(t => t - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [quiz, timeLeft]);

  // 👉 Chọn đáp án (không auto next)
  function choose(i:number) {
    if (!quiz) return;
    setSelected(i);
  }

  // 👉 Nút Next
  function nextQuestion() {
    setSelected(null);
    setIndex(i => i + 1);
  }

  // ⌛ Hết giờ
  if (quiz && timeLeft <= 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl mb-2">Hết giờ ⏰</h2>

          <button
            onClick={() => setQuiz(null)}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Quay lại chọn đề
          </button>
        </div>
      </div>
    );
  }

  // 📌 Chọn đề
  if (!quiz) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gray-100">
        <h2 className="text-2xl mb-4">Chọn đề thi</h2>

        <button
          onClick={() => startQuiz(20, 15)}
          className="px-6 py-3 bg-blue-500 text-white rounded-xl"
        >
          Đề 20 câu (15 phút)
        </button>

        <button
          onClick={() => startQuiz(35, 30)}
          className="px-6 py-3 bg-green-500 text-white rounded-xl"
        >
          Đề 35 câu (30 phút)
        </button>

        <button
          onClick={() => startQuiz(50, 45)}
          className="px-6 py-3 bg-purple-500 text-white rounded-xl"
        >
          Đề 50 câu (45 phút)
        </button>
      </div>
    );
  }

  const current = quiz[index];

  // 🟢 Hết câu
  if (index >= quiz.length) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-6 rounded-xl shadow">
          <h2>Hoàn thành bài 🎉</h2>

          <button
            onClick={() => setQuiz(null)}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Quay lại chọn đề
          </button>
        </div>
      </div>
    );
  }

  // ⏱ Format time
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div>

      <Header />

      {/* Timer */}
      <div className="fixed top-16 left-0 right-0 bg-black text-white p-3 text-center z-10">
        Thời gian còn lại: {minutes}:{seconds.toString().padStart(2, "0")}
      </div>

      {/* Quiz */}
      <div className="pt-32">
        <QuizCard
          index={index}
          total={quiz.length}
          question={current.question}
          options={current.options}
          answer={current.answer}
          selected={selected}
          onChoose={choose}
        />

        {/* 👉 NEXT button */}
        <div className="flex justify-center mt-6">
          <button
            disabled={selected === null}
            onClick={nextQuestion}
            className={`
              px-6 py-3 rounded-xl text-white transition
              ${selected === null 
                ? "bg-gray-400 cursor-not-allowed" 
                : "bg-blue-500 hover:bg-blue-600"}
            `}
          >
            Next →
          </button>
        </div>
      </div>

    </div>
  );
}

export default App;
