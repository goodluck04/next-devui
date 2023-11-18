import { NextRequest, NextResponse } from "next/server";
import vine, { errors } from "@vinejs/vine";
import { CustomErrorReporter } from "@/validator/customErrorReporter";
import { postSchema } from "@/validator/postSchema";
import { imageValidator } from "@/validator/imageValidator";
import { join } from "path";
import { getRandomNumber } from "@/lib/utils";
import { writeFile } from "fs/promises";
import prisma from "@/database/prisma.config";
import { getServerSession } from "next-auth";
import { CustomSession, authOptions } from "../../auth/[...nextauth]/authOptions";


export async function GET(request: NextRequest) {
  // protecting route for unknown user
  const session: CustomSession | null = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ status: 400, message: "Unauthorized network call" })
  }
  const post = await prisma.post.findMany({
    orderBy: {
      id: 'desc'
    },
    include: {
      user: {
        select: {
          name: true,
          // email:true,
        }
      }
    },
    where: {
      user_id: Number(session?.user?.id!)
    }
  })
  return NextResponse.json({ status: 200, data: post })
}




export async function POST(request: NextRequest) {
  try {

    // protecting route for unknown user
    const session: CustomSession | null = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ status: 400, message: "Unauthorized network call" })
    }

    const formData = await request.formData();
    const file = formData.get("image") as Blob | null;

    const data = {
      title: formData.get("title"),
      description: formData.get("description"),
      image: file ? (formData.get("image") as File).name : null, // Access file name
      user_id: formData.get("user_id"),
    };

    // vine validation logic
    vine.errorReporter = () => new CustomErrorReporter();
    const validator = vine.compile(postSchema)
    const valideData = await validator.validate(data)
    const isImgageNotValid: string | null = file instanceof File ? imageValidator(file?.name, file.size) : null;
    if (isImgageNotValid) {
      return NextResponse.json({
        status: 400,
        errors: {
          image: isImgageNotValid,
        }
      })
    }
    //  upload Image
    // convert your file into buffer
    const buffer = Buffer.from(await file!.arrayBuffer());
    const relativeUploadDir = "/uploads";
    // joint will jont public + /uploads(relativepath) upload directory 
    const uploadDir = join(process.cwd(), "public", relativeUploadDir);
    // generate unique id for image to avoid overwrite images of same name
    try {
      const uniqueName = Date.now() + "_" + getRandomNumber(1, 99999);
      // split will split filename into array based on .
      const imgExt = file instanceof File ? file?.name.split(".") : null;
      const filename = uniqueName + "." + imgExt?.[1]

      // write file usning fs/promises
      await writeFile(`${uploadDir}/${filename}`, buffer)

      const newPost = await prisma.post.create({
        data: {
          title: valideData.title,
          description: valideData.description,
          user_id: Number(data.user_id),
          image: filename
        }
      });
      return NextResponse.json({ status: 200, message: "post created successfully" });
    } catch (error) {
      console.error("Error while trying to upload a file\n", error);
      return NextResponse.json(
        { error: "Something went wrong." },
        { status: 500 }
      );
    }
  } catch (error) {
    if (error instanceof errors.E_VALIDATION_ERROR) {
      // console.log(error.messages)
      return NextResponse.json({ status: 400, errors: error.messages })
    }
  }
}