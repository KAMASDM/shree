// Office locations and contact information
export const offices = [
  {
    type: "head",
    name: "Head Office",
    city: "Vadodara",
    state: "Gujarat",
    address: "15, Shreejikrupa Society, Opp.MGVCL Circle Office, Gotri Road, VADODARA - 390023",
    phone: "(0265) 2313041, 2323041",
    extension: "Extn. 107",
    mobile: "+91 7096033001",
    email: "info@shreedhargroup.com",
    mapLink: "https://maps.app.goo.gl/Ss7oUJZjAq6Wpnh5A",
    services: ["Sales", "Service", "Administration", "Warehouse"]
  },
  {
    type: "regional",
    name: "Regional Office",
    city: "Ahmedabad", 
    state: "Gujarat",
    address: "6, Ruchi Appt., 36, Swastik Society Nr. Swastik Cross Road, Navrangpura, Ahmedabad-380009",
    mobile: "+91 9824515383",
    email: "ahmedabad@shreedhargroup.com",
    mapLink: "https://maps.app.goo.gl/oDjgSh4Hw9ScUqNN7",
    services: ["Sales", "Service"]
  },
  {
    type: "regional",
    name: "Regional Office",
    city: "Mumbai",
    state: "Maharashtra", 
    address: "1312, Opal Square, Plot No.: C-1, S.G. Barve Road, Wagle Industrial Estate, Thane (West)-400604",
    mobile: "+91 7486022923",
    email: "mumbai@shreedhargroup.com",
    mapLink: "https://maps.app.goo.gl/5DrSnirNmwHpztvt6",
    services: ["Sales", "Service"]
  },
  {
    type: "regional",
    name: "Regional Office", 
    city: "Hyderabad",
    state: "Telangana",
    address: "2D, 2nd floor, Movva Nest, Opp: Vijetha super Market, Near Nizampet X Roads, Hyderabad-500072",
    mobile: "+91 9640366616", 
    email: "hyderabad@shreedhargroup.com",
    mapLink: "https://maps.app.goo.gl/1BvaeSbKrKJ1uu1NA",
    services: ["Sales", "Service"]
  },
  {
    type: "regional",
    name: "Regional Office",
    city: "Bangalore",
    state: "Karnataka",
    address: "Flat no.301 Synergy sunshine apartment 13th cross Nobo nagar Bangalore 560076",
    mobile: "+91 7043043500",
    email: "bangalore@shreedhargroup.com", 
    mapLink: "https://maps.app.goo.gl/NJy9pps76bW3JgMc7",
    services: ["Sales", "Service"]
  },
  {
    type: "regional",
    name: "North Office",
    city: "Pinjore",
    state: "Haryana", 
    address: "House No. 217 Shiv Shakti Colony Near H P Gas Agency, A Nalagarh Road, Pinjore. Pin:-134102",
    mobile: "+91 8295997086",
    email: "north@shreedhargroup.com",
    mapLink: "https://maps.app.goo.gl/SU5AKAVEwqo4xXg88",
    services: ["Sales", "Service"]
  }
];

export const branchOffices = [
  { city: "Pune", state: "Maharashtra", services: ["Service"] },
  { city: "Dehradun", state: "Uttarakhand", services: ["Service"] }, 
  { city: "Visakhapatnam", state: "Andhra Pradesh", services: ["Service"] },
  { city: "Vapi", state: "Gujarat", services: ["Service"] },
  { city: "Ankleshwar", state: "Gujarat", services: ["Service"] },
  { city: "Goa", state: "Goa", services: ["Service"] },
  { city: "Delhi", state: "Delhi", services: ["Service"] }
];

export const internationalOffices = [
  {
    country: "Bangladesh",
    description: "International operations and distribution",
    contact: "Available on request"
  }
];

export const getOfficeByCity = (city) => {
  return offices.find(office => office.city.toLowerCase() === city.toLowerCase());
};

export const getOfficesByType = (type) => {
  return offices.filter(office => office.type === type);
};
