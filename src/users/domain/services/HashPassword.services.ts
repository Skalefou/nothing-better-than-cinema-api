export const HASH_PASSWORD_SERVICE = "HASH_PASSWORD_SERVICE";

export interface HashPasswordService {
  hashPassword(password: string): Promise<string>;
}
