import logo from "@/assets/logo_sm_transparent.png"
import { EventType } from "@/types/typedef";
const WaitingIllustration = ({ event }: { event?: EventType }) => {
    return (
        <div className="">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Animated Calendar Pages */}
                <div className="absolute top-60 left-20 w-16 h-20 bg-white rounded-lg shadow-lg transform rotate-12 animate-bounce delay-300">
                    <div className="bg-red-500 h-4 rounded-t-lg"></div>
                    <div className="p-2 text-xs text-gray-600">
                        <div className="w-full h-1 bg-gray-200 rounded mb-1"></div>
                        <div className="w-3/4 h-1 bg-gray-200 rounded mb-1"></div>
                        <div className="w-1/2 h-1 bg-gray-200 rounded"></div>
                    </div>
                </div>

                {/* Clock Elements */}
                <div className="absolute top-60 right-32 w-12 h-12 border-4 border-amber-600 rounded-full animate-spin-slow">
                    <div className="absolute top-1 left-1/2 w-0.5 h-4 bg-amber-700 transform -translate-x-1/2 origin-bottom rotate-90"></div>
                    <div className="absolute top-2 left-1/2 w-0.5 h-3 bg-amber-900 transform -translate-x-1/2 origin-bottom rotate-180"></div>
                </div>

                {/* Floating Event Icons */}
                <div className="absolute top-1/4 left-1/4 animate-float delay-500">
                    <div className="w-8 h-8 bg-gradient-to-br from-amber-600 to-orange-700 rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-white text-xs">🍫</span>
                    </div>
                </div>

                <div className="absolute bottom-1/4 right-1/4 animate-float delay-700">
                    <div className="w-10 h-10 bg-gradient-to-br from-yellow-700 to-amber-800 rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-white text-sm">☕</span>
                    </div>
                </div>

                <div className="absolute top-1/2 left-1/3 animate-float delay-1000">
                    <div className="w-6 h-6 bg-gradient-to-br from-orange-600 to-red-700 rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-white text-xs">🧁</span>
                    </div>
                </div>

                {/* Ticket Stubs */}
                <div className="absolute bottom-32 left-32 transform rotate-45 animate-pulse delay-800">
                    <div className="w-20 h-8 bg-gradient-to-r from-amber-600 to-orange-700 rounded-r-lg relative">
                        <div className="absolute left-0 top-0 w-2 h-full bg-white rounded-l-lg"></div>
                        <div className="absolute left-1 top-1 w-16 h-1 bg-white/50 rounded"></div>
                        <div className="absolute left-1 bottom-1 w-12 h-1 bg-white/50 rounded"></div>
                    </div>
                </div>

                {/* Party Balloons */}
                <div className="absolute top-16 right-16 animate-sway">
                    <div className="relative">
                        <div className="w-4 h-6 bg-gradient-to-b from-amber-600 to-amber-800 rounded-full shadow-lg"></div>
                        <div className="w-0.5 h-8 bg-gray-400 mx-auto"></div>
                    </div>
                </div>

                <div className="absolute top-20 right-20 animate-sway delay-300">
                    <div className="relative">
                        <div className="w-4 h-6 bg-gradient-to-b from-orange-600 to-orange-800 rounded-full shadow-lg"></div>
                        <div className="w-0.5 h-8 bg-gray-400 mx-auto"></div>
                    </div>
                </div>

                {/* Confetti */}
                <div className="absolute top-10 left-1/2 w-2 h-2 bg-amber-600 transform rotate-45 animate-ping delay-1200"></div>
                <div className="absolute top-20 left-1/3 w-1 h-4 bg-orange-600 animate-bounce delay-1500"></div>
                <div className="absolute top-24 right-1/3 w-2 h-2 bg-yellow-700 rounded-full animate-ping delay-1800"></div>
            </div>

            {/* Main Waiting Content */}
            <div className="relative z-10 text-center max-w-md mx-auto">
                {/* Main Loading Animation */}
                <div className="mb-8">
                    <div className="relative w-32 h-32 mx-auto">
                        {/* Outer Ring */}
                        <div className="absolute inset-0 border-4 border-amber-200 rounded-full"></div>

                        {/* Animated Ring */}
                        <div className="absolute inset-0 border-4 border-transparent border-t-amber-700 border-r-amber-700 rounded-full animate-spin"></div>

                        {/* Inner Event Icon */}
                        <div className="absolute inset-4 bg-gradient-to-br from-white to-cyan-500 rounded-full flex items-center justify-center shadow-lg">
                            <img src={logo} className="w-12 h-12 text-white drop-shadow-lg aspect-square object-contain" />
                        </div>

                        {/* Orbiting Elements */}
                        <div className="absolute -inset-2">
                            <div className="relative w-full h-full animate-spin-reverse">
                                <div className="absolute top-0 left-1/2 w-3 h-3 bg-amber-600 rounded-full transform -translate-x-1/2 shadow-lg"></div>
                                <div className="absolute bottom-0 left-1/2 w-3 h-3 bg-orange-600 rounded-full transform -translate-x-1/2 shadow-lg"></div>
                                <div className="absolute left-0 top-1/2 w-3 h-3 bg-yellow-700 rounded-full transform -translate-y-1/2 shadow-lg"></div>
                                <div className="absolute right-0 top-1/2 w-3 h-3 bg-red-700 rounded-full transform -translate-y-1/2 shadow-lg"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Text Content */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4 animate-pulse">
                        Event Loading...
                    </h2>
                    <p className="text-gray-600 text-lg mb-6">
                      {event?.description?event?.description:"We're preparing something amazing for you!"}  
                    </p>

                    {/* Progress Dots */}
                    <div className="flex justify-center space-x-2 mb-6">
                        <div className="w-3 h-3 bg-amber-700 rounded-full animate-bounce"></div>
                        <div className="w-3 h-3 bg-amber-700 rounded-full animate-bounce delay-100"></div>
                        <div className="w-3 h-3 bg-amber-700 rounded-full animate-bounce delay-200"></div>
                    </div>

                    {/* Loading Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                        <div className="bg-gradient-to-r from-amber-700 to-orange-800 h-2 rounded-full animate-pulse w-3/4"></div>
                    </div>

                    <p className="text-sm text-gray-500">
                        Setting up your perfect event experience...
                    </p>
                </div>

                {/* Bottom Decorative Elements */}
                <div className="mt-8 flex justify-center space-x-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-amber-600 to-orange-700 rounded-lg rotate-45 animate-pulse delay-300"></div>
                    <div className="w-6 h-6 bg-gradient-to-br from-yellow-700 to-amber-800 rounded-full animate-bounce delay-600"></div>
                    <div className="w-8 h-8 bg-gradient-to-br from-orange-600 to-red-700 rounded-lg -rotate-45 animate-pulse delay-900"></div>
                </div>
            </div>

            {/* Custom Animations */}
            <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes sway {
          0%, 100% { transform: rotate(-5deg); }
          50% { transform: rotate(5deg); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-sway {
          animation: sway 2s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        .animate-spin-reverse {
          animation: spin-reverse 4s linear infinite;
        }
      `}</style>
        </div>
    );
};

export default WaitingIllustration;