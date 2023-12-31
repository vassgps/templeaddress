import jwt from "jsonwebtoken";

export const authAccessToken = async (req: Request) => {
  try {
    const authorizationToken = req.headers.get("authorization");
    if (!authorizationToken) return { message: "Authentication failed", auth: false, status: false };
    const [, token] = authorizationToken.split(" ");
    const decoded = jwt.verify(token,process.env.NEXT_PUBLIC_JWT_ACCESS_SECRET);
    const { sub: id, email } = decoded as any;
    return { auth: true, status: true, data: { id, email } };
  } catch (error) {
    return {error:error.message, message: "Authentication failed", auth: false, status: false };
  }
};

export const authRefreshToken = async (req: Request) => {
  try {
    const authorizationToken = req.headers.get("Authorization");

    if (!authorizationToken)
      return { message: "Authentication failed", auth: false, status: false };
    const [, token] = authorizationToken.split(" ");

    const decoded = jwt.verify(
      token,
      process.env.NEXT_PUBLIC_JWT_REFRESH_SECRET
    );
    const { sub: id, email } = decoded as any;
    return { status: true, data: { id, email }, token , auth: true};
  } catch (error) {
    return {error:error.message ,message: "Authentication failed", auth: false, status: false };
  }
};

export const getTokens = async (userId: string, email: string) => {
  const [accessToken, refreshToken] = await Promise.all([
    jwt.sign(
      { sub: userId, email },
      process.env.NEXT_PUBLIC_JWT_ACCESS_SECRET,
      { expiresIn: "15m" }
    ),
    jwt.sign(
      { sub: userId, email },
      process.env.NEXT_PUBLIC_JWT_REFRESH_SECRET,
      { expiresIn: "7d" }
    ),
  ]);
  const token =await jwt.decode(accessToken) as any;
  const accessTokenExp = token.exp;
  return {
    accessToken,
    refreshToken,
    accessTokenExp,
  };
};
