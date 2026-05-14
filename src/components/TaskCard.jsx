import { CategoryBadge, GenderBadge, LocationBadge, NewBadge } from "./Badges.jsx";
import { formatCountdown, formatRelativeTime, isNewTask } from "../utils/tasks.js";

export default function TaskCard({ task, currentUser, onAccept, onOpen }) {
  const isAccepted = task.status === "accepted";
  const isMine = task.postedBy === currentUser?.name;
  const canAccept = task.status === "open" && !isMine;

  return (
    <article
      className={`task-card ${task.urgency === "Urgent" ? "task-card-urgent" : ""}`}
      onClick={() => onOpen(task)}
    >
      {isAccepted && <div className="accepted-overlay">Accepted</div>}

      <div className="task-card-top">
        <div className="badge-row">
          <CategoryBadge category={task.category} />
          {isNewTask(task) && <NewBadge />}
          {task.genderSensitive && <GenderBadge />}
        </div>
        <span className="posted-time">{formatRelativeTime(task.createdAt)}</span>
      </div>

      <h3 className="task-title">{task.title}</h3>
      <p className="task-description-preview">{task.description}</p>

      <div className="poster-row">
        <div className="avatar avatar-tiny">{task.postedBy[0].toUpperCase()}</div>
        <span>{task.postedBy}</span>
        <span className="rating">⭐ {task.posterRating || 4.8}</span>
      </div>

      <div className="task-card-meta">
        <div>
          <div className="reward">₹{task.reward}</div>
          <div className="countdown">{formatCountdown(task.deadline)}</div>
        </div>
        <LocationBadge task={task} />
      </div>

      <button
        className="button button-primary button-full accept-button"
        disabled={!canAccept}
        onClick={(event) => {
          event.stopPropagation();
          onAccept(task);
        }}
        type="button"
      >
        {isMine ? "Your Task" : isAccepted ? "Accepted" : "Accept Task"}
      </button>
    </article>
  );
}
