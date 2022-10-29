import { renderHook } from "@testing-library/react";
import { addSeconds, max } from "date-fns";

import { useOnExpire } from "../src";

jest.useFakeTimers();

test("should work without date", async () => {
  const fn = jest.fn();
  const { result } = renderHook(() => useOnExpire({ fn, date: undefined } as any));

  jest.advanceTimersByTime(1000);
  expect(fn).not.toBeCalled();

  expect(result.current.timeoutId).toBeFalsy();
});

test("should work with one", async () => {
  const fn = jest.fn();
  const defaultDate = new Date();
  const date = addSeconds(defaultDate, 1);
  const { result } = renderHook(() => useOnExpire({ fn, date }));

  jest.advanceTimersByTime(500);
  expect(fn).not.toBeCalled();
  jest.advanceTimersByTime(500);
  expect(fn).toBeCalledTimes(1);

  expect(result.current.timeoutId).not.toBeFalsy();
});

test("should work with array of dates", async () => {
  const fn = jest.fn();
  const defaultDate = new Date();

  const dates = [
    addSeconds(defaultDate, 2),
    addSeconds(defaultDate, 3),
    addSeconds(defaultDate, 4),
  ];

  const { result } = renderHook(() => useOnExpire({ fn, date: dates }));

  jest.advanceTimersByTime(500);
  expect(fn).not.toBeCalled();
  jest.advanceTimersByTime(1500);
  expect(fn).toBeCalledTimes(1);

  expect(result.current.timeoutId).not.toBeFalsy();
});

test("should work with array of dates and delayed by given time", async () => {
  const fn = jest.fn();
  const defaultDate = new Date();

  const dates = [
    addSeconds(defaultDate, 2),
    addSeconds(defaultDate, 3),
    addSeconds(defaultDate, 4),
  ];

  const { result } = renderHook(() =>
    useOnExpire({ fn, date: dates, delay: 5000 })
  );

  jest.advanceTimersByTime(500);
  expect(fn).not.toBeCalled();
  jest.advanceTimersByTime(1500);
  expect(fn).not.toBeCalled();
  jest.advanceTimersByTime(5000);
  expect(fn).toBeCalledTimes(1);

  expect(result.current.timeoutId).not.toBeFalsy();
});

test("should work with array of dates and custom function", async () => {
  const fn = jest.fn();
  const defaultDate = new Date();

  const dates = [
    addSeconds(defaultDate, 2),
    addSeconds(defaultDate, 3),
    addSeconds(defaultDate, 4),
  ];

  const { result } = renderHook(() =>
    useOnExpire({ fn, date: dates, customFilter: max })
  );

  jest.advanceTimersByTime(500);
  expect(fn).not.toBeCalled();
  jest.advanceTimersByTime(1500);
  expect(fn).not.toBeCalled();
  jest.advanceTimersByTime(2000);
  expect(fn).toBeCalledTimes(1);

  expect(result.current.timeoutId).not.toBeFalsy();
});
