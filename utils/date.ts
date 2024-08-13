export const calculateTimeAgo = (dateString: string): string => {
  const [datePart, timePart, period] = dateString.split(" ");
  const [month, day, year] = datePart.split("/").map(Number);
  let [hours, minutes, seconds] = timePart.split(":").map(Number);

  if (period === "PM" && hours < 12) {
    hours += 12;
  } else if (period === "AM" && hours === 12) {
    hours = 0;
  }

  const threadDate = new Date(year, month - 1, day, hours, minutes, seconds);
  const today = new Date();

  const timeDifference = today.getTime() - threadDate.getTime();

  const secondsAgo = Math.floor(timeDifference / 1000);
  const minutesAgo = Math.floor(secondsAgo / 60);
  const hoursAgo = Math.floor(minutesAgo / 60);
  const daysAgo = Math.floor(hoursAgo / 24);
  const weeksAgo = Math.floor(daysAgo / 7);
  const monthsAgo = Math.floor(daysAgo / 30.44);
  const yearsAgo = Math.floor(daysAgo / 365.25);

  if (yearsAgo > 0) {
    return `${yearsAgo} ${yearsAgo > 1 ? "years" : "year"} ago`;
  } else if (monthsAgo > 0) {
    return `${monthsAgo} ${monthsAgo > 1 ? "months" : "month"} ago`;
  } else if (weeksAgo > 0) {
    return `${weeksAgo} ${weeksAgo > 1 ? "weeks" : "week"} ago`;
  } else if (daysAgo > 0) {
    return `${daysAgo} ${daysAgo > 1 ? "days" : "day"} ago`;
  } else if (hoursAgo > 0) {
    return `${hoursAgo}h ago`;
  } else if (minutesAgo > 0) {
    return `${minutesAgo}m ago`;
  } else {
    return `${secondsAgo}s ago`;
  }
};
