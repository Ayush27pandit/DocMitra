import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

//zod schema
const signinSchema = z.object({
  username: z.string().max(20, "Username should be of maximum 20 characters"),
  email: z.string().email("Invalid Email"),
  password: z.string().min(8, "Password should be of minimum 8 characters"),
});

type SigninSchemaType = z.infer<typeof signinSchema>;

export default function SigninCard() {
  const [resError, setResError] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninSchemaType>({
    resolver: zodResolver(signinSchema),
  });

  const onSubmit = async (data: SigninSchemaType) => {
    console.log(`backend url :${import.meta.env.VITE_BACKEND_URL}/auth/signup`);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/signup`,
        data
      );
      if (response.status === 200) {
        console.log("signup successfull", response.data);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem(
          "username",
          JSON.stringify(response.data.username)
        );
        navigate("/dashboard");
      } else {
        setResError(response.data.message);
        console.log("signup failed from server side", response.data);
      }
    } catch (error) {
      console.error("signup failed from client side", error);
    }
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Sign Up to your account</CardTitle>
        <CardDescription>
          Enter your email and username below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="ayushpandit27"
                {...register("username", { required: "Username is required" })}
              />
              {errors.username && (
                <p className="text-sm text-red-500">
                  {errors.username.message}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                id="password"
                type="password"
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        {resError && <p className="text-sm text-red-500">{resError}</p>}
        <Button variant="outline" className="w-full">
          Login with Google
        </Button>
      </CardFooter>
    </Card>
  );
}
