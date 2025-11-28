import AsyncStorage from "@react-native-async-storage/async-storage";

export class StorageAdapter{
    static async getItem(key:string){
        try{
            return await AsyncStorage.getItem(key);
        }catch(error){
            return null;
        }
    }
    static async setItem(key:string, value:string){
        try{
            return await AsyncStorage.setItem(key ,value);
        }catch(error){
            throw new Error("Error setting item in storage")
        }
    }
    static async removeItem(key:string){
        try{
            return await AsyncStorage.removeItem(key);
        }catch(error){
            throw new Error("Error removing item from storage")
        }
    }
}