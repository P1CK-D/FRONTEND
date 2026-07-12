export type MissionStatus = 'recommended' | 'in_progress' | 'completed';

export interface Mission {
  id: string;
  title: string;
  description: string;
  status: MissionStatus;
  category?: string;
  iconUrl?: string;
  progress?: number;
  deadline?: string;
  completedAt?: string;
  participants?: string[];
}

export interface MissionCategory {
  id: string;
  name: string;
  description?: string;
}

export const MISSION_STATUS_LABELS: Record<MissionStatus, string> = {
  recommended: '추천',
  in_progress: '진행중',
  completed: '완료',
};
