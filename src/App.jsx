import { useEffect, useMemo, useState } from "react";
import "./App.css";
import CompleteTaskModal from "./components/CompleteTaskModal.jsx";
import Header from "./components/Header.jsx";
import PostTaskModal from "./components/PostTaskModal.jsx";
import TaskDetailModal from "./components/TaskDetailModal.jsx";
import Toast from "./components/Toast.jsx";
import { useLocalStorage } from "./hooks/useLocalStorage.js";
import BrowseScreen from "./screens/BrowseScreen.jsx";
import MyTasksScreen from "./screens/MyTasksScreen.jsx";
import OnboardingScreen from "./screens/OnboardingScreen.jsx";
import ProfileScreen from "./screens/ProfileScreen.jsx";
import { COLLEGES } from "./utils/constants.js";
import {
  createTask,
  DEFAULT_TASK_FORM,
  expirePastDeadlineTasks,
  isLate,
  validateTaskForm,
} from "./utils/tasks.js";

const DEFAULT_ONBOARDING_FORM = {
  name: "",
  email: "",
  college: COLLEGES[0].name,
  year: "1st Year",
  privacyAccepted: false,
  penaltyAccepted: false,
};

export default function App() {
  const [tasks, setTasks] = useLocalStorage("blok_tasks_v7", []);
  const [currentUser, setCurrentUser] = useLocalStorage("blok_current_user_v7", null);
  const [activity, setActivity] = useLocalStorage("blok_activity_v7", []);
  const [tab, setTab] = useState(() => (currentUser ? "browse" : "onboarding"));
  const [onboardingForm, setOnboardingForm] = useState(DEFAULT_ONBOARDING_FORM);
  const [onboardingErrors, setOnboardingErrors] = useState({});
  const [taskForm, setTaskForm] = useState(DEFAULT_TASK_FORM);
  const [taskErrors, setTaskErrors] = useState({});
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("Newest");
  const [selectedTask, setSelectedTask] = useState(null);
  const [postOpen, setPostOpen] = useState(false);
  const [completionTask, setCompletionTask] = useState(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasNotifications, setHasNotifications] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 650);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTasks((previousTasks) => expirePastDeadlineTasks(previousTasks));
    }, 1000);

    return () => clearInterval(timer);
  }, [setTasks]);

  const visibleTasks = useMemo(() => {
    const query = search.trim().toLowerCase();
    const openTasks = tasks.filter((task) => task.status === "open" || task.status === "accepted");

    return openTasks
      .filter((task) => filter === "All" || task.category === filter)
      .filter((task) => {
        if (!query) return true;
        return `${task.title} ${task.description}`.toLowerCase().includes(query);
      })
      .sort((a, b) => {
        if (sort === "Reward ↑") return a.reward - b.reward;
        if (sort === "Deadline Soon") return new Date(a.deadline) - new Date(b.deadline);
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
  }, [filter, search, sort, tasks]);

  const postedTasks = tasks.filter((task) => task.postedBy === currentUser?.name);
  const acceptedTasks = tasks.filter((task) => task.acceptedBy?.includes(currentUser?.name));
  const stats = useMemo(() => buildStats(currentUser, postedTasks, acceptedTasks), [acceptedTasks, currentUser, postedTasks]);

  function showToast(message, type = "success") {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2800);
  }

  function addActivity(text) {
    setActivity((previousActivity) => [
      { id: Math.random().toString(36).slice(2, 9), text, at: new Date().toISOString() },
      ...previousActivity,
    ]);
  }

  function handleOnboard() {
    const errors = validateOnboarding(onboardingForm);
    setOnboardingErrors(errors);
    if (Object.keys(errors).length > 0) return;

    const college = COLLEGES.find((item) => item.name === onboardingForm.college);
    setCurrentUser({
      name: onboardingForm.name.trim(),
      email: onboardingForm.email.trim(),
      college: onboardingForm.college,
      collegeShort: college?.name.split(" ").map((word) => word[0]).join("").slice(0, 4) || "EDU",
      year: onboardingForm.year,
      joinedAt: new Date().toISOString(),
      rating: 4.8,
    });
    setTab("browse");
    addActivity("Created account");
  }

  function handlePostTask() {
    const errors = validateTaskForm(taskForm);
    setTaskErrors(errors);
    if (Object.keys(errors).length > 0) return;

    const task = createTask(taskForm, currentUser.name);
    setTasks((previousTasks) => [task, ...previousTasks]);
    setTaskForm(DEFAULT_TASK_FORM);
    setTaskErrors({});
    setPostOpen(false);
    setTab("browse");
    setHasNotifications(true);
    addActivity(`Posted "${task.title}"`);
    showToast("Task posted. It is now live.");
  }

  function handleAcceptTask(task) {
    setTasks((previousTasks) =>
      previousTasks.map((item) =>
        item.id === task.id
          ? {
              ...item,
              status: item.maxAcceptors === "multiple" ? "open" : "accepted",
              acceptedBy: [...new Set([...(item.acceptedBy || []), currentUser.name])],
              acceptedAt: new Date().toISOString(),
            }
          : item,
      ),
    );
    setSelectedTask(null);
    setTab("my_tasks");
    addActivity(`Accepted "${task.title}"`);
    showToast("Task accepted.");
  }

  function handleCompleteTask(task) {
    const late = isLate(task.deadline);
    const earned = late ? task.reward * 0.5 : task.reward;

    setTasks((previousTasks) =>
      previousTasks.map((item) =>
        item.id === task.id
          ? {
              ...item,
              status: "completed",
              completedAt: new Date().toISOString(),
              completedBy: currentUser.name,
              earned,
              late,
            }
          : item,
      ),
    );
    setCompletionTask(null);
    addActivity(`Completed "${task.title}"`);
    showToast(late ? `Completed late. Earned ₹${earned.toFixed(2)}.` : `Completed. Earned ₹${earned.toFixed(2)}.`);
  }

  function clearData() {
    localStorage.removeItem("blok_tasks_v7");
    localStorage.removeItem("blok_current_user_v7");
    localStorage.removeItem("blok_activity_v7");
    localStorage.removeItem("blok_tasks_v6");
    localStorage.removeItem("blok_current_user_v6");
    localStorage.removeItem("blok_activity_v6");
    setTasks([]);
    setCurrentUser(null);
    setActivity([]);
    setSettingsOpen(false);
    setTab("onboarding");
  }

  function logout() {
    localStorage.removeItem("blok_current_user_v7");
    setCurrentUser(null);
    setSettingsOpen(false);
    setSelectedTask(null);
    setPostOpen(false);
    setCompletionTask(null);
    setTab("onboarding");
    showToast("Logged out.");
  }

  if (!currentUser) {
    return (
      <div className="app-shell">
        <main className="app-main">
          <OnboardingScreen
            errors={onboardingErrors}
            form={onboardingForm}
            onFormChange={setOnboardingForm}
            onSubmit={handleOnboard}
          />
        </main>
        <Toast toast={toast} />
      </div>
    );
  }

  return (
    <div className="app-shell">
      <Header
        currentUser={currentUser}
        hasNotifications={hasNotifications}
        onBellClick={() => {
          setHasNotifications(false);
          showToast("No new notifications.");
        }}
        onLogout={logout}
        onTabChange={(nextTab) => {
          if (nextTab === "post") setPostOpen(true);
          else setTab(nextTab);
        }}
        tab={tab}
      />

      <main className="app-main">
        {tab === "browse" && (
          <BrowseScreen
            currentUser={currentUser}
            filter={filter}
            loading={loading}
            onAcceptTask={handleAcceptTask}
            onFilterChange={setFilter}
            onOpenPost={() => setPostOpen(true)}
            onOpenTask={setSelectedTask}
            onSearchChange={setSearch}
            onSortChange={setSort}
            search={search}
            sort={sort}
            tasks={visibleTasks}
          />
        )}

        {tab === "my_tasks" && (
          <MyTasksScreen
            acceptedTasks={acceptedTasks}
            onMarkDone={setCompletionTask}
            postedTasks={postedTasks}
          />
        )}

        {tab === "profile" && (
          <ProfileScreen
            activity={activity}
            currentUser={currentUser}
            onClearData={clearData}
            onLogout={logout}
            onOpenSettings={() => setSettingsOpen((value) => !value)}
            onProfileChange={setCurrentUser}
            settingsOpen={settingsOpen}
            stats={stats}
          />
        )}
      </main>

      {postOpen && (
        <PostTaskModal
          errors={taskErrors}
          form={taskForm}
          onClose={() => setPostOpen(false)}
          onFormChange={setTaskForm}
          onSubmit={handlePostTask}
        />
      )}

      {selectedTask && (
        <TaskDetailModal
          onAccept={handleAcceptTask}
          onClose={() => setSelectedTask(null)}
          task={selectedTask}
        />
      )}

      {completionTask && (
        <CompleteTaskModal
          onClose={() => setCompletionTask(null)}
          onConfirm={handleCompleteTask}
          task={completionTask}
        />
      )}

      <Toast toast={toast} />
    </div>
  );
}

function validateOnboarding(form) {
  const errors = {};
  const email = form.email.trim().toLowerCase();
  const college = COLLEGES.find((item) => item.name === form.college);
  const validDomain =
    email.endsWith(".edu") ||
    email.endsWith(".edu.in") ||
    (college?.domain && email.endsWith(college.domain));

  if (!form.name.trim()) errors.name = "Name is required.";
  if (!email) errors.email = "College email is required.";
  if (email && !validDomain) errors.email = "Use a .edu, .edu.in, or Rishihood email.";
  if (!form.privacyAccepted || !form.penaltyAccepted) errors.terms = "Accept both agreements to continue.";

  return errors;
}

function buildStats(currentUser, postedTasks, acceptedTasks) {
  const completed = acceptedTasks.filter((task) => task.status === "completed");
  const earned = completed.reduce((sum, task) => sum + (task.earned || task.reward), 0);
  const speedDemon = completed.some((task) => {
    if (!task.acceptedAt || !task.completedAt) return false;
    return new Date(task.completedAt) - new Date(task.acceptedAt) < 30 * 60 * 1000;
  });

  return {
    avatarHue: currentUser?.name?.charCodeAt(0) * 17 || 180,
    completed: completed.length,
    earned,
    posted: postedTasks.length,
    rating: currentUser?.rating || 4.8,
    speedDemon,
  };
}
