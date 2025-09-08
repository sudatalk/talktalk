import RNToast, { ErrorToast, ToastProps } from "react-native-toast-message";

const toastConfig = {
  error: (props: ToastProps) => (
    <ErrorToast
      {...props}
      style={{
        height: 40,

        backgroundColor: "white",

        borderLeftWidth: 0,
      }}
      text1Style={{
        fontSize: 14,
      }}
    />
  ),
};

const Toast = () => {
  return <RNToast config={toastConfig} />;
};

export default Toast;
