/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/users              ->  index
 * POST    /api/users              ->  create
 * GET     /api/users/:id          ->  show
 * PUT     /api/users/:id          ->  upsert
 * PATCH   /api/users/:id          ->  patch
 * DELETE  /api/users/:id          ->  destroy
 */

'use strict';

import { User } from '../../conn/sqldb';

// Gets a single Thing from the DB
export function me(req, res, next) {
  try {
    if (req.user.email) return res.json({ ...req.user });
    return res.sendStatus(404);
  } catch(err) {
    return next(err);
  }
}
