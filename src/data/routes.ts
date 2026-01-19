export interface RouteStop {
  city: string;
  time: string;
  location?: string;
}

export interface Route {
  id: string;
  origin: string;
  destination: string;
  departureDay: string;
  returnDay: string;
  price: number;
  currency: string;
  duration: string;
  image: string;
  stops: RouteStop[];
  returnStops: RouteStop[];
}

export const routes: Route[] = [
  {
    id: 'chisinau-istanbul',
    origin: 'Chișinău',
    destination: 'Istanbul',
    departureDay: 'Duminică',
    returnDay: 'Miercuri',
    price: 50,
    currency: '€',
    duration: '21h',
    image: 'https://images.unsplash.com/photo-1617988995031-6d42638a1547?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    stops: [
      { city: 'Chișinău', time: '10:00', location: 'Gara de Nord' },
      { city: 'Comrat', time: '11:00' },
      { city: 'Cahul', time: '12:00' },
      { city: 'Istanbul', time: '07:00 (+1 zi)', location: 'Kemal Paşa, Fevziye Cd. No:5, Fatih' },
    ],
    returnStops: [
      { city: 'Istanbul', time: '12:00', location: 'Kemal Paşa, Fevziye Cd. No:5, Fatih' },
      { city: 'Cahul', time: '05:00 (+1 zi)' },
      { city: 'Comrat', time: '06:00 (+1 zi)' },
      { city: 'Chișinău', time: '09:30 (+1 zi)', location: 'Gara de Nord' },
    ],
  },
  {
    id: 'chisinau-varna',
    origin: 'Chișinău',
    destination: 'Varna',
    departureDay: 'Duminică',
    returnDay: 'Miercuri',
    price: 40,
    currency: '€',
    duration: '11h',
    image: 'https://images.unsplash.com/photo-1725098944106-2eb5207812ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    stops: [
      { city: 'Chișinău', time: '10:00', location: 'Gara de Nord' },
      { city: 'Comrat', time: '11:00' },
      { city: 'Cahul', time: '12:00' },
      { city: 'Varna', time: '21:00', location: 'Autogara Centrală' },
    ],
    returnStops: [
      { city: 'Varna', time: '20:30', location: 'Autogara Centrală' },
      { city: 'Cahul', time: '05:00 (+1 zi)' },
      { city: 'Comrat', time: '06:00 (+1 zi)' },
      { city: 'Chișinău', time: '09:30 (+1 zi)', location: 'Gara de Nord' },
    ],
  },
  {
    id: 'chisinau-burgas',
    origin: 'Chișinău',
    destination: 'Burgas',
    departureDay: 'Duminică',
    returnDay: 'Miercuri',
    price: 45,
    currency: '€',
    duration: '12.5h',
    image: 'https://images.unsplash.com/photo-1609674771899-c96553ccd411?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    stops: [
      { city: 'Chișinău', time: '10:00', location: 'Gara de Nord' },
      { city: 'Comrat', time: '11:00' },
      { city: 'Cahul', time: '12:00' },
      { city: 'Burgas', time: '22:30', location: 'Autogara Centrală' },
    ],
    returnStops: [
      { city: 'Burgas', time: '19:00', location: 'Autogara Centrală' },
      { city: 'Cahul', time: '05:00 (+1 zi)' },
      { city: 'Comrat', time: '06:00 (+1 zi)' },
      { city: 'Chișinău', time: '09:30 (+1 zi)', location: 'Gara de Nord' },
    ],
  },
  {
    id: 'istanbul-chisinau',
    origin: 'Istanbul',
    destination: 'Chișinău',
    departureDay: 'Miercuri',
    returnDay: 'Duminică',
    price: 50,
    currency: '€',
    duration: '21h',
    image: 'https://images.unsplash.com/photo-1617988995031-6d42638a1547?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    stops: [
      { city: 'Istanbul', time: '12:00', location: 'Kemal Paşa, Fevziye Cd. No:5, Fatih' },
      { city: 'Cahul', time: '05:00 (+1 zi)' },
      { city: 'Comrat', time: '06:00 (+1 zi)' },
      { city: 'Chișinău', time: '09:30 (+1 zi)', location: 'Gara de Nord' },
    ],
    returnStops: [
      { city: 'Chișinău', time: '10:00', location: 'Gara de Nord' },
      { city: 'Comrat', time: '11:00' },
      { city: 'Cahul', time: '12:00' },
      { city: 'Istanbul', time: '07:00 (+1 zi)', location: 'Kemal Paşa, Fevziye Cd. No:5, Fatih' },
    ],
  },
  {
    id: 'varna-chisinau',
    origin: 'Varna',
    destination: 'Chișinău',
    departureDay: 'Miercuri',
    returnDay: 'Duminică',
    price: 40,
    currency: '€',
    duration: '11h',
    image: 'https://images.unsplash.com/photo-1725098944106-2eb5207812ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    stops: [
      { city: 'Varna', time: '20:30', location: 'Autogara Centrală' },
      { city: 'Cahul', time: '05:00 (+1 zi)' },
      { city: 'Comrat', time: '06:00 (+1 zi)' },
      { city: 'Chișinău', time: '09:30 (+1 zi)', location: 'Gara de Nord' },
    ],
    returnStops: [
      { city: 'Chișinău', time: '10:00', location: 'Gara de Nord' },
      { city: 'Comrat', time: '11:00' },
      { city: 'Cahul', time: '12:00' },
      { city: 'Varna', time: '21:00', location: 'Autogara Centrală' },
    ],
  },
  {
    id: 'burgas-chisinau',
    origin: 'Burgas',
    destination: 'Chișinău',
    departureDay: 'Miercuri',
    returnDay: 'Duminică',
    price: 45,
    currency: '€',
    duration: '12.5h',
    image: 'https://images.unsplash.com/photo-1609674771899-c96553ccd411?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    stops: [
      { city: 'Burgas', time: '19:00', location: 'Autogara Centrală' },
      { city: 'Cahul', time: '05:00 (+1 zi)' },
      { city: 'Comrat', time: '06:00 (+1 zi)' },
      { city: 'Chișinău', time: '09:30 (+1 zi)', location: 'Gara de Nord' },
    ],
    returnStops: [
      { city: 'Chișinău', time: '10:00', location: 'Gara de Nord' },
      { city: 'Comrat', time: '11:00' },
      { city: 'Cahul', time: '12:00' },
      { city: 'Burgas', time: '22:30', location: 'Autogara Centrală' },
    ],
  },
];

export const destinations = ['Chișinău', 'Istanbul', 'Varna', 'Burgas', 'Comrat', 'Cahul'];

export const getRouteById = (id: string): Route | undefined => {
  return routes.find(route => route.id === id);
};

export const getRouteByDestinations = (from: string, to: string): Route | undefined => {
  return routes.find(
    route =>
      (route.origin === from && route.destination === to) ||
      (route.origin === to && route.destination === from)
  );
};
