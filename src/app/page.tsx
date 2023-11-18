// "use client"
// import { Button } from '@/components/ui/button'
// import Image from 'next/image'
// import { getServerSession } from 'next-auth'
// import { authOptions } from './api/auth/[...nextauth]/authOptions'
// import { useSession } from 'next-auth/react'
import Navbar from '@/components/Navbar'
import PostCard from '@/components/PostCard';
import { getHomeUIs } from '@/lib/serverMethod'


export default async function Home() {
  const posts = await getHomeUIs();


  // const session = await getServerSession(authOptions);
  // const session = useSession();


  return (
    <div>
      <Navbar />
      <div className='container'>
        <div className='flex justify-center flex-col items-center'>
          <h1 className='text-5xl font-bold'>UI Home</h1>
          <p className='text-3xl'>Find worlds best UI/UX for your design</p>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
            {posts !== null && posts !== undefined ? (
              posts.map((item:PostType) => (
                <PostCard post={item} key={item.id} />
              ))
            ) : (<>No Post Found for you!</>)}
          </div>
        </div>
      </div>
    </div>
  )
} 
