export const calculateTimeAgo = (dateString: string): string => {
  const threadDate = new Date(dateString);
  const today = new Date();

  const timeDifference = today.getTime() - threadDate.getTime();

  const secondsAgo = Math.floor(timeDifference / 1000);
  const minutesAgo = Math.floor(secondsAgo / 60);
  const hoursAgo = Math.floor(minutesAgo / 60);
  const daysAgo = Math.floor(hoursAgo / 24);
  const weeksAgo = Math.floor(daysAgo / 7);
  const yearsAgo = Math.floor(daysAgo / 365.25);

  if (yearsAgo > 0) {
    return `${yearsAgo}y`;
  } else if (weeksAgo > 0) {
    return `${weeksAgo}w`;
  } else if (daysAgo > 0) {
    return `${daysAgo}d`;
  } else if (hoursAgo > 0) {
    return `${hoursAgo}h`;
  } else if (minutesAgo > 0) {
    return `${minutesAgo}m`;
  } else {
    return `${secondsAgo}s`;
  }
};
