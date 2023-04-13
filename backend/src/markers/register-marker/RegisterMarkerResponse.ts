export type RegisterMarkerResponse = {
    userId: string;
    id: string;
    status: string;
    title: string;
    description: string;
    start_date: Date;
    end_date: Date;
    lat: number;
    lng: number;
    photos: string[];
};
