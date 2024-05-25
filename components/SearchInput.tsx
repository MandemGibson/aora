import { icons } from "@/constants";
import { useState } from "react";
import { View, Text, TouchableOpacity, Image, KeyboardTypeOptions } from "react-native";
import {
  GestureHandlerRootView,
  TextInput,
} from "react-native-gesture-handler";

type FormFieldProps = {
  title: string;
  value: string;
  otherStyles?: string;
  keyboardType?: KeyboardTypeOptions | undefined;
  placeholder?: string;
  handleChangeText: (text: string) => void;
};

const FormField = ({
  title,
  value,
  otherStyles,
  keyboardType,
  handleChangeText,
  ...props
}: FormFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text
        className="text-base text-gray-100
      font-pmedium"
      >
        {title}
      </Text>

      <GestureHandlerRootView
        className="border-2 border-black-200 w-full h-16
       px-4 bg-black-100 rounded-2xl focus:border-secondary
        items-center flex-row"
      >
        <TextInput
          className="flex-1 text-white font-psemibold text-base"
          value={value}
          placeholder={props.placeholder}
          placeholderTextColor="#7b7b8b"
          onChangeText={handleChangeText}
          keyboardType={keyboardType}
          secureTextEntry={title === "Password" && !showPassword}
        />

        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword((prev) => !prev)}>
            <Image
             source={!showPassword ? icons.eye : icons.eyeHide}
             className="w-6 h-6"
             resizeMode="contain"
              />
          </TouchableOpacity>
        )}
      </GestureHandlerRootView>
    </View>
  );
};

export default FormField;
