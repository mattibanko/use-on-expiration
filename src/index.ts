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
  date: Date | Date[];
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

  useEffect(() => {
    if (!timeoutId) {
      const threshold = getThreshold(date, delay, customFilter);

      if (threshold > 0) {
        const timeout = setTimeout(() => {
          fn();
        }, threshold);

        setTimeoutId(timeout);

        return () => clearTimeout(timeoutId);
      }
    }

    return;
  }, [date, fn, delay, customFilter, timeoutId]);

  return { timeoutId };
}
