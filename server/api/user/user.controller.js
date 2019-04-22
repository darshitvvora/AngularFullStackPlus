/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/things              ->  index
 * POST    /api/things              ->  create
 * GET     /api/things/:id          ->  show
 * PUT     /api/things/:id          ->  upsert
 * PATCH   /api/things/:id          ->  patch
 * DELETE  /api/things/:id          ->  destroy
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
