import * as express from 'express';
import * as next from 'next';
import { error, log } from '../common/log';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    server.use('/pdf/*', (req, res) => {
      // generate pdf
      log('-------------------- index --> ', { req, res });
      return res.send(200);
    });

    server.get('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(4000, (err: Error) => {
      if (err) {
        throw err;
      }
      log('> Ready on http://localhost:4000');
    });
  })
  .catch(ex => {
    error(ex.stack);
    process.exit(1);
  });
