export type RegisterMarkerResponse = {
    userId: string;
    id: string;
    status: string;
    title: string;
    description: string;
    start_date: Date | null;
    end_date: Date | null;
    lat: number;
    lng: number;
    photos: string[];
};
