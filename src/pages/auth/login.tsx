import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChangeEvent, FormEvent, useState } from "react";
import { loginFunction } from "@/api/functions/auth.api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useStoreState } from "zustand-x";
import { authStore } from "@/store/auth.store";
import Cookies from "js-cookie";

import { createClient } from "@/lib/supabase/client";

export default function LoginForm() {
  const [payload, setPayload] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useStoreState(authStore, "isLoggedIn");

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPayload({
      ...payload,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("test");
    const supabse = createClient();

    const { data, error } = await supabse.auth.signInWithPassword({
      ...payload,
    });

    if (data?.session?.access_token) {
      toast.success("Login sucessfull");
      setIsLoggedIn(true);
      Cookies.set("token", data.session.access_token, { expires: 7 });
      Cookies.set("userid", data.user.id);
      
      router.push("/");
    }

    if (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          Acme Inc.
        </a>
        <div className={cn("flex flex-col gap-6")}>
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-xl">Welcome back</CardTitle>
              <CardDescription>
                Login with your Apple or Google account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin}>
                <div className="grid gap-6">
                  <div className="grid gap-6">
                    <div className="grid gap-2">
                      <Label htmlFor="email">Username</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="m@example.com"
                        required
                        value={payload.email}
                        onChange={handleOnChange}
                      />
                    </div>
                    <div className="grid gap-2">
                      <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                        <a
                          href="#"
                          className="ml-auto text-sm underline-offset-4 hover:underline"
                        >
                          Forgot your password?
                        </a>
                      </div>
                      <Input
                        onChange={handleOnChange}
                        name="password"
                        value={payload.password}
                        id="password"
                        type="password"
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      Login
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
