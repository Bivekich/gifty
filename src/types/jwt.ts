export interface JWTPayload {
  email: string;
  userId?: string;
  iat?: number;
  exp?: number;
}
