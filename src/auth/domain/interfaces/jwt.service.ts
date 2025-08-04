export interface JwtServicePort {
  sign(payload: object): Promise<string>;
}
