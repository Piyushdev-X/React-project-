import TaskCard from "../components/TaskCard.jsx";

const FILTERS = ["All", "Remote", "On-Site"];

export default function OnItScreen({
  tasks,
  profile,
  filter,
  sortByPrice,
  onFilterChange,
  onSortToggle,
  onAcceptTask,
  onDenyTask,
}) {
  return (
    <section>
      <div className="screen-header">
        <h2 className="page-title">Browse Tasks</h2>
        <span className="count-label">
          {tasks.length} available
        </span>
      </div>

      <div className="filter-row">
        {FILTERS.map((filterName) => (
          <button
            className={`filter-button ${filter === filterName ? "active" : ""}`}
            key={filterName}
            onClick={() => onFilterChange(filterName)}
            type="button"
          >
            {filterName}
          </button>
        ))}

        <button
          className={`filter-button price-sort ${sortByPrice ? "active" : ""}`}
          onClick={onSortToggle}
          type="button"
        >
          ↑ Price
        </button>
      </div>

      {tasks.length === 0 ? (
        <EmptyTaskState />
      ) : (
        <div className="task-list">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              onAccept={onAcceptTask}
              onDeny={onDenyTask}
              profile={profile}
              task={task}
            />
          ))}
        </div>
      )}
    </section>
  );
}

function EmptyTaskState() {
  return (
    <div className="empty-state">
      <div className="empty-icon">
        <div />
      </div>
      <p>No tasks available</p>
      <span>Post one in the Post tab</span>
    </div>
  );
}
