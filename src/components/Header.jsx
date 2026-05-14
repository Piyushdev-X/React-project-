const TABS = [
  { key: "browse", label: "Home", icon: "⌂" },
  { key: "post", label: "Post", icon: "+" },
  { key: "my_tasks", label: "My Tasks", icon: "✓" },
  { key: "profile", label: "Profile", icon: "●" },
];

export default function Header({
  currentUser,
  hasNotifications,
  onBellClick,
  onLogout,
  onTabChange,
  tab,
}) {
  return (
    <>
      <header className="app-header">
        <div className="app-container header-inner">
          <div className="brand-row">
            <button className="logo-button" onClick={() => onTabChange("browse")} type="button">
              <BlokLogo />
            </button>

            {currentUser && (
              <div className="header-actions">
                <button className="home-button" onClick={() => onTabChange("browse")} type="button">
                  Home
                </button>
                <button className="bell-button" onClick={onBellClick} type="button" aria-label="Notifications">
                  🔔
                  {hasNotifications && <span className="notification-dot" />}
                </button>
                <button className="logout-button" onClick={onLogout} type="button">
                  Logout
                </button>
                <div className="profile-chip">
                  <span>{currentUser.collegeShort}</span>
                  <div className="avatar avatar-small">{currentUser.name[0].toUpperCase()}</div>
                </div>
              </div>
            )}
          </div>

          {currentUser && (
            <nav className="tabs desktop-tabs" aria-label="Primary">
              {TABS.map((item) => (
                <button className={`tab-button ${tab === item.key ? "active" : ""}`} key={item.key} onClick={() => onTabChange(item.key)} type="button">
                  {item.label}
                </button>
              ))}
            </nav>
          )}
        </div>
      </header>

      {currentUser && (
        <nav className="bottom-nav" aria-label="Mobile primary">
          {TABS.map((item) => (
            <button className={tab === item.key ? "active" : ""} key={item.key} onClick={() => onTabChange(item.key)} type="button">
              <span>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
      )}
    </>
  );
}

function BlokLogo() {
  return (
    <div className="logo-lockup">
      <div className="logo-mark" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>
      <div>
        <span className="brand-name">blok</span>
        <span className="brand-tagline">campus economy</span>
      </div>
    </div>
  );
}
