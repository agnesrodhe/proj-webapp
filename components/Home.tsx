import { StatusBar } from 'expo-status-bar';
import { Text, ScrollView, Pressable, ImageBackground, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Base } from '../styles';
import { Ionicons } from '@expo/vector-icons';

export default function Home({ navigation }) {
    return (
        <SafeAreaView style={Base.container}>
            <ImageBackground source={require('./../assets/yellowFourth.jpg')} style={styles.image}>
            <Pressable style={{ ...Base.button1 }}onPress={async () => {
                        navigation.navigate("Lista");
                    }}>
                    <Ionicons name="location-sharp" size={19}>
                    <Ionicons name="location-sharp" size={30} />
                    </Ionicons>
                    <Text style={{ ...Base.iconText }}>     Hej, tryck här för att välja försening!</Text>
                </Pressable>
            </ImageBackground>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    image: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    text: {
        color: 'white',
        fontSize: 42,
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: '#000000a0',
    },
});