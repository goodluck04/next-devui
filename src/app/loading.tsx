"use client"
import Image from 'next/image'
import React from 'react'

export default function Loading() {
  return (
    <div className='h-screen w-screen flex justify-center items-center flex-col'>
        <Image src="/images/loading.svg" width={400} height={400} alt='loading image' />
        <h1 className='text-2xl font-bold'>Loading  please wait ...</h1>
    </div>
  )
}
