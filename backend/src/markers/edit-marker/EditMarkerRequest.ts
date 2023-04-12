export type EditMarkerRequest = {
    markerId: string;
    status: string;
    title: string;
    description: string;
    start_date: string;
    end_date: string;
    lat: number;
    lng: number;
};
