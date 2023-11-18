import { NextRequest, NextResponse } from "next/server";
import vine, {errors} from "@vinejs/vine";
import { registerSchema } from "@/validator/authSchema";
import { CustomErrorReporter } from "@/validator/customErrorReporter";
import bcrypt from 'bcryptjs';
import prisma from "@/database/prisma.config";
import { User } from "@prisma/client";


export async function POST(requst: NextRequest) {

    try {
        const data = await requst.json();
        // cutomer error
        vine.errorReporter = () => new CustomErrorReporter();
        const validator = vine.compile(registerSchema)
        const validatedData = await validator.validate(data)


        // check if email is already exist
        const user: User | null = await prisma.user.findUnique({
            where:{
                email: validatedData.email
            }
        })
  
        if(user) {
            return NextResponse.json({status: 400, errors:{
                email: "Email is Already Taken. Please Use Another Email"
            }})
        }

        // generate salt async
        const salt = bcrypt.genSaltSync(10)
        validatedData.password = bcrypt.hashSync(validatedData.password, salt);

        // save in prisma or create user
        await prisma.user.create({
            data: validatedData
        })

        return NextResponse.json({ status: 200, message: "Account Created Successfully" })

    } catch (error) {
        if (error instanceof errors.E_VALIDATION_ERROR) {
            // console.log(error.messages)
            return NextResponse.json({status: 400, errors: error.messages})
        }
    } 


}