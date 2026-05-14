export const DEFAULT_TASK_FORM = {
  title: "",
  description: "",
  category: "Academic",
  deadline: "",
  reward: "",
  locType: "Remote",
  spot: "Mess",
  customLocation: "",
  genderSensitive: false,
  estimatedTime: "30 min",
  maxAcceptors: "1",
  urgency: "Normal",
};

const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

export function createTask(form, postedBy) {
  const location =
    form.locType === "Remote"
      ? "Remote"
      : form.spot === "Other"
        ? form.customLocation
        : form.spot;

  return {
    id: createId(),
    title: form.title.trim(),
    description: form.description.trim(),
    category: form.category,
    deadline: form.deadline,
    reward: Number(form.reward),
    locType: form.locType,
    location,
    genderSensitive: form.genderSensitive,
    estimatedTime: form.estimatedTime,
    maxAcceptors: form.maxAcceptors,
    urgency: form.urgency,
    postedBy,
    posterRating: 4.8,
    posterTasksPosted: 1,
    posterJoinedAt: new Date().toISOString(),
    acceptedBy: [],
    status: "open",
    createdAt: new Date().toISOString(),
  };
}

export function createSeedTasks() {
  const now = Date.now();
  const basePoster = {
    posterTasksPosted: 12,
    posterJoinedAt: new Date(now - 76 * DAY).toISOString(),
    acceptedBy: [],
    status: "open",
  };

  return [
    seedTask("Submit assignment to Prof. Sharma's cabin", "Please submit my printed AI assignment to Prof. Sharma's cabin in Block B before the lab starts.", "Academic", 80, 1 * HOUR, "On-Site", "Academic Block B", "Aarav Mehta", 4.9, "30 min", false),
    seedTask("Get printouts from library", "Need 22 pages printed and spiral bound from the central library print shop.", "Errand", 50, 3 * HOUR, "On-Site", "Library", "Nisha Rao", 4.7, "30 min", false),
    seedTask("Help me debug my Python code", "My data structures assignment throws an index error. Need someone to review it on a quick call.", "Tech Help", 200, 6 * HOUR, "Remote", "Remote", "Kabir Singh", 4.8, "1 hr", false),
    seedTask("Pick up food from canteen", "Pick up my dosa parcel from the main canteen and bring it to Hostel C.", "Delivery", 40, 30 * MINUTE, "On-Site", "Main Canteen", "Priya Nair", 4.6, "15 min", false, "Urgent"),
    seedTask("Explain DBMS normalization", "Need a short explanation of 1NF, 2NF, 3NF, and BCNF with examples before tomorrow's quiz.", "Academic", 120, 2 * DAY, "Remote", "Remote", "Ishan Gupta", 4.9, "1 hr", false),
    seedTask("Do my laundry drop-off", "Drop off my laundry bag at the campus laundry counter and send me the receipt photo.", "Chores", 100, 5 * HOUR, "On-Site", "Hostel Laundry", "Tara Menon", 4.5, "30 min", true),
    seedTask("Help me make PPT slides", "Need 8 clean PPT slides for a marketing presentation. I will share the content outline.", "Academic", 150, 4 * HOUR, "Remote", "Remote", "Rohan Das", 4.8, "2+ hrs", false),
    seedTask("Buy stationery from shop near gate", "Please buy two black gel pens, chart paper, and sticky notes from the shop near main gate.", "Errand", 60, 1 * HOUR, "On-Site", "Main Gate", "Meera Joshi", 4.7, "30 min", false),
  ].map((task, index) => ({
    ...basePoster,
    ...task,
    id: `seed-${index + 1}`,
    createdAt: new Date(now - (index + 5) * MINUTE).toISOString(),
  }));
}

function seedTask(
  title,
  description,
  category,
  reward,
  dueIn,
  locType,
  location,
  postedBy,
  posterRating,
  estimatedTime,
  genderSensitive,
  urgency = "Normal",
) {
  return {
    title,
    description,
    category,
    reward,
    deadline: toDateTimeLocal(new Date(Date.now() + dueIn)),
    locType,
    location,
    postedBy,
    posterRating,
    estimatedTime,
    genderSensitive,
    urgency,
    maxAcceptors: "1",
  };
}

export function validateTaskForm(form) {
  const errors = {};
  const reward = Number(form.reward);
  const deadlineTime = new Date(form.deadline).getTime();

  if (!form.title.trim()) errors.title = "Task name is required.";
  if (form.description.trim().length < 20) {
    errors.description = "Description must be at least 20 characters.";
  }
  if (!form.deadline) errors.deadline = "Deadline is required.";
  if (form.deadline && deadlineTime <= Date.now()) {
    errors.deadline = "Deadline must be in the future.";
  }
  if (!form.reward) errors.reward = "Reward is required.";
  if (form.reward && reward < 20) errors.reward = "Minimum reward is ₹20.";
  if (form.locType === "On-Site" && form.spot === "Other" && !form.customLocation.trim()) {
    errors.customLocation = "Location is required.";
  }

  return errors;
}

export function expirePastDeadlineTasks(tasks) {
  return tasks.map((task) =>
    task.status === "open" && isLate(task.deadline)
      ? { ...task, status: "expired" }
      : task,
  );
}

export function isLate(deadline) {
  return deadline && Date.now() > new Date(deadline).getTime();
}

export function isNewTask(task) {
  return Date.now() - new Date(task.createdAt).getTime() < 10 * MINUTE;
}

export function formatCountdown(deadline) {
  const diff = new Date(deadline).getTime() - Date.now();
  if (diff <= 0) return "Expired";

  const days = Math.floor(diff / DAY);
  const hours = Math.floor((diff % DAY) / HOUR);
  const minutes = Math.floor((diff % HOUR) / MINUTE);
  const seconds = Math.floor((diff % MINUTE) / 1000);

  if (days > 0) return `Due in ${days}d ${hours}h`;
  if (hours > 0) return `Due in ${hours}h ${minutes}m`;
  if (minutes > 0) return `Due in ${minutes}m ${seconds}s`;
  return `Due in ${seconds}s`;
}

export function formatRelativeTime(isoDate) {
  const diff = Date.now() - new Date(isoDate).getTime();
  if (diff < MINUTE) return "Posted just now";
  if (diff < HOUR) return `Posted ${Math.floor(diff / MINUTE)}m ago`;
  if (diff < DAY) return `Posted ${Math.floor(diff / HOUR)}h ago`;
  return `Posted ${Math.floor(diff / DAY)}d ago`;
}

export function toDateTimeLocal(date) {
  const pad = (value) => String(value).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function createId() {
  return Math.random().toString(36).slice(2, 9);
}
