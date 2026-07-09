import kbcfooter from "@/assets/kbc_footer.jpg";
import logoSmImg from "@/assets/logofile.png";
import championImg from "@/assets/champion.png";
import { useAuth } from '@/Auth/AuthProvider';
import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Loader2, Trophy, MapPin, Phone, Star, Award, Users, BookOpen, Zap, Sparkles, Gift, Shield, EyeOff, Eye, Vegan, CheckCircle, ArrowRight, ArrowLeft, Copy, Check, MessageCircle, Smartphone } from 'lucide-react';
import { toast } from 'sonner';
import { CustomSelect } from "./Custom/CustomSelect";
import ImageUpload from "./Custom/image-upload";
import { useNavigate } from "react-router-dom";

export default function RegistrationForm({
}: React.ComponentPropsWithoutRef<"form">) {
	const { handleRegister, isLoading } = useAuth();
	const [step, setStep] = useState(1);
	const [paymentConfirmed, setPaymentConfirmed] = useState(false);
	const [isCopied, setIsCopied] = useState(false);

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
	const handleRadioChange = (e: any) => {
		setIsSkStudent(e.target.value);
	};

	const handleCopyUpi = () => {
		navigator.clipboard.writeText('paytmqr5gu35x@ptys');
		setIsCopied(true);
		toast.success('UPI ID copied to clipboard!');
		setTimeout(() => setIsCopied(false), 2000);
	};

	const validateStep1 = () => {
		const name = (document.getElementById('name') as HTMLInputElement)?.value?.trim();
		const fname = (document.getElementById('fname') as HTMLInputElement)?.value?.trim();
		const phone = (document.getElementById('phone') as HTMLInputElement)?.value?.trim();
		const address = (document.getElementById('address') as HTMLInputElement)?.value?.trim();
		const passwordVal = (document.getElementById('password') as HTMLInputElement)?.value;
		const confirmPasswordVal = (document.getElementById('confirmPassword') as HTMLInputElement)?.value;

		const qualificationSelect = document.getElementsByName('qualification')[0] as HTMLSelectElement | HTMLInputElement;
		const qualification = qualificationSelect?.value;

		const genderElements = document.getElementsByName('gender');
		let genderChecked = false;
		for (let i = 0; i < genderElements.length; i++) {
			if ((genderElements[i] as HTMLInputElement).checked) {
				genderChecked = true;
				break;
			}
		}

		if (!name || !fname || !phone || !address || !passwordVal || !confirmPasswordVal || !qualification || !genderChecked || !isSkStudent) {
			toast.error('कृपया सभी अनिवार्य फ़ील्ड भरें।');
			return false;
		}

		if (phone.length !== 10 || !/^\d{10}$/.test(phone)) {
			toast.error('कृपया एक मान्य 10-अंकीय मोबाइल नंबर दर्ज करें।');
			return false;
		}

		if (passwordVal !== confirmPasswordVal) {
			toast.error('पासवर्ड और कन्फर्म पासवर्ड मेल नहीं खाते हैं।');
			return false;
		}

		if (passwordVal.length < 6) {
			toast.error('पासवर्ड कम से कम 6 अक्षरों का होना चाहिए।');
			return false;
		}

		return true;
	};

	const handleloginPage = () => {
		navigate('/login', { replace: true });
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
						<div className="bg-gradient-to-r from-[#3e0b6b] via-[#1b0234] to-[#3e0b6b] text-white p-6 md:p-8 relative overflow-hidden border-b border-[#5a189a]/30">
							<div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-purple-500 rounded-full opacity-15 blur-xl"></div>
							<div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-32 h-32 bg-indigo-500 rounded-full opacity-15 blur-2xl"></div>

							<div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
								{/* Logos Row for Mobile (shown only on mobile) */}
								<div className="flex justify-center gap-6 items-center w-full md:hidden mb-4">
									{/* Champion Logo on mobile */}
									<div className="w-20 h-20 rounded-full bg-gradient-to-r from-[#3e0b6b] via-[#1b0234] to-[#3e0b6b] flex items-center justify-center p-2.5 shadow-lg border-2 border-purple-500/20">
										<img
											src={championImg}
											alt="Champion Icon"
											className="w-full h-full object-contain"
										/>
									</div>
									{/* Institute Logo on mobile */}
									<div className="w-20 h-20 rounded-full bg-gradient-to-r from-[#f1f1f1] via-[#f1f1f1] to-[#f1f1f1] flex items-center justify-center p-2.5 shadow-lg border-2 border-purple-500/20">
										<img
											src={logoSmImg}
											alt="SKICST Logo"
											className="w-full h-full object-contain"
										/>
									</div>
								</div>

								{/* Left side: Champion Icon (Desktop only) */}
								<div className="hidden md:block flex-shrink-0">
									<div className="w-28 h-28 lg:w-32 lg:h-32 rounded-full bg-gradient-to-r from-[#3e0b6b] via-[#1b0234] to-[#3e0b6b] flex items-center justify-center p-3 shadow-xl border-2 border-purple-500/30 hover:scale-105 transition-transform duration-300">
										<img
											src={championImg}
											alt="Champion Icon"
											className="w-full h-full object-contain"
										/>
									</div>
								</div>

								{/* Center Content */}
								<div className="flex-1 text-center flex flex-col items-center justify-center">
									<span className="bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs md:text-sm uppercase tracking-widest px-4 py-1.5 rounded-full font-bold">
										S.K. INSTITUTE OF COMPUTER SCIENCE & TECHNOLOGY
									</span>
									<h1 className="text-3xl md:text-4xl font-extrabold mt-4 mb-2 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-amber-300 to-yellow-100 drop-shadow-md">
										🏆  Kaun Banega Champion - 2026
									</h1>
									<p className="text-purple-200 text-sm md:text-lg mt-3 font-medium">
										Foundation Day Celebrating Program
									</p>
									<p className="text-purple-100 font-semibold text-md md:text-xl mt-1">
										"ज्ञान से आत्मविश्वास, कौशल से पहचान, सफलता से सम्मान"
									</p>
									<p className="text-purple-300 text-sm md:text-lg mt-2 font-medium">
										संकल्प और सिद्धि-2026
									</p>
									<div className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mt-2 rounded-full"></div>
								</div>

								{/* Right side: Institute Logo (Desktop only) */}
								<div className="hidden md:block flex-shrink-0">
									<div className="w-28 h-28 lg:w-32 lg:h-32 rounded-full bg-gradient-to-r from-[#f1f1f1] via-[#f1f1f1] to-[#f1f1f1] flex items-center justify-center p-3 shadow-xl border-2 border-purple-500/30 hover:scale-105 transition-transform duration-300">
										<img
											src={logoSmImg}
											alt="SKICST Logo"
											className="w-full h-full object-contain"
										/>
									</div>
								</div>
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

							{/* STEP 1: Registration details */}
							<div className={step === 1 ? "space-y-6" : "hidden"}>
								{/* Form Fields Grid */}
								<div className=" flex items-center justify-center">
									<ImageUpload
										className="size-32 flex items-center justify-center"
										label="Select Picture" name="avatar"

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
								<div className="space-y-2 mt-6 relative md:col-span-2">
									<div className="relative">
										<div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200 p-4">
											<div className="flex items-center gap-3 mb-4">
												<div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-full">
													<BookOpen className="w-5 h-5 text-white" />
												</div>
												<span className="text-gray-700 font-medium text-sm">Are you already a student of SK Institute?</span>
											</div>

											<div className="flex gap-6 ml-11">
												<label className={`flex items-center gap-2 cursor-pointer p-2 rounded-md transition-all duration-200 ${isSkStudent === 'on' ? 'bg-blue-100 border border-blue-300' : ''
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
													{isSkStudent === 'on' && <CheckCircle className="w-4 h-4 text-blue-600 ml-1" />}
												</label>

												<label className={`flex items-center gap-2 cursor-pointer p-2 rounded-md transition-all duration-200 ${isSkStudent === 'off' ? 'bg-blue-100 border border-blue-300' : ''
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
													{isSkStudent === 'off' && <CheckCircle className="w-4 h-4 text-blue-600 ml-1" />}
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
												Selection made: {isSkStudent === 'on' ? 'Existing Student' : 'New Student'}
											</span>
										</div>
									)}
								</div>

								{/* Proceed Button to Step 2 */}
								<div className="pt-6">
									<button
										type="button"
										onClick={() => {
											if (validateStep1()) {
												setStep(2);
												window.scrollTo(0, 0);
											}
										}}
										className="w-full h-14 text-lg font-bold rounded-xl shadow-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white hover:scale-102 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
									>
										<span>पेमेंट के लिए आगे बढ़ें (Proceed to Payment)</span>
										<ArrowRight className="w-5 h-5 animate-pulse" />
									</button>
								</div>
							</div>

							{/* STEP 2: Payment options and guidelines */}
							<div className={step === 2 ? "space-y-6" : "hidden"}>
								<div className="text-center pb-2">
									<h3 className="text-xl font-bold text-gray-800">
										रजिस्ट्रेशन शुल्क भुगतान (Registration Fee Payment)
									</h3>
									<p className="text-sm text-gray-500 mt-1">
										कृपया नीचे दिए गए QR कोड को स्कैन करके ₹80 का भुगतान करें
									</p>
								</div>

								<div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
									{/* Paytm Accepted Here card */}
									<div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-2xl border border-gray-200 shadow-xs max-w-sm w-full mx-auto">
										<div className="w-full bg-white rounded-xl border-4 border-[#00baf2] p-4 flex flex-col items-center relative overflow-hidden">
											{/* Paytm header logo */}
											<div className="flex flex-col items-center mb-3">
												<span className="text-[#002e6e] font-black text-3xl tracking-tighter">paytm</span>
												<span className="text-[9px] text-[#00baf2] font-extrabold uppercase tracking-wider -mt-2">Accepted Here</span>
											</div>

											{/* Amount display */}
											<div className="text-3xl font-black text-gray-900 mb-3 bg-gray-50 px-6 py-1.5 rounded-lg border border-gray-100">
												₹80
											</div>

											{/* QR Code image */}
											<div className="bg-white p-2 border-2 border-gray-100 rounded-lg shadow-sm mb-3">
												<img
													src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=paytmqr5gu35x@ptys%26pn=SKICST%26am=80%26cu=INR%26tn=KBC-2026"
													alt="UPI QR Code"
													className="w-44 h-44 object-contain"
												/>
											</div>

											{/* Direct UPI Payment Button for Mobile Users */}
											<a
												href="upi://pay?pa=paytmqr5gu35x@ptys&pn=SKICST&am=80&cu=INR&tn=KBC-2026"
												className="w-full bg-gradient-to-r from-[#00baf2] to-[#002e6e] hover:from-[#00baf2] hover:to-[#00285e] text-white font-bold py-2.5 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex flex-col items-center justify-center mb-3 text-xs text-center transform active:scale-[0.98]"
											>
												<div className="flex items-center gap-1.5 font-bold">
													<Smartphone className="w-4 h-4 animate-bounce" />
													<span>मोबाइल यूज़र: डायरेक्ट पेमेंट करें</span>
												</div>
												<span className="text-[10px] text-sky-100 font-normal">Click to Pay directly via UPI Apps</span>
											</a>

											{/* UPI ID with copy button */}
											<div
												onClick={handleCopyUpi}
												className="flex items-center gap-1.5 text-[11px] text-gray-600 font-mono bg-gray-50 px-2.5 py-1.5 rounded-md border border-gray-100 mb-3 select-all cursor-pointer hover:bg-gray-100 transition-colors"
											>
												<span>UPI ID: <strong className="text-gray-900">paytmqr5gu35x@ptys</strong></span>
												{isCopied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5 text-gray-400" />}
											</div>

											{/* BHIM UPI */}
											<div className="flex items-center gap-2 text-gray-400 text-xs font-bold border-t border-gray-100 pt-2.5 w-full justify-center">
												<span className="text-[#06336e] italic">BHIM</span>
												<span className="text-gray-300">|</span>
												<span className="text-[#e27329] italic">UPI</span>
											</div>
										</div>
									</div>

									{/* Rules & Guidelines */}
									<div className="space-y-4">
										<div className="bg-amber-50/70 border-2 border-amber-200/60 rounded-2xl p-5 space-y-4 shadow-xs">
											<h4 className="text-amber-900 font-bold text-base md:text-lg flex items-center gap-2">
												<Shield className="w-5 h-5 text-amber-600 shrink-0" />
												अनिवार्य नियम एवं निर्देश (Rules)
											</h4>

											<div className="space-y-3.5 text-gray-800 text-sm md:text-base leading-relaxed">
												{/* Payment screenshot rule */}
												<div className="flex items-start gap-3 bg-white p-3 rounded-xl border border-amber-100 shadow-xxs">
													<span className="flex items-center justify-center bg-amber-100 text-amber-800 font-extrabold text-sm w-6 h-6 rounded-full shrink-0 mt-0.5">1</span>
													<p className="text-gray-700 text-xs md:text-sm leading-relaxed">
														पेमेंट करने के बाद <strong>8840532253</strong>
														<a
															href="https://wa.me/918840532253?text=Hello%20SKICST,%20here%20is%20my%20KBC-2026%20registration%20payment%20screenshot."
															target="_blank"
															rel="noopener noreferrer"
															className="inline-flex items-center gap-1 bg-[#25d366]/10 text-[#128c7e] hover:bg-[#25d366]/20 font-bold px-2 py-0.5 rounded-md border border-[#25d366]/30 transition-colors mx-1"
															title="Send Screenshot to 8840532253 on WhatsApp"
														>
															<MessageCircle className="w-3.5 h-3.5 fill-[#128c7e] text-white" />
															<span>WhatsApp</span>
														</a>
														या <strong>9453360943</strong>
														<a
															href="https://wa.me/919453360943?text=Hello%20SKICST,%20here%20is%20my%20KBC-2026%20registration%20payment%20screenshot."
															target="_blank"
															rel="noopener noreferrer"
															className="inline-flex items-center gap-1 bg-[#25d366]/10 text-[#128c7e] hover:bg-[#25d366]/20 font-bold px-2 py-0.5 rounded-md border border-[#25d366]/30 transition-colors mx-1"
															title="Send Screenshot to 9453360943 on WhatsApp"
														>
															<MessageCircle className="w-3.5 h-3.5 fill-[#128c7e] text-white" />
															<span>WhatsApp</span>
														</a>
														पर पेमेंट स्क्रीनशॉट (Screenshot) का मैसेज भेजें (हरे रंग के WhatsApp बटन पर क्लिक करके सीधे भेज सकते हैं) या कॉल करके वेरिफाई कराएं।
														<span className="text-red-600 font-semibold block mt-1">
															⚠️ इसके बिना आपका फॉर्म भरा हुआ नहीं माना जाएगा और आप लॉगिन नहीं कर पाएंगे।
														</span>
													</p>
												</div>

												{/* Password rule */}
												<div className="flex items-start gap-3 bg-white p-3 rounded-xl border border-amber-100 shadow-xxs">
													<span className="flex items-center justify-center bg-amber-100 text-amber-800 font-extrabold text-sm w-6 h-6 rounded-full shrink-0 mt-0.5">2</span>
													<p className="text-gray-700 text-xs md:text-sm">
														कृपया अपना <strong>पासवर्ड सुरक्षित रखें और याद रखें</strong>। परीक्षा हॉल में पासवर्ड किसी से पूछना सख्त मना है।
														<span className="text-red-600 font-semibold block mt-1">
															⚠️ पासवर्ड भूल जाने (Forget) की स्थिति में आप दोबारा इसे रीसेट या फॉरगेट नहीं कर सकते।
														</span>
													</p>
												</div>
											</div>
										</div>
									</div>
								</div>

								{/* Payment confirmation checkbox */}
								<div className="flex items-start space-x-3 bg-purple-50/50 p-4 rounded-xl border border-purple-100 mt-4">
									<input
										type="checkbox"
										id="payment_confirmation"
										checked={paymentConfirmed}
										onChange={(e) => setPaymentConfirmed(e.target.checked)}
										className="w-5 h-5 text-purple-600 bg-gray-100 border-purple-300 rounded focus:ring-purple-500 focus:ring-2 mt-0.5 cursor-pointer accent-purple-600"
									/>
									<label htmlFor="payment_confirmation" className="text-xs md:text-sm text-gray-700 cursor-pointer select-none leading-snug">
										मैंने ₹80 का भुगतान कर दिया है और स्क्रीनशॉट निर्दिष्ट नंबरों (8840532253 / 9453360943) पर भेज दिया है/भेजने के लिए सहमत हूँ।
									</label>
								</div>

								{/* Action Buttons: Submit / Back */}
								<div className="flex flex-col sm:flex-row gap-4 pt-4">
									<button
										type="button"
										onClick={() => {
											setStep(1);
											window.scrollTo(0, 0);
										}}
										className="w-full sm:w-1/3 h-14 font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5"
									>
										<ArrowLeft className="w-4 h-4" />
										<span>पीछे जाएं (Back)</span>
									</button>
									<button
										type="submit"
										disabled={!paymentConfirmed || isLoading}
										className={`w-full sm:w-2/3 h-14 text-lg font-bold rounded-lg shadow-lg transition-all duration-300 transform relative overflow-hidden ${paymentConfirmed && !isLoading
											? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white hover:scale-102 hover:shadow-xl'
											: 'bg-gray-300 text-gray-500 cursor-not-allowed'
											}`}
									>
										<div className="relative flex items-center justify-center">
											{isLoading && <Loader2 className="w-5 h-5 mr-2 animate-spin" />}
											{isLoading ? 'Submitting...' : 'पंजीकरण पूर्ण करें (Submit Registration)'}
										</div>
									</button>
								</div>
							</div>

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