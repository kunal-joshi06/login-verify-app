import { sendEmail } from "@/helpers/mailer";
import { NextRequest, NextResponse } from "next/server";
import connect from "@/dbConfig/dbConfig";
import User from "@/models/userModel";

connect();

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json();
        console.log(reqBody);
        const {email} = reqBody;

        const user = await User.findOne({email});
        if(!user){
            console.log("No User Found");
        }else{
            console.log(user);
        }
        
        await sendEmail({email, emailType : "RESET", userId: user._id});

        return NextResponse.json({message: "success"},{status: 200});

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status:500})
    }
}
