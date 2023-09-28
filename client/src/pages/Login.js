import { useEffect, useState } from "react";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";
function Login() {
  const [newUser, setNewUser] = useState(false);
  useEffect(() => {
    localStorage.clear("token");
  }, []);
  return (
    <div className="w-3/3 bg-[url('/public/login.jpg')] flex h-full items-center justify-center p-4 gap-4 bg-slate-50">
      <div className="w-1/3 flex flex-col h-full rounded-lg p-4 bg-[url('/public/login.jpg')] bg-cover">
        <div className="flex flex-col">
          <h2 className=" text-3xl text-gray-800 font-bold">Simply Online</h2>
          <span className="text-sm text-gray-800">Simple way to connect</span>
        </div>
      </div>
      <div className="w-2/3">
        {!newUser ? (
          <LoginForm
            showSignupPage={() => {
              setNewUser(true);
            }}
          ></LoginForm>
        ) : (
          <SignupForm
            showLoginPage={() => {
              setNewUser(false);
            }}
          ></SignupForm>
        )}
      </div>
    </div>
  );
}
export default Login;
