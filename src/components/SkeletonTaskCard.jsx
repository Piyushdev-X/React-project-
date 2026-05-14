export default function SkeletonTaskCard() {
  return (
    <div className="task-card skeleton-card">
      <div className="skeleton skeleton-pill" />
      <div className="skeleton skeleton-title" />
      <div className="skeleton skeleton-line" />
      <div className="skeleton skeleton-line short" />
      <div className="skeleton skeleton-button" />
    </div>
  );
}
