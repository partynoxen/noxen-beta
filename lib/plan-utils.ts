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

export interface PlanEventData {
  id: string;
  title: string;
  date?: string;
  startTime?: string;
}

export interface EventPlan {
  event: PlanEventData;
  steps: PlanStep[];
  updatedAt: number;
}

const STORAGE_KEY = 'vybe_plan';

function addMinutes(date: Date, minutes: number): Date {
  return new Date(date.getTime() + minutes * 60000);
}

function setTime(baseDate: Date, timeStr: string): Date {
  const [h, m] = timeStr.split(':').map(Number);

  const date = new Date(baseDate);
  date.setHours(Number.isFinite(h) ? h : 22);
  date.setMinutes(Number.isFinite(m) ? m : 0);
  date.setSeconds(0);
  date.setMilliseconds(0);

  return date;
}

function generateId(): string {
  return Math.random().toString(36).slice(2, 10);
}

export function sortPlanSteps(steps: PlanStep[]): PlanStep[] {
  return [...steps].sort((a, b) => a.time.getTime() - b.time.getTime());
}

export function createEveningPlan(event: PlanEventData): EventPlan {
  const baseDate = event.date ? new Date(event.date) : new Date();

  const eventTime = event.startTime
    ? setTime(baseDate, event.startTime)
    : setTime(baseDate, '22:00');

  const steps: PlanStep[] = [
    {
      id: generateId(),
      type: 'meet',
      title: 'Treffen',
      description: 'Treffpunkt festlegen und Gruppe sammeln',
      time: addMinutes(eventTime, -180),
      isManualTime: false,
      completed: false,
    },
    {
      id: generateId(),
      type: 'food',
      title: 'Essen',
      description: 'Vorher entspannt essen gehen',
      time: addMinutes(eventTime, -150),
      isManualTime: false,
      completed: false,
    },
    {
      id: generateId(),
      type: 'taxi',
      title: 'Fahrt zur Party',
      description: 'Taxi oder Route planen',
      time: addMinutes(eventTime, -45),
      isManualTime: false,
      completed: false,
    },
    {
      id: generateId(),
      type: 'event',
      title: event.title,
      description: 'Party besuchen',
      time: eventTime,
      isManualTime: false,
      completed: false,
    },
    {
      id: generateId(),
      type: 'home',
      title: 'Heimweg',
      description: 'Rückfahrt organisieren',
      time: addMinutes(eventTime, 240),
      isManualTime: false,
      completed: false,
    },
  ];

  return {
    event,
    steps: sortPlanSteps(steps),
    updatedAt: Date.now(),
  };
}

export function updateStepTime(
  plan: EventPlan,
  stepId: string,
  timeValue: string
): EventPlan {
  const baseDate = plan.event.date ? new Date(plan.event.date) : new Date();
  const newTime = setTime(baseDate, timeValue);

  return {
    ...plan,
    steps: sortPlanSteps(
      plan.steps.map((step) =>
        step.id === stepId
          ? { ...step, time: newTime, isManualTime: true }
          : step
      )
    ),
    updatedAt: Date.now(),
  };
}

export function toggleStepCompleted(plan: EventPlan, stepId: string): EventPlan {
  return {
    ...plan,
    steps: plan.steps.map((step) =>
      step.id === stepId ? { ...step, completed: !step.completed } : step
    ),
    updatedAt: Date.now(),
  };
}

export function removePlanStep(plan: EventPlan, stepId: string): EventPlan {
  return {
    ...plan,
    steps: plan.steps.filter((step) => step.id !== stepId),
    updatedAt: Date.now(),
  };
}

export function savePlan(plan: EventPlan): void {
  if (typeof window === 'undefined') return;

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      ...plan,
      steps: plan.steps.map((s) => ({
        ...s,
        time: s.time.toISOString(),
      })),
    })
  );
}

export function loadPlan(): EventPlan | null {
  if (typeof window === 'undefined') return null;

  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw);

    return {
      ...parsed,
      steps: parsed.steps.map((s: any) => ({
        ...s,
        time: new Date(s.time),
      })),
    };
  } catch {
    return null;
  }
}

export function clearPlan(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}

export function formatPlanTime(date: Date): string {
  return date.toLocaleTimeString('de-DE', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function toTimeInputValue(date: Date): string {
  return `${String(date.getHours()).padStart(2, '0')}:${String(
    date.getMinutes()
  ).padStart(2, '0')}`;
}