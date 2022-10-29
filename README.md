# use-on-expiration

React hook that provide easy way to fire your function when date is expired.

Usage:

```javascript
const { timeoutId, dateToRefresh } = useOnExpire({
  date,
  fn: useCallback(() => setState(true), []),
});
```

<iframe src="http://localhost:5173/demo-use-on-expire-project/"></iframe>
