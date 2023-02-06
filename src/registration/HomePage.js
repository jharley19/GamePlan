import React from "react";
import { Text, View, TouchableOpacity} from "react-native";
import styles from './styles';
import { firebase } from "@react-native-firebase/auth";


export default function HomePage() {
    return (
   

        <View style={styles.addLeagueButtonContainerStyle}>
        
      <TouchableOpacity
        title="Press me"
        onPress={() => Alert.alert('Simple Button pressed')}>
            <Text>Add League</Text>
      </TouchableOpacity>

        </View>
 
    )
}