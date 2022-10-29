# use-on-expiration

React hook that provide easy way to fire your function when date is expired.
Showcase: https://mattibanko.github.io/demo-use-on-expire/

Usage:

```javascript
const { timeoutId, dateToRefresh } = useOnExpire({
  date,
  fn: useCallback(() => setState(true), []),
});
```
