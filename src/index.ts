import { useEffect, useState } from "react";

import { getThreshold } from "./utils";

interface Props {
  /**
   * @param fn - Function that will be fire when threshold reached.
   */
  fn: () => void;
  /**
   * @param date - Date or array of dates - when date is given threshold will be calculated to given date, when array is given and no customFilter parameters is provided closest date will be used for calculating threshold.
   */
  date: Date | Date[] | undefined;
  /**
   * @param delay - Optional parameter for delaying firing function.
   */
  delay?: number;
  /**
   * @param customFilter - Custom function that will be used for choosing a date to calculate threshold.
   */
  customFilter?: (dates: Date[]) => Date;
}

/**
 * Fire function when threshold is reached.
 * @returns TimeoutId that can be used for clearing timeout manually.
 */

export function useOnExpire({ date, fn, delay, customFilter }: Props) {
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();
  const [currentDate, setCurrentDate] = useState<Date>();

  useEffect(() => {
    if (!date || timeoutId) {
      return;
    }

    const { threshold, dateToRefresh } = getThreshold(
      date,
      delay,
      customFilter
    );

    setCurrentDate(dateToRefresh);

    if (threshold > 0) {
      const timeout = setTimeout(() => {
        fn();
        setTimeoutId(undefined);
      }, threshold);

      setTimeoutId(timeout);

      return () => {
        setTimeoutId(undefined);
        clearTimeout(timeoutId);
      };
    }
  }, [date, fn, delay, customFilter]);

  return { timeoutId, dateToRefresh: currentDate };
}
