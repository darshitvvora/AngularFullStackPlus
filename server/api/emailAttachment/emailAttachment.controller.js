/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/emailAttachments              ->  index
 * POST    /api/emailAttachments              ->  create
 * GET     /api/emailAttachments/:id          ->  show
 * PUT     /api/emailAttachments/:id          ->  upsert
 * PATCH   /api/emailAttachments/:id          ->  patch
 * DELETE  /api/emailAttachments/:id          ->  destroy
 */

'use strict';

import { EmailAttachment } from '../../conn/sqldb';

// Gets a single Thing from the DB
export function index(req, res, next) {
  try {
    return res.sendStatus(200);
  } catch(err) {
    return next(err);
  }
}
