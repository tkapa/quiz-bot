"use client";
import Link from "next/link";
import React from "react";
import { Player } from "@lottiefiles/react-lottie-player";

const apiBaseURL = "http://localhost:5294";

const AngularQuestions = [
  "What is the purpose of the pathMatch: 'full' attribute in Angular routes?",
  "What is the difference between the ngOnChanges and ngOnInit lifecycle hooks?",
  "Angular is described as an opinionated framework. What does that mean?",
];
const CssQuestions = [
  "What is the correct syntax for CSS variables?",
  "Write an example of a media query that will apply styles for mobile devices",
  'What is the CSS specificity of the selector “div.section #icon a.img.my-img#user:hover"?',
];
const ScrumQuestions = [
  "What is the primary goal of the Daily Scrum?",
  "What is the recommended size of a Scrum Development Team?",
  "What is the purpose of the Sprint Review in Scrum?",
];
interface SubmitAnswerRequest {
  questionText: string;
  answerText: string;
}

interface SubmitAnswerResponse {
  question: string;
  answer: string;
  explanation: string;
  confidence: number;
  correct: boolean;
}

interface QuizState {
  currentQuestion: number;
  questions: string[];
  responses: SubmitAnswerResponse[];
  correct: number;
  quizComplete: boolean;
}

const Quiz = ({ params }: { params: { slug: string } }) => {
  const characterLimit = 50;
  const initialState: QuizState = {
    currentQuestion: 0,
    questions: [],
    responses: [],
    correct: 0,
    quizComplete: false,
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
  const [isError, setIsError] = React.useState<boolean>(false);

  const sendAnswer = async () => {
    if (answerText.length > characterLimit) return;

    setIsLoading(true);
    const { quizComplete, responses, currentQuestion, questions, correct } =
      currentState;
    const newResponses = responses;

    //TODO: Post to /Quiz/SubmitAnswer
    const res = await fetch(`${apiBaseURL}/Quiz/SubmitAnswer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        questionText: questions[currentQuestion],
        answerText: answerText,
      } as SubmitAnswerRequest),
    });

    const response = (await res.json()) as SubmitAnswerResponse;

    newResponses.push(response);

    var nextQuestion = currentQuestion + 1;

    setCurrentState({
      ...currentState,
      responses: newResponses,
      currentQuestion: nextQuestion,
      correct: response.correct ? correct + 1 : correct,
      quizComplete: currentQuestion === questions.length - 1,
    });

    setAnswerText("");
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col w-full h-full gap-4 justify-between">
      <Link href="/" className="border rounded-md w-48 p-2 text-center">
        {"<-"} Try Another Quiz
      </Link>
      <div className="flex w-full h-full gap-10 justify-between">
        <section className="flex flex-col w-full h-full gap-4">
          <h1>Quiz for {params.slug.toUpperCase()}</h1>
          <div className="flex flex-col border p-4 rounded-md gap-4 h-fit">
            {!currentState.quizComplete ? (
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
                <div className="flex flex-col gap-4">
                  {!isLoading ? (
                    <>
                      <div className="w-full h-full flex flex-col gap-2">
                        <textarea
                          name="answer-box"
                          className={`h-full text-white p-4 bg-gray-700 rounded-md border ${
                            isError ? "border-red-400" : "border-gray-700"
                          }`}
                          value={answerText}
                          placeholder="Enter your answer here..."
                          onChange={(e) => {
                            const answer = e.target.value;
                            if (answer.length > characterLimit) {
                              setIsError(true);
                            } else {
                              setIsError(false);
                            }
                            setAnswerText(e.target.value);
                          }}
                        />
                        <span
                          className={`${isError ? "text-red-400" : ""}`}
                        >{`${answerText.length} of ${characterLimit}`}</span>
                      </div>
                      <button
                        className="border rounded-md w-40 p-2 text-center disabled:border-gray-700 disabled:text-gray-700"
                        disabled={isError}
                        onClick={sendAnswer}
                      >
                        Submit Answer
                      </button>
                    </>
                  ) : (
                    <Player
                      autoplay
                      loop
                      src="/anim.json"
                      style={{ height: "150px", width: "200px" }}
                    />
                  )}
                </div>
              </>
            ) : (
              <>
                <h2>Quiz Complete!</h2>
                <span>Score: {currentState.correct}</span>
              </>
            )}
          </div>
        </section>

        <section className="w-full max-h-full flex flex-col gap-4">
          <h1>Responses</h1>
          <div className="flex flex-col h-[400px] max-h-[400px] divide-y-2 gap-4 bg-slate-900 rounded-md px-4 pb-4 overflow-y-auto">
            {currentState.responses.map((response, i) => {
              return (
                <div className="flex flex-col gap-2 pt-4" key={i}>
                  <div
                    className={`flex justify-between ${
                      response.correct ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    <h2>
                      Question {i + 1} <br />
                      {response.question}
                    </h2>
                    <span>{response.correct ? "CORRECT" : "INCORRECT"}</span>
                  </div>
                  <hr />
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
