import express from 'express';
import { PORT } from './config.js';
import { apiRouter } from './src/routers/api.router.js';

const app = express();


app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});


app.use('/api', apiRouter);

app.use('/static', express.static('./static'))