
export enum UseCaseErrorCode {
    InvalidParameter = 10001,
    TransactionFailed = 10002,
    Duplicate = 10003,
    NotFound = 10004,  
}

export class UseCaseError extends Error {
    code: UseCaseErrorCode;

    constructor(code: UseCaseErrorCode, message: string) {
        super(message);
        this.code = code;
    }
}


