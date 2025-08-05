export interface JwtServicePort {
  sign(payload: object, options?: object): Promise<string>;
}
