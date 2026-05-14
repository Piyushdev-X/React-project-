export function formatIST(isoDate) {
  if (!isoDate) return "-";

  try {
    return new Date(isoDate).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  } catch {
    return isoDate;
  }
}
