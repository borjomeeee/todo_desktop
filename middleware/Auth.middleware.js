const jwt = require('jsonwebtoken');
const config = require('config');

/**
 *  req.user = {
 *    userId: string,
 *    jwtSecret,
 *  }
 */

module.exports = async (req, res, next) => {
  if(req.method === 'OPTIONS') {
    return next();
  }

  try {
    const token = req.headers.auth;

    if(!token) {
      return res.status(401).json({ message: '[AUTH] NOT AUTH!'});
    }

    let secret = config.get('jwtSecret');
    const decoded = jwt.verify(token, secret);

    req.user = decoded;

    next();
  } catch(e) {
    res.status(401).json({ message: '[AUTH] NOT AUTH!'});
  }
}