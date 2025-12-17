import { useEffect, useRef } from 'react';
import { deleteTask } from '@/store/slices/taskSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

const EIGHT_HOURS_MS = 8 * 60 * 60 * 1000;

export function useTaskCleanup() {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) => state.tasks.tasks);
  const didRunRef = useRef(false);

  useEffect(() => {
    // Only run on client side to prevent hydration mismatches
    if (typeof window === 'undefined') {
      return;
    }

    if (didRunRef.current) {
      return;
    }

    didRunRef.current = true;
    const now = Date.now();

    tasks.forEach((task) => {
      const timestamp = task.lastUpdatedAt ?? task.createdAt;
      if (!timestamp) {
        return;
      }

      const age = now - new Date(timestamp).getTime();
      if (Number.isNaN(age)) {
        return;
      }

      if (age > EIGHT_HOURS_MS) {
        dispatch(deleteTask(task.id));
      }
    });
  }, [dispatch, tasks]);
}
