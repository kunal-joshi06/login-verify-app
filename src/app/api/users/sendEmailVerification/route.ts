import { sendEmail } from "@/helpers/mailer";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import connect from "@/dbConfig/dbConfig";

connect();

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json();
        console.log(reqBody);
        const {uEmail, uId} = reqBody;

        const user = await User.findOne({uEmail});
        if(!user){
            console.log("No User Found");
        }else{
            console.log(user);
        }
        
        await sendEmail({email: uEmail, emailType : "VERIFY", userId: uId});

        return NextResponse.json({message: "success"},{status: 200});

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status:500})
    }
}