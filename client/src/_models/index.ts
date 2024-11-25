export interface GenricReponseModel<T = any> {
    statusCode?: number;
    message: string,
    data?: T;
}