import { Button } from "@/components/ui/button";
import { pending_user } from "@/lib/helpers/api_urls";
import { useMutation } from "@tanstack/react-query";
import {
    Loader2,
    Wallet,
    Lock,
    CheckCircle2,
    AlertCircle,
    ShieldCheck,
    RefreshCw,
    Info
} from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/Auth/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const loadRazorpay = () => {
    return new Promise<boolean>((resolve) => {
        if ((window as any).Razorpay) {
            resolve(true);
            return;
        }
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });
};

const PaymentPage = () => {
    const { user, refreshUser } = useAuth();
    const navigate = useNavigate();

    const [paymentStep, setPaymentStep] = useState<'initial' | 'creating' | 'checkout' | 'verifying' | 'polling'>('initial');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    // Redirect if user role has already been upgraded (e.g. they refresh page after role upgrade)
    useEffect(() => {
        if (user && user.role?.type !== 'pending') {
            navigate('/dashboard');
        }
    }, [user, navigate]);

    // Polling effect after signature verification
    useEffect(() => {
        let intervalId: any;
        if (paymentStep === 'polling') {
            intervalId = setInterval(async () => {
                try {
                    const updatedUser = await refreshUser();
                    if (updatedUser && updatedUser.role?.type !== 'pending') {
                        toast.success("Account activated successfully!");
                        navigate('/dashboard');
                    }
                } catch (err) {
                    console.error("Error refreshing user state:", err);
                }
            }, 3000);
        }
        return () => {
            if (intervalId) clearInterval(intervalId);
        };
    }, [paymentStep, navigate, refreshUser]);

    // Mutation to create Razorpay Order
    const createOrderMutation = useMutation({
        mutationFn: () => pending_user.createOrder(),
        async onSuccess(res: any) {
            if (res.status === "true" || res.status === true) {
                const orderData = res.data;
                const sdkLoaded = await loadRazorpay();
                if (!sdkLoaded) {
                    toast.error("Failed to load Razorpay SDK. Please check your internet connection.");
                    setPaymentStep('initial');
                    return;
                }

                setPaymentStep('checkout');

                const options = {
                    key: orderData.key,
                    amount: orderData.amount,
                    currency: orderData.currency || "INR",
                    name: "KBC SKICST",
                    description: "Registration Payment",
                    order_id: orderData.order_id,
                    handler: async function (response: any) {
                        setPaymentStep('verifying');
                        const formData = new FormData();
                        formData.append('razorpay_order_id', response.razorpay_order_id);
                        formData.append('razorpay_payment_id', response.razorpay_payment_id);
                        formData.append('razorpay_signature', response.razorpay_signature);

                        verifySignatureMutation.mutate(formData);
                    },
                    prefill: {
                        name: orderData.user?.name || user?.name || "",
                        email: orderData.user?.email || user?.email || "",
                        contact: orderData.user?.phone || user?.phone || ""
                    },
                    theme: {
                        color: "#3b82f6"
                    },
                    modal: {
                        ondismiss: function () {
                            setPaymentStep('initial');
                            toast.warning("Payment cancelled by user.");
                        }
                    }
                };

                const rzp = new (window as any).Razorpay(options);
                rzp.on('payment.failed', function (response: any) {
                    setErrorMessage(response.error.description || "Payment failed. Please try again.");
                    setPaymentStep('initial');
                    toast.error(response.error.description || "Payment failed");
                });
                rzp.open();
            } else {
                toast.error(res.message || "Failed to initiate payment.");
                setPaymentStep('initial');
            }
        },
        onError(e: any) {
            const errorMsg = e?.response?.data?.message || e.message || "Failed to create payment order.";
            toast.error(errorMsg);
            setErrorMessage(errorMsg);
            setPaymentStep('initial');
        }
    });

    // Mutation to verify Signature
    const verifySignatureMutation = useMutation({
        mutationFn: (data: FormData) => pending_user.verifySignature(data),
        onSuccess(res: any) {
            if (res.status === "true" || res.status === true) {
                toast.success("Payment verified! Activating your account...");
                setPaymentStep('polling');
            } else {
                const errorMsg = res.message || "Verification failed.";
                toast.error(errorMsg);
                setErrorMessage(errorMsg);
                setPaymentStep('initial');
            }
        },
        onError(e: any) {
            const errorMsg = e?.response?.data?.message || e.message || "Failed to verify signature.";
            toast.error(errorMsg);
            setErrorMessage(errorMsg);
            setPaymentStep('initial');
        }
    });

    const handleProceedToPayment = () => {
        setErrorMessage(null);
        setPaymentStep('creating');
        createOrderMutation.mutate();
    };

    return (
        <div className="relative min-h-screen bg-slate-950 text-white flex items-center justify-center p-4 overflow-hidden">
            {/* Elegant Background Glow Effects */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse duration-[8000ms]" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse duration-[6000ms]" />

            <AnimatePresence mode="wait">
                {paymentStep === 'initial' || paymentStep === 'creating' || paymentStep === 'checkout' ? (
                    <motion.div
                        key="payment-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="w-full max-w-md bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 shadow-2xl relative z-10"
                    >
                        {/* Premium Card Header */}
                        <div className="flex flex-col items-center text-center mb-6">
                            <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-full mb-4">
                                <Lock className="w-6 h-6 text-blue-400" />
                            </div>
                            <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                                Secure Checkout
                            </h1>
                            <p className="text-sm text-slate-400 mt-2">Complete payment to activate your account</p>
                        </div>

                        {/* Error Message Alert */}
                        {errorMessage && (
                            <div className="flex items-start gap-3 bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-sm mb-6">
                                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-semibold text-left">Payment Issue</p>
                                    <p className="text-xs text-red-400/80 mt-1 text-left">{errorMessage}</p>
                                </div>
                            </div>
                        )}

                        {/* Payment Details Container */}
                        <div className="space-y-4 bg-slate-950/40 border border-slate-800/80 rounded-xl p-5 mb-6">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-400">Candidate Name</span>
                                <span className="font-medium text-slate-200">{user?.name || 'Loading...'}</span>
                            </div>

                            {user?.phone && (
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-slate-400">Phone Number</span>
                                    <span className="font-medium text-slate-200">{user.phone}</span>
                                </div>
                            )}

                            {user?.email && (
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-slate-400">Email Address</span>
                                    <span className="font-medium text-slate-200">{user.email}</span>
                                </div>
                            )}

                            <div className="border-t border-slate-800/80 my-2" />

                            <div className="flex justify-between items-end">
                                <div className="flex flex-col text-left">
                                    <span className="text-slate-400 text-xs flex items-center gap-1">
                                        Total Amount <Info className="w-3.5 h-3.5 text-slate-500" />
                                    </span>
                                    <span className="text-slate-500 text-xs mt-0.5">(Includes processing fees)</span>
                                </div>
                                <span className="text-3xl font-extrabold text-blue-400">₹82.40</span>
                            </div>
                        </div>

                        {/* Payment Actions */}
                        <Button
                            disabled={paymentStep === 'creating' || paymentStep === 'checkout'}
                            onClick={handleProceedToPayment}
                            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold py-6 rounded-xl transition duration-300 shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
                        >
                            {paymentStep === 'creating' || paymentStep === 'checkout' ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Initiating Checkout...
                                </>
                            ) : (
                                <>
                                    <Wallet className="w-5 h-5" />
                                    Pay ₹82.40 via Razorpay
                                </>
                            )}
                        </Button>

                        {/* Secure payment notes */}
                        <div className="flex items-center justify-center gap-2 mt-6 text-xs text-slate-500">
                            <ShieldCheck className="w-4 h-4 text-emerald-500" />
                            <span>100% Encrypted Transactions</span>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="processing-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="w-full max-w-md bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 shadow-2xl text-center relative z-10"
                    >
                        {/* Custom pulsing loading animation */}
                        <div className="relative w-24 h-24 mx-auto mb-8 flex items-center justify-center">
                            <span className="absolute inline-flex h-full w-full rounded-full bg-blue-400/10 opacity-75 animate-ping" />
                            <div className="w-16 h-16 rounded-full border-t-2 border-r-2 border-blue-500 animate-spin flex items-center justify-center">
                                <RefreshCw className="w-8 h-8 text-blue-400 animate-pulse" />
                            </div>
                        </div>

                        {/* Title dynamic status */}
                        <h2 className="text-xl font-bold mb-3 text-slate-100">
                            {paymentStep === 'verifying' ? 'Verifying Transaction' : 'Activating Account'}
                        </h2>

                        {/* Subtext description */}
                        <p className="text-sm text-slate-400 leading-relaxed px-4">
                            {paymentStep === 'verifying'
                                ? 'We are securely confirming your payment signature with Razorpay servers.'
                                : 'Payment successfully verified! Waiting for final account activation confirmation. Please do not close or reload this page.'
                            }
                        </p>

                        {/* Progress Steps List */}
                        <div className="mt-8 space-y-4 max-w-xs mx-auto text-left border-t border-slate-800/80 pt-6">
                            <div className="flex items-center gap-3">
                                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                <span className="text-sm font-medium text-slate-300">Payment Completed</span>
                            </div>
                            <div className="flex items-center gap-3">
                                {paymentStep === 'verifying' ? (
                                    <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />
                                ) : (
                                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                )}
                                <span className={`text-sm font-medium ${paymentStep === 'verifying' ? 'text-blue-400' : 'text-slate-300'}`}>
                                    Signature Verification
                                </span>
                            </div>
                            <div className="flex items-center gap-3">
                                {paymentStep === 'polling' ? (
                                    <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />
                                ) : (
                                    <div className="w-5 h-5 rounded-full border border-slate-700" />
                                )}
                                <span className={`text-sm font-medium ${paymentStep === 'polling' ? 'text-blue-400 animate-pulse' : 'text-slate-500'}`}>
                                    Profile Activation
                                </span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default PaymentPage;