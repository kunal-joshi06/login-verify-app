import connect from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {token} = reqBody;
        console.log(token);

       const user = await User.findOne({verifyToken: token, verifyTokenExpiry: {$gt: Date.now()}})
       if(!user){
        return NextResponse.json("No User found", {status: 500})
       }

       user.isVerified = true;
       user.verifyToken = undefined;
       user.verifyTokenExpiry = undefined;

       const savedUser = await user.save();
       return NextResponse.json({savedUser, message: "Email Verified"})
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}