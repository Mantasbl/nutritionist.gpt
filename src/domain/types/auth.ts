export interface JwtPayload {
  readonly id: number;

  readonly email: string;
}

export interface JWT {
  readonly access_token: string;
}
