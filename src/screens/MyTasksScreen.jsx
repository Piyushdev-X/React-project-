import { useState } from "react";
import { StatusBadge } from "../components/Badges.jsx";
import { formatCountdown } from "../utils/tasks.js";

export default function MyTasksScreen({ acceptedTasks, onMarkDone, postedTasks }) {
  const [activeTab, setActiveTab] = useState("posted");

  return (
    <section className="page-transition">
      <div className="screen-header">
        <h1 className="page-title">My Tasks</h1>
      </div>

      <div className="subtabs">
        <button className={activeTab === "posted" ? "active" : ""} onClick={() => setActiveTab("posted")} type="button">
          Posted
        </button>
        <button className={activeTab === "accepted" ? "active" : ""} onClick={() => setActiveTab("accepted")} type="button">
          Accepted
        </button>
      </div>

      {activeTab === "posted" ? (
        <TaskStack emptyText="You have not posted any tasks yet.">
          {postedTasks.map((task) => (
            <article className="mini-task-card" key={task.id}>
              <div>
                <strong>{task.title}</strong>
                <span>{formatCountdown(task.deadline)}</span>
              </div>
              <StatusBadge status={task.status} />
            </article>
          ))}
        </TaskStack>
      ) : (
        <TaskStack emptyText="You have not accepted any tasks yet.">
          {acceptedTasks.map((task) => (
            <article className="mini-task-card accepted-task-row" key={task.id}>
              <div>
                <strong>{task.title}</strong>
                <span>{task.postedBy} · ₹{task.reward} · {formatCountdown(task.deadline)}</span>
              </div>
              {task.status === "accepted" && (
                <button className="button button-success" onClick={() => onMarkDone(task)} type="button">
                  Mark as Done
                </button>
              )}
            </article>
          ))}
        </TaskStack>
      )}
    </section>
  );
}

function TaskStack({ children, emptyText }) {
  return children.length > 0 ? (
    <div className="mini-task-stack">{children}</div>
  ) : (
    <div className="empty-state compact-empty">
      <p>{emptyText}</p>
    </div>
  );
}
