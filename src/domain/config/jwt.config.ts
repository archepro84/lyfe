export interface JwtConfig {
  getJwtSecretKey(): string;

  getJwtExpirationTime(): number;

  getJwtRefreshSecretKey(): string;

  getJwtRefreshExpirationTime(): number;
}
