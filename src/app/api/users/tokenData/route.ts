import { getTokenData } from "@/helpers/getTokenData";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import connect from "@/dbConfig/dbConfig";

connect();

export async function GET(request: NextRequest) {
    try {
       const userData:any = await getTokenData(request);
       const userId = userData.id;
       const user = await User.findOne({_id: userId}).select("-password");

       return NextResponse.json({
        message: "User Details",
        data: user
       })
    } catch (error: any) {
        return NextResponse.json({error: error.message})
    }
}