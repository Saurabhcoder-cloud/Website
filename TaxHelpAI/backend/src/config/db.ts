import { Pool } from 'pg';
import env from './env';

const pool = new Pool({ connectionString: env.DATABASE_URL });

pool.on('error', (error) => {
  // eslint-disable-next-line no-console
  console.error('Unexpected database error', error);
  process.exit(-1);
});

export default pool;
