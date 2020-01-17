export class Event {
  event_id: number;
  name: string;
  image: string;
  start: any;
  status: string;
  isPublic: boolean;
  location_id: number;
  venue: string;
  end: date;
  location: string;
}

var e1 = new Event();
e1.event_id = 1;
e1.name = 'party';
e1.image = 'bilde.jpg';
e1.start = '2020-05-19 20:00:00';
e1.status = 'heyhey ok';
e1.isPublic = true;
e1.location_id = 1;
e1.venue = 'sukkerhuset';
e1.end = '2020-05-19 23:30:00';
e1.location = 'Prinsesseveien 3, Trondheim';

var e2 = new Event();
e2.event_id = 2;
e2.name = 'konsert';
e2.image = 'bilde2.jpg';
e2.start = '2020-03-03 03:00:00';
e2.status = 'Åpent hus, free';
e2.isPublic = true;
e2.location_id = 1;
e2.venue = 'sukkerhuset';
e2.end = '2020-03-03 07:30:00';
e2.location = 'Prinsesseveien 85, Trondheim';

var e3 = new Event();
e3.event_id = 3;
e3.name = 'blokkfløytekor';
e3.image = 'bilde3.jpg';
e3.start = '2020-10-03 19:00:00';
e3.status = 'Akustisk stemning';
e3.isPublic = true;
e3.location_id = 1;
e3.venue = 'sukkerhuset';
e3.end = '2020-10-03 21:30:00';
e2.location = 'Prinsesseveien 1000, Trondheim';

let events = [e1, e2, e3];
export default events;
