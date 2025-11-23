import rateLimit from "express-rate-limit";

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,                 // limit each IP to 100 requests per window
  standardHeaders: true,    // return rate limit info in headers
  legacyHeaders: false,     // remove deprecated headers
  message: {
    success: false,
    msg: "Too many requests from this IP, please try again later."
  },
});
