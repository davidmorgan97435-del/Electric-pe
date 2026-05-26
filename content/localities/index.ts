export type Locality = {
  slug: string;
  name: string;
  parentCitySlug: string;
  /** Whether ElectricPe actively serves this locality (controls store-list vs coming-soon copy). */
  active: boolean;
  /** ~1-paragraph intro for SEO. Mention the locality, the parent city, and the nearest Mobility Center. */
  introCopy: string;
};

export const localities: Locality[] = [
  {
    slug: "koramangala",
    name: "Koramangala",
    parentCitySlug: "bengaluru",
    active: true,
    introCopy:
      "Koramangala's startup-driven daily commute, dense cafes and 80-foot ring road traffic make a 25 km/h licence-free electric scooter the most rational ride for the neighbourhood. Step into the nearest ElectricPe Mobility Center in Bengaluru for a no-pressure test ride, transparent on-road pricing and a written warranty before you decide.",
  },
  {
    slug: "yeswanthpur",
    name: "Yeswanthpur",
    parentCitySlug: "bengaluru",
    active: true,
    introCopy:
      "Yeswanthpur riders covering the APMC yard, Tumkur Road feeder lanes and the Metro Phase 2 corridor save a real chunk every month on fuel by switching to electric. Our Bengaluru Mobility Center covers the locality with doorstep test rides and component-level warranty across the Xypro, Jett and 4ALL lineup.",
  },
  {
    slug: "kalyan-nagar",
    name: "Kalyan Nagar",
    parentCitySlug: "bengaluru",
    active: true,
    introCopy:
      "Kalyan Nagar is home to our flagship Bengaluru Mobility Center, which means residents from HRBR Layout, Banaswadi and the HBR cluster get the fastest test-ride slots, same-day delivery and in-house service technicians. No licence required, charges from any home 5A socket in four hours.",
  },
  {
    slug: "jp-nagar",
    name: "JP Nagar",
    parentCitySlug: "bengaluru",
    active: true,
    introCopy:
      "JP Nagar's grid layout and short school-to-market trips are tailor-made for low-speed electric. ElectricPe's Bengaluru network keeps a Mobility Center within reach for JP Nagar phases 1 through 9, with same-day EMI approvals and a 24-hour service SLA.",
  },
  {
    slug: "cv-raman-nagar",
    name: "CV Raman Nagar",
    parentCitySlug: "bengaluru",
    active: true,
    introCopy:
      "CV Raman Nagar's tech-corridor commuters and ISRO-area families have moved fast on electric over the last two years. Book a free test ride through our Bengaluru Mobility Center and walk out with an honest TCO sheet that includes battery, motor and service costs over five years.",
  },
  {
    slug: "yelahanka",
    name: "Yelahanka",
    parentCitySlug: "bengaluru",
    active: true,
    introCopy:
      "Yelahanka's wide arterial roads, defence-colony layout and steady school traffic make an ElectricPe scooter a smart family second-vehicle. Our Bengaluru Mobility Center serves the locality with doorstep test rides, no-licence-required compliance and a 3-year battery warranty.",
  },
  {
    slug: "indiranagar",
    name: "Indiranagar",
    parentCitySlug: "bengaluru",
    active: true,
    introCopy:
      "Indiranagar's 100-foot road snarls and cluster of cafes, salons and gyms drive the highest single-day mileage of any Bengaluru neighbourhood. A licence-free 25 km/h electric scooter from ElectricPe cuts that running cost to roughly a fifth of petrol while keeping the rider out of the registration queue.",
  },
  {
    slug: "hsr-layout",
    name: "HSR Layout",
    parentCitySlug: "bengaluru",
    active: true,
    introCopy:
      "HSR Layout is also home to ElectricPe headquarters, and the neighbourhood has been a real-world testbed for every model in the lineup. Residents from Sectors 1 through 7 can book a doorstep test ride or visit our Bengaluru Mobility Center for full Xypro, Jett and 4ALL trials.",
  },
  {
    slug: "bommanahalli",
    name: "Bommanahalli",
    parentCitySlug: "bengaluru",
    active: true,
    introCopy:
      "Bommanahalli sits on the Hosur Road service road that carries some of Bengaluru's heaviest commuter flow. A 25 km/h ElectricPe scooter is the only sane way to thread that traffic legally without a licence, and our Bengaluru Mobility Center walks you through every spec before you commit.",
  },
  {
    slug: "kudlu",
    name: "Kudlu",
    parentCitySlug: "bengaluru",
    active: true,
    introCopy:
      "Kudlu and Kudlu Gate residents working along the Electronic City corridor benefit most from a low-speed electric: predictable distances, lower fuel cost and zero registration paperwork. Drop by our Bengaluru Mobility Center for a free test ride and a fifteen-minute EMI walkthrough.",
  },
  {
    slug: "whitefield",
    name: "Whitefield",
    parentCitySlug: "bengaluru",
    active: true,
    introCopy:
      "Whitefield's tech-park commute is a worst-case scenario for petrol two-wheelers and a best-case for ElectricPe. Our Bengaluru Mobility Center brings a no-licence, low-running-cost option to the entire ITPL-to-Hoodi belt, with doorstep test rides on request.",
  },
  {
    slug: "electronic-city",
    name: "Electronic City",
    parentCitySlug: "bengaluru",
    active: true,
    introCopy:
      "Electronic City's Phase 1 and Phase 2 residents make some of the longest intra-city commutes in Bengaluru. An ElectricPe scooter rated for 80 km of real-world range covers a full day's local errands on a single overnight charge, and our Bengaluru Mobility Center stocks every variant for back-to-back test rides.",
  },
  {
    slug: "marathahalli",
    name: "Marathahalli",
    parentCitySlug: "bengaluru",
    active: true,
    introCopy:
      "Marathahalli's bridge-and-bottleneck pattern is exactly the traffic style our scooters were designed for. Switch to electric at our Bengaluru Mobility Center and bypass the licence and registration queue entirely while spending roughly a fifth as much per kilometre.",
  },
  {
    slug: "bannerghatta",
    name: "Bannerghatta",
    parentCitySlug: "bengaluru",
    active: true,
    introCopy:
      "Bannerghatta Road residents commuting from BTM through Arekere to Meenakshi Temple feel the rising fuel bill more than most. A 25 km/h ElectricPe scooter solves that without forcing a licence application, and our Bengaluru Mobility Center keeps the full Xypro and Jett lineup on the floor.",
  },
  {
    slug: "dombu",
    name: "Dombu",
    parentCitySlug: "bengaluru",
    active: true,
    introCopy:
      "Dombu and the surrounding Old Madras Road belt have grown into a residential cluster that needs an honest neighbourhood EV option. ElectricPe's Bengaluru Mobility Center covers the locality with same-day test rides, doorstep delivery and a published 24-hour service SLA.",
  },
  {
    slug: "lodhi-road",
    name: "Lodhi Road",
    parentCitySlug: "delhi",
    active: true,
    introCopy:
      "Lodhi Road's tree-lined approach to Central Delhi and its proximity to India Habitat Centre and CGO Complex make it a high-EV-adoption pocket. ElectricPe's five Delhi Mobility Centers, the nearest being Krishna Nagar, cover the area with licence-free 25 km/h scooters and same-day EMI.",
  },
  {
    slug: "chanda-nagar",
    name: "Chanda Nagar",
    parentCitySlug: "hyderabad",
    active: false,
    introCopy:
      "Chanda Nagar in West Hyderabad is on the ElectricPe roadmap as we expand the Telangana network. Until then, riders can explore the full Xypro, Jett and 4ALL lineup at our nearest Mobility Centers in Bengaluru or order through the ElectricPe app for delivery-ready stock.",
  },
  {
    slug: "nehru-place",
    name: "Nehru Place",
    parentCitySlug: "delhi",
    active: true,
    introCopy:
      "Nehru Place's South Delhi commercial density and the IT-hardware traffic flowing through Kalkaji make a licence-free 25 km/h scooter the obvious low-cost rider. Our nearest Delhi Mobility Center serves the neighbourhood with doorstep test rides and component-level warranty.",
  },
  {
    slug: "dwarka",
    name: "Dwarka",
    parentCitySlug: "delhi",
    active: true,
    introCopy:
      "Dwarka's residential sectors and metro-feeder commutes are well-suited to ElectricPe's range profile. The Dwarka Mobility Center is one of five ElectricPe stores in the capital, with same-day test rides, in-house technicians and EMI approval in fifteen minutes.",
  },
  {
    slug: "budh-vihar",
    name: "Budh Vihar",
    parentCitySlug: "delhi",
    active: true,
    introCopy:
      "Budh Vihar is home to one of our five Delhi Mobility Centers, so residents of Rohini, Sultanpuri and the Outer Ring Road belt have a real ElectricPe storefront within minutes. Walk in for a free test ride and a written warranty summary on every variant.",
  },
  {
    slug: "krishna-nagar",
    name: "Krishna Nagar",
    parentCitySlug: "delhi",
    active: true,
    introCopy:
      "Krishna Nagar's Mobility Center anchors ElectricPe's East Delhi presence, covering Laxmi Nagar, Geeta Colony and Mandawali commuters. No licence is required for any scooter we sell, charging works on a 5A socket and the on-road pricing is published up front.",
  },
  {
    slug: "jahangirpuri",
    name: "Jahangirpuri",
    parentCitySlug: "delhi",
    active: true,
    introCopy:
      "Jahangirpuri's Outer Ring Road location makes our Mobility Center an easy stop for North Delhi riders from Adarsh Nagar through Azadpur. ElectricPe's 25 km/h lineup needs no licence and runs at roughly a fifth of the per-kilometre cost of petrol two-wheelers.",
  },
  {
    slug: "nawada",
    name: "Nawada",
    parentCitySlug: "delhi",
    active: true,
    introCopy:
      "Nawada's metro-connected residential stretch in West Delhi is well-covered by our Nawada Mobility Center, one of five ElectricPe stores in the capital. Book a free test ride, get EMI approval the same day and ride out with a component-level warranty in writing.",
  },
  {
    slug: "azadpur",
    name: "Azadpur",
    parentCitySlug: "delhi",
    active: true,
    introCopy:
      "Azadpur's vegetable mandi traffic and surrounding residential clusters drive steady demand for low-cost two-wheelers. Our nearby Jahangirpuri Mobility Center serves Azadpur with no-licence-required EV options, written warranty terms and a 24-hour service SLA.",
  },
  {
    slug: "ballabhgarh",
    name: "Ballabhgarh",
    parentCitySlug: "delhi",
    active: true,
    introCopy:
      "Ballabhgarh on the southern fringe of the NCR is well-served by our Delhi Mobility Centers through doorstep test rides. The 25 km/h ElectricPe lineup is licence-free under the Motor Vehicles Act and slashes daily running cost for the long Faridabad-Delhi commute.",
  },
  {
    slug: "mata-road",
    name: "Mata Road",
    parentCitySlug: "gurugram",
    active: true,
    introCopy:
      "Mata Road is the address of our Gurugram Mobility Center, so Old Gurgaon, Sector 14 and the New Railway Road belt have a real ElectricPe storefront within minutes. No licence required, low running cost and a published 24-hour service SLA.",
  },
  {
    slug: "sanganer",
    name: "Sanganer",
    parentCitySlug: "jaipur",
    active: true,
    introCopy:
      "Sanganer hosts our Jaipur Mobility Center, anchoring ElectricPe's Rajasthan presence. Riders from Mansarovar, Pratap Nagar and the airport approach use it as their default test-ride and service stop for the Xypro, Jett and 4ALL lineup.",
  },
  {
    slug: "sector-13",
    name: "Sector 13",
    parentCitySlug: "sonipat",
    active: true,
    introCopy:
      "Sector 13 is home to our Sonipat Mobility Center, ideally placed between the city's educational institutions and the Delhi Road industrial belt. ElectricPe scooters need no licence, charge on a regular 5A socket and come with a component-level warranty in writing.",
  },
  {
    slug: "chhotu-ram-nagar",
    name: "Chhotu Ram Nagar",
    parentCitySlug: "rohtak",
    active: true,
    introCopy:
      "Chhotu Ram Nagar on the Rohtak Outer City Road is the address of our Rohtak Mobility Center. The neighbourhood's mix of university and government-office commuters fits the 25 km/h licence-free profile of every ElectricPe scooter we sell.",
  },
  {
    slug: "garh-road",
    name: "Garh Road",
    parentCitySlug: "meerut",
    active: true,
    introCopy:
      "Garh Road hosts one of our two Meerut Mobility Centers, covering the eastern half of the city. Walk in for a no-pressure test ride, an honest TCO walk-through and EMI approval in fifteen minutes across the Xypro, Jett and 4ALL ranges.",
  },
  {
    slug: "roorkee-road",
    name: "Roorkee Road",
    parentCitySlug: "meerut",
    active: true,
    introCopy:
      "Roorkee Road is the second of our two Meerut Mobility Centers, serving the western and northern stretches of the city. ElectricPe scooters are licence-free at 25 km/h, charge in four hours on any home socket and carry a 3-year battery warranty.",
  },
  {
    slug: "meerut-road",
    name: "Meerut Road",
    parentCitySlug: "ghaziabad",
    active: true,
    introCopy:
      "Meerut Road anchors one of our two Ghaziabad Mobility Centers, making it easy for NCR commuters along the NH-58 to walk in for a test ride. No licence required, written warranty and same-day EMI approvals across the full ElectricPe lineup.",
  },
  {
    slug: "tigri-circle",
    name: "Tigri Circle",
    parentCitySlug: "ghaziabad",
    active: true,
    introCopy:
      "Tigri Circle is home to our second Ghaziabad Mobility Center, covering Indirapuram, Vaishali and the Hindon belt. Switch to a 25 km/h ElectricPe scooter to bypass licence and registration entirely while cutting running cost to roughly a fifth of petrol.",
  },
  {
    slug: "goverdhan-chauraha",
    name: "Goverdhan Chauraha",
    parentCitySlug: "mathura",
    active: true,
    introCopy:
      "Goverdhan Chauraha is the address of our Mathura Mobility Center, perfectly placed for both pilgrim circuits and daily intra-city commutes. ElectricPe scooters are licence-free, charge in four hours and run at a fraction of petrol's per-kilometre cost.",
  },
  {
    slug: "jyoti-nagar",
    name: "Jyoti Nagar",
    parentCitySlug: "alwar",
    active: true,
    introCopy:
      "Jyoti Nagar hosts our Alwar Mobility Center, anchoring the Rajasthan-NCR corridor. The neighbourhood's short intra-city distances and growing residential clusters are ideal for the 25 km/h licence-free ElectricPe lineup.",
  },
  {
    slug: "shyam-nagar",
    name: "Shyam Nagar",
    parentCitySlug: "agra",
    active: true,
    introCopy:
      "Shyam Nagar on the Shahganj-Bodla Road is the address of our Agra Mobility Center. Walk in for a free test ride, a written warranty summary and EMI approval in fifteen minutes across the full Xypro, Jett and 4ALL range.",
  },
  {
    slug: "naveen-nagar",
    name: "Naveen Nagar",
    parentCitySlug: "aligarh",
    active: true,
    introCopy:
      "Naveen Nagar near the Khair Bypass hosts our Aligarh Mobility Center, the natural test-ride stop for the city's student commute. No licence required for any scooter in our lineup, and same-day EMI approval is the norm.",
  },
  {
    slug: "shivaji-nagar",
    name: "Shivaji Nagar",
    parentCitySlug: "belagavi",
    active: true,
    introCopy:
      "Shivaji Nagar anchors our Belagavi Mobility Center, covering the city's daily commute and the Pune-Bangalore corridor freight handlers. ElectricPe scooters are licence-free, registration-free and run at roughly a fifth the per-kilometre cost of petrol.",
  },
  {
    slug: "vidyanagar",
    name: "Vidyanagar",
    parentCitySlug: "davanagere",
    active: true,
    introCopy:
      "Vidyanagar in Davanagere hosts the city's ElectricPe Mobility Center, ideally placed for both the student community and small-business riders. Same-day test rides, 24-hour service SLA, written warranty.",
  },
  {
    slug: "line-bazar",
    name: "Line Bazar",
    parentCitySlug: "dharwad",
    active: true,
    introCopy:
      "Line Bazar hosts our Dharwad Mobility Center, the natural stop for Karnatak University staff, students and the daily commute along the Pune-Bangalore Highway. ElectricPe scooters need no licence and charge from any home socket.",
  },
  {
    slug: "bm-road",
    name: "BM Road",
    parentCitySlug: "hassan",
    active: true,
    introCopy:
      "B M Road is the address of our Hassan Mobility Center, the regional hub for the Hassan-Mysuru-Mandya district commute. ElectricPe's 25 km/h lineup is licence-free, registration-free and built for steady semi-urban use.",
  },
  {
    slug: "vidya-nagar",
    name: "Vidya Nagar",
    parentCitySlug: "hubballi",
    active: true,
    introCopy:
      "Vidya Nagar on the Pune-Bangalore Road anchors our Hubballi Mobility Center, covering the city's daily commute and the surrounding commerce belt. Walk in for a free test ride and a written warranty summary before you decide.",
  },
  {
    slug: "bannur-road",
    name: "Bannur Road",
    parentCitySlug: "mandya",
    active: true,
    introCopy:
      "Bannur Road hosts our Mandya Mobility Center, ideally placed between Bengaluru and Mysuru. The 25 km/h ElectricPe lineup suits short intra-town hops and the steady semi-urban commute flow that defines Mandya district.",
  },
  {
    slug: "kg-koppal",
    name: "KG Koppal",
    parentCitySlug: "mysuru",
    active: true,
    introCopy:
      "K G Koppal near the Railway Gate is the address of our Mysuru Mobility Center. The city's planned grid and cycle-friendly streets are an EV-natural environment, and ElectricPe scooters cover the entire intra-city footprint without licence or registration paperwork.",
  },
  {
    slug: "main-road",
    name: "Main Road",
    parentCitySlug: "tumakuru",
    active: true,
    introCopy:
      "Main Road opposite SBI hosts our Tumakuru Mobility Center, covering daily city commutes and the spillover from the Bengaluru industrial corridor. ElectricPe scooters are licence-free, low-running-cost and backed by a published 24-hour service SLA.",
  },
];

export const localitySlugs = localities.map((l) => l.slug);

export const getLocality = (slug: string): Locality | undefined =>
  localities.find((l) => l.slug === slug);
