"use client";
import { signInWithEmailPassword, signUpWithEmailPassword, signInWithGoogle, signInWithGitHub } from "@/config/firebaseconfig";
import { useState } from "react";
import { toast } from "react-toastify";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function Login() {
  const [log, setLog] = useState(true); // toggle between login and signup
  const [show, setShow] = useState(false); // to change password visibility
  const [showConf, setShowConf] = useState(false); // to change password visibility
  const [formData, setFormData] = useState({
    name: "",
    Email: "",
    Password: "",
    ConfirmPassword: "",
  });

  // router
  const router = useRouter();


  // Common handler for form inputs
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Sign up logic
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    const { Email, Password, ConfirmPassword } = formData;

    if (Password !== ConfirmPassword) {
      toast.warn("Password mismatch", { position: "top-center" });
      return;
    }

    try {
      const user = await signUpWithEmailPassword(Email, Password);
      console.log("Signed Up Successfully", user);
      router.push("/pages/ProtectedPages");
    } catch (error: any) {
      console.error(error);
    }
  };

  // Login logic
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { Email, Password } = formData;

    try {
      const user = await signInWithEmailPassword(Email, Password);
      console.log("Logged In Successfully", user);
      router.push("/pages/ProtectedPages");
    } catch (error: any) {
      console.error(error);
    }
  };

  // Login with Google
  const handleGoogleLogin = async () => {
    try {
      const user = await signInWithGoogle();
      console.log("Google Login Successful", user);
      router.push("/pages/ProtectedPages");
    } catch (error: any) {
      console.error(error);
    }
  };

  // Login with GitHub
  const handleGithubLogin = async () => {
    try {
      const user = await signInWithGitHub();
      console.log("GitHub Login Successful", user);
      router.push("/pages/ProtectedPages");
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <main className="w-full h-screen flex items-center justify-center relative bg-gradient-to-br from-gray-900 to-gray-800">
      <img
        src="images/bg.jpg"
        alt="background"
        className="absolute top-0 left-0 w-full h-full object-cover -z-10 opacity-30"
      />
      <section className="bg-white bg-opacity-10 backdrop-blur-md p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-white text-center mb-6">
          {log ? "Login" : "Register"}
        </h1>
        <form onSubmit={log ? handleLogin : handleSignup} className="space-y-4">
          {!log && (
            <div className="flex flex-col">
              <label className="text-white">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 mt-1 bg-transparent border border-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
              />
            </div>
          )}
          <div className="flex flex-col">
            <label className="text-white">Email</label>
            <input
              type="email"
              name="Email"
              value={formData.Email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 mt-1 bg-transparent border border-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-white">Password</label>
            <div className="relative">
              <input
                type={show ? "text" : "password"}
                name="Password"
                value={formData.Password}
                onChange={handleInputChange}
                className="w-full px-3 py-2 mt-1 bg-transparent border border-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
              />
              <span
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-white"
                onClick={() => setShow(!show)}
              >
                {show ? <FaRegEyeSlash /> : <FaRegEye />}
              </span>
            </div>
          </div>
          {!log && (
            <div className="flex flex-col">
              <label className="text-white">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConf ? "text" : "password"}
                  name="ConfirmPassword"
                  value={formData.ConfirmPassword}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 mt-1 bg-transparent border border-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                />
                <span
                  className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-white"
                  onClick={() => setShowConf(!showConf)}
                >
                  {showConf ? <FaRegEyeSlash /> : <FaRegEye />}
                </span>
              </div>
            </div>
          )}
          <div className="flex items-center justify-between text-white">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="form-checkbox h-4 w-4" />
              <span>Remember Me</span>
            </label>
            <button className="text-blue-400 hover:underline">Forgot Password?</button>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            {log ? "Login" : "SignUp"}
          </button>
        </form>
        <div className="flex justify-center items-center text-white gap-3 mt-4">
          <button
            onClick={handleGoogleLogin}
          >
            <img src="/images/google.png" alt="" width={30} height={30}/>
          </button>
          <button
            onClick={handleGithubLogin}
          >
            <img src="/images/github.png" alt="" width={30} height={30}/>
          </button>
        </div>
        <p className="text-center text-white mt-4">
          {log ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            className="text-blue-400 hover:underline"
            onClick={() => setLog(!log)}
          >
            {log ? "Register" : "Login"}
          </button>
        </p>
      </section>
    </main>
  );
}
