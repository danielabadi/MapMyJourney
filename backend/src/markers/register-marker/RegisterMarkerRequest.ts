export type RegisterMarkerRequest = {
    status: string;
    title: string;
    description: string;
    start_date: string | null;
    end_date: string | null;
    lat: number;
    lng: number;
};
