export default function SettingsModal({ profile, onClearData, onClose, onLogout, onProfileChange }) {
  return (
    <div className="modal-backdrop" onClick={(event) => event.target === event.currentTarget && onClose()}>
      <section className="modal-sheet" role="dialog" aria-modal="true">
        <div className="modal-handle" />
        <div className="modal-title-row">
          <h2 className="section-title">Settings</h2>
          <button className="icon-button" onClick={onClose} type="button">×</button>
        </div>

        <label className="form-field">
          <span className="field-label">Edit Name</span>
          <input
            className="field-input"
            onChange={(event) => onProfileChange({ ...profile, name: event.target.value })}
            value={profile.name}
          />
        </label>

        <label className="checkbox-row">
          <input defaultChecked type="checkbox" />
          <span>Notify me about preferred categories</span>
        </label>
        <label className="checkbox-row">
          <input defaultChecked type="checkbox" />
          <span>Notify me before accepted task deadlines</span>
        </label>

        <button className="button button-danger button-full" onClick={onClearData} type="button">
          Clear data
        </button>

        <button className="button button-secondary button-full" onClick={onLogout} type="button">
          Log out
        </button>
      </section>
    </div>
  );
}
