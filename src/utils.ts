import { min } from "date-fns";

import { CalculateThreshold } from "./types";

function calculateThreshold({
  dates,
  delay = 0,
  customFilter,
}: CalculateThreshold) {
  const timeNow = new Date().getTime();
  const dateToRefresh = customFilter ? customFilter(dates) : min(dates);
  const threshold = dateToRefresh.getTime() - timeNow + delay;

  return {threshold, dateToRefresh};
}

export function getThreshold(
  date: Date | Date[],
  delay: number | undefined,
  customFilter: ((dates: Date[]) => Date) | undefined
) {
  return Array.isArray(date)
    ? calculateThreshold({ dates: date, delay, customFilter })
    : calculateThreshold({ dates: [date], delay });
}
