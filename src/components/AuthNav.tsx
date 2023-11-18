import Image from "next/image"

export default function AuthNav() {
  return (
    <div className=' flex absolute top-2 left-2 lg:top-5 lg:left-10 items-center'>
        <Image src='/images/logo.png' width={50} height={50} alt="logo" />
        <h1 className=" text-2xl font-bold">NextUI</h1>
    </div>
  )
}
