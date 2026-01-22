import sprinterImage1 from '../assets/Sprinter/20250820_125353.jpg';
import sprinterImage2 from '../assets/Sprinter/20250820_125418.jpg';
import sprinterImage3 from '../assets/Sprinter/20250820_125436.jpg';
import travegoImage1 from '../assets/Travego/img-004c3bb57259ef5d71716443c2a54488-v_orig.jpg';
import travegoImage2 from '../assets/Travego/img-27263ce85eec16fa969440309e2a3074-v_orig.jpg';
import travegoImage3 from '../assets/Travego/img-755f6eba191ca195f32111c083e0b9e9-v_orig.jpg';
import travegoImage4 from '../assets/Travego/img-a34ab24a72d321886b33f552bf870f3c-v_orig.jpg';
import travegoImage5 from '../assets/Travego/img-c09024f95031e42c0c800cdec294be4d-v_orig.jpg';
import travegoImage6 from '../assets/Travego/img-d4b6c2a3f41d11a85f423a2746878c81-v_orig.jpg';
import tourismoImage1 from '../assets/Tourismo/20230105-105654_orig.jpg';
import tourismoImage2 from '../assets/Tourismo/20230105-105752_orig.jpg';
import tourismoImage3 from '../assets/Tourismo/20230105-105813_orig.jpg';
import tourismoImage4 from '../assets/Tourismo/20230105-105906_orig.jpg';
import tourismoImage5 from '../assets/Tourismo/20230105-105926_orig.jpg';
import tourismoImage6 from '../assets/Tourismo/20230105-105956_orig.jpg';
import setra56Image1 from '../assets/Setra 56/20191219-095025_orig.jpg';
import setra56Image2 from '../assets/Setra 56/20191219-095053_orig.jpg';
import setra56Image3 from '../assets/Setra 56/20191219-095138_orig.jpg';
import setra56Image4 from '../assets/Setra 56/20191219-095223_orig.jpg';
import setra56Image5 from '../assets/Setra 56/20191219-095259_orig.jpg';
import setra50AboutUs from '../assets/Setra 50/about us.jpg';
import setra50Image1 from '../assets/Setra 50/20240331_083607.jpg';
import setra50Image2 from '../assets/Setra 50/20240331_083653.jpg';
import setra50Image3 from '../assets/Setra 50/20240331_084100.jpg';
import setra50Image4 from '../assets/Setra 50/20240331_084122.jpg';
import setra50Image5 from '../assets/Setra 50/20240331_084138.jpg';

export interface FleetVehicle {
  seats: string;
  type: string;
  year?: string;
  mainImage: string;
  galleryImages: string[];
}

export const fleetData: FleetVehicle[] = [
  { 
    seats: "22", 
    type: "Mercedes Sprinter 519",
    year: "2019",
    mainImage: sprinterImage1,
    galleryImages: [
      sprinterImage1,
      sprinterImage2,
      sprinterImage3
    ]
  },
  { 
    seats: "50", 
    type: "Setra",
    year: "2018",
    mainImage: setra50AboutUs,
    galleryImages: [
      setra50AboutUs,
      setra50Image1,
      setra50Image2,
      setra50Image3,
      setra50Image4,
      setra50Image5
    ]
  },
  { 
    seats: "51", 
    type: "Mercedes Travego",
    year: "2019",
    mainImage: travegoImage2,
    galleryImages: [
      travegoImage1,
      travegoImage2,
      travegoImage3,
      travegoImage4,
      travegoImage5,
      travegoImage6
    ]
  },
  { 
    seats: "53", 
    type: "Mercedes Tourismo",
    year: "2016",
    mainImage: tourismoImage1,
    galleryImages: [
      tourismoImage1,
      tourismoImage2,
      tourismoImage3,
      tourismoImage4,
      tourismoImage5,
      tourismoImage6
    ]
  },
  { 
    seats: "56", 
    type: "Setra Comfort Class",
    year: "2010",
    mainImage: setra56Image1,
    galleryImages: [
      setra56Image1,
      setra56Image2,
      setra56Image3,
      setra56Image4,
      setra56Image5
    ]
  }
];
