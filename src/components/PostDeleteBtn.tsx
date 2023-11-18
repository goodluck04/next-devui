import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import React from 'react'
import { Button } from "./ui/button"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useToast } from "./ui/use-toast"


export default function PostDeleteBtn({id}:{id:number}) {
  const router = useRouter();
  const {toast}  = useToast();
  const deletePost = () => {
    axios.delete(`/api/user/post/${id}`)
    .then((res) => {
      const response = res.data;
      if(response.status === 200){
        toast({
          title: "success",
          description: response.message,
          className: "bg-green-400"
        })
        router.refresh();
      }
    })
    .catch((error) => {
      console.log("error is ", error)
    })
  }

  return (

    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Del</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            If this post deleted then you cant recover it
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-red-500" onClick={deletePost}>Yes Delete It!</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

