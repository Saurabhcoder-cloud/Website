import http from 'http';
import app from './app';
import env from './config/env';

const PORT = Number(env.BACKEND_URL?.split(':').pop()) || 4000;

const server = http.createServer(app);

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on port ${PORT}`);
});
