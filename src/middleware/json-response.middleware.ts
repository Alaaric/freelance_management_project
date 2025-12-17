import { NextFunction, Request, Response } from "express";

export interface JsonApiResponse {
    success: boolean;
    data: any;
    errors?: Array<{
        message: string;
        code: number;
    }>;
}

declare module 'express-serve-static-core' {
    interface Response {
        jsonSuccess(data: any, statusCode?: number): void;
        jsonError(message: string, statusCode?: number): void;    
    }
}

export const jsonApiResponseMiddleware = (req: Request, res: Response, next: NextFunction) => {
    res.jsonSuccess = (data: any, statusCode: number = 200) => {
        const response: JsonApiResponse = {
            success: true,
            data: data
        };
        res.status(statusCode).json(response);
    };

    res.jsonError = (message: string, statusCode: number = 400) => {
        const response: JsonApiResponse = {
            success: false,
            data: null,
            errors: [{ message, code: statusCode }]
        };
        res.status(statusCode).json(response);
    };

    next();
};
