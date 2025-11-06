 import React, { useState, useEffect } from "react";
 import { toast } from "react-toastify";
 import axios from "axios";

type ResetPasswordProps = {};

const ResetPassword: React.FC<ResetPasswordProps> = () => {
	const [email, setEmail] = useState("");
 	 const handleReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) return alert("Please enter your email");

    const loadingToastId = toast.loading("Sending password reset email...", {
      position: "top-center",
      toastId: "loadingToast",
    });

    try {
      const { data } = await axios.post("/api/auth/forgotpassword", { email });

      toast.update(loadingToastId, {
        render: data.message || "Password reset email sent",
        type: "success",
        isLoading: false,
        autoClose: 3000,
        position: "top-center",
        theme: "dark",
      });
    } catch (error: any) {
      toast.update(loadingToastId, {
        render: error.response?.data?.message || "Failed to send reset email",
        type: "error",
        isLoading: false,
        autoClose: 3000,
        position: "top-center",
        theme: "dark",
      });
    }
	 }
	// useEffect(() => {
	// 	if (error) {
	// 		alert(error.message);
	// 	}
	// }, [error]);
	return (
		<form className='space-y-6 px-6 lg:px-8 pb-4 sm:pb-6 xl:pb-8' onSubmit={handleReset}>
			<h3 className='text-xl font-medium  text-white'>Reset Password</h3>
			<p className='text-sm text-white '>
				Forgotten your password? Enter your e-mail address below, and we&apos;ll send you an e-mail allowing you
				to reset it.
			</p>
			<div>
				<label htmlFor='email' className='text-sm font-medium block mb-2 text-gray-300'>
					Your email
				</label>
				<input
					type='email'
					name='email'
					onChange={(e) => setEmail(e.target.value)}
					id='email'
					className='border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white'
					placeholder='name@company.com'
				/>
			</div>

			<button
				type='submit'
				className={`w-full text-white  focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center 
                bg-[#ffa116] hover:bg-[rgb(193,122,15)]`}
			>
				Reset Password
			</button>
		</form>
	);
};
export default ResetPassword;