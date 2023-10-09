import rateLimit from "express-rate-limit";

// login limiter 8 requests per 2 minutes
export const loginLimiter = rateLimit({
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res, next, options) => {
    res
      .status(options.statusCode)
      .json({ message: options.message });
  },
  windowMs: 20 * 60 * 1000,
  max: 8,
});

export const passwordChangeLimiter = rateLimit({
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res, next, options) => {
    res
      .status(options.statusCode)
      .json({ message: options.message });
  },
  windowMs: 20 * 60 * 1000,
  max: 5,
});
