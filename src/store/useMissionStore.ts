import { create } from 'zustand';
import { Mission, MissionStatus } from '@/types/mission';
import {
  INITIAL_IN_PROGRESS_MISSIONS,
  INITIAL_RECOMMENDED_MISSIONS,
  INITIAL_COMPLETED_MISSIONS,
} from '@/data/mockMissions';

interface MissionStore {
  missions: Mission[];
  getMissionsByStatus: (status: MissionStatus) => Mission[];
  getMissionById: (id: string) => Mission | undefined;
  startMission: (missionId: string) => void;
  completeMission: (missionId: string) => void;
}

export const useMissionStore = create<MissionStore>((set, get) => ({
  missions: [
    ...INITIAL_RECOMMENDED_MISSIONS,
    ...INITIAL_IN_PROGRESS_MISSIONS,
    ...INITIAL_COMPLETED_MISSIONS,
  ],

  getMissionsByStatus: (status: MissionStatus) => {
    return get().missions.filter((mission) => mission.status === status);
  },

  getMissionById: (id: string) => {
    return get().missions.find((mission) => mission.id === id);
  },

  startMission: (missionId: string) => {
    set((state) => ({
      missions: state.missions.map((mission) =>
        mission.id === missionId
          ? {
              ...mission,
              status: 'in_progress' as MissionStatus,
              progress: 0,
            }
          : mission
      ),
    }));
  },

  completeMission: (missionId: string) => {
    set((state) => ({
      missions: state.missions.map((mission) =>
        mission.id === missionId
          ? {
              ...mission,
              status: 'completed' as MissionStatus,
              completedAt: new Date().toISOString().split('T')[0],
              progress: 1,
            }
          : mission
      ),
    }));
  },
}));
