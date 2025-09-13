import LoginCard from "@/component/Auth/LoginCard";
import SignInCard from "@/component/Auth/SignInCard";
import { useState } from "react";

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 font-inter">
      {isLogin ? <LoginCard /> : <SignInCard />}

      <button
        onClick={() => setIsLogin(!isLogin)}
        className="mt-4 text-blue-500 hover:underline"
      >
        {isLogin
          ? "Don't have an account? Sign up"
          : "Already have an account? Log in"}
      </button>
    </div>
  );
}

export default AuthPage;
