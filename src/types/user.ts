import { AddressType, AttendanceType, BatchType, DuefeeType, FollowupType, UserDetailsType } from "./typedef";

export type RoleType = {
    id: number;
    name: string;
    type: string;
    priority: number;
    [key: string]: any;
}
export type KbcEventType = {
    id: number;
    [key: string]: any;
}
export type UserType = {
    id: number;
    name: string;
    gender: string;
    dob: string;
    email: string;
    phone: string;
    password: string;
    avatar: string;
    role_id: number;
    role: RoleType;
    is_active: boolean;
    is_blocked: boolean;
    duefees?: DuefeeType[];
    addresses?:AddressType[];
    details?:UserDetailsType[];
    courses_enrolled_as_student?: CourseType[];
    courses_enrolled_as_monitor?: CourseType[];
    batches_assigned_as_student?: BatchType[];
    batches_assigned_as_monitor?: BatchType[];
    attendances?: AttendanceType[];
    [key: string]: any;
}
export type QuestionType = {
    id: number;
    name: string;
    gender: string;
    dob: string;
    email: string;
    phone: string;
    password: string;
    avatar: string;
    role_id: number;
    role: RoleType;
    is_active: boolean;
    is_blocked: boolean;
    duefees?: DuefeeType[];
    addresses?:AddressType[];
    details?:UserDetailsType[];
    courses_enrolled_as_student?: CourseType[];
    courses_enrolled_as_monitor?: CourseType[];
    batches_assigned_as_student?: BatchType[];
    batches_assigned_as_monitor?: BatchType[];
    attendances?: AttendanceType[];
    [key: string]: any;
}
export type CourseType = {
    id: number;
    code:string;
    name:string;
    section:string;
    type:string;
    min_eligibility:string;
    semesters:number;
    sem_duration_in_months:number;
    description:string;
    enquries?:EnquiryType[];
    [key: string]: any;
}
export type EnquiryType = {
    id: number;
    user_id: number,
    course_id: number,
    father_name: string,
    mother_name: string,
    qualification: string,
    whatsapp: string,
    address: string,
    address2: string,
    is_other_course: number,
    other_course_name: string,
    batch_preference: string,
    is_tryal_allowed: number,
    tryal_start_date: string,
    tryal_end_date: string,
    description: string,
    status: string,
    updated_by?: number,
    created_by?: number,
    visitor: UserType,
    updator?: UserType,
    creator?: UserType,
    course?: CourseType,
    followups?: FollowupType[];
    latest_followup?: FollowupType;
    [key: string]: any;
}