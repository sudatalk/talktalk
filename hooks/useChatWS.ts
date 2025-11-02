import { useEffect, useRef, useCallback, useState } from "react";
import { Platform } from "react-native";

export enum ChatEventType {
  MESSAGE = 'MESSAGE',
  ENTER = 'ENTER',
}

// TODO: 환경에 따라 변경
function wsHost() {
  if (Platform.OS === "android") return "10.0.2.2:8000"; // 에뮬레이터 → 호스트 맥
  return "localhost:8000"; // iOS 시뮬레이터/웹
}

export function useChatWS({ userId, roomId }: { userId: string; roomId: number }) {
  const [events, setEvents] = useState<any[]>([]);
  const wsRef = useRef<WebSocket | null>(null);
  const pendingQueue = useRef<string[]>([]);
  const reconnectTimer = useRef<NodeJS.Timeout | null>(null);

  const connect = useCallback(() => {
    if (wsRef.current) {
      wsRef.current.onclose = null;
      wsRef.current.close();
    }

    const url = `ws://${wsHost()}/ws?userId=${encodeURIComponent(userId)}&chatId=${encodeURIComponent(
      roomId
    )}`;
    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log("WebSocket connected");
      while (pendingQueue.current.length) {
        ws.send(pendingQueue.current.shift()!);
      }
    };

    ws.onmessage = (err) => {
      try {
        const msg = JSON.parse(err.data);
        if (msg?.type === ChatEventType.MESSAGE || msg?.type === ChatEventType.ENTER) {
          setEvents((prev) => [...prev, msg]);
        }
      } catch (err) {
        console.warn("WebSocket parse error", err);
      }
    };

    ws.onerror = (err) => {
      console.warn("WebSocket error", err);
    };

    ws.onclose = (err) => {
      console.log('WebSocket disconnected', err);
      if (reconnectTimer.current) clearTimeout(reconnectTimer.current);
      reconnectTimer.current = setTimeout(() => connect(), 2000);
    };
  }, [userId, roomId]);

  useEffect(() => {
    connect();
    return () => {
      if (reconnectTimer.current) clearTimeout(reconnectTimer.current);
      wsRef.current?.close();
    };
  }, [connect]);

  const sendMessage = useCallback((text: string, extra?: Record<string, any>) => {
    const trimmed = text?.trim();
    if (!trimmed) return false;

    const payloadObj = { message: trimmed, ...(extra ?? {}) };
    const payload = JSON.stringify(payloadObj);

    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(payload);
    } else {
      pendingQueue.current.push(payload);
    }

    // 낙관적 업데이트. TODO: 추후 삭제
    setEvents((prev) => [
      ...prev,
      { type: ChatEventType.MESSAGE, data: { message: trimmed, ...(extra ?? {}) } },
    ]);
    return true;
  }, []);

  return { events, sendMessage };
}
