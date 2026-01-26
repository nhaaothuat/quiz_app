
import { useState } from 'react';
import quizData from './data/quiz.json'

function App() {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);

  const current = quizData[index];

  function choose(i) {
    if (i === current.answer) {
      alert("Đúng rồi 😄");
      setScore(score + 1);
    } else {
      alert("Sai rồi 😅");
    }

    setIndex(index + 1);
  }

  if (!current) {
    return <h2>Hoàn thành! Điểm: {score}/{quizData.length}</h2>;
  }


  return(
     <div style={{ padding: 20 }}>
      <h3>Câu {index + 1}</h3>
      <p>{current.question}</p>

      {current.options.map((op, i) => (
        <button
          key={i}
          onClick={() => choose(i)}
          style={{ display: "block", margin: "6px 0" }}
        >
          {op}
        </button>
      ))}
    </div>
  )
}

export default App
