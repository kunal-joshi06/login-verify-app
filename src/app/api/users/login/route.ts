import connect from "../../../../dbConfig/dbConfig";
import User from "../../../../models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request:NextRequest) {
    try {
        const reqBody = await request.json();
        const {email, password} = reqBody;
        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json({error:"No Such User Exists, Register Instead."})
        }

        //Password Checking
        const validPassword = await bcryptjs.compare(password, user.password)
        if(!validPassword){
            return NextResponse.json({error:"Invalid Password"},{status: 500})
        }

        //Creating token data
        const tokenData = {
            id: user._id,
            email: user.email
        } 
        //Creating token
        const token = await jwt.sign(tokenData,process.env.TOKEN_SECRET!,{expiresIn: "1d"})

        const response = NextResponse.json({message:"Login Successfull", success: true, userId: user._id})

        response.cookies.set("token", token, {httpOnly: true})

        return response;

    } catch (error: any) {
        return NextResponse.json({error}, {status: 500})
    }
}