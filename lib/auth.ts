import jwt from "jsonwebtoken";

export function signJwtToken(payload: any) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.JWT_SECRET!,
      { expiresIn: "3d" },
      (err: any, token: unknown) => {
        if (err) reject(err);
        resolve(token);
      }
    );
  });
}
