import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TrainDelaysList from './TrainDelaysList';
import TrainMap from './TrainMap';
import FirstMapView from './FirstMapView';

const Stack = createNativeStackNavigator();

export default function TrainDelays(props) {
    return (
        <Stack.Navigator initialRouteName="List" screenOptions={{
            headerShown: false
          }}>
            <Stack.Screen name="Karta" component={FirstMapView} />
            <Stack.Screen name="Lista" 
            options={{
                gestureDirection: 'vertical-inverted',
            }}>
            {(screenProps) => <TrainDelaysList {...screenProps} setDelays={props.setDelays} />}
            </Stack.Screen>
            <Stack.Screen name="Map" component={TrainMap} />
        </Stack.Navigator>
    )
}