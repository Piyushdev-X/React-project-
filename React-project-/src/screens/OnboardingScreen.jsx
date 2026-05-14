import { COLLEGES, YEARS } from "../utils/constants.js";

export default function OnboardingScreen({ errors, form, onFormChange, onSubmit }) {
  const updateForm = (updates) => onFormChange((current) => ({ ...current, ...updates }));
  const updateEmail = (email) => {
    const normalizedEmail = email.trim().toLowerCase();
    const matchedCollege = COLLEGES.find(
      (college) => normalizedEmail.endsWith(college.domain),
    );

    updateForm({
      email,
      ...(matchedCollege ? { college: matchedCollege.name } : {}),
    });
  };

  return (
    <section className="onboarding-screen page-transition">
      <div className="welcome-panel">
        <div className="app-mark" aria-hidden="true">
          <span />
          <span />
        </div>
        <h1>Welcome to Blok</h1>
        <p>Campus peer-to-peer task economy</p>
      </div>

      <div className="card onboarding-card">
        <FormField error={errors.name} label="Name">
          <input className="field-input" onChange={(event) => updateForm({ name: event.target.value })} placeholder="e.g. Arjun Sharma" value={form.name} />
        </FormField>

        <FormField error={errors.email} label="College Email">
          <input className="field-input" onChange={(event) => updateEmail(event.target.value)} placeholder="name@college.edu" value={form.email} />
        </FormField>

        <div className="two-column-fields">
          <FormField label="College">
            <select className="field-input" onChange={(event) => updateForm({ college: event.target.value })} value={form.college}>
              {COLLEGES.map((college) => <option key={college.name}>{college.name}</option>)}
            </select>
          </FormField>
          <FormField label="Year">
            <select className="field-input" onChange={(event) => updateForm({ year: event.target.value })} value={form.year}>
              {YEARS.map((year) => <option key={year}>{year}</option>)}
            </select>
          </FormField>
        </div>

        <div className="checkbox-stack">
          <label className="checkbox-row">
            <input checked={form.privacyAccepted} onChange={(event) => updateForm({ privacyAccepted: event.target.checked })} type="checkbox" />
            <span><strong>Privacy agreement</strong> - Task info is only visible to campus users and is never shared externally.</span>
          </label>

          <label className="checkbox-row">
            <input checked={form.penaltyAccepted} onChange={(event) => updateForm({ penaltyAccepted: event.target.checked })} type="checkbox" />
            <span><strong>Delay penalty</strong> - Completing after deadline results in a <strong>50% reward deduction</strong>.</span>
          </label>
        </div>

        {errors.terms && <span className="inline-error">{errors.terms}</span>}

        <button className="button button-primary button-full" onClick={onSubmit} type="button">
          Create Account
        </button>
      </div>

      <p className="fine-print">All data stays on your device.</p>
    </section>
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
