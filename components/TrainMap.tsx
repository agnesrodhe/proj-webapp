import { useState, useEffect, useRef } from "react";
import { Text, View, StyleSheet, ScrollView, Pressable } from "react-native";
import { Base } from '../styles';
import MapView from "react-native-maps";
import * as Location from 'expo-location';
import { Marker } from "react-native-maps";
import stationModel from "../models/stations";
import { Ionicons } from '@expo/vector-icons';


export default function TrainMap({ route, navigation }) {
    const { delay } = route.params;
    const [marker, setMarker] = useState(null);
    const [locationMarker, setLocationMarker] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [markerId, setMarkerId] = useState(null);
    const [stationTo, setStationTo] = useState(null);
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

    useEffect(() => {
        (async () => {
            const results = await stationModel.getCoordinates(delay.stationFrom);
            const stationName = await stationModel.getStationNameFromSign(delay.stationFrom);
            const stationNameTo = await stationModel.getStationNameFromSign(delay.stationTo);
            setStationTo(stationNameTo);
            setMarkerId(stationName);
            setMarker(<Marker
                identifier={stationName}
                coordinate={{ latitude: parseFloat(results[1]), longitude: parseFloat(results[0]) }}
                title={`${stationName} -> ${stationNameTo}`}
                description={`Tåg ${delay.train} är ${delay.timeDifference} min sent`}
            />);
        })();
    }, []);

    function fitMarkers() {
        if (map?.current && marker) {
            map.current.fitToSuppliedMarkers([markerId, "Min plats"], true)
        }
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
                        {marker}
                        {locationMarker}
                    </MapView>
                    <Pressable style={{ ...Base.button2 }}onPress={async () => {
                        navigation.navigate("Karta");
                    }}>
                    <Text style={Base.backText}>Till    <Text style={Base.backTextNotItalic}>{stationTo}</Text>{"\n"}{delay.timeDifference} minuter försenat</Text>
                    <Ionicons name="close-circle" size={20} />
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