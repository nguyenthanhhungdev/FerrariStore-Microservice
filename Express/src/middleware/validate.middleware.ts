import {CustomError} from './ExceptionHandler.middleware';
// Tạo validation middleware, nhận vào schema, lấy data từ request
const validateMiddleware = (schema: { validate: (arg0: any) => { error: any; }; }) => async (req: any, res: any, next: (err?: any) => void) => {
    try {
        // Validate request data against the passed schema
        const data = req.body || req.params;
        const { error } = schema.validate(data);
        if (error) {
            next(new CustomError(400, error.message, { layer: 'MIDDLEWARE', className: 'validateMiddleware' }));
        }

        next();
    } catch (err) {
        next(err);
    }
};

export default validateMiddleware;