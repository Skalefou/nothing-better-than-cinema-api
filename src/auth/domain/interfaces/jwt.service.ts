export interface JwtServicePort {
    sign(payload: object, options?: object): Promise<string>;
    verify<T extends object = any>(token: string): T;
}
