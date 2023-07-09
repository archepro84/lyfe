export interface JwtServicePayload {
  userId: string;
}

export interface JwtPort {
  checkToken(token: string): Promise<any>;

  createToken(
    payload: JwtServicePayload,
    secret: string,
    expiresIn: string,
  ): string;
}
