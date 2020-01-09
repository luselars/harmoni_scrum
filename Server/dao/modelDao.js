//@flow

// Object for sending Event
export class Event
{
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
    //Event Information
    name: string;
    image: string;
    start: string;
    end: string;
    status: string;
    is_public: boolean;
    location_id: number;
    address: string;
    venue: string;
    event_id: number = null;

    // Event Location
    location: Location = null;
    // Event Users
    users: User[] = null;

}

// Object for sending Location
export class Location
{
    constructor(name: string, postcode: number, address: string) {
        this.name = name;
        this.postcode = postcode;
        this.address = address;
    }

    name: string;
    postcode: number;
    address: string;
    location_id: number = null;
}

// Object for sending User
export class User
{
    constructor(email: string, name: number, tlf: string) {
        this.email = email;
        this.name = name;
    }

    email: string;
    name: string;
    tlf: string;
    image: string;
    description: string;
}

// Object for sending Organiser
export class Organiser
{
    constructor(organiser_email: string, name: number) {
        this.organiser_email = organiser_email;
        this.name = name;
    }
    organiser_email: string;
    name: string;
    image: string;
    description: string;
    tlf: string;
    website: string;
    address: string;
}