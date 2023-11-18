"use client";
import Link from "next/link";
import Image from "next/image";
import { formateDate } from "@/lib/utils";
import PostDeleteBtn from "./PostDeleteBtn";

export default function AuthPostCard({ post }: { post: PostType }) {
  return (
    <div className="text-left">
      <div className="w-[500px] h-[500px] shadow-md rounded-md">
        <div className="p-5 flex justify-between">
          <div>
            <h1 className="text-2xl font-bold">{post.user.name}</h1>
            <p>{formateDate(post.created_at)}</p>
          </div>
          <PostDeleteBtn id={post.id} />
        </div>
        <Image
          src={`http://localhost:3000/uploads/${post.image}`}
          alt="Post image"
          width="100"
          height={100}
          className="w-full h-[300px] object-cover"
          unoptimized
        />

        <div className="p-5">
          <h1 className="text-xl font-bold">{post.title}</h1>
          <p className="text-sm">{post.description}</p>
        </div>
      </div>
    </div>
  );
}