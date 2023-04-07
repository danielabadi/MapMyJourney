import { Response } from 'express';

export class ErrorHandler {
    public static handleStandardFailure(err: unknown, res: Response) {
        const errorMessage = ErrorHandler.getErrorMessage(err);
        return res.status(400).json({ success: false, errors: [errorMessage] });
    }

    private static getErrorMessage(err: unknown) {
        return err instanceof Error ? err.message : JSON.stringify(err);
    }
}
