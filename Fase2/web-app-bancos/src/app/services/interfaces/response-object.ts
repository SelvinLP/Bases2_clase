export interface ResponseObject<T> {

    /**
     * The status of the response, May be 'success', 'fail', or 'error'.
     */
    status: 'success' | 'fail' | 'error';

    /**
     * The data relevant to the repsonse.
     */
    data?: T;

    /**
     * In case of error, the error message.
     */
    message?: string;

    /**
     * In case of error, the error code.
     */
    code?: number;
}
