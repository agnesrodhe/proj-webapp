import { Text, ScrollView, Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Base } from '../styles';
import { useEffect, useState } from 'react';
import delaysModel from "./../models/delayed";
import stationsModel from "./../models/stations";
import { Ionicons } from '@expo/vector-icons';

export default function TrainDelaysList({route, navigation}) {
    const { reload } = route.params || false;
    const [allDelays, setAllDelays] = useState([]);
    const [allStations, setAllStations] = useState([]);

    if (reload) {
        reloadOrders();
    }

    async function reloadOrders() {
        setAllDelays(await delaysModel.getDelaysLimitedInfo());
        setAllStations(await stationsModel.getStationsNameObject());
    }

    useEffect(() => {
        (async () => {
            reloadOrders();
        })();
    }, []);

    const listOfDelays = allDelays.map((delay, index) => {
        return <View key={index}>
                <Pressable style={Base.button3} onPress={() => {
                    navigation.navigate('Map', {
                        delay: delay
                    });
                    }}>
                    <Ionicons name="train" size={19}></Ionicons>
                <Text>Tåg {delay.train} - {allStations[delay.stationFrom]} -> {allStations[delay.stationTo]}</Text>
                </Pressable>
            </View>
    });

    return (
        <SafeAreaView style={Base.container}>
            <ScrollView style={{ ...Base.base }}>
                <View style={Base.titlePosition}>
                <Text style={Base.titleF}>Välj tåg för att se försening</Text>
                </View>
                {listOfDelays}
            </ScrollView>
        </SafeAreaView>
    );
};