import useApp from "./hooks/useApp";
import { MaintenanceStatus } from "./types/maintenance";
import appInfo from "./app.json";
import { StyleSheet, View } from "react-native";
import Text from "./components/Text";
import { Format, format } from "./utils/date";
import Footer from "./pages/talk/list/components/Footer";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import Popup from "./components/Popup";

type Props = {
  children: React.ReactNode;
};

const Maintenance = (props: Props) => {
  const { children } = props;

  const { data, refetch } = useApp();

  const { maintenance, version } = data || {};

  const currentVersion = appInfo.expo.version;

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [])
  );

  if (maintenance?.status === MaintenanceStatus.ON) {
    return (
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <Text white h3>
            현재 토크토크는 점검중 입니다
          </Text>
          <Text white h4>
            점검 예정 시간
          </Text>
          <Text white>
            {format(maintenance.startDateTime, Format["yyyy년 MM월 dd일 hh시 mm분"])} ~ {format(maintenance.endDateTime, Format["yyyy년 MM월 dd일 hh시 mm분"])}
          </Text>
        </View>
        <Footer />
      </View>
    );
  }

  return (
    <>
      {children}
      {version?.version && currentVersion !== version.version && (
        <Popup
          title="업데이트"
          content={
            <>
              <Text white center>
                새로운 토크토크 업데이트가 출시됐어요
              </Text>
              <Text white center>
                원활한 사용을 위해 업데이트를 진행해 주세요
              </Text>
            </>
          }
        />
      )}
    </>
  );
};

export default Maintenance;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  wrapper: {
    flex: 1,

    gap: 10,

    padding: 20,
    paddingBottom: 80,
  },
});
