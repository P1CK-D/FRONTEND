import { Mission } from '@/types/mission';

const ICON_RUN = require('@/assets/mdi_run.png');
const ICON_CLOCK = require('@/assets/icon.png');

export const INITIAL_IN_PROGRESS_MISSIONS: Mission[] = [
  {
    id: '1',
    title: '러닝 2km',
    description: '오늘 자정까지',
    status: 'in_progress',
    progress: 0.6,
    iconUrl: ICON_RUN,
    deadline: '2026-08-20',
  },
  {
    id: '2',
    title: '플래너 빈칸 채우기',
    description: 'D-1',
    status: 'in_progress',
    progress: 0.3,
    deadline: '2026-07-14',
  },
  {
    id: '3',
    title: '공부 타이머 1시간',
    description: '오늘 자정까지',
    status: 'in_progress',
    iconUrl: ICON_CLOCK,
    progress: 0.15,
    deadline: '2026-07-13',
  },
  {
    id: '4',
    title: 'SNS 사용 1시간 이내',
    description: '진행중',
    status: 'in_progress',
    progress: 0.8,
    deadline: '2026-07-13',
  },
];

export const INITIAL_RECOMMENDED_MISSIONS: Mission[] = [
  {
    id: 'r1',
    title: '독서 20분',
    description: '집중력 회복에 도움되는 활동',
    status: 'recommended',
    category: '집중력',
    deadline: '2026-07-20',
  },
  {
    id: 'r2',
    title: '명상 10분',
    description: '도파민 리셋 추천 미션',
    status: 'recommended',
    category: '도파민 리셋',
    deadline: '2026-07-20',
  },
  {
    id: 'r3',
    title: '스트레칭 5분',
    description: '앉아있는 시간이 길 때 추천',
    status: 'recommended',
    category: '건강',
    deadline: '2026-07-20',
  },
  {
    id: 'r4',
    title: '알림 끄고 1시간',
    description: 'SNS 절제 카테고리',
    status: 'recommended',
    category: 'SNS 절제',
    deadline: '2026-07-20',
  },
];

export const INITIAL_COMPLETED_MISSIONS: Mission[] = [
  {
    id: 'c1',
    title: '러닝 2km',
    description: '7월 5일 완료',
    status: 'completed',
    completedAt: '2026-07-05',
    iconUrl: ICON_RUN,
  },
  {
    id: 'c2',
    title: '플래너 빈칸 채우기',
    description: '7월 4일 완료',
    status: 'completed',
    completedAt: '2026-07-04',
  },
  {
    id: 'c3',
    title: '명상 10분',
    description: '7월 3일 완료',
    status: 'completed',
    completedAt: '2026-07-03',
  },
];

export const MISSION_DETAIL_DATA: Record<string, {
  fullDescription: string;
  participants: number;
}> = {
  '1': {
    fullDescription: '건강을 챙기는 습관을 만들고 싶은 당신,\n러닝 2km를 인증하면 습관 형성에 한발 더 가까워질 수 있어요.',
    participants: 24,
  },
  '2': {
    fullDescription: '플래너를 통해 하루를 계획하고 실천하는 습관을 만들어보세요.\n매일 조금씩 채워가는 즐거움을 느낄 수 있어요.',
    participants: 31,
  },
  '3': {
    fullDescription: '공부 시간을 기록하고 관리하세요.\n1시간씩 집중하다 보면 어느새 목표에 도달해 있을 거예요.',
    participants: 28,
  },
  '4': {
    fullDescription: 'SNS 사용 시간을 줄이고 더 생산적인 하루를 보내보세요.\n디지털 디톡스의 첫 걸음입니다.',
    participants: 19,
  },
  'r1': {
    fullDescription: '독서는 집중력 향상에 큰 도움이 됩니다.\n20분간 책을 읽으며 마음의 평화를 찾아보세요.',
    participants: 18,
  },
  'r2': {
    fullDescription: '명상을 통해 마음을 비우고 도파민 중독에서 벗어나보세요.\n10분이면 충분합니다.',
    participants: 32,
  },
  'r3': {
    fullDescription: '오랜 시간 앉아있었나요?\n간단한 스트레칭으로 몸과 마음을 풀어보세요.',
    participants: 15,
  },
  'r4': {
    fullDescription: 'SNS 알림을 끄고 1시간 동안 집중력을 되찾아보세요.\n생산성이 크게 향상될 거예요.',
    participants: 27,
  },
  'c1': {
    fullDescription: '건강을 챙기는 습관을 만들고 싶은 당신,\n러닝 2km를 인증하면 습관 형성에 한발 더 가까워질 수 있어요.',
    participants: 24,
  },
  'c2': {
    fullDescription: '플래너를 통해 하루를 계획하고 실천하는 습관을 만들어보세요.\n매일 조금씩 채워가는 즐거움을 느낄 수 있어요.',
    participants: 31,
  },
  'c3': {
    fullDescription: '명상을 통해 마음을 비우고 도파민 중독에서 벗어나보세요.\n10분이면 충분합니다.',
    participants: 32,
  },
};
