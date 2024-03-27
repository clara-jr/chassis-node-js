import morgan from 'morgan';

export default async function setMorganLogger(app) {
  process.env.NODE_ENV !== 'test' &&
    app.use(
      morgan('combined', {
        stream: { write: console.info },
        // do not log this call, too much flood
        skip: (req) => req.originalUrl.startsWith('/openapi'),
      })
    );
}
