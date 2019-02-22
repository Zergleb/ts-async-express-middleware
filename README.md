# ts-async-express-middleware

Adds express middleware that works with typescript

To install run

```sh
npm install ts-async-express-middleware
```

Including async middleware will handle exceptions from futures correctly so you do not need to wrap every request in a try/catch for async operations

```typescript
function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

app.get(
  '/pass',
  asyncMiddleware(async (req, res, next) => {
    await delay(500);
    res.send('this passed');
  })
);
```
