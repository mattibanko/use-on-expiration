import { min } from "date-fns";

import { GetThreshold } from "./types";

export function getThreshold({ dates, delay = 0, customFilter }: GetThreshold) {
  const timeNow = new Date().getTime();
  const dateToRefresh = customFilter ? customFilter(dates) : min(dates);
  const threshold = dateToRefresh.getTime() - timeNow + delay;

  return threshold;
}
