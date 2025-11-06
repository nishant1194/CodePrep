import { authModalState } from "@/atoms/authModalAtom";
 import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
 import { useRouter } from "next/router";
 import { toast } from "react-toastify";
import axios from "axios";

type SignupProps = {};

const Signup: React.FC<SignupProps> = () => {

	const setAuthModalState = useSetRecoilState(authModalState);
	const handleClick = () => {
		setAuthModalState((prev) => ({ ...prev, type: "login" }));
	};

	const [inputs, setInputs] = useState({ email: "", displayName: "", password: "" });
	const router = useRouter();

 	const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (!inputs.email || !inputs.password || !inputs.displayName) {
    return alert("Please fill all fields");
  }

  const loadingToastId = toast.loading("Creating your account...", {
    position: "top-center",
    toastId: "loadingToast",
  });

  try {
    const { data } = await axios.post("/api/auth/register", {
      email: inputs.email,
      password: inputs.password,
      name: inputs.displayName,
    });

    // Save JWT token and user info
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    toast.update(loadingToastId, {
      render: "Account created successfully!",
      type: "success",
      isLoading: false,
      autoClose: 2000,
      position: "top-center",
      theme: "dark",
    });

    router.push("/"); // Redirect to homepage
  } catch (error: any) {
    toast.update(loadingToastId, {
      render: error.response?.data?.message || "Registration failed",
      type: "error",
      isLoading: false,
      autoClose: 3000,
      position: "top-center",
      theme: "dark",
    });
  }
};


	// useEffect(() => {
	// 	if (error) alert(error.message);
	// }, [error]);

	return (
		<form className='space-y-6 px-6 pb-4' onSubmit={handleRegister}>
			<h3 className='text-xl font-medium text-white'>Register to LeetClone</h3>
			<div>
				<label htmlFor='email' className='text-sm font-medium block mb-2 text-gray-300'>
					Email
				</label>
				<input
					onChange={handleChangeInput}
					type='email'
					name='email'
					id='email'
					className='
        border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
        bg-gray-600 border-gray-500 placeholder-gray-400 text-white
    '
					placeholder='name@company.com'
				/>
			</div>
			<div>
				<label htmlFor='displayName' className='text-sm font-medium block mb-2 text-gray-300'>
					Display Name
				</label>
				<input
					onChange={handleChangeInput}
					type='displayName'
					name='displayName'
					id='displayName'
					className='
        border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
        bg-gray-600 border-gray-500 placeholder-gray-400 text-white
    '
					placeholder='John Doe'
				/>
			</div>
			<div>
				<label htmlFor='password' className='text-sm font-medium block mb-2 text-gray-300'>
					Password
				</label>
				<input
					onChange={handleChangeInput}
					type='password'
					name='password'
					id='password'
					className='
        border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
        bg-gray-600 border-gray-500 placeholder-gray-400 text-white
    '
					placeholder='*******'
				/>
			</div>

			<button
				type='submit'
				className="w-full text-white focus:ring-blue-300 font-medium rounded-lg
            text-sm px-5 py-2.5 text-center bg-[#ffa116] hover:bg-[rgb(193,122,15)]"
			>
				Register
			</button>

			<div className='text-sm font-medium text-gray-300'>
				Already have an account?{" "}
				<a href='#' className='text-blue-700 hover:underline' onClick={handleClick}>
					Log In
				</a>
			</div>
		</form>
	);
};
export default Signup;