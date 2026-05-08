import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type PlanStepType = 'meet' | 'food' | 'taxi' | 'event' | 'home';

export interface PlanStep {
  id: string;
  type: PlanStepType;
  title: string;
  description: string;
  time: Date;
  isManualTime: boolean;
  completed: boolean;
}

export interface EventData {
  id: string;
  title: string;
  date?: string;
  startTime?: string;
}

export interface EventPlan {
  event: EventData;
  steps: PlanStep[];
  updatedAt: number;
}

const addMinutes = (date: Date, minutes: number) => {
  return new Date(date.getTime() + minutes * 60000);
};

const setTime = (baseDate: Date, timeStr: string) => {
  const [h, m] = timeStr.split(':').map(Number);
  const d = new Date(baseDate);
  d.setHours(h || 0);
  d.setMinutes(m || 0);
  d.setSeconds(0);
  d.setMilliseconds(0);
  return d;
};

const sortSteps = (steps: PlanStep[]) => {
  return [...steps].sort((a, b) => a.time.getTime() - b.time.getTime());
};

const generateId = () => Math.random().toString(36).substring(2, 9);

export function createEveningPlan(event: EventData): EventPlan {
  const baseDate = event.date ? new Date(event.date) : new Date();

  const eventTime = event.startTime
    ? setTime(baseDate, event.startTime)
    : setTime(baseDate, '22:00');

  const steps: PlanStep[] = [
    {
      id: generateId(),
      type: 'meet',
      title: 'Treffen',
      description: 'Treffpunkt festlegen',
      time: addMinutes(eventTime, -180),
      isManualTime: false,
      completed: false,
    },
    {
      id: generateId(),
      type: 'food',
      title: 'Essen',
      description: 'Restaurant auswählen',
      time: addMinutes(eventTime, -150),
      isManualTime: false,
      completed: false,
    },
    {
      id: generateId(),
      type: 'taxi',
      title: 'Fahrt',
      description: 'Taxi / Anfahrt planen',
      time: addMinutes(eventTime, -45),
      isManualTime: false,
      completed: false,
    },
    {
      id: generateId(),
      type: 'event',
      title: event.title,
      description: 'Event besuchen',
      time: eventTime,
      isManualTime: false,
      completed: false,
    },
    {
      id: generateId(),
      type: 'home',
      title: 'Heimweg',
      description: 'Rückfahrt planen',
      time: addMinutes(eventTime, 240),
      isManualTime: false,
      completed: false,
    },
  ];

  return {
    event,
    steps: sortSteps(steps),
    updatedAt: Date.now(),
  };
}

export function updateStepTime(
  plan: EventPlan,
  stepId: string,
  newTime: Date
): EventPlan {
  const updatedSteps = plan.steps.map((step) =>
    step.id === stepId
      ? {
          ...step,
          time: newTime,
          isManualTime: true,
        }
      : step
  );

  return {
    ...plan,
    steps: sortSteps(updatedSteps),
    updatedAt: Date.now(),
  };
}

const STORAGE_KEY = 'vybe_plan';

export function savePlan(plan: EventPlan) {
  if (typeof window === 'undefined') return;

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      ...plan,
      steps: plan.steps.map((step) => ({
        ...step,
        time: step.time.toISOString(),
      })),
    })
  );
}

export function loadPlan(): EventPlan | null {
  if (typeof window === 'undefined') return null;

  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;

  const parsed = JSON.parse(raw);

  return {
    ...parsed,
    steps: parsed.steps.map((step: any) => ({
      ...step,
      time: new Date(step.time),
    })),
  };
}