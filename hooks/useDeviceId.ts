import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

const DEVICE_ID_KEY = 'DEVICE_ID';

export function useDeviceId() {
  const [deviceId, setDeviceId] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      let id = await AsyncStorage.getItem(DEVICE_ID_KEY);
      if (!id) {
        id = uuid.v4();
        await AsyncStorage.setItem(DEVICE_ID_KEY, id);
      }

      setDeviceId(id);
    })();
  }, []);

  return deviceId;
}