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
  priceEquivalent?: string;
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
    price: 1000,
    currency: 'MDL',
    priceEquivalent: '≈50 EUR / 55 USD',
    duration: '20h',
    image: 'https://images.unsplash.com/photo-1617988995031-6d42638a1547?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    stops: [
      { city: 'Chișinău', time: '10:00', location: 'Gara de Nord' },
      { city: 'Comrat', time: '11:00' },
      { city: 'Cahul', time: '12:00' },
      { city: 'Istanbul', time: '06:00 (+1 zi)', location: 'Kemal Paşa, Fethibey Cd 40 E, Fatih' },
    ],
    returnStops: [
      { city: 'Istanbul', time: '12:00', location: 'Kemal Paşa, Fethibey Cd 40 E, Fatih' },
      { city: 'Cahul', time: '05:00 (+1 zi)' },
      { city: 'Comrat', time: '06:00 (+1 zi)' },
      { city: 'Chișinău', time: '08:00 (+1 zi)', location: 'Gara de Nord' },
    ],
  },
  {
    id: 'chisinau-varna',
    origin: 'Chișinău',
    destination: 'Varna',
    departureDay: 'Duminică',
    returnDay: 'Miercuri',
    price: 800,
    currency: 'MDL',
    priceEquivalent: '≈40 EUR / 45 USD',
    duration: '10h',
    image: 'https://images.unsplash.com/photo-1725098944106-2eb5207812ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    stops: [
      { city: 'Chișinău', time: '10:00', location: 'Gara de Nord' },
      { city: 'Comrat', time: '11:00' },
      { city: 'Cahul', time: '12:00' },
      { city: 'Varna', time: '20:00', location: 'Catedrala Adormirea Maicii Domnului din Varna' },
    ],
    returnStops: [
      { city: 'Varna', time: '20:30', location: 'Catedrala Adormirea Maicii Domnului din Varna' },
      { city: 'Cahul', time: '05:00 (+1 zi)' },
      { city: 'Comrat', time: '06:00 (+1 zi)' },
      { city: 'Chișinău', time: '08:30 (+1 zi)', location: 'Gara de Nord' },
    ],
  },
  {
    id: 'chisinau-burgas',
    origin: 'Chișinău',
    destination: 'Burgas',
    departureDay: 'Duminică',
    returnDay: 'Miercuri',
    price: 800,
    currency: 'MDL',
    priceEquivalent: '≈45 EUR / 50 USD',
    duration: '12h',
    image: 'https://images.unsplash.com/photo-1609674771899-c96553ccd411?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    stops: [
      { city: 'Chișinău', time: '10:00', location: 'Gara de Nord' },
      { city: 'Comrat', time: '11:00' },
      { city: 'Cahul', time: '12:00' },
      { city: 'Burgas', time: '22:00', location: 'OMV, бул. Стефан Стамболов 113' },
    ],
    returnStops: [
      { city: 'Burgas', time: '19:00', location: 'OMV, бул. Стефан Стамболов 113' },
      { city: 'Cahul', time: '05:00 (+1 zi)' },
      { city: 'Comrat', time: '06:00 (+1 zi)' },
      { city: 'Chișinău', time: '07:00 (+1 zi)', location: 'Gara de Nord' },
    ],
  },
  {
    id: 'istanbul-chisinau',
    origin: 'Istanbul',
    destination: 'Chișinău',
    departureDay: 'Miercuri',
    returnDay: 'Duminică',
    price: 1000,
    currency: 'MDL',
    priceEquivalent: '≈50 EUR / 55 USD',
    duration: '20h',
    image: 'https://images.unsplash.com/photo-1617988995031-6d42638a1547?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    stops: [
      { city: 'Istanbul', time: '12:00', location: 'Kemal Paşa, Fethibey Cd 40 E, Fatih' },
      { city: 'Cahul', time: '05:00 (+1 zi)' },
      { city: 'Comrat', time: '06:00 (+1 zi)' },
      { city: 'Chișinău', time: '08:00 (+1 zi)', location: 'Gara de Nord' },
    ],
    returnStops: [
      { city: 'Chișinău', time: '10:00', location: 'Gara de Nord' },
      { city: 'Comrat', time: '11:00' },
      { city: 'Cahul', time: '12:00' },
      { city: 'Istanbul', time: '06:00 (+1 zi)', location: 'Kemal Paşa, Fethibey Cd 40 E, Fatih' },
    ],
  },
  {
    id: 'varna-chisinau',
    origin: 'Varna',
    destination: 'Chișinău',
    departureDay: 'Miercuri',
    returnDay: 'Duminică',
    price: 800,
    currency: 'MDL',
    priceEquivalent: '≈40 EUR / 45 USD',
    duration: '10h',
    image: 'https://images.unsplash.com/photo-1725098944106-2eb5207812ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    stops: [
      { city: 'Varna', time: '20:30', location: 'Catedrala Adormirea Maicii Domnului din Varna' },
      { city: 'Cahul', time: '05:00 (+1 zi)' },
      { city: 'Comrat', time: '06:00 (+1 zi)' },
      { city: 'Chișinău', time: '08:30 (+1 zi)', location: 'Gara de Nord' },
    ],
    returnStops: [
      { city: 'Chișinău', time: '10:00', location: 'Gara de Nord' },
      { city: 'Comrat', time: '11:00' },
      { city: 'Cahul', time: '12:00' },
      { city: 'Varna', time: '20:00', location: 'Catedrala Adormirea Maicii Domnului din Varna' },
    ],
  },
  {
    id: 'burgas-chisinau',
    origin: 'Burgas',
    destination: 'Chișinău',
    departureDay: 'Miercuri',
    returnDay: 'Duminică',
    price: 800,
    currency: 'MDL',
    priceEquivalent: '≈45 EUR / 50 USD',
    duration: '12h',
    image: 'https://images.unsplash.com/photo-1609674771899-c96553ccd411?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    stops: [
      { city: 'Burgas', time: '19:00', location: 'OMV, бул. Стефан Стамболов 113' },
      { city: 'Cahul', time: '05:00 (+1 zi)' },
      { city: 'Comrat', time: '06:00 (+1 zi)' },
      { city: 'Chișinău', time: '07:00 (+1 zi)', location: 'Gara de Nord' },
    ],
    returnStops: [
      { city: 'Chișinău', time: '10:00', location: 'Gara de Nord' },
      { city: 'Comrat', time: '11:00' },
      { city: 'Cahul', time: '12:00' },
      { city: 'Burgas', time: '22:00', location: 'OMV, бул. Стефан Стамболов 113' },
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
