import { formatCountdown } from "../utils/tasks.js";

export default function CompleteTaskModal({ task, onClose, onConfirm }) {
  const late = formatCountdown(task.deadline) === "Expired";
  const earning = late ? task.reward * 0.5 : task.reward;

  return (
    <div className="modal-backdrop" onClick={(event) => event.target === event.currentTarget && onClose()}>
      <section className="modal-sheet" role="dialog" aria-modal="true">
        <div className="modal-handle" />
        <h2 className="section-title">Mark as Done</h2>
        <p className="modal-copy">
          Confirm that you completed <strong>{task.title}</strong>. Late completion
          earns 50% of the reward.
        </p>
        <div className={late ? "notice notice-danger" : "notice notice-success"}>
          <span>{late ? "Penalty applied" : "Full reward unlocked"}</span>
          <strong>You earn ₹{earning.toFixed(2)}</strong>
        </div>
        <div className="button-row">
          <button className="button button-secondary" onClick={onClose} type="button">
            Cancel
          </button>
          <button className="button button-primary button-wide" onClick={() => onConfirm(task)} type="button">
            Confirm
          </button>
        </div>
      </section>
    </div>
  );
}
