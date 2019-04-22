const { AccessToken } = require('../../conn/sqldb/auth');
const { User } = require('../../conn/sqldb');

const attributes = [
  'id', 'signature', 'name', 'mobile',
];

const oAuthModel = {
  getAccessToken(bearerToken, callback) {
    return AccessToken
      .findOne({
        where: { access_token: bearerToken },
        attributes: ['access_token', 'expires', 'session_id', 'app_id', 'user_id'],
        raw: true,
        include: [{
          model: User,
          attributes: ['email', 'mobile']
        }]
      })
      .then((t) => {
        const token = t;
        if (!token) return callback(null, false);

        return User
          .findById(token.user_id, {
            attributes,
            raw: true,
          })
          .then((user) => {
            token.user = user;
            delete token.User;
            callback(null, token);
            return token;
          });
      })
      .catch(callback);
  },
};

module.exports = oAuthModel;
