"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

const registerSchema = z.object({
 name: z.string().min(2, "Name must be at least 2 characters"),
 email: z.string().email("Invalid email address"),
 password: z.string().min(8, "Password must be at least 8 characters"),
 confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
 message: "Passwords don't match",
 path: ["confirmPassword"],
})

export default function RegisterPage() {
 const router = useRouter()
 const [error, setError] = useState("")
 
 const {
   register,
   handleSubmit,
   formState: { errors, isSubmitting },
 } = useForm({
   resolver: zodResolver(registerSchema),
 })

 async function onSubmit(data) {
   try {
     const res = await fetch("/api/auth/register", {
       method: "POST",
       body: JSON.stringify(data),
     })

     if (!res.ok) throw new Error(await res.text())

     router.push("/login?registered=true")
   } catch (error) {
     setError(error.message)
   }
 }

 return (
   <div className="flex min-h-screen items-center justify-center bg-gray-50">
     <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-6 shadow-lg">
       <div>
         <h2 className="text-center text-3xl font-bold">Create an Account</h2>
       </div>
       
       <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
         {error && (
           <div className="rounded bg-red-50 p-4 text-red-600">
             {error}
           </div>
         )}
         
         <div className="space-y-4">
           <div>
             <label htmlFor="name" className="block text-sm font-medium">
               Name
             </label>
             <input
               {...register("name")}
               className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
             />
             {errors.name && (
               <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
             )}
           </div>

           <div>
             <label htmlFor="email" className="block text-sm font-medium">
               Email
             </label>
             <input
               {...register("email")}
               type="email"
               className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
             />
             {errors.email && (
               <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
             )}
           </div>

           <div>
             <label htmlFor="password" className="block text-sm font-medium">
               Password
             </label>
             <input
               {...register("password")}
               type="password"
               className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
             />
             {errors.password && (
               <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
             )}
           </div>

           <div>
             <label htmlFor="confirmPassword" className="block text-sm font-medium">
               Confirm Password
             </label>
             <input
               {...register("confirmPassword")}
               type="password"
               className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
             />
             {errors.confirmPassword && (
               <p className="mt-1 text-sm text-red-600">
                 {errors.confirmPassword.message}
               </p>
             )}
           </div>
         </div>

         <button
           type="submit"
           disabled={isSubmitting}
           className="w-full rounded-md bg-blue-600 py-2 text-white hover:bg-blue-500 disabled:opacity-50"
         >
           {isSubmitting ? "Creating Account..." : "Create Account"}
         </button>
       </form>
     </div>
   </div>
 )
}
