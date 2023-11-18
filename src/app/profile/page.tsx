import Navbar from '@/components/Navbar'
import { getServerSession } from 'next-auth'
import React from 'react'
import { CustomSession, authOptions } from '../api/auth/[...nextauth]/authOptions';
import { Button } from '@/components/ui/button';
import SignoutBtn from '@/components/SignoutBtn';
import AddPost from '@/components/AddPost';
import {headers} from "next/headers";
import UserPostCard from '@/components/UserPostCard';


async function getUserPosts() {
    const res = await fetch(`${process.env.APP_URL}/api/user/post`, {
        headers:headers()
    })
    if(!res.ok) {
        throw new Error("Something went wrong during fetching data")
    }

    const response = await res.json()
    if(response.status === 200) {
        return response?.data;
    } 
}

export default async function Profile() {
    const session: CustomSession | null = await getServerSession(authOptions);
    // not need to pass type here as custom Session by default it is givivng 
    // console.log(session);
    const posts  = await getUserPosts();
    return (
        <div>
            <Navbar />
            <div className=' container mt-5'>
                <div className=' text-center'>
                    <h1 className=' text-3xl'>Hello , {session?.user?.name}</h1>
                    <div className='mt-5 flex justify-center items-center'>
                        <AddPost user_id={session?.user?.id?.toString()!} />
                        <SignoutBtn />
                    </div>
                    <div className='flex justify-center items-center mt-10'>
                        <div className=' grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-4'>
                        {posts !== undefined && posts !== null ? (
                            posts.map((item:PostType) => <UserPostCard key={item.id} post={item} />)
                        ) : (<div>No Post Found </div>)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
