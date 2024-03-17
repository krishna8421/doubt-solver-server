export default {
  secret: process.env.JWT_SECRET,
  jwtExpiration: 3600 * 24 * 30, // 30 days
};
