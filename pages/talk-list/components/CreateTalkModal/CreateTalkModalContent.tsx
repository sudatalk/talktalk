import { StyleSheet, View } from "react-native";
import CreateTalkModalHeader from "./CreateTalkModalHeader";
import CreateTalkModalTitle from "./CreateTalkModalTitle";
import CreateTalkModalTeam from "../CreateTalkModalTeam";
import CreateTalkModalDuration from "./CreateTalkModalDuration";
import { FormProvider, useForm } from "react-hook-form";
import { CREATE_TALK_FORM_DEFAULT_VALUES } from "../../constants/createTalkForm";
import { ON_SUBMIT } from "@/constants/form";
import CreateTalkModalButton from "./CreateTalkModalButton";

const CreateTalkModalContent = () => {
  const form = useForm({
    defaultValues: CREATE_TALK_FORM_DEFAULT_VALUES,
    mode: ON_SUBMIT,
    reValidateMode: ON_SUBMIT,
  });

  const handleSubmit = form.handleSubmit(
    (value) => {
      console.log("value : ", value);
    },
    (error) => {
      console.log("error : ", error);
    }
  );

  return (
    <FormProvider {...form}>
      <View style={styles.container}>
        <CreateTalkModalHeader />
        <View style={styles.bodyContainer}>
          <CreateTalkModalTitle />
          <CreateTalkModalTeam />
          <CreateTalkModalDuration />
        </View>
        <View style={styles.footerContainer}>
          <CreateTalkModalButton handleSubmit={handleSubmit} />
        </View>
      </View>
    </FormProvider>
  );
};

export default CreateTalkModalContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    padding: 10,
    paddingTop: 0,
  },

  bodyContainer: {
    flex: 0.7,
  },
  footerContainer: {
    flex: 0.15,

    alignItems: "center",
    justifyContent: "center",
  },
});
