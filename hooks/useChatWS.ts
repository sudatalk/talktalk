import { useCallback, useRef, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { WS_HOST } from "../services/host";
import { Team } from "@/types/chat";

export enum ChatEventType {
  MESSAGE = "MESSAGE",
  ROOM = "ROOM",
  ENTER = "ENTER",
}

type Params = { userId: string; roomId: number };

const RECONNECT_DELAY = 3000;
const QUEUE_LIMIT = 200;

export function useChatWS({ userId, roomId }: Params) {
  const [events, setEvents] = useState<any[]>([]);

  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const queueRef = useRef<string[]>([]);
  const isConnecting = useRef(false);
  const shouldReconnect = useRef(false); // 화면 포커스 중에만 true

  const clearReconnectTimer = () => {
    if (reconnectTimer.current) {
      clearTimeout(reconnectTimer.current);
      reconnectTimer.current = null;
    }
  };

  const scheduleReconnect = useCallback(() => {
    if (!shouldReconnect.current) return;
    clearReconnectTimer();
    reconnectTimer.current = setTimeout(() => {
      connect();
    }, RECONNECT_DELAY);
  }, []);

  const connect = useCallback(() => {
    if (!shouldReconnect.current || isConnecting.current || wsRef.current?.readyState === WebSocket.OPEN) return; // 포커스 아닐 때 차단
    isConnecting.current = true;

    const url = `${WS_HOST}/ws?userId=${encodeURIComponent(userId)}&chatId=${encodeURIComponent(roomId)}`;
    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen = () => {
      isConnecting.current = false;
      while (queueRef.current.length) {
        ws.send(queueRef.current.shift()!);
      }
    };

    ws.onmessage = (msg) => {
      try {
        const data = JSON.parse(msg.data);
        if (data.type === ChatEventType.MESSAGE || data.type === ChatEventType.ROOM || data.type === ChatEventType.ENTER) {
          setEvents((prev) => [data, ...prev]);
        }
      } catch (err) {
        console.warn("WebSocket parse error", err);
      }
    };

    ws.onerror = (err) => {
      console.warn("WebSocket error", err);
    };

    ws.onclose = () => {
      isConnecting.current = false;
      scheduleReconnect();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId, userId, scheduleReconnect]);

  const disconnect = useCallback(() => {
    shouldReconnect.current = false;
    clearReconnectTimer();
    wsRef.current?.close();
    wsRef.current = null;
    isConnecting.current = false;
  }, []);

  useFocusEffect(
    useCallback(() => {
      shouldReconnect.current = true;
      connect();

      return () => {
        disconnect();
      };
    }, [connect, disconnect])
  );

  const send = (payload: string) => {
    const ws = wsRef.current;
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(payload);
    } else {
      if (queueRef.current.length >= QUEUE_LIMIT) queueRef.current.shift();
      queueRef.current.push(payload);
    }
  }

  const sendMessage = useCallback((text: string) => {
    const trimmed = text?.trim();
    if (!trimmed) return false;
    const payloadObj = { type: ChatEventType.MESSAGE, data: trimmed };
    const payload = JSON.stringify(payloadObj);

    return send(payload);
  }, []);

  const sendRoomChange = useCallback((team: Team) => {
    const payloadObj = { type: ChatEventType.ROOM, data: team };
    const payload = JSON.stringify(payloadObj);

    return send(payload);
  }, []);

  return { events, sendMessage, sendRoomChange };
}
