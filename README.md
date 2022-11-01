# use-on-expiration

React hook that provide easy way to fire your function when date is expired.
Showcase: https://mattibanko.github.io/demo-use-on-expire/

Usage:

- date: single Date or array of dates (if array )

```javascript
const { timeoutId, dateToRefresh } = useOnExpire({
  date, // single Date or array of dates (if array customFilter function will be use to choosing date to calculate threshold)
  fn: useCallback(() => setState(true), []), // function that will be fired when threshold will be reached
  delay?: 1000 // delay after function will be fired (in milliseconds)
  customFilter: (dates: Date[]) => Date // custom function for choosing date to calculate threshold (default: min())
});
```
