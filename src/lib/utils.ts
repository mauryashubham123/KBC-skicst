import { type ClassValue, clsx } from "clsx"
import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function formatDate(
  date: Date | string | number,
  opts: Intl.DateTimeFormatOptions = {}
) {
  return new Intl.DateTimeFormat("en-US", {
    month: opts.month ?? "long",
    day: opts.day ?? "numeric",
    year: opts.year ?? "numeric",
    ...opts,
  }).format(new Date(date))
}

export const creators = ['community','admin'];
export const participators = ['participator'];

export function formatIndianNumber(number: string | number): string {
  let decimal = "";
  let numStr = number.toString();

  // Check for decimal part
  if (numStr.includes('.')) {
      const parts = numStr.split('.');
      numStr = parts[0];
      decimal = '.' + parts[1].substring(0, 2);  // Limiting to 2 decimal places
  }

  // If the number is less than 1,000, return as-is with the decimal part
  if (numStr.length <= 3) return numStr + decimal;

  // Get the last three digits
  const last3 = numStr.slice(-3);
  const rest = numStr.slice(0, -3);

  // Format the rest with pairs of digits
  const formatted = rest.replace(/\B(?=(\d{2})+(?!\d))/g, ',');
  return (formatted ? formatted + ',' : '') + last3 + decimal;
}

export function useUrlQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}




import { format, addMonths, isBefore, isEqual, startOfMonth, subYears, addYears } from 'date-fns';

type Option = {
  label: string;
  value: string;
};

export function generateMonthOptions(): Option[] {
  const today = new Date();
  const start = startOfMonth(subYears(today, 1)); // last year's current month
  const end = startOfMonth(addYears(today, 1));   // next year's current month

  const options: Option[] = [];
  let current = start;

  while (isBefore(current, end) || isEqual(current, end)) {
    options.push({
      label: format(current, "do MMMM yyyy"),    // e.g., "1st April 2025"
      value: format(current, "yyyy-MM-dd"),      // e.g., "2025-04-01"
    });

    current = addMonths(current, 1);
  }

  return options;
}

export function truncateString(str: string, limit: number): string {
  if (str.length <= limit) return str;
  return str.slice(0, limit).trimEnd() + '...';
}

/**
 * Interface for attendance data returned from the API
 */
export interface AttendanceData {
  attendance: UserWithAttendance[];
}

/**
 * Interface for user with attendance data
 */
export interface UserWithAttendance {
  id: number;
  name: string;
  email: string;
  phone: string;
  gender: string;
  avatar: string;
  role_id: number;
  username: string;
  attendances: {
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
  }[];
  pivot: {
    batch_id: number;
    user_id: number;
    user_type: string;
    start_date: string;
    end_date: string | null;
    status: string;
    session: string;
  };
  role: {
    id: number;
    name: string;
    type: string;
    priority: number;
  };
}

/**
 * Formats a date to YYYY-MM-DD format for API requests
 * @param date The date to format
 * @returns Formatted date string
 */
export function formatDateForApi(date: Date,type?:string): string {
  if(type=='YM'){
    const YMD =  format(date, 'yyyy-MM-dd').split('-');
    return YMD[0]+'-'+YMD[1];
  }
  return format(date, 'yyyy-MM-dd');
}

/**
 * Creates a map of user IDs to their attendance records
 * @param attendanceData The attendance data from the API
 * @returns A map of user IDs to attendance records
 */
export function createAttendanceRecordsMap(attendanceData: AttendanceData | null): Record<number, { status: string; remarks?: string }> {
  if (!attendanceData || !attendanceData.attendance || attendanceData.attendance.length === 0) {
    return {};
  }

  const recordsMap: Record<number, { status: string; remarks?: string }> = {};

  // Process each user's attendance data
  attendanceData.attendance.forEach(user => {
    // If user has attendance records for the selected date
    if (user.attendances && user.attendances.length > 0) {
      // Use the first attendance record (there should only be one per date)
      const attendance = user.attendances[0];
      recordsMap[user.id] = {
        status: attendance.status,
        remarks: '' // API doesn't seem to include remarks, so we set it to empty string
      };
    }
  });

  return recordsMap;
}