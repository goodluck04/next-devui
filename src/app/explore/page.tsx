"use client"
import Navbar from '@/components/Navbar'
import PostCard from '@/components/PostCard';
import { Input } from '@/components/ui/input'
import axios from 'axios';
import React, { useState } from 'react'

export default function Explore() {

  const [search, setSearch] = useState<string>("");
  const [posts, setPosts] = useState<Array<PostType>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [notFound, setNotFound] = useState<boolean>(false);


  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    // clear the prev search results
    // false the not found for next result
    setNotFound(false);
    setPosts([]);

    if (search.length > 0) {
      setLoading(true);
      axios.get(`/api/post/search?query=${search}`)
        .then((res) => {
          setLoading(false);
          const response = res.data;
          if (response.status === 200) {
            // search result
            if (response.data?.length > 0) {
              setPosts(response.data);
            } else {
              setNotFound(true)
            }
          }
        })
        .catch((error) => {
          console.log("error is", error)
        })
    }

  }

  return (
    <div>
      <Navbar />
      <div className='container'>
        <div className='flex justify-center items-center mt-10 flex-col'>
          <form onSubmit={submit}>
            <Input type='text' placeholder='Search UI here...' className='w-full lg:w-[700px] h-22 rounded-lg text-2xl' onChange={(e) => setSearch(e.target.value)} />
          </form>
          {loading && <h1 className='text-2xl text-orange-300 font-bold'>Loading...</h1>}
          {notFound && <h1 className='text-2xl text-red-300 font-bold'>No Record Found</h1>}
          <div className='grid grid-cols-2 lg:grid-cols-2 gap-4'>
            {posts.map((item: PostType) => (
              <PostCard post={item} key={item.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
