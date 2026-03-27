const { z } = require('zod');

const orderSchema = z.object({
  symbol: z.string().min(1).max(10),
  side: z.enum(['buy', 'sell']),
  type: z.enum(['limit', 'market', 'stop']),
  quantity: z.number().positive(),
  price: z.number().positive().optional(),
  stopPrice: z.number().positive().optional(),
});

const validateOrder = (req, res, next) => {
  try {
    const validatedData = orderSchema.parse(req.body);
    req.body = validatedData;
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: 'Validation failed',
        details: error.errors.map(err => ({
          path: err.path.join('.'),
          message: err.message,
        })),
      });
    }
    next(error);
  }
};

const tradeQuerySchema = z.object({
  symbol: z.string().optional(),
  limit: z.string().regex(/^\d+$/).transform(Number).optional(),
  offset: z.string().regex(/^\d+$/).transform(Number).optional(),
});

const validateTradeQuery = (req, res, next) => {
  try {
    const validatedData = tradeQuerySchema.parse(req.query);
    req.query = { ...req.query, ...validatedData };
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: 'Invalid query parameters',
        details: error.errors,
      });
    }
    next(error);
  }
};

module.exports = { validateOrder, validateTradeQuery };
