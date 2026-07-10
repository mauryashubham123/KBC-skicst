

import { useEffect, useState } from "react";
import { useAuth } from "@/Auth/AuthProvider";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import {
    Check,
    Copy,
    MessageCircle,
    Smartphone,
    ShieldAlert,
    PhoneCall,
    LogOut,
    RefreshCw,
    User,
    CheckCircle2
} from "lucide-react";

const PaymentPage = () => {
    const { user, refreshUser, handleLogout } = useAuth();
    const navigate = useNavigate();
    const [isCopied, setIsCopied] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);

    // Redirect to dashboard if the user is no longer pending
    useEffect(() => {
        if (user && user.role?.type !== "pending") {
            navigate("/dashboard");
        }
    }, [user, navigate]);

    const userName = user?.name || "";
    const userPhone = user?.phone || "";
    const userEmail = user?.email || "";

    const handleCopyUpi = () => {
        navigator.clipboard.writeText("paytmqr5gu35x@ptys");
        setIsCopied(true);
        toast.success("UPI ID copied to clipboard!");
        setTimeout(() => setIsCopied(false), 2000);
    };

    const handleRefreshStatus = async () => {
        setIsRefreshing(true);
        toast.loading("Verifying your payment status with the office...", { id: "refresh-status" });
        try {
            const updatedUser = await refreshUser();
            if (updatedUser && updatedUser.role?.type !== "pending") {
                toast.success("Payment verified successfully! Welcome to KBC 2026.", { id: "refresh-status" });
                navigate("/dashboard");
            } else {
                toast.info(
                    "Status is still pending. If you have sent the screenshot on WhatsApp, please wait for office verification.",
                    { id: "refresh-status", duration: 5000 }
                );
            }
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Failed to update status. Please try again later.", { id: "refresh-status" });
        } finally {
            setIsRefreshing(false);
        }
    };

    const getWhatsAppLink = (number: string) => {
        const message = `Hello SKICST, here is my KBC-2026 registration payment screenshot.

My Details:
• Name: ${userName}
• Contact: ${userPhone}
• Email: ${userEmail}`;
        return `https://wa.me/91${number}?text=${encodeURIComponent(message)}`;
    };

    return (
        <div className="flex flex-1 items-center justify-center p-3 sm:p-6 min-h-[calc(100vh-7rem)] bg-muted/10">
            <Card className="max-w-2xl w-full border border-border/80 shadow-lg rounded-xl overflow-hidden transition-all duration-300">

                {/* Header Section */}
                <CardHeader className="bg-amber-500/10 border-b border-amber-500/20 p-4 sm:p-5">
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300 border border-amber-200/50 dark:border-amber-900/50">
                                <ShieldAlert className="w-3.5 h-3.5" />
                                <span>भुगतान लंबित / Payment Pending</span>
                            </div>
                        </div>
                        <CardTitle className="text-xl font-black text-foreground">
                            रजिस्ट्रेशन शुल्क भुगतान (KBC-2026)
                        </CardTitle>

                        {/* Reassuring Notice Box */}
                        <div className="bg-blue-500/10 dark:bg-blue-500/5 border border-blue-200/60 dark:border-blue-900/40 rounded-lg p-3 text-xs text-blue-800 dark:text-blue-300 leading-relaxed shadow-xxs">
                            <p className="font-bold flex items-center gap-1.5 mb-1 text-blue-900 dark:text-blue-200">
                                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                                <span>पेमेंट कर चुके हैं? (Already Paid?)</span>
                            </p>
                            <p className="text-[11px]">
                                यदि आपने भुगतान कर दिया है और व्हाट्सएप पर स्क्रीनशॉट भेज दिया है, तो <strong>बिल्कुल भी घबराएं नहीं</strong>। आपका पैसा सुरक्षित है। स्क्रीनशॉट अपने पास सुरक्षित रखें और कार्यालय से संपर्क करें या सत्यापन हेतु कुछ समय प्रतीक्षा करें।
                            </p>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 sm:p-5">

                    {/* Left Column: Paytm QR Code & Payment Action */}
                    <div className="flex flex-col items-center justify-center space-y-3">
                        <div className="w-full bg-white dark:bg-slate-900 rounded-xl border-2 border-[#00baf2] p-3 flex flex-col items-center shadow-xs relative overflow-hidden">
                            {/* Paytm header logo */}
                            <div className="flex flex-col items-center mb-1">
                                <span className="text-[#002e6e] dark:text-sky-400 font-black text-xl sm:text-2xl tracking-tighter">paytm</span>
                                <span className="text-[8px] text-[#00baf2] font-black uppercase tracking-wider -mt-1">Accepted Here</span>
                            </div>

                            {/* Amount display */}
                            <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mb-2 bg-slate-50 dark:bg-slate-800 px-4 py-1 rounded-md border border-slate-100 dark:border-slate-700">
                                ₹80
                            </div>

                            {/* QR Code image */}
                            <div className="bg-white p-2 border border-slate-200 rounded-lg shadow-inner mb-3">
                                <img
                                    src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=paytmqr5gu35x@ptys%26pn=SKICST%26am=80%26cu=INR%26tn=KBC-2026"
                                    alt="UPI QR Code"
                                    className="w-28 h-28 sm:w-32 sm:h-32 object-contain"
                                />
                            </div>

                            {/* Direct UPI Payment Button for Mobile Users */}
                            <a
                                href="upi://pay?pa=paytmqr5gu35x@ptys&pn=SKICST&am=80&cu=INR&tn=KBC-2026"
                                className="w-full bg-gradient-to-r from-[#00baf2] to-[#002e6e] hover:from-[#00baf2] hover:to-[#00285e] text-white font-bold py-2 px-3 rounded-md shadow-xs hover:shadow transition-all duration-200 flex flex-col items-center justify-center mb-2 text-xs text-center"
                            >
                                <div className="flex items-center gap-1 font-bold text-[11px]">
                                    <Smartphone className="w-3.5 h-3.5 animate-bounce" />
                                    <span>मोबाइल यूज़र: डायरेक्ट पे करें</span>
                                </div>
                            </a>

                            {/* UPI ID with copy button */}
                            <div
                                onClick={handleCopyUpi}
                                className="flex items-center gap-1 text-[10px] text-slate-600 dark:text-slate-300 font-mono bg-slate-50 dark:bg-slate-800 px-2 py-1 rounded-md border border-slate-100 dark:border-slate-700 mb-1 select-all cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors w-full justify-center"
                            >
                                <span>UPI: <strong className="text-slate-900 dark:text-white">paytmqr5gu35x@ptys</strong></span>
                                {isCopied ? <Check className="w-3 h-3 text-green-600 dark:text-green-400" /> : <Copy className="w-3 h-3 text-slate-400" />}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: User Details & WhatsApp Verification */}
                    <div className="flex flex-col justify-between space-y-4">
                        {/* User Details Box */}
                        <div className="bg-muted/50 border rounded-lg p-3 space-y-2">
                            <h4 className="text-xs font-bold text-foreground/80 border-b pb-1 flex items-center gap-1.5">
                                <User className="w-3.5 h-3.5 text-primary" />
                                <span>आवेदक का विवरण / Applicant Details</span>
                            </h4>
                            <div className="space-y-1 text-xs">
                                <div className="flex items-center justify-between">
                                    <span className="text-muted-foreground">नाम / Name:</span>
                                    <span className="font-semibold text-foreground">{userName || "—"}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-muted-foreground">मोबाइल / Phone:</span>
                                    <span className="font-semibold text-foreground">{userPhone || "—"}</span>
                                </div>
                            </div>
                        </div>

                        {/* WhatsApp Verification Steps */}
                        <div className="space-y-2">
                            <h4 className="text-xs font-bold text-foreground/80 flex items-center gap-1.5">
                                <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                                <span>वेरिफिकेशन निर्देश (Steps)</span>
                            </h4>
                            <ul className="text-[11px] space-y-1.5 text-muted-foreground list-disc pl-4">
                                <li>QR स्कैन कर ₹80 का भुगतान करें व स्क्रीनशॉट लें।</li>
                                <li>नीचे व्हाट्सएप बटन से स्क्रीनशॉट शेयर करें।</li>
                                <li>पेमेंट वेरिफाई होने पर स्थिति जांचें बटन दबाएं।</li>
                            </ul>
                        </div>

                        {/* WhatsApp Share Buttons */}
                        <div className="space-y-2">
                            <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider block">
                                स्क्रीनशॉट भेजने के लिए संपर्क करें:
                            </span>
                            <div className="grid grid-cols-2 gap-2">
                                <a
                                    href={getWhatsAppLink("8840532253")}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center gap-1.5 bg-[#25d366] hover:bg-[#20ba5a] text-white font-bold py-2 px-2 rounded-md shadow-xs hover:shadow transition-colors text-[10px] sm:text-xs"
                                >
                                    <MessageCircle className="w-3.5 h-3.5 fill-white text-[#25d366]" />
                                    <span>WhatsApp 1</span>
                                </a>

                            </div>

                            <div className="flex items-center justify-center gap-1 text-[10px] text-muted-foreground mt-0.5">
                                <PhoneCall className="w-3 h-3 text-muted-foreground/75" />
                                <span>कॉल करें: 8840532253</span>
                            </div>
                        </div>
                    </div>
                </CardContent>

                {/* Footer Actions */}
                <CardFooter className="flex flex-row gap-3 border-t bg-muted/20 p-4 justify-between items-center">
                    <Button
                        variant="outline"
                        onClick={handleLogout}
                        className="h-9 px-3 text-xs text-destructive border-destructive/20 hover:bg-destructive/10 dark:hover:bg-destructive/20 gap-1.5"
                    >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>लॉगआउट</span>
                    </Button>

                    <Button
                        onClick={handleRefreshStatus}
                        disabled={isRefreshing}
                        className="h-9 px-3 text-xs bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold gap-1.5"
                    >
                        <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin" : ""}`} />
                        <span>Referesh</span>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default PaymentPage;