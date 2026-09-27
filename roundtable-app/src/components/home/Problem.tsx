// Problem section introduces the follow-up gap Roundtable is designed to solve
function Problem({ data }: { data: any }) {
  return (
    <section className="rt-problem">
      <div className="rt-narrow">
        <div className="rt-problem__line" />

        <p className="rt-eyebrow">{data.eyebrow}</p>

        <h2>{data.headline}</h2>

        <p className="rt-problem__body">{data.body}</p>

        <div className="rt-problem__questions">
          {data.questions.map((question: string) => (
            <span key={question}>{question}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Problem;