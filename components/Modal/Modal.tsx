import { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from "@gorhom/bottom-sheet";
import { useEffect, useRef } from "react";
import { StyleSheet } from "react-native";
import Backdrop from "./Backdrop";

const DEFAULT_SNAP_POINT = 0;

const SNAP_POINT = ["40%"];

type Props = {
  isOpen: boolean;
  handleClose: () => void;
  children: React.ReactNode;
};

const Modal = (props: Props) => {
  const { isOpen, handleClose, children } = props;

  const bottomSheetRef = useRef<BottomSheetModal>(null);

  useEffect(() => {
    if (!bottomSheetRef.current) return;

    if (isOpen) {
      bottomSheetRef.current.present();
    } else {
      bottomSheetRef.current.close();
    }
  }, [isOpen]);

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal ref={bottomSheetRef} index={DEFAULT_SNAP_POINT} enableDynamicSizing={false} onDismiss={handleClose} snapPoints={SNAP_POINT} backdropComponent={(props) => <Backdrop {...props} />}>
        <BottomSheetView style={styles.contentContainer}>{children}</BottomSheetView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

export default Modal;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
});
