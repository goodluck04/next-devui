"use client"
import React, { useState } from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetFooter
} from "@/components/ui/sheet"
import { Button } from './ui/button'
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useToast } from "@/components/ui/use-toast"

export default function AddPost({ user_id }: { user_id: string }) {
    const router = useRouter();
    const {toast} = useToast();
    const [sheetOpen, setSheetOpen] = useState<boolean>(false);
    const [postState, setPostState] = useState({
        title: "",
        desciption: ""
    })
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState<postErrorsType>({})

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        setFile(file!)
    }

    const submit = () => {
        // console.log("The post state", postState);
        // console.log("File is", file);
        setLoading(true);
        const formData = new FormData()
        formData.append("title", postState.title);
        formData.append("description", postState.desciption);
        formData.append("image", file!); // ! means shold fill be included
        formData.append("user_id", user_id);

        axios.post("/api/user/post", formData)
            .then((res) => {
                setLoading(false);
                const response = res.data

                if (response.status == 200) {
                    // alert("post created")
                    toast({
                        title: "post created",
                        description: response.message,
                        className: "bg-green-400"
                      })
                      setSheetOpen(false)
                      router.refresh();
                } else if (response.status == 400) {
                    setErrors(response.errors)
                }
            })
            .catch((err) => {
                setLoading(false);
                console.log("the post error is", err)
            })
    }

    return (
        <div>
            <Sheet open={sheetOpen}>
                <SheetTrigger asChild>
                    <Button onClick={() => setSheetOpen(true)}>Add Post</Button>
                </SheetTrigger>
                <SheetContent showCloseBtn={false}>
                    <SheetHeader>
                        <SheetTitle>Add your amzing work </SheetTitle>
                        <SheetDescription>
                            Display your amzing UI/UX work to the world.
                        </SheetDescription>
                    </SheetHeader>
                    <div className='mt-4'>
                        <Label htmlFor='title'>Title</Label>
                        <Input type='text' id='title' placeholder='Enter your UI/UX title'
                            onChange={(e) => setPostState({ ...postState, title: e.target.value })} />
                        <span className='text-red-400 font-bold'>{errors?.title}</span>
                    </div>
                    <div className='mt-4'>
                        <Label htmlFor='description'>Description</Label>
                        <Textarea id='description' placeholder='description'
                            onChange={(e) => setPostState({ ...postState, desciption: e.target.value })}
                        />
                        <span className='text-red-400 font-bold'>{errors?.description}</span>
                    </div>
                    <div className='mt-4'>
                        <Label htmlFor='image'>Image</Label>
                        <Input type='file' id='image'
                            onChange={handleFileChange}
                        />
                        <span className='text-red-400 font-bold'>{errors?.image}</span>
                    </div>
                    <SheetFooter className='mt-4'>
                        <Button variant="default" onClick={submit} disabled={loading}>
                            {loading ? "Processing.." : "Submit"}
                        </Button>
                        <Button variant="destructive" onClick={() => setSheetOpen(false)}>Close</Button>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        </div>
    )
}
