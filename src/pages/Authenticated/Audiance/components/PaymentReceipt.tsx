import React from "react";
import { UserType } from "@/types/user";

interface PaymentReceiptProps {
    user: UserType;
    logoSrc: string;
}

export const PaymentReceipt: React.FC<PaymentReceiptProps> = ({ user, logoSrc }) => {
    const formattedDate = user?.created_at
        ? new Date(user.created_at).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true
        })
        : new Date().toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        });

    return (
        <div className="w-full max-w-sm mx-auto bg-white text-slate-950 p-4 font-mono text-[10px] sm:text-xs leading-normal">
            {/* Logo and Header */}
            <div className="text-center border-b border-dashed border-slate-400 pb-3 mb-3">
                <div className="w-12 h-12 mx-auto mb-1.5 flex items-center justify-center bg-slate-50 rounded-full border border-slate-200 p-1">
                    <img src={logoSrc} alt="SKICST Logo" className="w-full h-full object-contain" />
                </div>
                <h2 className="text-xs font-black tracking-tight uppercase text-slate-800">
                    S.K. Institute of Science & Technology
                </h2>
                <p className="text-[8px] text-slate-500 font-medium">Lalganj, Azamgarh, Uttar Pradesh</p>
                <p className="text-[10px] font-bold text-slate-700 mt-1 uppercase tracking-wide">
                    Kaun Banega Champion - 2026
                </p>
            </div>

            {/* Receipt Metadata */}
            <div className="space-y-1 border-b border-dashed border-slate-400 pb-3 mb-3 text-[10px]">
                <div className="flex justify-between">
                    <span className="text-slate-500">Receipt No:</span>
                    <span className="font-bold text-slate-850">KBC2026{user?.id}</span>
                </div>
                {/* <div className="flex justify-between">
                    <span className="text-slate-500">Date/Time:</span>
                    <span className="text-slate-850">{formattedDate}</span>
                </div> */}
                <div className="flex justify-between">
                    <span className="text-slate-500">Status:</span>
                    <span className="font-bold text-emerald-600 uppercase tracking-wider">★ SUCCESS / VERIFIED</span>
                </div>
            </div>

            {/* Candidate Details */}
            <div className="space-y-1 border-b border-dashed border-slate-400 pb-3 mb-3 text-[10px]">
                <h3 className="text-[8px] font-black uppercase text-slate-500 tracking-wider mb-0.5">
                    Candidate Information
                </h3>
                <div className="flex justify-between">
                    <span className="text-slate-500">Candidate ID:</span>
                    <span className="font-bold text-slate-850">{user?.id}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-slate-500">Name:</span>
                    <span className="font-bold text-slate-850 uppercase truncate max-w-[180px]">{user?.name}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-slate-500">Phone:</span>
                    <span className="text-slate-850">{user?.phone}</span>
                </div>
                {user?.email && (
                    <div className="flex justify-between">
                        <span className="text-slate-500">Email:</span>
                        <span className="text-slate-850 truncate max-w-[180px] text-[9px]">{user.email}</span>
                    </div>
                )}
            </div>

            {/* Event Schedule */}
            <div className="space-y-1 border-b border-dashed border-slate-400 pb-3 mb-3 bg-slate-50 p-2 rounded border border-slate-200 text-[10px]">
                <h3 className="text-[8px] font-black uppercase text-slate-500 tracking-wider mb-0.5">
                    Event Details
                </h3>
                <div className="flex justify-between">
                    <span className="text-slate-500">Reporting Date:</span>
                    <span className="font-bold text-slate-850">20 July 2026</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-slate-500">Reporting Time:</span>
                    <span className="font-bold text-slate-850">10:00 AM</span>
                </div>
                <div className="flex flex-col mt-0.5">
                    <span className="text-slate-500 text-[8px]">Venue:</span>
                    <span className="font-semibold text-slate-850 text-[9px] mt-0.5 leading-tight">
                        SKICST Campus, Lalganj
                    </span>
                </div>
            </div>

            {/* Payment Summary */}
            <div className="space-y-1 mb-4 text-[10px]">
                <div className="flex justify-between">
                    <span>Registration Fee:</span>
                    <span>₹80.00</span>
                </div>
                <div className="flex justify-between">
                    <span>Tax (CGST/SGST 0%):</span>
                    <span>₹0.00</span>
                </div>
                <div className="flex justify-between font-black border-t border-slate-400 pt-1.5 mt-1">
                    <span className="uppercase text-slate-850">Total Paid:</span>
                    <span className="text-slate-950">₹80.00</span>
                </div>
            </div>

            {/* Signatures */}
            <div className="flex justify-between text-[8px] border-t border-dashed border-slate-400 pt-3 mt-3 mb-1">
                <div className="text-center w-24">
                    <div className="h-5 border-b border-slate-400 mb-1"></div>
                    <span>Candidate Signature</span>
                </div>
                <div className="text-center w-28">
                    <div className="h-5 border-b border-slate-400 mb-1"></div>
                    <span>Authorized Signatory</span>
                </div>
            </div>

            {/* Instruction Footer */}
            <div className="text-center text-[7.5px] text-slate-400 mt-3 leading-normal">
                <p>This is a computer-generated receipt.</p>
                <p className="font-bold mt-0.5 text-slate-500">Please bring this receipt for entry to the exam hall.</p>
            </div>
        </div>
    );
};

export default PaymentReceipt;
