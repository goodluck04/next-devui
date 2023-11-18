import Navbar from '@/components/Navbar'
import PostCard from '@/components/PostCard'
import { getUI } from '@/lib/serverMethod'
import React from 'react'

export default async function ShowPost({params}: {params:{id:number}}) {
    const post:PostType = await getUI(params?.id)
    return (
    <div>
        <Navbar />
        <div className='h-screen w-screen flex justify-center items-center'>
            <PostCard post={post} />
        </div>
    </div>
  )
}
