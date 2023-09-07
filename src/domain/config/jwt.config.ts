export interface JwtConfig {
  getJwtSecret(): string;

  getJwtExpirationTime(): number;

  getJwtRefreshSecretKey(): string;

  getJwtRefreshExpirationTime(): number;
}
