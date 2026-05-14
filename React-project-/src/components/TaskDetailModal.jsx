import { useState } from "react";
import { CategoryBadge, GenderBadge, LocationBadge } from "./Badges.jsx";
import { formatIST } from "../utils/date.js";
import { formatCountdown } from "../utils/tasks.js";

export default function TaskDetailModal({ task, onClose, onAccept }) {
  const [confirming, setConfirming] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const canAccept = task.status === "open";

  return (
    <div className="modal-backdrop" onClick={(event) => event.target === event.currentTarget && onClose()}>
      <section className="modal-sheet detail-sheet" role="dialog" aria-modal="true">
        <div className="modal-handle" />
        <div className="detail-header">
          <div>
            <div className="badge-row">
              <CategoryBadge category={task.category} />
              <LocationBadge task={task} />
              {task.genderSensitive && <GenderBadge />}
            </div>
            <h2>{task.title}</h2>
          </div>
          <button className="icon-button" onClick={onClose} type="button">×</button>
        </div>

        <p className="detail-description">{task.description}</p>

        <div className="poster-profile-card">
          <div className="avatar avatar-large">{task.postedBy[0].toUpperCase()}</div>
          <div>
            <strong>{task.postedBy}</strong>
            <span>⭐ {task.posterRating || 4.8} · {task.posterTasksPosted || 8} tasks posted</span>
            <span>Joined {formatIST(task.posterJoinedAt || task.createdAt)}</span>
          </div>
        </div>

        <div className="detail-grid">
          <div>
            <span>Deadline</span>
            <strong>{formatCountdown(task.deadline)}</strong>
            <small>{formatIST(task.deadline)}</small>
          </div>
          <div>
            <span>Reward</span>
            <strong className="detail-reward">₹{task.reward}</strong>
            <small>{task.estimatedTime}</small>
          </div>
        </div>

        {task.locType === "On-Site" && (
          <div className="map-placeholder">
            <span>Campus map placeholder</span>
            <strong>{task.location}</strong>
          </div>
        )}

        {task.genderSensitive && (
          <div className="notice notice-warning">
            <strong>Gender-sensitive task</strong>
            <span>Please accept only if you are comfortable with the requester’s preference.</span>
          </div>
        )}

        {confirming && (
          <div className="notice notice-warning">
            <strong>Accept this task?</strong>
            <span>
              By accepting, you agree to complete this by {formatIST(task.deadline)}
              or face a 50% reward deduction. Proceed?
            </span>
          </div>
        )}

        {chatOpen && (
          <div className="chat-box">
            <div className="chat-message">Ask anything before accepting. This is a local prototype thread.</div>
            <div className="chat-input-row">
              <input
                className="field-input"
                onChange={(event) => setQuestion(event.target.value)}
                placeholder="Type a question..."
                value={question}
              />
              <button className="button button-secondary" type="button">Send</button>
            </div>
          </div>
        )}

        <div className="button-row">
          <button className="button button-secondary" onClick={() => setChatOpen((value) => !value)} type="button">
            Ask a Question
          </button>
          <button
            className="button button-primary button-wide"
            disabled={!canAccept}
            onClick={() => {
              if (!confirming) {
                setConfirming(true);
                return;
              }
              onAccept(task);
            }}
            type="button"
          >
            {confirming ? "Proceed" : canAccept ? "Accept Task" : "Unavailable"}
          </button>
        </div>
      </section>
    </div>
  );
}
