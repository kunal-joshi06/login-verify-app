import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import connect from "@/dbConfig/dbConfig";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {token, passwordCreds} = reqBody;

        console.log(token, passwordCreds);

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(passwordCreds.newPassword, salt)

        const user = await User.findOne({forgotPasswordToken: token, forgotPasswordTokenExpiry: {$gt: Date.now()}});
        if(!user){
            return NextResponse.json({error: "No User Found"}, {status: 500})
        }else{
            console.log(user);
        }

        user.password = hashedPassword;
        user.forgotPasswordToken = undefined;
        user.forgotPasswordTokenExpiry = undefined;

        const savedUser = await user.save();
        console.log(savedUser);

        return NextResponse.json({message: "password updated Successfully"})

    } catch (error) {
        return NextResponse.json({error: "Something went wrong"}, {status:500})
    }
}