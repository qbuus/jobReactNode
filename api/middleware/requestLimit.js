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
  windowMs: 2 * 60 * 1000,
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
  windowMs: 2 * 60 * 1000,
  max: 5,
});

// 2 offer per 1 minutes
export const OfferLimiter = rateLimit({
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res, next, options) => {
    res
      .status(options.statusCode)
      .json({ message: options.message });
  },
  windowMs: 1 * 60 * 1000,
  max: 2,
});
