import { useEffect, useState } from "react";
import TaskCard from "../components/TaskCard.jsx";
import SkeletonTaskCard from "../components/SkeletonTaskCard.jsx";
import { CATEGORIES, SORT_OPTIONS } from "../utils/constants.js";

const FILTERS = ["All", ...CATEGORIES];

export default function BrowseScreen({
  currentUser,
  filter,
  loading,
  onAcceptTask,
  onFilterChange,
  onOpenPost,
  onOpenTask,
  onSearchChange,
  onSortChange,
  search,
  sort,
  tasks,
}) {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (!showConfetti) return undefined;
    const timer = setTimeout(() => setShowConfetti(false), 900);
    return () => clearTimeout(timer);
  }, [showConfetti]);

  function handleAccept(task) {
    onAcceptTask(task);
    setShowConfetti(true);
  }

  return (
    <section className="browse-screen page-transition">
      {showConfetti && <div className="confetti-burst" />}

      <div className="browse-toolbar">
        <input
          className="search-input"
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Find a task..."
          value={search}
        />
      </div>

      <div className="filter-scroll" aria-label="Task filters">
        {FILTERS.map((item) => (
          <button className={`filter-button ${filter === item ? "active" : ""}`} key={item} onClick={() => onFilterChange(item)} type="button">
            {item}
          </button>
        ))}
      </div>

      <div className="sort-row" aria-label="Sort tasks">
        {SORT_OPTIONS.map((option) => (
          <button className={`sort-button ${sort === option ? "active" : ""}`} key={option} onClick={() => onSortChange(option)} type="button">
            {option}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="task-grid">
          {[0, 1, 2].map((item) => <SkeletonTaskCard key={item} />)}
        </div>
      ) : tasks.length === 0 ? (
        <div className="empty-state">
          <div className="empty-illustration">＋</div>
          <p>No tasks posted yet. Be the first!</p>
          <button className="button button-primary" onClick={onOpenPost} type="button">Post a Task</button>
        </div>
      ) : (
        <div className="task-grid">
          {tasks.map((task) => (
            <TaskCard
              currentUser={currentUser}
              key={task.id}
              onAccept={handleAccept}
              onOpen={onOpenTask}
              task={task}
            />
          ))}
        </div>
      )}

      <button className="fab" onClick={onOpenPost} type="button" aria-label="Post a task">+</button>
    </section>
  );
}
