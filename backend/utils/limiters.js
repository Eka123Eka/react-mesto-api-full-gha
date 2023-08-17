const rateLimit = require('express-rate-limit');

const timeInMs = 10 * 60 * 1000;
const limitQuery = 100;
const limiter = rateLimit({
  windowMs: timeInMs,
  max: limitQuery,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res, next, options) => res.status(options.statusCode).send(options.message),
});
module.exports = {
  limiter,
};
