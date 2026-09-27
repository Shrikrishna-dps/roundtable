import { lifecycle } from "../../data/content";

// Lifecycle section shows how Roundtable carries work through the full meeting cycle
function Lifecycle() {
  return (
    <section className="rt-lifecycle">
      <div className="rt-container">
        <div className="rt-lifecycle__header">
          <p className="rt-eyebrow">{lifecycle.eyebrow}</p>

          <h2>{lifecycle.headline}</h2>

          <p>{lifecycle.body}</p>
        </div>

        <div className="rt-lifecycle__steps">
          {lifecycle.steps.map((step, index) => (
            <article className="rt-lifecycle__step" key={step.title}>
              <span className="rt-lifecycle__number">
                0{index + 1}
              </span>

              <div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Lifecycle;