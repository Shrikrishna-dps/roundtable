import { useState } from "react";
import { askDemo } from "../../data/content";

// Interactive meeting-memory panel lets visitors query captured meeting context
function AskDemo() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeQuestion = askDemo.questions[activeIndex];

  return (
    <section className="rt-ask">
      <div className="rt-ask__inner">
        <div className="rt-ask__copy">
          <p className="rt-eyebrow">{askDemo.eyebrow}</p>

          <h2>{askDemo.headline}</h2>
          <p className="rt-ask__body">{askDemo.body}</p>
        </div>

        <div className="rt-ask__panel">
          <div className="rt-ask__questions">
            {askDemo.questions.map((item, index) => (
              <button
                className={`rt-ask__question ${
                  activeIndex === index ? "is-active" : ""
                }`}
                key={item.question}
                onClick={() => setActiveIndex(index)}
              >
                {item.question}
              </button>
            ))}
          </div>

          <div className="rt-ask__answer rt-answer-enter" key={activeIndex}>
            <span className="rt-chip rt-chip--cyan">ROUNDTABLE FOUND IT</span>

            <h3>{activeQuestion.answer}</h3>

            <blockquote>“{activeQuestion.source}”</blockquote>

            <div className="rt-ask__meta">
              <span>{activeQuestion.meeting}</span>
              <span>{activeQuestion.when}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AskDemo;