import { CATEGORY_COLORS } from "../utils/constants.js";

export function CategoryBadge({ category }) {
  const color = CATEGORY_COLORS[category] || CATEGORY_COLORS.Other;

  return (
    <span className="category-badge" style={{ "--category-color": color }}>
      {category}
    </span>
  );
}

export function LocationBadge({ task }) {
  return (
    <span className={`pill ${task.locType === "Remote" ? "pill-cyan" : "pill-green"}`}>
      {task.locType === "Remote" ? "Remote" : "On-Site"}
    </span>
  );
}

export function GenderBadge() {
  return <span className="pill pill-lock">🔒 Gender-sensitive</span>;
}

export function NewBadge() {
  return <span className="pill pill-new">New</span>;
}

export function StatusBadge({ status }) {
  return <span className={`status-badge status-${status}`}>{status}</span>;
}
