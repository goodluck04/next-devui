import prisma from '@/database/prisma.config';
import { loginSchema } from '@/validator/authSchema';
import { CustomErrorReporter } from '@/validator/customErrorReporter';
import vine, { errors } from '@vinejs/vine';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import {User} from '@prisma/client'


export async function POST(requst: NextRequest) {

    try {
        const data = await requst.json();
        // cutomer error
        vine.errorReporter = () => new CustomErrorReporter();
        const validator = vine.compile(loginSchema);
        const validatedData = await validator.validate(data);

        // check if email exist or not 

        const user: User | null = await prisma.user.findUnique({
            where: {
                email: validatedData.email
            }

        })

        if (user === null) {
            return NextResponse.json({
                status: 400,
                errors: {
                    email: "No Account found with this email.",
                },
            });
        }

        // user matched ! must found
        const isPasswordMatch:boolean = bcrypt.compareSync(validatedData.password, user.password!)
        if(isPasswordMatch){
            return NextResponse.json({
                status: 200,
                message: "User Logged in Successfully"

            })
        }

        return NextResponse.json({
            status: 400,
            errors: {
                email: "Invalid Credentials",
            }
        })

    } catch (error) {
        if (error instanceof errors.E_VALIDATION_ERROR) {
            // console.log(error.messages)
            return NextResponse.json({ status: 400, errors: error.messages })
        }
    }
}