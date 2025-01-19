const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return res.status(403).json({ message: 'Token is required' });
    }
  
    const token = authHeader.split(' ')[1];
  
    jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid or expired token' });
      }
  
      req.user = user; // Attach user info to request
      next();
    });
  };

module.exports ={
    authenticateToken
}