import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {

    try {
        //created a hashed token
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId,
                {
                    verifyToken: hashedToken,
                    verifyTokenExpiry: Date.now() + 3600000
                })
        } else if (emailType === "RESET") {
           await User.findByIdAndUpdate(userId,
                {
                    forgotPasswordToken: hashedToken,
                    forgotPasswordTokenExpiry: Date.now() + 3600000
                })
        }

        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "9e41cc6caf3fa7",
                pass: "6b6cf1f094637a"
            }
        });

        const mailOptions = {
            from: "kunal@gmailtesting.com",
            to: email,
            subject: emailType === "VERIFY" ? "Verify your Email" : "Reset your password",
            html: `<p>Click <a href=${process.env.DOMAIN}/${emailType === "VERIFY"?"verifyEmail":"verifyResetPassword"}?token=${hashedToken}>here <a/> to ${emailType === "VERIFY" ? "verify your account" : "reset your password"}</p>`
        }

        await transport.sendMail(mailOptions);
    } catch (error: any) {
        throw new Error(error.message);
    }
}