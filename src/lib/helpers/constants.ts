
export const ROLE_TYPES = [
    "super_admin",
    "admin",
    "manager",
    "staff",
    "vendor",
    "driver",
    "client",
    "student",
    "member",
    "visitor",
]

export const PAYMENT_MODES = [
    'cash',
    'upi',
    'other',
    'online',
    'cheque',
    'gateway',
]

export const CLIENT_SIZES = [
    {label:'Big Client',value:'big'},
    {label:'Small Client',value:'small'},
    {label:'Medium Client',value:'medium'},
    {label:'Misclenious Client',value:'misc'},
]

export const days_of_week = [
    {
        full:'sunday',
        short:'sun',
        i:0,
    },
    {
        full:'monday',
        short:'mon',
        i:1,
    },
    {
        full:'tuesday',
        short:'tue',
        i:2
    },
    {
        full:'wednesday',
        short:'wed',
        i:3
    },
    {
        full:'thursday',
        short:'thu',
        i:4
    },
    {
        full:'friday',
        short:'fri',
        i:5
    },
    {
        full:'saturday',
        short:'sat',
        i:6
    },
]

const FREQUENCY_ONETIME = 'one-time';
const FREQUENCY_MONTHLY = 'monthly';
const FREQUENCY_YEARLY = 'yearly';
const FREQUENCY_SEMESTERWISE = 'semester-wise';

export const FREQUENCY_LIST = [
    FREQUENCY_ONETIME,
    FREQUENCY_MONTHLY,
    FREQUENCY_YEARLY,
    FREQUENCY_SEMESTERWISE,
];

export const tableStyles = {
    tableWrapper: "relative max-h-[calc(100vh-300px)] overflow-y-auto", // Added max-height and overflow-y
    table: "w-full",
    stickyHeader: "sticky top-0 bg-background z-1", // Added for sticky header
    stickyColumn: "text-center sticky right-0 bg-background/50 backdrop-blur-sm z-10 after:absolute after:top-0 after:left-[-4px] after:bottom-0 after:w-[4px] after:shadow-[inset_-4px_0_4px_-4px_rgba(0,0,0,0.1)]",
    stickyColumnHeader: "sticky right-0 bg-background/50 backdrop-blur-sm z-10 after:absolute after:top-0 after:left-[-4px] after:bottom-0 after:w-[4px] after:shadow-[inset_-4px_0_4px_-4px_rgba(0,0,0,0.1)]"
};

// Attendance status constants
export const ATTENDANCE_STATUS = {
    PRESENT: 'present',
    ABSENT: 'absent',
    LEAVE: 'leave'
};

export const ATTENDANCE_STATUS_LIST = [
    ATTENDANCE_STATUS.PRESENT,
    ATTENDANCE_STATUS.ABSENT,
    ATTENDANCE_STATUS.LEAVE
];

export const ATTENDANCE_STATUS_VARIANTS = {
    [ATTENDANCE_STATUS.PRESENT]: "bg-emerald-100 text-emerald-800 border-emerald-200",
    [ATTENDANCE_STATUS.ABSENT]: "bg-red-100 text-red-800 border-red-200",
    [ATTENDANCE_STATUS.LEAVE]: "bg-amber-100 text-amber-800 border-amber-200"
};

// Receipt status constants
export const RECEIPT_STATUS = {
    PENDING: 'pending',
    PAID: 'paid'
};

export const RECEIPT_STATUS_LIST = [
    RECEIPT_STATUS.PENDING,
    RECEIPT_STATUS.PAID
];

export const ADDRESS_TYPES = {
    CURRENT : 'current',
    PERMANENT : 'permanent',
    HOME : 'home',
    OFFICE : 'office',
    WORK : 'work',
    OTHER : 'other',
}
export const ADDRESS_TYPE_LIST = [
    ADDRESS_TYPES.CURRENT,
    ADDRESS_TYPES.PERMANENT,
    ADDRESS_TYPES.HOME,
    ADDRESS_TYPES.OFFICE,
    ADDRESS_TYPES.WORK,
    ADDRESS_TYPES.OTHER,
]