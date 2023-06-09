export class MarkerPosition {
    public readonly lat: number;
    public readonly lng: number;

    private constructor(lat: number, lng: number) {
        this.lat = lat;
        this.lng = lng;
    }

    private static isValid(lat: number, lng: number): boolean {
        return lat != null && lng != null && lat > -90 && lat < 90 && lng > -180 && lng < 180;
    }

    public static create(lat: number, lng: number): MarkerPosition {
        if (MarkerPosition.isValid(lat, lng)) {
            return new MarkerPosition(lat, lng);
        }
        throw new Error('invalid position');
    }
}
