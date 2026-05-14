import { CAMPUS_SPOTS, CATEGORIES, ESTIMATED_TIMES } from "../utils/constants.js";
import { validateTaskForm } from "../utils/tasks.js";

export default function PostTaskModal({ form, errors, onClose, onFormChange, onSubmit }) {
  const nextErrors = validateTaskForm(form);
  const isValid = Object.keys(nextErrors).length === 0;
  const updateForm = (updates) => onFormChange((current) => ({ ...current, ...updates }));

  return (
    <div className="modal-backdrop" onClick={(event) => event.target === event.currentTarget && onClose()}>
      <section className="modal-sheet post-sheet" role="dialog" aria-modal="true">
        <div className="modal-handle" />
        <div className="modal-title-row">
          <h2 className="section-title">Post a Task</h2>
          <button className="icon-button" onClick={onClose} type="button">×</button>
        </div>

        <FormField error={errors.title} label="Task Name *">
          <input className="field-input" onChange={(event) => updateForm({ title: event.target.value })} value={form.title} />
        </FormField>

        <FormField error={errors.description} label="Description *">
          <textarea
            className="field-input textarea"
            onChange={(event) => updateForm({ description: event.target.value })}
            placeholder="Add enough detail so helpers know what to do."
            value={form.description}
          />
        </FormField>

        <div className="two-column-fields">
          <FormField label="Category">
            <select className="field-input" onChange={(event) => updateForm({ category: event.target.value })} value={form.category}>
              {CATEGORIES.map((category) => <option key={category}>{category}</option>)}
            </select>
          </FormField>
          <FormField error={errors.reward} label="Reward (₹) *">
            <input className="field-input" min="20" onChange={(event) => updateForm({ reward: event.target.value })} type="number" value={form.reward} />
          </FormField>
        </div>

        <FormField error={errors.deadline} label="Deadline (IST) *">
          <input className="field-input" onChange={(event) => updateForm({ deadline: event.target.value })} type="datetime-local" value={form.deadline} />
        </FormField>

        <div className="two-column-fields">
          <FormField label="Estimated Time">
            <select className="field-input" onChange={(event) => updateForm({ estimatedTime: event.target.value })} value={form.estimatedTime}>
              {ESTIMATED_TIMES.map((time) => <option key={time}>{time}</option>)}
            </select>
          </FormField>
          <FormField label="Max Acceptors">
            <select className="field-input" onChange={(event) => updateForm({ maxAcceptors: event.target.value })} value={form.maxAcceptors}>
              <option value="1">1</option>
              <option value="multiple">Open to multiple</option>
            </select>
          </FormField>
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
          <FormField error={errors.customLocation} label="Campus Spot">
            <select className="field-input" onChange={(event) => updateForm({ spot: event.target.value })} value={form.spot}>
              {CAMPUS_SPOTS.map((spot) => <option key={spot}>{spot}</option>)}
              <option value="Other">Other</option>
            </select>
            {form.spot === "Other" && (
              <input className="field-input custom-location" onChange={(event) => updateForm({ customLocation: event.target.value })} placeholder="Describe location" value={form.customLocation} />
            )}
          </FormField>
        )}

        <div className="segmented-control spaced">
          {["Normal", "Urgent"].map((urgency) => (
            <button
              className={`segment-button ${form.urgency === urgency ? "active" : ""}`}
              key={urgency}
              onClick={() => updateForm({ urgency })}
              type="button"
            >
              {urgency}
            </button>
          ))}
        </div>

        <label className="checkbox-row compact">
          <input checked={form.genderSensitive} onChange={(event) => updateForm({ genderSensitive: event.target.checked })} type="checkbox" />
          <span>Mark as Gender-Sensitive</span>
        </label>

        <button className="button button-primary button-full" disabled={!isValid} onClick={onSubmit} type="button">
          Post Task
        </button>
      </section>
    </div>
  );
}

function FormField({ children, error, label }) {
  return (
    <label className="form-field">
      <span className="field-label">{label}</span>
      {children}
      {error && <span className="inline-error">{error}</span>}
    </label>
  );
}
