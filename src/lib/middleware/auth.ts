import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function authMiddleware(req: NextRequest){
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new Error("Unauthorized: No token provided");
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, "process.env.JWT_SECRET" as string);
    return decoded;

  } catch (err: any) {
    throw new Error("Unauthorized: Login Again");
  }
}
