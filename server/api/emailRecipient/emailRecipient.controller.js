/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/emailRecipients              ->  index
 * POST    /api/emailRecipients              ->  create
 * GET     /api/emailRecipients/:id          ->  show
 * PUT     /api/emailRecipients/:id          ->  upsert
 * PATCH   /api/emailRecipients/:id          ->  patch
 * DELETE  /api/emailRecipients/:id          ->  destroy
 */

'use strict';

import { EmailRecipient } from '../../conn/sqldb';

// Gets a single Thing from the DB
export function index(req, res, next) {
  try {
    return res.sendStatus(200);
  } catch(err) {
    return next(err);
  }
}
