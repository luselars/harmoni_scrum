//@flow

export class Event {
    constructor(name: string, image: string, start: string, end: string, status: string, is_public: number, location_id: number, venue: string) {
        this.name = name;
        this.image = image;
        this.start = start;
        this.end = end;
        this.status = status;
        this.is_public = is_public;
        this.location_id = location_id;
        this.venue = venue;
    }

    name: string;
    image: string;
    start: string;
    end: string;
    status: string;
    is_public: boolean;
    location_id: number;
    address: string;
    location_name: string;
    postcode: number;
    venue: string;
}