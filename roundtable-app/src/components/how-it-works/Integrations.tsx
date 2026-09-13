import { integrations } from "../../data/content";

// Shows how Roundtable connects meetings, its intelligence layer, and existing work tools
function Integrations() {
  return (
    <section className="rt-integrations">
      <div className="rt-container">
        <div className="rt-integrations__header">
          <p className="rt-eyebrow">{integrations.eyebrow}</p>
          <h2>{integrations.headline}</h2>
        </div>

        <div className="rt-integrations__flow">
          <div className="rt-integrations__group">
            <span className="rt-integrations__label">MEETINGS</span>

            <div className="rt-integrations__items">
              {integrations.meetings.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>

          <div className="rt-integrations__engine">
            <span>{integrations.engine.label}</span>
            <b>{integrations.engine.subhead}</b>
            <small>{integrations.engine.caption}</small>
          </div>

          <div className="rt-integrations__group">
            <span className="rt-integrations__label">WORK</span>

            <div className="rt-integrations__items">
              {integrations.work.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Integrations;