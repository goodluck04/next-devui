import prisma from "@/database/prisma.config";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const url = new URL(request.url)
    const query = url.searchParams.get("query")
    const posts = await NextUI({
        where: {
            title: {
                contains: query ?? "" //if query then search or not
            }
        },
        include: {
            user: {
                select: {
                    name: true 
                }
            }
        }
    })

    return NextResponse.json({ status: 200, data: posts });
}