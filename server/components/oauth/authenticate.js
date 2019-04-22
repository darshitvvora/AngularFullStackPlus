const oAuth = require('./');
const jwt = require('jsonwebtoken');

/* eslint-disable no-param-reassign */
module.exports = () => (req, res, next) => {
  if (req.user) return next();
  return oAuth.authorise()(req, res, (data) => {
    if (req.user) {
      req.user.app_id = req.oauth.bearerToken.app_id;
      req.user.user_type = req.oauth.bearerToken.user_type;
    }

    if (req.query['x-jwt']) {
      const params = jwt.decode(req.query['x-jwt']);
      if (!params) {
        return res.status(400).json({
          message: 'dev: malformed jwt, prod: You don\'t have access',
        });
      }

      Object.assign(req.params, params);
    }

    return next(data);
  });
};
