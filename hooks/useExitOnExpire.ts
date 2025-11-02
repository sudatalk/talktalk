import { useCallback, useEffect, useRef } from "react";
import { useFocusEffect } from "@react-navigation/native";

const MAX_TIMEOUT = 60 * 60 * 1000; // 최대 60분

export function useExitOnExpire(expiredAt: string | undefined, onExpire: () => void) {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clear = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const getRemainTime = () => {
    if (!expiredAt) return -1;
    const time = new Date(expiredAt).getTime();
    return time - Date.now();
  };

  const schedule = useCallback(() => {
    clear();
    const remain = getRemainTime();
    if (remain <= 0) {
      onExpire();
      return;
    }
    const delay = Math.min(remain, MAX_TIMEOUT);
    timeoutRef.current = setTimeout(onExpire, delay);
  }, [expiredAt, onExpire]);

  useEffect(() => {
    if (!expiredAt) return;
    schedule();
    return clear;
  }, [schedule]);

  useFocusEffect(
    useCallback(() => {
      const remain = getRemainTime();
      if (remain <= 0) onExpire();
      else schedule();
      return clear;
    }, [schedule])
  );
}
