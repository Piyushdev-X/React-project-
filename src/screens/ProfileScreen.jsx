import SettingsModal from "../components/SettingsModal.jsx";
import { formatRelativeTime } from "../utils/tasks.js";

export default function ProfileScreen({
  activity,
  currentUser,
  onClearData,
  onLogout,
  onOpenSettings,
  onProfileChange,
  settingsOpen,
  stats,
}) {
  return (
    <section className="profile-screen page-transition">
      <div className="card profile-hero">
        <div className="profile-overview">
          <div className="avatar avatar-xl" style={{ "--avatar-hue": stats.avatarHue }}>
            {currentUser.name[0].toUpperCase()}
          </div>
          <div>
            <h1>{currentUser.name}</h1>
            <p>{currentUser.college} · {currentUser.year}</p>
          </div>
          <div className="profile-actions">
            <button className="icon-button settings-button" onClick={onOpenSettings} type="button">⚙</button>
            <button className="button button-secondary profile-logout" onClick={onLogout} type="button">Log out</button>
          </div>
        </div>

        <div className="stats-grid profile-stats">
          <StatTile label="Tasks Posted" value={stats.posted} />
          <StatTile label="Tasks Completed" value={stats.completed} />
          <StatTile label="Total Earned" value={`₹${stats.earned}`} />
          <StatTile label="Rating" value={`⭐ ${stats.rating}`} />
        </div>
      </div>

      <ProfileSection title="Recent Activity">
        {activity.length === 0 ? (
          <div className="empty-state compact-empty"><p>No activity yet</p></div>
        ) : (
          activity.slice(0, 5).map((item) => (
            <div className="activity-item" key={item.id}>
              <span>{item.text}</span>
              <small>{formatRelativeTime(item.at)}</small>
            </div>
          ))
        )}
      </ProfileSection>

      <ProfileSection title="Badges">
        <div className="badge-showcase">
          <Badge label="First Task" active={stats.posted > 0 || stats.completed > 0} />
          <Badge label="Top Helper" active={stats.completed >= 3} />
          <Badge label="Speed Demon" active={stats.speedDemon} />
        </div>
      </ProfileSection>

      {settingsOpen && (
        <SettingsModal
          onClearData={onClearData}
          onClose={onOpenSettings}
          onLogout={onLogout}
          onProfileChange={onProfileChange}
          profile={currentUser}
        />
      )}
    </section>
  );
}

function ProfileSection({ children, title }) {
  return (
    <section className="profile-section">
      <h2 className="eyebrow-heading">{title}</h2>
      {children}
    </section>
  );
}

function StatTile({ label, value }) {
  return (
    <div className="stat-tile">
      <div>{value}</div>
      <span>{label}</span>
    </div>
  );
}

function Badge({ active, label }) {
  return <div className={`achievement-badge ${active ? "active" : ""}`}>{label}</div>;
}
