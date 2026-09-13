import { problem } from "../../data/content";

// Problem section introduces the follow-up gap Roundtable is designed to solve
function Problem() {
  return (
    <section className="rt-problem">
      <div className="rt-narrow">
        <div className="rt-problem__line" />

        <p className="rt-eyebrow">{problem.eyebrow}</p>

        <h2>{problem.headline}</h2>

        <p className="rt-problem__body">{problem.body}</p>

        <div className="rt-problem__questions">
          {problem.questions.map((question) => (
            <span key={question}>{question}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Problem;