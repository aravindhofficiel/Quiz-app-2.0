import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../api/axios";

export default function StudentDashboard() {
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  const { data: quizzes = [] } = useQuery({
    queryKey: ["quizzes"],
    queryFn: async () => (await api.get("/student/quizzes")).data,
  });

  if (selectedQuiz) {
    return <Quiz quizId={selectedQuiz} goBack={() => setSelectedQuiz(null)} />;
  }

  return (
    <>
      <h2>Available Quizzes</h2>
      {quizzes.map(q => (
        <div
          key={q.id}
          className="list-item"
          onClick={() => setSelectedQuiz(q.id)}
        >
          {q.title}
        </div>
      ))}
    </>
  );
}

function Quiz({ quizId, goBack }) {
  const [answers, setAnswers] = useState({});

  const { data } = useQuery({
    queryKey: ["quiz", quizId],
    queryFn: async () => (await api.get(`/student/quizzes/${quizId}`)).data,
  });

  const submit = async () => {
    const attempt = await api.post(`/student/quizzes/${quizId}/attempt`);
    const payload = {
      answers: Object.entries(answers).map(([q, o]) => ({
        questionId: Number(q),
        optionId: o,
      })),
    };
    const res = await api.post(`/student/attempts/${attempt.data.attemptId}/submit`, payload);
    alert(`Your score: ${res.data.score}`);
    goBack();
  };

  if (!data) return <p>Loading...</p>;

  return (
    <>
      <button onClick={goBack}>← Back</button>
      <h2>Quiz</h2>

      {data.questions.map(q => (
        <div key={q.id}>
          <p><strong>{q.question}</strong></p>
          {q.options.map(o => (
            <label key={o.id} style={{ display: "block" }}>
              <input
                type="radio"
                name={q.id}
                onChange={() =>
                  setAnswers({ ...answers, [q.id]: o.id })
                }
              />
              {o.text}
            </label>
          ))}
        </div>
      ))}

      <button onClick={submit}>Submit Quiz</button>
    </>
  );
}
