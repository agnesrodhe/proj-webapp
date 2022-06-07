export default interface Station {
    AdvertisedLocationName: string,
    Geometry: {
        WGS84: string,
    },
    LocationSignature: string,
    PlatformLine: number,
}