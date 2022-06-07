import config from "../config/config.json";
import Delayed from "../interfaces/delayed";

const delayed = {
    getDelays: async function getDelays(): Promise<Delayed[]> {
        const response = await fetch(`${config.base_url}/delayed`);
        const result = await response.json();

        return result.data;
    },

    getDelaysLimitedInfo: async function getDelaysLimitedInfo() {
        const delaysAllData = await this.getDelays();
        const arrayDelays = [];
        for (let delay of delaysAllData) {
            if (delay.FromLocation != undefined) {
                arrayDelays.push({train: delay.AdvertisedTrainIdent, stationTo: delay.ToLocation[0].LocationName, stationFrom: delay.FromLocation[0].LocationName, timeDifference: this.getTimeDifference(new Date(delay.EstimatedTimeAtLocation), new Date(delay.AdvertisedTimeAtLocation))});
            }
        }
        return arrayDelays;
    },

    getTimeDifference: function getTimeDifference(time1, time2) {
        let timeDifference = (time1.getTime() - time2.getTime()) / 1000;
        timeDifference /= 60;
        return timeDifference;
    }
}

export default delayed;