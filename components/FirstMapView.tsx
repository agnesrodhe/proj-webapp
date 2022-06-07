import { useState, useEffect, useRef } from "react";
import { Text, View, StyleSheet, ScrollView, Pressable } from "react-native";
import { Base } from '../styles';
import MapView from "react-native-maps";
import * as Location from 'expo-location';
import { Marker } from "react-native-maps";
import { Ionicons } from '@expo/vector-icons';


export default function TrainMap({ route, navigation }) {
    const [marker, setMarker] = useState(null);
    const [locationMarker, setLocationMarker] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [markerId, setMarkerId] = useState(null);
    const map = useRef(null);

    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();

            if (status !== 'granted') {
                setErrorMessage('Permission to access location was denied');
                return;
            }

            const currentLocation = await Location.getCurrentPositionAsync({});

            setLocationMarker(<Marker
                identifier="Min plats"
                coordinate={{
                    latitude: currentLocation.coords.latitude,
                    longitude: currentLocation.coords.longitude
                }}
                title="Min plats"
                pinColor="blue"
            />);
        })();
    }, []);

    function fitMarkers() {
        map.current.fitToSuppliedMarkers(["Min plats"], true)
    }

    return (
            <ScrollView contentContainerStyle={{ flex: 1 }} style={Base.base}>
                <View style={styles.container}>
                    <MapView
                        ref={map}
                        key={marker}
                        style={styles.map}
                        onMapReady={fitMarkers}
                        onMapLoaded={fitMarkers}
                        >
                        {locationMarker}
                    </MapView>
                    <Pressable style={{ ...Base.button1 }}onPress={async () => {
                        navigation.navigate("Lista");
                    }}>
                    <Ionicons name="location-sharp" size={19}>
                    <Ionicons name="location-sharp" size={30} />
                    </Ionicons>
                    <Text style={{ ...Base.iconText }}>     Hej, tryck här för att välja försening!</Text>
                </Pressable>
                </View>
            </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});