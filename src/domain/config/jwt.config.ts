export interface JwtConfig {
  getJwtRefreshSecretKey(): string;

  getJwtRefreshExpirationTime(): number;
}
