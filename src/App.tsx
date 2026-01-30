import { useState } from "react";
import quizData from "./data/quiz.json";
import quizFullData from "./data/quizfull.json";
import QuizCard from "./components/component/QuizCard";

import { Button } from "./components/ui/button";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { startQuizData } from "./utils/quizHelper";
import { useTimer } from "./hook/useTimer";

import {
  Dialog,
  DialogContent,
  
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Header from "./components/component/Header";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import SpecialDialog from "./components/component/Special";


function App() {
  const [quiz, setQuiz] = useState<any[] | null>(null);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [submitted, setSubmitted] = useState(false); 
  const mergedData = [...quizData, ...quizFullData];


  const { timeLeft, start, reset } = useTimer(null);

  function startQuiz(data: any[], num: number, minutes?: number) {
    const random = startQuizData(data, num);

    setQuiz(random);
    setIndex(0);
    setAnswers(Array(num).fill(null));
    setSubmitted(false);

    if (minutes !== undefined) {
      start(minutes * 60);
    } else {
      reset(null);
    }
  }

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

  // ⌛ Hết giờ → tự nộp
  if (quiz && timeLeft !== null && timeLeft <= 0) {
    setSubmitted(true);
  }

  // 📊 Màn hình kết quả
  if (quiz && (index >= quiz.length || submitted)) {

    const results = quiz.map((q, i) => ({
      question: q.question,
      options: q.options,
      correct: q.answer,
      selected: answers[i],
      isCorrect: answers[i] === q.answer
    }));

    const score = results.filter(r => r.isCorrect).length;

    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-6 rounded-xl shadow max-w-2xl w-full">

          <h2 className="text-xl mb-2">Hoàn thành bài 🎉</h2>
          <p className="mb-4 font-semibold">
            Điểm: {score} / {quiz.length}
          </p>

          <div className="space-y-4 max-h-96 overflow-y-auto">

            {results.map((r, i) => (
              <div
                key={i}
                className={`p-3 rounded-lg border ${r.isCorrect
                    ? "border-green-400 bg-green-50"
                    : "border-red-400 bg-red-50"
                  }`}
              >
                <p className="font-semibold">
                  Câu {i + 1}: {r.question}
                </p>

                <p>✅: {r.options[r.correct]}</p>

                <p>
                  ❌:{" "}
                  {r.selected !== null
                    ? r.options[r.selected]
                    : "Chưa chọn"}
                </p>
              </div>
            ))}

          </div>

          <Button
            onClick={() => {
              setQuiz(null);
              setSubmitted(false);
            }}
            className="mt-6"
          >
            Quay lại chọn đề
          </Button>
        </div>
      </div>
    );
  }

  // 🟡 Màn hình chọn đề
  if (!quiz) {
    return (
      <div className="min-h-screen bg-muted flex flex-col items-center justify-center px-4">

  <h2 className="text-3xl font-bold mb-10">
    Chọn đề thi
  </h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl w-full">

    {/* Đề 1 */}
    <Card className="hover:shadow-xl transition-all">
      <CardHeader>
        <CardTitle>Đề 1</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-muted-foreground">70 câu mới</p>
        <p className="font-medium">⏱ 60 phút</p>

        <Button
          className="w-full mt-2"
          onClick={() => startQuiz(quizData, 70, 60)}
        >
          Bắt đầu
        </Button>
      </CardContent>
    </Card>

    {/* Đề 2 */}
    <Card className="hover:shadow-xl transition-all">
      <CardHeader>
        <CardTitle>Đề 2</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-muted-foreground">70 câu</p>
        <p className="font-medium">⏱ 60 phút</p>

        <Button
          className="w-full"
          onClick={() => startQuiz(quizFullData, 70, 60)}
        >
          Bắt đầu
        </Button>
      </CardContent>
    </Card>

   
    <Card className="hover:shadow-xl transition-all">
      <CardHeader>
        <CardTitle>Đề 3</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-muted-foreground">70 câu</p>
        <p className="font-medium">⏱ 60 phút</p>

        <Button
          className="w-full"
          onClick={() => startQuiz(quizFullData, 70, 60)}
        >
          Bắt đầu
        </Button>
      </CardContent>
    </Card>

    {/* Đề 4 */}
    <Card className="hover:shadow-xl transition-all">
      <CardHeader>
        <CardTitle>Đề 4</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-muted-foreground">70 câu</p>
        <p className="font-medium">⏱ 60 phút</p>

        <Button
          className="w-full"
          onClick={() => startQuiz(quizFullData, 70, 60)}
        >
          Bắt đầu
        </Button>
      </CardContent>
    </Card>
    <Card className="hover:shadow-xl transition-all">
      <CardHeader>
        <CardTitle>Đề 5</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-muted-foreground">70 câu</p>
        <p className="font-medium">⏱ 60 phút</p>

        <Button
          className="w-full"
          onClick={() => startQuiz(mergedData, 70, 60)}
        >
          Bắt đầu
        </Button>
      </CardContent>
    </Card>
    <Card className="hover:shadow-xl transition-all">
      <CardHeader>
        <CardTitle>Đề 6</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-muted-foreground">70 câu</p>
        <p className="font-medium">⏱ 60 phút</p>

        <Button
          className="w-full"
          onClick={() => startQuiz(mergedData, 70, 60)}
        >
          Bắt đầu
        </Button>
      </CardContent>
    </Card>
     <Card className="hover:shadow-xl transition-all">
      <CardHeader>
        <CardTitle>Đề 7</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-muted-foreground">70 câu</p>
        <p className="font-medium">⏱ 60 phút</p>

       <SpecialDialog />
         
      </CardContent>
    </Card>

    {/* Luyện tập */}
    <Card className="sm:col-span-2 lg:col-span-3 bg-primary text-primary-foreground">
      <CardHeader>
        <CardTitle>Luyện tập tổng hợp</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p>340 câu – Không giới hạn thời gian</p>

        <Button
          variant="secondary"
          className="w-full"
          onClick={() => startQuiz(quizFullData, 340)}
        >
          Bắt đầu luyện tập
        </Button>
      </CardContent>
    </Card>

    <Card className="sm:col-span-2 lg:col-span-3 bg-primary text-primary-foreground">
      <CardHeader>
        <CardTitle>Luyện tập tổng hợp</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p>70 câu – Không giới hạn thời gian</p>

        <Button
          variant="secondary"
          className="w-full"
          onClick={() => startQuiz(quizData, 70)}
        >
          Bắt đầu luyện tập
        </Button>
      </CardContent>
    </Card>

  </div>
</div>
    );
  }

  const current = quiz[index];

 

  return (
    <>


      <Header timeLeft={timeLeft} />

      <div className="pt-15">

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

          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-red-500 hover:bg-red-600">
                Nộp bài
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Bạn chắc chắn muốn nộp bài?</DialogTitle>
              </DialogHeader>

              <p className="text-gray-600">
                Bạn vẫn có thể còn câu chưa làm. Sau khi nộp sẽ không chỉnh sửa được.
              </p>

              <DialogFooter className="flex gap-2 mt-4">

                <Button
                  className="bg-red-500 hover:bg-red-600"
                  onClick={() => setSubmitted(true)}
                >
                  Nộp bài
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>


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
    </>
  );
}

export default App;
