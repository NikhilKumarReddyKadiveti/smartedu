
export enum UserRole {
  STUDENT = 'STUDENT',
  FACULTY = 'FACULTY'
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
  avatar: string;
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  timestamp: string;
  location: { lat: number; lng: number; name: string };
  photo: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
}

export interface TopicPerformance {
  id: string;
  subject: string;
  chapter: string;
  topic: string;
  subTopic: string;
  mastery: number; // 0 to 100
  lastAttemptScore: number;
}

export interface ClassStats {
  averageGpa: number;
  totalStudents: number;
  avgAttendance: number;
  strugglingTopics: string[];
}
