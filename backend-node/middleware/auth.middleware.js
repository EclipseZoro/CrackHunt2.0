import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {

  const token = req.headers['authorization']?.split(' ')[1];
  console.log(`Token: ${token}`);
  
  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }
  console.log(`Token: ${token}`);
  console.log(`JWT Secret: ${process.env.JWT_SECRET}`);
  console.log(`JWT Refresh Secret: ${process.env.JWT_REFRESH_SECRET}`);
  

  jwt.verify(token, process.env.JWT_REFRESH_SECRET , (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: err });
    }
    req.userId = decoded.id;
    next();
  });
}