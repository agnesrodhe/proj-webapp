export default interface Delayed {
    ActivityId: string,
    ActivityType: string,
    AdvertisedTimeAtLocation: Date,
    EstimatedTimeAtLocation: Date,
    AdvertisedTrainIdent: number,
    Canceled: boolean,
    FromLocation: Array<Array<Object>>,
    ToLocation: Array<Object>,
}
