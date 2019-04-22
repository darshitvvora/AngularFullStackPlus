/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import logger from './components/logger';
import path from 'path';

export default function(app) {
  // Insert routes below
  // app.use('/api/things', require('./api/thing'));

  app.use(logger.transports.sentry.raven.errorHandler());
  app.use((e, req, res, next) => {
    if (!next) return null;
    const err = e;
    const { body, headers, user: u } = req;

    logger.error(err.message, err, {
      url: req.originalUrl,
      body,
      headers,
      user: u,
    });

    return res
      .status(e.statusCode || e.code || 500)
      .json({ message: err.message, stack: err.stack });
  });

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the app.html
  app.route('/*')
    .get((req, res) => {
      res.sendFile(path.resolve(`${app.get('appPath')}/app.html`));
    });
}
