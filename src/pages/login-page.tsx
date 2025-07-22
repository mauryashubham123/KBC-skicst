import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  return (
    <div className="grid min-h-[calc(100svh-0rem)]  bg-background">
        
        <div className="flex flex-1 items-center  justify-center">
          <div className="w-full  ">
            <LoginForm className="" />
          </div>
        </div>
      
    </div>
  )
}
