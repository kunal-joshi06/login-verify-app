import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getTokenData = (request:NextRequest) => {
    try {
        const encodedData = request.cookies.get("token")?.value || "";

        const decodedData = jwt.verify(encodedData, process.env.TOKEN_SECRET!);

        return decodedData;

    } catch (error: any) {
        throw new Error(error.message);
    }
}