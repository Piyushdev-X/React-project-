import { CAMPUS_SPOTS, CATEGORIES } from "../utils/constants.js";

export default function NeedItScreen({ form, onFormChange, onSubmit }) {
  const updateForm = (updates) => onFormChange((current) => ({ ...current, ...updates }));

  return (
    <section>
      <h2 className="page-title">Post a Task</h2>

      <div className="card form-card">
        <label className="field-label" htmlFor="task-title">
          Task Name *
        </label>
        <input
          className="field-input"
          id="task-title"
          onChange={(event) => updateForm({ title: event.target.value })}
          placeholder="e.g. Submit assignment to Prof. Sharma's cabin"
          value={form.title}
        />

        <label className="field-label spaced" htmlFor="task-category">
          Category
        </label>
        <select
          className="field-input"
          id="task-category"
          onChange={(event) => updateForm({ category: event.target.value })}
          value={form.category}
        >
          {CATEGORIES.map((category) => (
            <option key={category}>{category}</option>
          ))}
        </select>

        <div className="two-column-fields">
          <div>
            <label className="field-label" htmlFor="task-deadline">
              Deadline (IST) *
            </label>
            <input
              className="field-input"
              id="task-deadline"
              onChange={(event) => updateForm({ deadline: event.target.value })}
              type="datetime-local"
              value={form.deadline}
            />
          </div>

          <div>
            <label className="field-label" htmlFor="task-reward">
              Reward (₹) *
            </label>
            <input
              className="field-input"
              id="task-reward"
              min="1"
              onChange={(event) => updateForm({ reward: event.target.value })}
              placeholder="50"
              type="number"
              value={form.reward}
            />
          </div>
        </div>

        <label className="field-label spaced">Location</label>
        <div className="segmented-control">
          {["Remote", "On-Site"].map((locationType) => (
            <button
              className={`segment-button ${form.locType === locationType ? "active" : ""}`}
              key={locationType}
              onClick={() => updateForm({ locType: locationType })}
              type="button"
            >
              {locationType}
            </button>
          ))}
        </div>

        {form.locType === "On-Site" && (
          <div>
            <label className="field-label" htmlFor="campus-spot">
              Campus Spot
            </label>
            <select
              className="field-input"
              id="campus-spot"
              onChange={(event) => updateForm({ spot: event.target.value })}
              value={form.spot}
            >
              {CAMPUS_SPOTS.map((spot) => (
                <option key={spot}>{spot}</option>
              ))}
              <option value="Other">Other</option>
            </select>

            {form.spot === "Other" && (
              <input
                className="field-input custom-location"
                onChange={(event) => updateForm({ customLocation: event.target.value })}
                placeholder="Describe location"
                value={form.customLocation}
              />
            )}
          </div>
        )}

        <label className="checkbox-row compact">
          <input
            checked={form.genderSensitive}
            onChange={(event) => updateForm({ genderSensitive: event.target.checked })}
            type="checkbox"
          />
          <span>Mark as Gender-Sensitive</span>
        </label>

        <button className="button button-primary button-full" onClick={onSubmit}>
          Post Task
        </button>
      </div>
    </section>
  );
}
