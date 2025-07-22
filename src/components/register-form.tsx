import kbcheader from "@/assets/kbc_header.jpg";
import kbcfooter from "@/assets/kbc_footer.jpg";
import { useAuth } from '@/Auth/AuthProvider';
import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Loader2, Trophy, MapPin, Phone, Star, Award, Users, BookOpen, Zap, Sparkles, Target, Gift, Shield, EyeOff, Eye, Vegan, CheckCircle } from 'lucide-react';
import { CustomSelect } from "./Custom/CustomSelect";
import ImageUpload from "./Custom/image-upload";
import { useNavigate } from "react-router-dom";

export default function RegistrationForm({
}: React.ComponentPropsWithoutRef<"form">) {
	const { handleRegister, isLoading } = useAuth();
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const formData = new FormData(e.currentTarget);
		handleRegister(formData);
	}
	const [showPassword, setShowPassword] = useState(false);
	const [isSkStudent, setIsSkStudent] = useState('');
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [passwordError, setPasswordError] = useState('');
	const navigate = useNavigate();
	const handleRadioChange = (e:any) => {
		setIsSkStudent(e.target.value);
	};

	const handleloginPage=()=>{
		navigate('/login',{ replace: true});
      	window.scrollTo(0, 0);
	}
	const handlePasswordChange = (e: any) => {
		const newPassword = e.target.value;
		setPassword(newPassword);

		// Check if confirm password matches
		if (confirmPassword && newPassword !== confirmPassword) {
			setPasswordError('Passwords do not match');
		} else {
			setPasswordError('');
		}
	};

	const handleConfirmPasswordChange = (e: any) => {
		const newConfirmPassword = e.target.value;
		setConfirmPassword(newConfirmPassword);

		// Check if passwords match
		if (password && password !== newConfirmPassword) {
			setPasswordError('Passwords do not match');
		} else {
			setPasswordError('');
		}
	};



	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-900 to-blue-700 relative overflow-hidden">
			{/* Animated Background Elements */}
			<div className="absolute inset-0 pointer-events-none">
				<div className="absolute top-20 left-20 w-32 h-32 bg-yellow-400 rounded-full opacity-10 animate-pulse"></div>
				<div className="absolute top-40 right-32 w-24 h-24 bg-purple-400 rounded-full opacity-15 animate-bounce"></div>
				<div className="absolute bottom-32 left-40 w-40 h-40 bg-indigo-400 rounded-full opacity-10 animate-pulse"></div>
				<div className="absolute top-32 right-20 w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-500 transform rotate-45 opacity-30 animate-spin"></div>
				<div className="absolute bottom-40 right-40 w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-500 transform rotate-12 opacity-25 animate-bounce"></div>
			</div>

			{/* Main Registration Form */}
			<div className="max-w-4xl mx-auto px-4 pb-12 relative z-10">
				<div className="bg-white rounded-3xl shadow-2xl overflow-hidden mt-2 border-4 border-yellow-400 relative">

					{/* Decorative Elements on Form */}
					<div className="absolute top-4 left-4 z-20">
						<div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-2 rounded-full animate-bounce">
							<Star className="w-6 h-6 text-white" />
						</div>
					</div>
					<div className="absolute top-4 right-4 z-20">
						<div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}>
							<Gift className="w-6 h-6 text-white" />
						</div>
					</div>

					{/* Form Header with Illustration */}
					<div className="flex flex-col gap-6" id="registration-form">
						<div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-center relative overflow-hidden">
							<div className="absolute top-0 left-0 w-full h-full opacity-10">
								<div className="absolute top-4 left-4">
									<Star className="w-8 h-8 text-white animate-bounce" />
								</div>
								<div className="absolute top-4 right-4">
									<Star className="w-6 h-6 text-white animate-bounce" style={{ animationDelay: '0.5s' }} />
								</div>
								<div className="absolute bottom-4 left-8">
									<Star className="w-10 h-10 text-white animate-bounce" style={{ animationDelay: '1s' }} />
								</div>
								<div className="absolute bottom-4 right-8">
									<Star className="w-6 h-6 text-white animate-bounce" style={{ animationDelay: '1.5s' }} />
								</div>
							</div>

							{/* KBC Style Header Illustration */}
							<div className="absolute top-0 left-0 w-full h-full opacity-10">
								<div className="flex justify-center items-center gap-8 mb-6">
									<div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-4 rounded-full shadow-lg animate-pulse">
										<Trophy className="w-12 h-12 text-white" />
									</div>
									<div className="bg-gradient-to-r from-green-400 to-blue-500 p-4 rounded-full shadow-lg animate-pulse">
										<Award className="w-12 h-12 text-white" />
									</div>
								</div>

								{/* Animated Quiz Elements */}
								<div className="flex justify-center items-center gap-4 mb-4">
									<div className="bg-white/20 backdrop-blur-sm rounded-full p-3 animate-bounce">
										<BookOpen className="w-8 h-8 text-yellow-300" />
									</div>
									<div className="bg-white/20 backdrop-blur-sm rounded-full p-3 animate-bounce" style={{ animationDelay: '0.3s' }}>
										<Zap className="w-8 h-8 text-green-300" />
									</div>
									<div className="bg-white/20 backdrop-blur-sm rounded-full p-3 animate-bounce" style={{ animationDelay: '0.6s' }}>
										<Target className="w-8 h-8 text-purple-300" />
									</div>
								</div>
							</div>
							<div className="w-full">
								<img
									src={kbcheader}
									alt="KAUN BANEGA CHAMPION Header"
									className="w-full h-auto object-cover shadow-2xl"
								/>
							</div>
						</div>

						{/* Form Content with Enhanced Styling */}
						<form onSubmit={handleSubmit} className="px-8 space-y-2 relative">
							{/* Decorative Side Elements */}
							<div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4">
								<div className="bg-gradient-to-b from-purple-500 to-pink-500 w-2 h-32 rounded-full opacity-50"></div>
							</div>
							<div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4">
								<div className="bg-gradient-to-b from-yellow-400 to-orange-500 w-2 h-32 rounded-full opacity-50"></div>
							</div>

							{/* Form Fields Grid */}
							<div className=" flex items-center justify-center">
								<ImageUpload
									className="size-32 flex items-center justify-center"
									label="Select Picture" name="avatar"
									required
								/>
							</div>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								{/* Student Name */}
								<div className="space-y-2 relative">
									<div className="relative">
										<label htmlFor="name" className="flex gap-2 text-sm font-semibold text-gray-700 mb-2">
											<Users className="text-purple-500  size-4 " />	Student's Name
										</label>
										<input
											type="text"
											id="name"
											name="name"
											placeholder="Enter student's full name"
											disabled={isLoading}
											className="w-full px-0 py-2 text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:border-purple-600 focus:outline-none focus:ring-0 transition-colors duration-200"
										/>
									</div>
								</div>

								{/* Father Name */}
								<div className="space-y-2 relative">
									<div className="relative">
										<label htmlFor="fname" className="flex gap-2 text-sm font-semibold text-gray-700 mb-2">
											<Users className=" text-blue-500 size-4" />	Father Name
										</label>
										<input
											type="text"
											id="fname"
											name="fname"
											placeholder="Enter Father Name"
											disabled={isLoading}
											className="w-full px-0 py-2 text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:border-blue-600 focus:outline-none focus:ring-0 transition-colors duration-200"
										/>
									</div>
								</div>

								{/* Qualification */}
								<div className="space-y-2 relative">
									<div className="relative">
										<label htmlFor="qualification" className="flex gap-2 text-sm font-semibold text-gray-700 mb-2">
											<BookOpen className="size-4 text-green-500" />	Qualification
										</label>
										<CustomSelect defaultValue={''} name="qualification" options={[{ label: 'class 8', value: '8' }, { label: 'class 9', value: '9' }, { label: 'class 10', value: '10' },
										{ label: 'class 11', value: '11' }, { label: 'class 12', value: '12' }, { label: 'Graduation', value: '13' }, { label: 'Post Graduation', value: '14' }
										]} />

									</div>
								</div>

								{/* Mobile Number */}
								<div className="space-y-2 relative">
									<div className="relative">
										<label htmlFor="phone" className="flex gap-2 text-sm font-semibold text-gray-700 mb-2">
											<Phone className="size-4 text-orange-500" />	Mobile Number
										</label>
										<input
											type="tel"
											id="phone"
											name="phone"
											placeholder="Enter Mobile Number"
											disabled={isLoading}
											className="w-full px-0 py-2 text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:border-orange-600 focus:outline-none focus:ring-0 transition-colors duration-200"
										/>
									</div>
								</div>

								{/* Gender */}
								<div className="space-y-2 relative">
									<div className="relative">
										<label className="flex gap-2 text-sm font-semibold text-gray-700 mb-2">
											<Vegan className="size-4 text-blue-400" />	Gender
										</label>
										<div className="flex gap-6 items-center text-sm text-gray-700">
											<label className="flex items-center gap-2 cursor-pointer">
												<input
													type="radio"
													name="gender"
													value="male"
													disabled={isLoading}
													className="accent-blue-500 w-4 h-4"
												/>
												<span>Male</span>
											</label>
											<label className="flex items-center gap-2 cursor-pointer">
												<input
													type="radio"
													name="gender"
													value="female"
													disabled={isLoading}
													className="accent-blue-500 w-4 h-4"
												/>
												<span>Female</span>
											</label>
											<label className="flex items-center gap-2 cursor-pointer">
												<input
													type="radio"
													name="gender"
													value="other"
													disabled={isLoading}
													className="accent-blue-500 w-4 h-4"
												/>
												<span>Other</span>
											</label>
										</div>
									</div>
								</div>

								{/* Password */}
								<div className="space-y-2 relative">
									<div className="relative">
										<label htmlFor="password" className="flex gap-2 text-sm font-semibold text-gray-700 mb-2">
											<Shield className="size-4 text-indigo-500" />	Create Password
										</label>
										<input
											disabled={isLoading}
											name="password"
											id="password"
											type={showPassword ? "text" : "password"}
											placeholder="Create Password"
											value={password}
											onChange={handlePasswordChange}
											className="w-full px-0 py-2 text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:border-indigo-600 focus:outline-none focus:ring-0 transition-colors duration-200 pr-10"
										/>
										<Button
											type="button"
											variant="ghost"
											size="icon"
											className="absolute right-0 top-6 h-8 w-8 hover:bg-transparent"
											onClick={() => setShowPassword(!showPassword)}
											disabled={isLoading}
										>
											{showPassword ? (
												<EyeOff className="h-4 w-4 text-gray-500" />
											) : (
												<Eye className="h-4 w-4 text-gray-500" />
											)}
										</Button>
									</div>
								</div>
								{/* Address */}
								<div className="space-y-2 relative">
									<div className="relative">
										<label htmlFor="address" className="flex gap-2 text-sm font-semibold text-gray-700 mb-2">
											<MapPin className="size-4 text-red-500" />	Address
										</label>
										<textarea
											id="address"
											name="address"
											placeholder="Enter complete address"
											rows={2}
											disabled={isLoading}
											className="w-full px-0 text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:border-red-600 focus:outline-none focus:ring-0 transition-colors duration-200"
										/>
									</div>
								</div>

								{/* Confirm Password */}
								<div className="space-y-2 relative">
									<div className="relative">
										<label htmlFor="confirmPassword" className="flex gap-2 text-sm font-semibold text-gray-700 mb-2">
											<Shield className="size-4 text-emerald-500" />	Confirm Password
										</label>
										<input
											disabled={isLoading}
											name="password_confirmation"
											id="confirmPassword"
											type={showConfirmPassword ? "text" : "password"}
											placeholder="Confirm Password"
											value={confirmPassword}
											onChange={handleConfirmPasswordChange}
											className={`w-full px-0 py-2 text-gray-900 bg-transparent border-0 border-b-2 ${passwordError ? 'border-red-500' : 'border-gray-300'
												} focus:border-emerald-600 focus:outline-none focus:ring-0 transition-colors duration-200 pr-10`}
										/>
										<Button
											type="button"
											variant="ghost"
											size="icon"
											className="absolute right-0 top-6 h-8 w-8 hover:bg-transparent"
											onClick={() => setShowConfirmPassword(!showConfirmPassword)}
											disabled={isLoading}
										>
											{showConfirmPassword ? (
												<EyeOff className="h-4 w-4 text-gray-500" />
											) : (
												<Eye className="h-4 w-4 text-gray-500" />
											)}
										</Button>
									</div>
									{passwordError && (
										<p className="text-red-500 text-sm mt-1 flex items-center gap-1">
											<span className="w-1 h-1 bg-red-500 rounded-full"></span>
											{passwordError}
										</p>
									)}
								</div>
							</div>

							{/* SK Institute Student Check */}
							<div className="space-y-2 relative md:col-span-2">
								<div className="relative">
									<div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200 p-4">
										<div className="flex items-center gap-3 mb-4">
											<div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-full">
												<BookOpen className="w-5 h-5 text-white" />
											</div>
											<span className="text-gray-700 font-medium text-sm">Are you already a student of SK Institute?</span>
										</div>

										<div className="flex gap-6 ml-11">
											<label className={`flex items-center gap-2 cursor-pointer p-2 rounded-md transition-all duration-200 ${isSkStudent === 'yes' ? 'bg-blue-100 border border-blue-300' : ''
												}`}>
												<input
													type="radio"
													name="isSkStudent"
													value="on"
													checked={isSkStudent === 'on'}
													onChange={handleRadioChange}
													disabled={isLoading}
													className="w-4 h-4 text-blue-600 border-2 border-blue-300 focus:ring-blue-500  accent-blue-500"
												/>
												<span className="text-sm text-gray-700 font-medium">Yes</span>
												{isSkStudent === 'yes' && <CheckCircle className="w-4 h-4 text-blue-600 ml-1" />}
											</label>

											<label className={`flex items-center gap-2 cursor-pointer p-2 rounded-md transition-all duration-200 ${isSkStudent === 'no' ? 'bg-blue-100 border border-blue-300' : ''
												}`}>
												<input
													type="radio"
													name="isSkStudent"
													value="off"
													checked={isSkStudent === 'off'}
													onChange={handleRadioChange}
													disabled={isLoading}
													className="w-4 h-4 text-blue-600 border-2 border-blue-300 focus:ring-blue-500  accent-blue-500"
												/>
												<span className="text-sm text-gray-700 font-medium">No</span>
												{isSkStudent === 'no' && <CheckCircle className="w-4 h-4 text-blue-600 ml-1" />}
											</label>
										</div>
									</div>
								</div>
							</div>

							{/* Selection Status Indicator */}
							<div className={`transition-all duration-300 ${isSkStudent ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-2'}`}>
								{isSkStudent && (
									<div className="flex items-center gap-2 text-green-600 bg-green-50 p-2 rounded-lg border border-green-200">
										<CheckCircle className="w-4 h-4" />
										<span className="text-sm font-medium">
											Selection made: {isSkStudent === 'yes' ? 'Existing Student' : 'New Student'}
										</span>
									</div>
								)}
							</div>

							{/* Submit Button with Enhanced Design */}
							<div className={`relative transition-all duration-500 ${isSkStudent ? 'opacity-100 transform translate-y-0' : 'opacity-30 transform translate-y-4 pointer-events-none'
								}`}>
								<button
									type="submit"
									disabled={!isSkStudent}
									className={`w-full h-14 text-lg font-semibold rounded-lg shadow-lg transition-all duration-300 transform relative overflow-hidden ${isSkStudent && !isLoading && !passwordError
											? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white hover:scale-105 hover:shadow-xl'
											: 'bg-gray-300 text-gray-500 cursor-not-allowed'
										}`}
								>
									{/* Animated background overlay */}
									<div className={`absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 opacity-0 transition-opacity duration-300 ${isSkStudent && !isLoading ? 'hover:opacity-20' : ''
										}`}></div>

									{/* Button content */}
									<div className="relative flex items-center justify-center">
										{isLoading && <Loader2 className="w-5 h-5 mr-2 animate-spin" />}
										{!isSkStudent ? 'Please select an option above' :
											isLoading ? 'Submitting...' : 'Submit Registration'}
									</div>

									{/* Success ripple effect when selection is made */}
									{isSkStudent && !isLoading && (
										<div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 opacity-0 animate-pulse"></div>
									)}
								</button>
							</div>

							{/* Helper text */}
							{!isSkStudent && (
								<div className="text-center">
									<p className="text-sm text-gray-500 animate-bounce">
										👆 Please select whether you're an existing student or not
									</p>
								</div>
							)}

							<div className="text-center pt-4">
								<span className="text-amber-700/80 text-sm">
									Already have an account? {" "}
								</span>
								<button
									type="button"
									onClick={handleloginPage}
									className="text-orange-600 hover:text-orange-700 font-bold text-sm transition-colors"
								>
									Login up here
								</button>
							</div>
						</form>

						{/* Footer Illustration */}
						<div className="w-full">
							<img
								src={kbcfooter}
								alt="KAUN BANEGA CHAMPION Header"
								className="w-full h-auto object-cover shadow-2xl"
							/>
						</div>
					</div>
				</div>
			</div>

			{/* Welcome Section with Enhanced Illustrations */}
			<div className="max-w-6xl mx-auto px-4 py-12 relative z-10">
				<div className="text-center mb-12">
					<div className="flex justify-center items-center gap-4 mb-6">
						<div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-4 rounded-full shadow-lg animate-pulse relative">
							<Trophy className="w-12 h-12 text-white" />
							<div className="absolute -top-2 -right-2 bg-red-500 p-1 rounded-full animate-bounce">
								<Sparkles className="w-4 h-4 text-white" />
							</div>
						</div>
						<h1 className="text-4xl font-bold text-white">Join the Championship!</h1>
						<div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-4 rounded-full shadow-lg animate-pulse relative">
							<Award className="w-12 h-12 text-white" />
							<div className="absolute -top-2 -left-2 bg-green-500 p-1 rounded-full animate-bounce">
								<Star className="w-4 h-4 text-white" />
							</div>
						</div>
					</div>
					<p className="text-xl text-cyan-200 max-w-3xl mx-auto">
						Step into the spotlight and showcase your knowledge in the most exciting quiz competition of the year!
					</p>
				</div>

				{/* Enhanced Feature Cards */}
				<div className="grid md:grid-cols-3 gap-6 mb-12">
					<div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 relative overflow-hidden">
						<div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-orange-500"></div>
						<div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-3 rounded-full w-fit mx-auto mb-4 animate-pulse">
							<Users className="w-12 h-12 text-white" />
						</div>
						<h3 className="text-xl font-bold text-white mb-2">Open for All</h3>
						<p className="text-cyan-200">All institute students can participate and compete</p>
					</div>

					<div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 relative overflow-hidden">
						<div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-blue-500"></div>
						<div className="bg-gradient-to-r from-green-400 to-blue-500 p-3 rounded-full w-fit mx-auto mb-4 animate-pulse">
							<BookOpen className="w-12 h-12 text-white" />
						</div>
						<h3 className="text-xl font-bold text-white mb-2">Knowledge Test</h3>
						<p className="text-cyan-200">Challenge yourself with diverse questions</p>
					</div>

					<div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 relative overflow-hidden">
						<div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-400 to-pink-500"></div>
						<div className="bg-gradient-to-r from-purple-400 to-pink-500 p-3 rounded-full w-fit mx-auto mb-4 animate-pulse">
							<Zap className="w-12 h-12 text-white" />
						</div>
						<h3 className="text-xl font-bold text-white mb-2">Exciting Prizes</h3>
						<p className="text-cyan-200">Win amazing rewards and recognition</p>
					</div>
				</div>
			</div>
		</div>
	);
}