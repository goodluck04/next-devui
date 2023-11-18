"use client";

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react';


export default function Navbar() {
    const pathName: string = usePathname();
    const { data: session, status } = useSession();
    return (
        <div className='h-16 w-full flex justify-between items-center px-6'>

            <div className=' flex items-center justify-center'>
                <Image alt='logo' src="/images/logo.png" height="40" width="40" />
                <h1 className=' text-3xl font-bold ml-2'>NexUI</h1>
            </div>

            <div>
                <Link href="/" >
                    <Button className={` text-base lg:text-lg ${pathName === "/" ? "font-bold text-orange-400" : ""}`} variant="link">Home</Button>
                </Link>
                <Link href="/explore" >
                    <Button className={` text-base lg:text-lg ${pathName === "/explore" ? "font-bold text-orange-400" : ""}`} variant="link">Explore</Button>
                </Link>
                {status === "authenticated" ?
                    <Link href="/profile" >
                        <Button className={` text-base lg:text-lg ${pathName === "/profile" ? "font-bold text-orange-400" : ""}`} variant="link">Profile</Button>
                    </Link>
                    :
                    <Link href="/login" >
                        <Button className="text-base lg:text-lg" variant="link">Login</Button>
                    </Link>}
            </div>
        </div>
    )
}
