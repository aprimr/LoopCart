function timeCalc(dateInput) {
  const NPT_OFFSET = 5.75 * 60 * 60 * 1000; // 5hr 45min in milliseconds

  const nowUTC = new Date();
  const nowNPT = new Date(nowUTC.getTime() + NPT_OFFSET);

  const pastUTC = new Date(dateInput);
  const pastNPT = new Date(pastUTC.getTime() + NPT_OFFSET);

  const seconds = Math.floor((nowNPT - pastNPT) / 1000);

  if (seconds < 1) return "just now";

  const intervals = [
    { label: "yr", seconds: 31536000 },
    { label: "mo", seconds: 2592000 },
    { label: "wk", seconds: 604800 },
    { label: "d", seconds: 86400 },
    { label: "hr", seconds: 3600 },
    { label: "min", seconds: 60 },
    { label: "sec", seconds: 1 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count > 0) {
      return `${count} ${interval.label}${count > 1 ? "s" : ""} ago`;
    }
  }

  return "just now";
}

export default timeCalc;
