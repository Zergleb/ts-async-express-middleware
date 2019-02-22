import { NextFunction, Request, Response } from 'express';

const asyncMiddleware = (
  fn: (req: Request, res: Response, next: NextFunction) => void
) => (req: Request, res: Response, next: NextFunction) => {
  /* istanbul ignore next  */
  Promise.resolve(fn(req, res, next)).catch(err => {
    /* istanbul ignore next  */
    next(err);
  });
};

export default asyncMiddleware;