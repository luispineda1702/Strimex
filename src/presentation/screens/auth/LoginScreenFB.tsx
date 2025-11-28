import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import { TextInput } from "react-native-gesture-handler";

import { LoginUseCase } from "../../../domain/useCases/login.usecase";

export const LoginScreenFB = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const _onLoginPressed = async()=>{
        //const result = await LoginUseCase(email,password)
        //console.log("datos obtenidos",result);
    }
    return(
        <View>
            <Text>Login Screen Firebase</Text>
            <TextInput
                label="Correo elecetronico"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                label = "Contraseña"
                value={password}
                onChangeText={setPassword}
                //secureTextEntry
            />
            <Button 
                title="Iniciar sesión"
                onPress={_onLoginPressed}
            />
        </View>
    )
}