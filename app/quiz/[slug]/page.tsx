"use client";
import Link from "next/link";
import React from "react";

const AngularQuestions = [
  "What is Angular?",
  "What is Angular CLI?",
  "What is Angular Material?",
];

const CssQuestions = ["What is Css?", "What is Css?", "What is Css?"];
const ScrumQuestions = ["What is Scrum?", "What is Scrum?", "What is Scrum?"];

interface QuizState {
  currentQuestion: number;
  questions: string[];
  responses: any[];
  correct: number;
}

const Quiz = ({ params }: { params: { slug: string } }) => {
  const initialState: QuizState = {
    currentQuestion: 0,
    questions: [],
    responses: [],
    correct: 0,
  };

  switch (params.slug) {
    case "angular":
      initialState.questions = AngularQuestions;
      break;
    case "css":
      initialState.questions = CssQuestions;
      break;
    case "scrum":
      initialState.questions = ScrumQuestions;
      break;
    default:
      initialState.questions = [];
      break;
  }

  const [currentState, setCurrentState] =
    React.useState<QuizState>(initialState);

  const [answerText, setAnswerText] = React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [quizComplete, setQuizComplete] = React.useState<boolean>(false);

  const sendAnswer = async () => {
    const { responses, currentQuestion, questions } = currentState;

    const newResponses = responses;

    newResponses.push({
      question: questions[currentQuestion],
      answer: answerText,
      correct: true,
      explanation: "This is a placeholder explanation",
      confidence: 0,
    });

    var nextQuestion = currentQuestion + 1;

    if (currentQuestion === questions.length - 1) {
      setQuizComplete(true);
      nextQuestion = currentQuestion;
    }

    setCurrentState({
      ...currentState,
      responses: newResponses,
      currentQuestion: nextQuestion,
    });

    setAnswerText("");
  };

  return (
    <div className="flex flex-col w-full h-full gap-4 justify-between">
      <Link href="/">{"<-"} Try Another Quiz</Link>
      <div className="flex w-full h-full gap-10 justify-between">
        <section className="flex flex-col w-full h-full gap-4">
          <h1>Quiz for {params.slug.toUpperCase()}</h1>
          <div className="flex flex-col border p-4 rounded-md gap-4 h-52">
            {!quizComplete ? (
              <>
                <span className="w-full flex">
                  Question {currentState.currentQuestion + 1} of{" "}
                  {currentState.questions.length}
                </span>
                <label htmlFor="answer-box">
                  <h2>
                    {currentState.questions[currentState.currentQuestion]}
                  </h2>
                </label>
                <input
                  name="answer-box"
                  type="text"
                  className="h-full text-black p-4"
                  value={answerText}
                  onChange={(e) => {
                    setAnswerText(e.target.value);
                  }}
                />
                <button onClick={sendAnswer}>Submit Answer</button>
              </>
            ) : (
              <>
                <h2>Quiz Complete!</h2>
                <span>Score: {currentState.correct}</span>
              </>
            )}
          </div>
        </section>

        <section className="w-full h-1/2 flex flex-col gap-4">
          <h1>Responses</h1>
          <div className="flex flex-col h-full divide-y-2 gap-4 bg-slate-900 rounded-md px-4 pb-4">
            {currentState.responses.map((response, i) => {
              return (
                <div className="flex flex-col gap-4 pt-4" key={i}>
                  <h2>{response.question}</h2>
                  <span>Your Answer: {response.answer}</span>
                  <span>Explanation: {response.explanation}</span>
                  <span>Confidence: {response.confidence}</span>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Quiz;
