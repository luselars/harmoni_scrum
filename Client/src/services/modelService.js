// Event-model
export class Event {
  constructor() {
    this.name = null;
    this.description = null;
    this.image = null;
    this.start = null;
    this.status = null;
    this.is_public = 0;
    this.location_id = null;
    this.venue = null;
    this.end = null;
  }
  event_id: number;
  name: string;
  description: string;
  image: string;
  start: string;
  status: string;
  is_public: boolean;
  location_id: number;
  venue: string;
  end: string;
  address: string;
  location_name: string;
  postcode: number;
}

// Object for sending Artist
export class Artist {
  constructor(user_id: number, artist_name: number) {
    this.user_id = user_id;
    this.artist_name = artist_name;
  }
  user_id: number;
  artist_name: string;
  image: string;
  description: string;
}

export class User {
  constructor() {
    this.password = null;
    this.email = null;
    this.name = null;
    this.tlf = null;
    this.image = null;
    this.description = null;
  }
  password: string;
  email: string;
  name: string;
  tlf: string;
  image: string;
  description: string;
}

export class Location {
  constructor() {
    this.name = null;
    this.address = null;
    this.postcode = null;
    this.venue = null;
  }
  name: null;
  address: string;
  postcode: number;
  venue: string;
}

// Object for sending Organiser

export class Organiser {
  constructor(organiser_email: string, name: string) {
    this.organiser_email = organiser_email;
    this.name = name;
  }
  organiser_id_: number;
  organiser_email: string;
  name: string;
  image: string;
  description: string;
  tlf: string;
  website: string;
  address: string;
  password: string;
  postcode: string;
  passwordConfirmation: string;
  eventsFinished: number;
  eventsComing: number;
}
