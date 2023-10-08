"use client";

import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { BsGoogle, BsGithub } from "react-icons/bs";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import { useRouter } from "next/navigation";
import Input from "@/app/components/inputs/Input";
import AuthSocialButton from "./AuthSocialButton";

import toast from "react-hot-toast";
type Variant = "Login" | "Register";

const AuthForm = () => {
  const session = useSession();
  const router = useRouter();
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/conversations");
    }
  }, [session?.status, router]);

  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  }, [variant]);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FieldValues>({
      defaultValues: {
          name: '',
          email: "",
      password:""}
  })
  
  
  

      const onSubmit:SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    if (variant === "REGISTER") {
      axios
        .post("/api/register", data)
        .then(() => signIn("credentials", { ...data, redirect: false }));
        .then((callback) => {
            if (callback?.error) {
                toast.error("Invalid credentials")
            }
            if (callback?.ok) {
router.push("/conversations")
            }
        }).catch(()=>toast.error("something went wrong")).finally(()=>setIsLoading(false))
    }


 if (variant === "LOGIN") {
    signIn("credentials", { ...data, redirect: false });
        .then((callback) => {
            if (callback?.error) {
                toast.error("Invalid credentials")
            }
            if (callback?.ok) {
router.push("/conversations")
            }
        }).catch(()=>toast.error("something went wrong")).finally(()=>setIsLoading(false))
    }


    
  }

const socialAction = (action: string) => {
    setIsLoading(true);
    signIn(action, { redirect: false }).then((callback)=> {
        if (callback?.error) {
         toast.error("invalid credentials")   
        }
        if (callback?.ok) {
            router.push("/conversations")
        }
    }).finally(()=>setIsLoading(false))
  }
return (<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">

    <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>{
            variant === "REGISTER" && (<Input disabled={isLoading} register={register} errors={errors} required id="name" label="Name" />)}


            <Input disabled={isLoading} register={register} errors={errors} required id="email" label="Email" />
        <Input disabled={isLoading} register={register} errors={errors} required id="password" label="Password" type="password" />
            <Button disabled={isLoading} fullWidth type="submit">{variant === "LOGIN" ? "Sign In " : "Register"}</Button>
        </form>
        <div className="mt-6">
            <div>

                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-600" />
                    
            </div>
            </div>
        </div>
</div>
    
  </div>)
};
export default AuthForm;
