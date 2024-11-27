export interface GenericReponseModel<T = any> {
    statusCode?: number;
    message: string,
    data?: T;
}