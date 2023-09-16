export const drawerWidth = 240;

export function saveToCookie(key, value) {
  document.cookie = `${key}=${value}`;
}

export function readCookie(key) {
  let cookies = document.cookie.split("; ");
  for (const cookie of cookies) {
    const [k, v] = cookie.split("=");
    if (k === key) {
      return v;
    }
  }
  return null;
}

export function formatDateTime(dateTime) {
  let date = new Date(dateTime);
  let hour = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hour >= 12 ? "pm" : "am";
  hour = hour ? hour : 12; // 0 become 12
  minutes = minutes < 10 ? "0" + minutes : minutes;
  let timestr = `${hour}:${minutes} ${ampm}`;
  let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  let month = date.getMonth() + 1;
  month = month < 10 ? "0" + month : month;
  return `${day}/${month}/${date.getFullYear()} at ${timestr}`;
}

export function formatDateForInput(dateTime) {
  let date = new Date(dateTime);
  return date.toISOString().substring(0, 19);
}
