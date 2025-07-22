import React from "react";
import { CourseType, EnquiryType, UserType } from "./user";

export type SortOrder = 'asc' | 'desc';

export type SortConfigType = {
    field: string;
    order: SortOrder;
}
export type ColumnStatusType<T> = {
    status: 'show'|'hide',
    iconise?: boolean,
    isSortable?:boolean,
    shortingKey?:keyof T,
    renderable?: (value:any,row:T,i?:number,) => React.ReactNode;
    headerClass?: string,
    dataClass?:string
}
export type ColumnFilterType<T> = {
    [K in keyof T]?: ColumnStatusType<T>;
};

export type BatchType = {
    id: number;
    name: string;
    period_type: string;
    days_of_week: number[];
    announce_date: string;
    start_time: string;
    end_time: string;
    users?:UserType[];
    [key: string]: any;
}

export type DuefeeType = {
    fee_id: number;
    user_id: number;
    title: string;
    activation_date: string;
    last_date_of_payment: string;
    amount: number;
    created_by: number;
    updated_by: number;
    fee?: FeeType;
    user?: UserType;
    creator?: UserType;
    updator?: UserType;
    feepayments?: FeePaymentType[];
    [key: string]: any;
}

export type FeePaymentType = {
    duefee_id: number;
    user_id: number;
    fee_id: number;
    discount: number;
    discount_type: string;
    amount: number;
    session: string;
    duefee?: DuefeeType;
    user: UserType;
    fee: FeeType;
    [key: string]: any;
}

export type FeeType = {
    course_id: number;
    name: string;
    amount: number;
    cool_of_period: number;
    fine_after_cool_of: number;
    frequency: string;
    created_by: number;
    updated_by: number;
    course?: CourseType;
    creator?: UserType;
    updator?: UserType;
    duefees?: DuefeeType;
    feepayments?: FeePaymentType;
    fee?:any;
    [key: string]: any;
}

export type TransactionType = {
    receipt_id : number;
    name : string;
    txn_type : string;
    amount : number;
    receipt : ReceiptType;
    [key: string]: any;
}

export type ReceiptType = {
    payer_id : number;
    payer_details : string;
    amount : number;
    payment_mode : string;
    status : string;
    txn_reference_id : string;
    receiver_details : string;
    received_by : number;
    transactions? : TransactionType[];
    payer?: UserType;
    receiver?: UserType;
    [key: string]: any;
}

export type AttendanceType = {
    id: number;
    user_id: number;
    batch_id: number;
    status: string;
    date: string;
    time_in: string | null;
    time_out: string | null;
    created_by: number;
    updated_by: number;
    created_at: string;
    updated_at: string;
    user?: UserType;
    batch?:BatchType;
    creator?:UserType;
    updator?:UserType;
    [key: string]: any;
}
export type FollowupType = {
    id: number;
    previous_followup_id? : number;
    enquiry_id  : number;
    user_id  : number;
    joining_date  : string;
    remark  : string;
    status  : string;
    followed_by  : string;
    enquiry?:EnquiryType;
    user?:UserType;
    followedBy?: UserType;
    previousFollowup?: FollowupType;
    [key: string]: any;
}

export type AddressType = {
    user_id: number;
    type: string;
    line_1: string;
    line_2?: string;
    city?: string;
    district?: string;
    state?: string;
    pin?: string;
    user?: UserType
    [key: string]: any;
}
export type UserDetailsType = {
    user_id: number;
    key:string;
    value: ValueType;
    created_by:number;
    updated_by:number;
    user : UserType;
    creator : UserType;
    updator : UserType;
    [key: string]: any;
}
export type ValueType = {
    text : string;
    image: string;
    file : string;
    url : string;
}

export type QuestionType = {
    id: string;
    correct_answer: string;
    points: number;
    difficulty: string;
    course?: string;
    subject?: string;
    topic?: string;
    options?:string[];
    body?: string;
    question?: string;
};