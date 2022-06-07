import config from "../config/config.json";
import Stations from "../interfaces/stations";

const stations = {
    getStations: async function getStations(): Promise<Stations[]> {
        const response = await fetch(`${config.base_url}/stations`);
        const result = await response.json();

        return result.data;
    },

    getStationsNameObject: async function getStationsNameObject() {
        const stationsAllData = await this.getStations();
        const arrayStations = {};
        for (let station of stationsAllData) {
            const sign = station.LocationSignature;
            arrayStations[sign] = station.AdvertisedLocationName;
        }
        return arrayStations;
    },

    getStationsNameArray: async function getStationsNameArray() {
        const stationsAllData = await this.getStations();
        const arrayStations = [];
        for (let station of stationsAllData) {
            arrayStations.push(station.AdvertisedLocationName);
        }
        return arrayStations;
    },

    getCoordinates: async function getCoordinates(stationFrom) {
        const stationsAllData = await this.getStations();
        let coordinatesText = "";
        for (let station of stationsAllData) {
            if (station.LocationSignature == stationFrom) {
                coordinatesText = station.Geometry.WGS84;
            }
        }
        const coordinatesString = coordinatesText.slice(7);
        const coordinates = coordinatesString.replace(")", "");
        const coordinatesArray = coordinates.split(" ");
        return coordinatesArray;
    },

    getStationNameFromSign: async function getStationNameFromSign(stationFrom) {
        const stationsAllData = await this.getStations();
        let stationName = "";
        for (let station of stationsAllData) {
            if (station.LocationSignature == stationFrom) {
                stationName = station.AdvertisedLocationName;
            }
        }
        return stationName;
    }
}

export default stations;