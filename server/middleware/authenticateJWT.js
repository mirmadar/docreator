const jwt = require('jsonwebtoken');
   

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, 'your_jwt_secret', (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Доступ запрещен' });
      }

      console.log(decoded); 

      if (!decoded.userId) {
        return res.status(401).json({ message: 'Некорректный токен' });
      }

      req.user = decoded;
      next(); 
    });
  } else {
    res.status(401).json({ message: 'Токен не предоставлен' });
  }
};

module.exports = authenticateJWT;
