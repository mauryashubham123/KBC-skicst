import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { Eye, EyeOff, Loader2, Trophy, Crown, Lightbulb, Star, Gem, Award, Target } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/logo_sm_transparent.png"
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/Auth/AuthProvider";
export function LoginForm({
	className,
	...props
}: React.ComponentPropsWithoutRef<"form">) {
	const {handleLogin,isLoading} = useAuth();
	const [showPassword, setShowPassword] = useState(false);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const formData = new FormData(e.currentTarget);
		handleLogin(formData);
	}
	const handleRegistorPage=()=>{
		navigate('/register-form',{ replace: true});
      	window.scrollTo(0, 0);
	}

	// SKICST text positions - multiple scattered elements
	const skicstTexts = [
		{ top: '15%', left: '8%', rotation: '-15deg', opacity: '0.08', size: 'text-2xl' },
		{ top: '25%', right: '12%', rotation: '20deg', opacity: '0.12', size: 'text-xl' },
		{ top: '35%', left: '5%', rotation: '10deg', opacity: '0.10', size: 'text-3xl' },
		{ top: '45%', right: '8%', rotation: '-25deg', opacity: '0.09', size: 'text-lg' },
		{ top: '55%', left: '12%', rotation: '35deg', opacity: '0.11', size: 'text-2xl' },
		{ top: '65%', right: '15%', rotation: '-10deg', opacity: '0.08', size: 'text-xl' },
		{ top: '75%', left: '6%', rotation: '25deg', opacity: '0.10', size: 'text-2xl' },
		{ top: '85%', right: '10%', rotation: '-20deg', opacity: '0.09', size: 'text-3xl' },
		{ top: '20%', left: '75%', rotation: '15deg', opacity: '0.07', size: 'text-xl' },
		{ top: '40%', left: '80%', rotation: '-30deg', opacity: '0.11', size: 'text-lg' },
		{ top: '60%', left: '78%', rotation: '40deg', opacity: '0.08', size: 'text-2xl' },
		{ top: '80%', left: '72%', rotation: '-15deg', opacity: '0.10', size: 'text-xl' },
		{ top: '10%', left: '45%', rotation: '20deg', opacity: '0.06', size: 'text-4xl' },
		{ top: '90%', left: '50%', rotation: '-40deg', opacity: '0.09', size: 'text-2xl' },
		{ top: '70%', left: '40%', rotation: '30deg', opacity: '0.07', size: 'text-xl' },
	];

	return (
		<div className="min-h-screen w-full bg-gradient-to-br from-amber-900 via-yellow-900 to-orange-900 relative overflow-hidden">
			{/* Chocolate/Golden Background with Illustrations */}
			<div className="absolute inset-0">
				{/* Large background shapes */}
				<div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-yellow-600/30 to-orange-700/20 rounded-full blur-3xl transform translate-x-32 -translate-y-32"></div>
				<div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-amber-700/30 to-yellow-800/20 rounded-full blur-3xl transform -translate-x-32 translate-y-32"></div>
				<div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-orange-600/20 to-amber-600/20 rounded-full blur-2xl transform -translate-x-1/2 -translate-y-1/2"></div>

				{/* SKICST Background Text - Multiple scattered instances */}
				{skicstTexts.map((item, index) => (
					<div
						key={index}
						className="absolute font-bold text-white select-none pointer-events-none"
						style={{
							top: item.top,
							left: item.left,
							right: item.right,
							opacity: item.opacity,
							transform: `rotate(${item.rotation})`,
							fontSize: item.size === 'text-xl' ? '1.25rem' : 
									  item.size === 'text-2xl' ? '1.5rem' :
									  item.size === 'text-3xl' ? '1.875rem' :
									  item.size === 'text-4xl' ? '2.25rem' : '1.125rem'
						}}
					>
						SKICST
					</div>
				))}

				{/* Floating Game Show Elements */}
				<div className="absolute top-20 left-10 animate-float">
					<div className="relative">
						<Lightbulb className="w-12 h-12 text-yellow-400/80 drop-shadow-lg" />
						<div className="absolute -inset-2 bg-yellow-400/20 rounded-full blur-md"></div>
					</div>
				</div>

				<div className="absolute top-32 right-16 animate-float-delayed">
					<div className="relative">
						<Trophy className="w-16 h-16 text-amber-400/80 drop-shadow-xl" />
						<div className="absolute -inset-3 bg-amber-400/20 rounded-full blur-lg"></div>
					</div>
				</div>

				<div className="absolute bottom-40 left-20 animate-float-slow">
					<div className="relative">
						<Gem className="w-10 h-10 text-orange-400/80 drop-shadow-lg" />
						<div className="absolute -inset-2 bg-orange-400/20 rounded-full blur-md"></div>
					</div>
				</div>

				<div className="absolute bottom-20 right-32 animate-float">
					<div className="relative">
						<Award className="w-14 h-14 text-yellow-500/80 drop-shadow-xl" />
						<div className="absolute -inset-3 bg-yellow-500/20 rounded-full blur-lg"></div>
					</div>
				</div>

				<div className="absolute top-1/2 left-16 animate-float-delayed">
					<div className="relative">
						<Target className="w-8 h-8 text-amber-500/70 drop-shadow-md" />
						<div className="absolute -inset-2 bg-amber-500/20 rounded-full blur-sm"></div>
					</div>
				</div>

				{/* Quiz-style question bubbles illustration */}
				<div className="absolute top-40 left-1/4 opacity-10">
					<div className="w-32 h-20 bg-white/20 rounded-2xl border border-white/30 flex items-center justify-center">
						<span className="text-white text-xs font-medium">Question 1</span>
					</div>
				</div>

				<div className="absolute bottom-60 right-1/4 opacity-10">
					<div className="w-28 h-16 bg-white/20 rounded-xl border border-white/30 flex items-center justify-center">
						<span className="text-white text-xs font-medium">₹1 Crore</span>
					</div>
				</div>

				{/* Decorative stars and sparkles */}
				{[...Array(15)].map((_, i) => (
					<Star
						key={i}
						className={`absolute w-4 h-4 text-yellow-400/60 animate-pulse`}
						style={{
							top: `${Math.random() * 100}%`,
							left: `${Math.random() * 100}%`,
							animationDelay: `${Math.random() * 3}s`,
							transform: `scale(${0.5 + Math.random() * 0.8})`
						}}
					/>
				))}
			</div>

			{/* Main Content */}
			<div className="relative z-10 flex items-center justify-center min-h-screen p-6">
				<div className="w-full max-w-lg">
					{/* Login Card */}
					<div className="bg-gradient-to-b from-amber-50/95 to-orange-50/95 backdrop-blur-xl border border-amber-200/50 rounded-3xl p-8 shadow-2xl">
						{/* Header */}
						<div className="text-center mb-8">
							<div className="relative inline-flex items-center justify-center w-24 h-24 mb-6">
								<div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-orange-600 rounded-full animate-pulse"></div>
								<div className="relative bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full p-4 shadow-xl">
									{/* <Crown className="w-12 h-12 text-white drop-shadow-lg" /> */}
									<img src={logo} className="w-12 h-12 text-white drop-shadow-lg aspect-square object-contain" />
								</div>
								{/* Crown rays */}
								<div className="absolute -inset-6 opacity-30">
									{[...Array(8)].map((_, i) => (
										<div
											key={i}
											className="absolute w-1 h-6 bg-gradient-to-t from-transparent to-yellow-400"
											style={{
												transform: `rotate(${i * 45}deg)`,
												transformOrigin: 'bottom center',
												top: '0',
												left: '50%',
												marginLeft: '-2px'
											}}
										/>
									))}
								</div>
							</div>

							<h1 className="text-xl md:text-4xl font-bold bg-gradient-to-r from-amber-800 via-orange-700 to-amber-900 bg-clip-text text-transparent mb-1">
								Kaun Banega Champion
							</h1>
							<p className="text-amber-700/80 text-sm font-medium">
								Login to your account to become the ultimate champion
							</p>
						</div>

						{/* Form */}
						<form onSubmit={handleSubmit} className={cn("space-y-6", className)} {...props}>
							{/* Username field */}
							<div className="space-y-2">
								<Label htmlFor="username" className="text-amber-800 font-semibold text-sm">
									Email or Phone Number
								</Label>
								<div className="relative">
									<Input
										disabled={isLoading}
										name="username"
										id="username"
										type="text"
										placeholder="Enter your email or phone number"
										required
										value={username}
										onChange={(e) => setUsername(e.target.value)}
										className="bg-white/80 border-2 border-amber-200 focus:border-amber-400 focus:ring-amber-400/20 rounded-xl h-12 text-amber-900 placeholder:text-amber-600/60 font-medium"
									/>
								</div>
							</div>

							{/* Password field */}
							<div className="space-y-2">
								<div className="flex items-center justify-between">
									<Label htmlFor="password" className="text-amber-800 font-semibold text-sm">
										Password
									</Label>
									<button
										type="button"
										className="text-orange-600 text-sm hover:text-orange-700 transition-colors font-medium"
									>
										Forgot your password?
									</button>
								</div>
								<div className="relative">
									<Input
										disabled={isLoading}
										name="password"
										id="password"
										type={showPassword ? "text" : "password"}
										placeholder="Enter your password"
										required
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										className="bg-white/80 border-2 border-amber-200 focus:border-amber-400 focus:ring-amber-400/20 rounded-xl h-12 text-amber-900 placeholder:text-amber-600/60 font-medium pr-12"
									/>
									<Button
										type="button"
										variant="ghost"
										size="icon"
										className="absolute right-0 top-0 h-12 w-12 hover:bg-amber-100 text-amber-600 hover:text-amber-700"
										onClick={() => setShowPassword(!showPassword)}
										disabled={isLoading}
									>
										{showPassword ? (
											<EyeOff className="h-5 w-5" />
										) : (
											<Eye className="h-5 w-5" />
										)}
										<span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
									</Button>
								</div>
							</div>

							{/* Login button */}
							<Button
								disabled={isLoading}
								className="w-full h-14 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:via-orange-600 hover:to-amber-700 text-white font-bold text-lg rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-2 border-amber-400"
							>
								{isLoading && <Loader2 className="size-6 mr-3 inline animate-spin" />}
								{isLoading ? "Starting the Game..." : "Start Playing"}
							</Button>

							{/* Sign up link */}
							<div className="text-center pt-4">
								<span className="text-amber-700/80 text-sm">
									Don't have an account?{" "}
								</span>
								<button
									type="button"
									onClick={handleRegistorPage}
									className="text-orange-600 hover:text-orange-700 font-bold text-sm transition-colors"
								>
									Sign up here
								</button>
							</div>
						</form>
					</div>

					{/* Bottom decorative elements */}
					<div className="flex justify-center space-x-6 mt-2">
						<div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
							<Star className="w-4 h-4 text-yellow-400" />
							<span className="text-white/90 text-[7px] md:text-xs font-medium">Win Big</span>
						</div>
						<div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
							<Crown className="w-4 h-4 text-amber-400" />
							<span className="text-white/90 text-[7px]  md:text-xs font-medium">Be Champion</span>
						</div>
						<div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
							<Trophy className="w-4 h-4 text-orange-400" />
							<span className="text-white/90 text-[7px] md:text-xs font-medium">Glory</span>
						</div>
					</div>
				</div>
			</div>

			{/* Custom animations */}
			<style>{`
				@keyframes float {
					0%, 100% { transform: translateY(0px); }
					50% { transform: translateY(-20px); }
				}
				@keyframes float-delayed {
					0%, 100% { transform: translateY(0px); }
					50% { transform: translateY(-15px); }
				}
				@keyframes float-slow {
					0%, 100% { transform: translateY(0px); }
					50% { transform: translateY(-10px); }
				}
				.animate-float {
					animation: float 3s ease-in-out infinite;
				}
				.animate-float-delayed {
					animation: float-delayed 4s ease-in-out infinite 0.5s;
				}
				.animate-float-slow {
					animation: float-slow 5s ease-in-out infinite 1s;
				}
			`}</style>
		</div>
	)
}