import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { TextInputProps, textInputStyles } from "../TextInput";

// * KeyboardAvoidingView 대응 모달 TextInput 컴포넌트
const ModalTextInput = (props: TextInputProps) => {
  let style = {};

  Object.entries(props).forEach(([key, value]) => {
    if (key in textInputStyles) {
      if (value) {
        style = { ...style, ...textInputStyles[key as keyof typeof textInputStyles], ...textInputStyles["default"] };
      }
    }
  });

  return <BottomSheetTextInput style={style} {...props} />;
};

export default ModalTextInput;
