export interface Colony {
  name: string;
  lat: number;
  lng: number;
}

export interface City {
  name: string;
  lat: number;
  lng: number;
  colonies: Colony[];
}

export interface State {
  name: string;
  cities: City[];
}

export const indianLocations: State[] = [
  {
    name: "Andhra Pradesh",
    cities: [
      {
        name: "Anantapur", lat: 14.6819, lng: 77.6006,
        colonies: [
          { name: "Lakshmi Nagar", lat: 14.6850, lng: 77.5950 },
          { name: "Sapthagiri Colony", lat: 14.6900, lng: 77.6050 },
          { name: "Nehru Nagar", lat: 14.6780, lng: 77.5980 },
          { name: "Kurnool Road", lat: 14.6950, lng: 77.6100 },
          { name: "RTC Colony", lat: 14.6750, lng: 77.6080 },
          { name: "Subhash Nagar", lat: 14.6830, lng: 77.5920 },
          { name: "Gandhinagar", lat: 14.6870, lng: 77.6030 },
          { name: "Vinayak Nagar", lat: 14.6790, lng: 77.5890 },
          { name: "Ashok Nagar", lat: 14.6910, lng: 77.5970 },
          { name: "Industrial Estate", lat: 14.6980, lng: 77.6150 },
          { name: "Pallavi Nagar", lat: 14.6720, lng: 77.5940 },
          { name: "Bank Colony", lat: 14.6840, lng: 77.6070 },
          { name: "Vidyanagar", lat: 14.6880, lng: 77.6110 },
          { name: "Teachers Colony", lat: 14.6860, lng: 77.5910 },
          { name: "Clock Tower Area", lat: 14.6835, lng: 77.6015 },
        ],
      },
      {
        name: "Chittoor", lat: 13.2172, lng: 79.1003,
        colonies: [
          { name: "Santhapet", lat: 13.2200, lng: 79.1050 },
          { name: "Greamspet", lat: 13.2100, lng: 79.0950 },
          { name: "Kattamanchi", lat: 13.2250, lng: 79.1100 },
          { name: "Thotapalyam", lat: 13.2300, lng: 79.0900 },
          { name: "Gandhipuram", lat: 13.2150, lng: 79.1080 },
          { name: "Vedayapalem", lat: 13.2120, lng: 79.0980 },
          { name: "Murukambattu", lat: 13.2280, lng: 79.1020 },
          { name: "Kannamgari Peta", lat: 13.2050, lng: 79.0920 },
          { name: "Railway Colony", lat: 13.2180, lng: 79.0970 },
          { name: "Teachers Colony", lat: 13.2230, lng: 79.1060 },
        ],
      },
      {
        name: "East Godavari (Kakinada)", lat: 16.9891, lng: 82.2475,
        colonies: [
          { name: "Jagannaickpur", lat: 16.9920, lng: 82.2400 },
          { name: "Bhanugudi Junction", lat: 16.9950, lng: 82.2500 },
          { name: "Suryaraopeta", lat: 16.9870, lng: 82.2380 },
          { name: "Gandhinagar", lat: 16.9990, lng: 82.2550 },
          { name: "Ramanayyapeta", lat: 16.9830, lng: 82.2420 },
          { name: "Sambamurthy Nagar", lat: 16.9960, lng: 82.2460 },
          { name: "Korukonda Road", lat: 16.9900, lng: 82.2350 },
          { name: "Sarpavaram", lat: 16.9850, lng: 82.2520 },
          { name: "Annavaram Road", lat: 17.0020, lng: 82.2480 },
          { name: "Old Town", lat: 16.9880, lng: 82.2440 },
        ],
      },
      {
        name: "Guntur", lat: 16.3067, lng: 80.4365,
        colonies: [
          { name: "Arundelpet", lat: 16.3050, lng: 80.4400 },
          { name: "Brodipet", lat: 16.3100, lng: 80.4350 },
          { name: "Lakshmipuram", lat: 16.3020, lng: 80.4430 },
          { name: "Nagarampalem", lat: 16.2980, lng: 80.4280 },
          { name: "Pattabhipuram", lat: 16.3150, lng: 80.4500 },
          { name: "Stambalagaruvu", lat: 16.3000, lng: 80.4250 },
          { name: "Brindavan Gardens", lat: 16.3080, lng: 80.4380 },
          { name: "Collectorate Junction", lat: 16.3120, lng: 80.4420 },
          { name: "AT Agraharam", lat: 16.3040, lng: 80.4310 },
          { name: "Kothapet", lat: 16.3070, lng: 80.4460 },
          { name: "Donka Road", lat: 16.2960, lng: 80.4340 },
          { name: "Shivaji Nagar", lat: 16.3130, lng: 80.4480 },
        ],
      },
      {
        name: "Kadapa (YSR)", lat: 14.4674, lng: 78.8241,
        colonies: [
          { name: "Ganesh Nagar", lat: 14.4700, lng: 78.8280 },
          { name: "Balaji Nagar", lat: 14.4650, lng: 78.8200 },
          { name: "Railway Station Area", lat: 14.4720, lng: 78.8190 },
          { name: "Ayyappa Nagar", lat: 14.4630, lng: 78.8310 },
          { name: "Gayathri Nagar", lat: 14.4750, lng: 78.8260 },
          { name: "Old Town", lat: 14.4680, lng: 78.8220 },
          { name: "Proddatur Road", lat: 14.4600, lng: 78.8150 },
          { name: "Rajiv Nagar", lat: 14.4710, lng: 78.8340 },
          { name: "Market Area", lat: 14.4690, lng: 78.8250 },
          { name: "NGO Colony", lat: 14.4740, lng: 78.8300 },
        ],
      },
      {
        name: "Krishna (Vijayawada)", lat: 16.5062, lng: 80.6480,
        colonies: [
          { name: "Benz Circle", lat: 16.5100, lng: 80.6300 },
          { name: "Governorpet", lat: 16.5150, lng: 80.6200 },
          { name: "Labbipet", lat: 16.5080, lng: 80.6350 },
          { name: "Moghalrajpuram", lat: 16.5200, lng: 80.6400 },
          { name: "Patamata", lat: 16.5020, lng: 80.6550 },
          { name: "Auto Nagar", lat: 16.4980, lng: 80.6700 },
          { name: "Prasadampadu", lat: 16.4950, lng: 80.6100 },
          { name: "Gunadala", lat: 16.5250, lng: 80.6350 },
          { name: "Siddhartha Nagar", lat: 16.5050, lng: 80.6250 },
          { name: "MG Road Area", lat: 16.5120, lng: 80.6280 },
          { name: "Kanuru", lat: 16.4900, lng: 80.6650 },
          { name: "Poranki", lat: 16.5300, lng: 80.5950 },
        ],
      },
      {
        name: "Kurnool", lat: 15.8281, lng: 78.0373,
        colonies: [
          { name: "Ashok Nagar", lat: 15.8310, lng: 78.0400 },
          { name: "Bhagya Nagar", lat: 15.8260, lng: 78.0340 },
          { name: "Gandhi Nagar", lat: 15.8350, lng: 78.0420 },
          { name: "Kothapet", lat: 15.8240, lng: 78.0300 },
          { name: "Budhawarpet", lat: 15.8290, lng: 78.0380 },
          { name: "Venkateswara Nagar", lat: 15.8330, lng: 78.0350 },
          { name: "Old City", lat: 15.8270, lng: 78.0410 },
          { name: "Nandyal Road", lat: 15.8200, lng: 78.0450 },
          { name: "Bellary Road", lat: 15.8380, lng: 78.0320 },
          { name: "Station Road", lat: 15.8300, lng: 78.0370 },
        ],
      },
      {
        name: "Nellore (Potti Sriramulu)", lat: 14.4426, lng: 79.9865,
        colonies: [
          { name: "Grand Trunk Road", lat: 14.4450, lng: 79.9900 },
          { name: "Magunta Layout", lat: 14.4400, lng: 79.9830 },
          { name: "Balaji Nagar", lat: 14.4480, lng: 79.9920 },
          { name: "Stonehouse Pet", lat: 14.4370, lng: 79.9850 },
          { name: "Vedayapalem", lat: 14.4500, lng: 79.9880 },
          { name: "Dargamitta", lat: 14.4350, lng: 79.9810 },
          { name: "Muthukur Road", lat: 14.4530, lng: 79.9950 },
          { name: "Trunk Road Junction", lat: 14.4420, lng: 79.9870 },
          { name: "Santhapet", lat: 14.4390, lng: 79.9840 },
          { name: "Ramji Nagar", lat: 14.4460, lng: 79.9930 },
        ],
      },
      {
        name: "Prakasam (Ongole)", lat: 15.5057, lng: 80.0499,
        colonies: [
          { name: "Kurnool Road", lat: 15.5090, lng: 80.0530 },
          { name: "Bhagya Nagar", lat: 15.5030, lng: 80.0470 },
          { name: "Addanki Road", lat: 15.5120, lng: 80.0560 },
          { name: "Mangamuru Road", lat: 15.5000, lng: 80.0440 },
          { name: "Court Centre", lat: 15.5060, lng: 80.0510 },
          { name: "Sai Nagar", lat: 15.5080, lng: 80.0480 },
          { name: "Gandhi Nagar", lat: 15.5040, lng: 80.0520 },
          { name: "Industrial Area", lat: 15.5150, lng: 80.0580 },
          { name: "Bypass Road", lat: 15.4970, lng: 80.0420 },
          { name: "Old Bus Stand Area", lat: 15.5070, lng: 80.0500 },
        ],
      },
      {
        name: "Srikakulam", lat: 18.2949, lng: 83.8938,
        colonies: [
          { name: "Gandhi Nagar", lat: 18.2980, lng: 83.8960 },
          { name: "Arasavilli Road", lat: 18.2920, lng: 83.8910 },
          { name: "Balaga", lat: 18.3010, lng: 83.8980 },
          { name: "Ambedkar Nagar", lat: 18.2900, lng: 83.8890 },
          { name: "Veerabhadrapuram", lat: 18.3040, lng: 83.9000 },
          { name: "Palakonda Road", lat: 18.2870, lng: 83.8870 },
          { name: "Bus Stand Area", lat: 18.2960, lng: 83.8940 },
          { name: "Tilak Nagar", lat: 18.2990, lng: 83.8950 },
        ],
      },
      {
        name: "Visakhapatnam", lat: 17.6868, lng: 83.2185,
        colonies: [
          { name: "MVP Colony", lat: 17.7250, lng: 83.3150 },
          { name: "Seethammadhara", lat: 17.7310, lng: 83.3050 },
          { name: "Dwaraka Nagar", lat: 17.7200, lng: 83.3000 },
          { name: "Gajuwaka", lat: 17.7000, lng: 83.2100 },
          { name: "Madhurawada", lat: 17.7800, lng: 83.3700 },
          { name: "Pendurthi", lat: 17.7500, lng: 83.2500 },
          { name: "Rushikonda", lat: 17.7600, lng: 83.3850 },
          { name: "Asilmetta", lat: 17.7150, lng: 83.2950 },
          { name: "Akkayyapalem", lat: 17.7280, lng: 83.3100 },
          { name: "Simhachalam", lat: 17.7700, lng: 83.2450 },
          { name: "Waltair", lat: 17.7180, lng: 83.3200 },
          { name: "NAD Junction", lat: 17.7100, lng: 83.2300 },
          { name: "PM Palem", lat: 17.7500, lng: 83.3400 },
          { name: "Yendada", lat: 17.7550, lng: 83.3800 },
          { name: "Murali Nagar", lat: 17.7350, lng: 83.3200 },
        ],
      },
      {
        name: "Vizianagaram", lat: 18.1067, lng: 83.3956,
        colonies: [
          { name: "Fort Area", lat: 18.1090, lng: 83.3970 },
          { name: "Cantonment", lat: 18.1050, lng: 83.3930 },
          { name: "Chinna Veedhi", lat: 18.1120, lng: 83.4000 },
          { name: "Pedda Veedhi", lat: 18.1030, lng: 83.3910 },
          { name: "Kothavalasa Road", lat: 18.1150, lng: 83.4020 },
          { name: "Gandhi Nagar", lat: 18.1080, lng: 83.3960 },
          { name: "Narava Road", lat: 18.1010, lng: 83.3890 },
          { name: "AG Road", lat: 18.1100, lng: 83.3980 },
        ],
      },
      {
        name: "West Godavari (Eluru)", lat: 16.7107, lng: 81.0952,
        colonies: [
          { name: "Powerpet", lat: 16.7130, lng: 81.0980 },
          { name: "Ashok Nagar", lat: 16.7080, lng: 81.0920 },
          { name: "Gayathri Nagar", lat: 16.7160, lng: 81.1010 },
          { name: "Head Post Office Area", lat: 16.7100, lng: 81.0950 },
          { name: "Nehru Nagar", lat: 16.7050, lng: 81.0900 },
          { name: "R.R. Pet", lat: 16.7150, lng: 81.0970 },
          { name: "Housing Board Colony", lat: 16.7060, lng: 81.0940 },
          { name: "Danavaipeta", lat: 16.7120, lng: 81.0990 },
          { name: "Railway Station Road", lat: 16.7090, lng: 81.0930 },
          { name: "Ramakrishna Nagar", lat: 16.7140, lng: 81.1000 },
        ],
      },
      {
        name: "Tirupati", lat: 13.6288, lng: 79.4192,
        colonies: [
          { name: "Tirumala", lat: 13.6833, lng: 79.3475 },
          { name: "Bairagipatteda", lat: 13.6350, lng: 79.4150 },
          { name: "Renigunta Road", lat: 13.6200, lng: 79.4250 },
          { name: "Mangalam", lat: 13.6320, lng: 79.4100 },
          { name: "Tilak Road", lat: 13.6280, lng: 79.4200 },
          { name: "Korlagunta", lat: 13.6380, lng: 79.4230 },
          { name: "AIR Bypass Road", lat: 13.6250, lng: 79.4080 },
          { name: "Alipiri", lat: 13.6400, lng: 79.4050 },
          { name: "Balaji Colony", lat: 13.6300, lng: 79.4180 },
          { name: "Tata Nagar", lat: 13.6220, lng: 79.4220 },
        ],
      },
      {
        name: "Rajahmundry (East Godavari)", lat: 17.0005, lng: 81.8040,
        colonies: [
          { name: "Danavaipeta", lat: 17.0030, lng: 81.8060 },
          { name: "Innispeta", lat: 16.9980, lng: 81.8020 },
          { name: "Morampudi", lat: 17.0060, lng: 81.8100 },
          { name: "Lalacheruvu", lat: 16.9960, lng: 81.8000 },
          { name: "Kambala Cheruvu", lat: 17.0080, lng: 81.8080 },
          { name: "Pushkar Ghat", lat: 17.0010, lng: 81.8040 },
          { name: "Tilak Road Area", lat: 16.9990, lng: 81.8050 },
          { name: "Devi Chowk", lat: 17.0040, lng: 81.8070 },
          { name: "Jawaharlal Nagar", lat: 16.9950, lng: 81.7980 },
          { name: "Syamala Nagar", lat: 17.0070, lng: 81.8110 },
        ],
      },
      {
        name: "Eluru (West Godavari)", lat: 16.7107, lng: 81.0952,
        colonies: [
          { name: "Powerpet", lat: 16.7130, lng: 81.0980 },
          { name: "R.R.Pet", lat: 16.7060, lng: 81.0920 },
          { name: "Head Post Office", lat: 16.7100, lng: 81.0950 },
          { name: "Ashok Nagar", lat: 16.7080, lng: 81.0910 },
          { name: "Housing Board", lat: 16.7150, lng: 81.1000 },
        ],
      },
      {
        name: "Kakinada", lat: 16.9891, lng: 82.2475,
        colonies: [
          { name: "Jagannaickpur", lat: 16.9920, lng: 82.2400 },
          { name: "Bhanugudi", lat: 16.9950, lng: 82.2500 },
          { name: "Suryaraopeta", lat: 16.9870, lng: 82.2380 },
          { name: "Gandhinagar", lat: 16.9990, lng: 82.2550 },
          { name: "Ramanayyapeta", lat: 16.9830, lng: 82.2420 },
        ],
      },
      {
        name: "Nandyal", lat: 15.4786, lng: 78.4836,
        colonies: [
          { name: "Gandhi Chowk", lat: 15.4810, lng: 78.4860 },
          { name: "Srinivasa Nagar", lat: 15.4760, lng: 78.4810 },
          { name: "SBI Colony", lat: 15.4830, lng: 78.4880 },
          { name: "Padmavathi Nagar", lat: 15.4740, lng: 78.4790 },
          { name: "Bus Stand Area", lat: 15.4800, lng: 78.4840 },
          { name: "Railway Station Road", lat: 15.4820, lng: 78.4870 },
          { name: "Market Area", lat: 15.4770, lng: 78.4820 },
          { name: "Bypass Road", lat: 15.4850, lng: 78.4900 },
        ],
      },
      {
        name: "Machilipatnam (Krishna)", lat: 16.1875, lng: 81.1389,
        colonies: [
          { name: "Chilakalapudi", lat: 16.1900, lng: 81.1410 },
          { name: "Raja Rajeshwari Pet", lat: 16.1850, lng: 81.1360 },
          { name: "Gudimetla", lat: 16.1920, lng: 81.1430 },
          { name: "Bus Stand Area", lat: 16.1870, lng: 81.1390 },
          { name: "Beach Road", lat: 16.1830, lng: 81.1350 },
        ],
      },
      {
        name: "Ongole", lat: 15.5057, lng: 80.0499,
        colonies: [
          { name: "Kurnool Road", lat: 15.5090, lng: 80.0530 },
          { name: "Bhagya Nagar", lat: 15.5030, lng: 80.0470 },
          { name: "Addanki Road", lat: 15.5120, lng: 80.0560 },
          { name: "Mangamuru Road", lat: 15.5000, lng: 80.0440 },
          { name: "Court Centre", lat: 15.5060, lng: 80.0510 },
        ],
      },
      {
        name: "Adoni", lat: 15.6322, lng: 77.2740,
        colonies: [
          { name: "Fort Area", lat: 15.6350, lng: 77.2760 },
          { name: "Gandhi Nagar", lat: 15.6300, lng: 77.2720 },
          { name: "Main Bazaar", lat: 15.6330, lng: 77.2750 },
          { name: "Station Road", lat: 15.6280, lng: 77.2700 },
          { name: "Nehru Nagar", lat: 15.6370, lng: 77.2780 },
        ],
      },
      {
        name: "Hindupur", lat: 13.8296, lng: 77.4911,
        colonies: [
          { name: "Mukkidipeta", lat: 13.8320, lng: 77.4930 },
          { name: "Bathalapalli Road", lat: 13.8270, lng: 77.4890 },
          { name: "RTC Stand Area", lat: 13.8300, lng: 77.4920 },
          { name: "Nijalingappa Colony", lat: 13.8250, lng: 77.4870 },
          { name: "Penukonda Road", lat: 13.8340, lng: 77.4950 },
        ],
      },
      {
        name: "Tenali", lat: 16.2390, lng: 80.6400,
        colonies: [
          { name: "Gandhi Road", lat: 16.2410, lng: 80.6420 },
          { name: "Station Area", lat: 16.2370, lng: 80.6380 },
          { name: "Bose Nagar", lat: 16.2430, lng: 80.6440 },
          { name: "Market Area", lat: 16.2390, lng: 80.6400 },
          { name: "Durga Agraharam", lat: 16.2350, lng: 80.6360 },
        ],
      },
      {
        name: "Proddatur", lat: 14.7502, lng: 78.5481,
        colonies: [
          { name: "Gandhi Chowk", lat: 14.7530, lng: 78.5510 },
          { name: "Clock Tower", lat: 14.7480, lng: 78.5460 },
          { name: "Rajiv Nagar", lat: 14.7550, lng: 78.5530 },
          { name: "Old Town", lat: 14.7510, lng: 78.5490 },
          { name: "Bypass Road", lat: 14.7460, lng: 78.5440 },
        ],
      },
      {
        name: "Tadepalligudem", lat: 16.8108, lng: 81.5268,
        colonies: [
          { name: "Main Road", lat: 16.8130, lng: 81.5290 },
          { name: "Station Road", lat: 16.8090, lng: 81.5250 },
          { name: "Gandhi Nagar", lat: 16.8150, lng: 81.5310 },
          { name: "Ambedkar Road", lat: 16.8070, lng: 81.5230 },
          { name: "Market Area", lat: 16.8110, lng: 81.5270 },
        ],
      },
      {
        name: "Amalapuram", lat: 16.5788, lng: 82.0044,
        colonies: [
          { name: "Main Road", lat: 16.5810, lng: 82.0060 },
          { name: "Narsapuram Road", lat: 16.5770, lng: 82.0020 },
          { name: "Canal Road", lat: 16.5830, lng: 82.0080 },
          { name: "Bus Stand Area", lat: 16.5790, lng: 82.0040 },
          { name: "Court Area", lat: 16.5750, lng: 82.0010 },
        ],
      },
    ],
  },
  {
    name: "Arunachal Pradesh",
    cities: [
      {
        name: "Itanagar", lat: 27.0844, lng: 93.6053,
        colonies: [
          { name: "Naharlagun", lat: 27.1030, lng: 93.6940 },
          { name: "Ganga Market", lat: 27.0860, lng: 93.6070 },
          { name: "Bank Tinali", lat: 27.0880, lng: 93.6100 },
          { name: "Niti Vihar", lat: 27.0820, lng: 93.6030 },
          { name: "Chimpu", lat: 27.0750, lng: 93.5980 },
        ],
      },
      {
        name: "Tawang", lat: 27.5860, lng: 91.8600,
        colonies: [
          { name: "Old Market", lat: 27.5880, lng: 91.8620 },
          { name: "Craft Centre", lat: 27.5840, lng: 91.8580 },
          { name: "Monastery Area", lat: 27.5900, lng: 91.8640 },
        ],
      },
    ],
  },
  {
    name: "Assam",
    cities: [
      {
        name: "Guwahati", lat: 26.1445, lng: 91.7362,
        colonies: [
          { name: "Ganeshguri", lat: 26.1540, lng: 91.7700 },
          { name: "Paltan Bazaar", lat: 26.1460, lng: 91.7350 },
          { name: "Zoo Road", lat: 26.1550, lng: 91.7500 },
          { name: "Dispur", lat: 26.1400, lng: 91.7880 },
          { name: "Beltola", lat: 26.1280, lng: 91.7820 },
          { name: "Chandmari", lat: 26.1650, lng: 91.7550 },
          { name: "Six Mile", lat: 26.1250, lng: 91.8020 },
          { name: "Maligaon", lat: 26.1580, lng: 91.7150 },
        ],
      },
      {
        name: "Dibrugarh", lat: 27.4728, lng: 94.9120,
        colonies: [
          { name: "AT Road", lat: 27.4750, lng: 94.9150 },
          { name: "Chowkidinghee", lat: 27.4710, lng: 94.9090 },
          { name: "Graham Bazaar", lat: 27.4780, lng: 94.9180 },
          { name: "HS Road", lat: 27.4690, lng: 94.9060 },
        ],
      },
      {
        name: "Silchar", lat: 24.8333, lng: 92.7789,
        colonies: [
          { name: "Tarapur", lat: 24.8360, lng: 92.7810 },
          { name: "Ambicapatty", lat: 24.8310, lng: 92.7770 },
          { name: "Rangirkhari", lat: 24.8390, lng: 92.7830 },
          { name: "Meherpur", lat: 24.8280, lng: 92.7750 },
        ],
      },
    ],
  },
  {
    name: "Bihar",
    cities: [
      {
        name: "Patna", lat: 25.6093, lng: 85.1376,
        colonies: [
          { name: "Boring Road", lat: 25.6100, lng: 85.1300 },
          { name: "Kankarbagh", lat: 25.5950, lng: 85.1500 },
          { name: "Rajendra Nagar", lat: 25.5850, lng: 85.1100 },
          { name: "Gandhi Maidan", lat: 25.6120, lng: 85.1450 },
          { name: "Patna Junction", lat: 25.6080, lng: 85.1380 },
          { name: "Bailey Road", lat: 25.6200, lng: 85.1200 },
          { name: "Danapur", lat: 25.6250, lng: 85.0550 },
          { name: "Anisabad", lat: 25.6180, lng: 85.1600 },
        ],
      },
      {
        name: "Gaya", lat: 24.7955, lng: 84.9994,
        colonies: [
          { name: "Station Road", lat: 24.7980, lng: 85.0020 },
          { name: "Bodh Gaya Road", lat: 24.7930, lng: 84.9970 },
          { name: "Swarajpuri", lat: 24.8000, lng: 85.0050 },
          { name: "GB Road", lat: 24.7910, lng: 84.9950 },
        ],
      },
      {
        name: "Muzaffarpur", lat: 26.1209, lng: 85.3647,
        colonies: [
          { name: "Mithanpura", lat: 26.1230, lng: 85.3670 },
          { name: "Station Road", lat: 26.1190, lng: 85.3620 },
          { name: "Jubba Sahni Park", lat: 26.1250, lng: 85.3690 },
          { name: "Saraiyaganj", lat: 26.1170, lng: 85.3600 },
        ],
      },
      {
        name: "Bhagalpur", lat: 25.2425, lng: 86.9842,
        colonies: [
          { name: "Khalifabagh", lat: 25.2450, lng: 86.9860 },
          { name: "Tatarpur", lat: 25.2400, lng: 86.9820 },
          { name: "University Road", lat: 25.2470, lng: 86.9880 },
        ],
      },
    ],
  },
  {
    name: "Chhattisgarh",
    cities: [
      {
        name: "Raipur", lat: 21.2514, lng: 81.6296,
        colonies: [
          { name: "Telibandha", lat: 21.2450, lng: 81.6350 },
          { name: "Shankar Nagar", lat: 21.2550, lng: 81.6200 },
          { name: "Civil Lines", lat: 21.2600, lng: 81.6300 },
          { name: "Devendra Nagar", lat: 21.2400, lng: 81.6400 },
          { name: "Byron Bazar", lat: 21.2500, lng: 81.6250 },
          { name: "Pandri", lat: 21.2350, lng: 81.6350 },
        ],
      },
      {
        name: "Bhilai", lat: 21.2094, lng: 81.3784,
        colonies: [
          { name: "Sector 1", lat: 21.2120, lng: 81.3800 },
          { name: "Nehru Nagar", lat: 21.2070, lng: 81.3760 },
          { name: "Supela", lat: 21.2150, lng: 81.3830 },
          { name: "Junwani", lat: 21.2040, lng: 81.3740 },
        ],
      },
      {
        name: "Bilaspur", lat: 22.0797, lng: 82.1409,
        colonies: [
          { name: "Vyapar Vihar", lat: 22.0820, lng: 82.1430 },
          { name: "Mangala", lat: 22.0770, lng: 82.1380 },
          { name: "Sarkanda", lat: 22.0850, lng: 82.1460 },
          { name: "Torwa", lat: 22.0740, lng: 82.1350 },
        ],
      },
    ],
  },
  {
    name: "Delhi NCR",
    cities: [
      {
        name: "New Delhi", lat: 28.6139, lng: 77.2090,
        colonies: [
          { name: "Connaught Place", lat: 28.6315, lng: 77.2167 },
          { name: "Dwarka", lat: 28.5921, lng: 77.0460 },
          { name: "Rohini", lat: 28.7495, lng: 77.0565 },
          { name: "Saket", lat: 28.5245, lng: 77.2066 },
          { name: "Vasant Kunj", lat: 28.5200, lng: 77.1539 },
          { name: "Pitampura", lat: 28.6993, lng: 77.1316 },
          { name: "Lajpat Nagar", lat: 28.5677, lng: 77.2433 },
          { name: "Janakpuri", lat: 28.6219, lng: 77.0811 },
          { name: "Karol Bagh", lat: 28.6514, lng: 77.1907 },
          { name: "Defence Colony", lat: 28.5735, lng: 77.2311 },
          { name: "Green Park", lat: 28.5588, lng: 77.2069 },
          { name: "Nehru Place", lat: 28.5491, lng: 77.2533 },
        ],
      },
      {
        name: "Gurgaon", lat: 28.4595, lng: 77.0266,
        colonies: [
          { name: "DLF Phase 1", lat: 28.4722, lng: 77.0928 },
          { name: "Cyber City", lat: 28.4941, lng: 77.0888 },
          { name: "Sohna Road", lat: 28.4174, lng: 77.0581 },
          { name: "Golf Course Road", lat: 28.4494, lng: 77.0810 },
          { name: "Sector 56", lat: 28.4215, lng: 77.0940 },
          { name: "MG Road", lat: 28.4800, lng: 77.0700 },
        ],
      },
      {
        name: "Noida", lat: 28.5355, lng: 77.3910,
        colonies: [
          { name: "Sector 18", lat: 28.5706, lng: 77.3217 },
          { name: "Sector 62", lat: 28.6270, lng: 77.3649 },
          { name: "Greater Noida", lat: 28.4744, lng: 77.5040 },
          { name: "Sector 137", lat: 28.5174, lng: 77.3930 },
          { name: "Sector 44", lat: 28.5500, lng: 77.3400 },
        ],
      },
      {
        name: "Faridabad", lat: 28.4089, lng: 77.3178,
        colonies: [
          { name: "NIT", lat: 28.3800, lng: 77.3100 },
          { name: "Sector 15", lat: 28.3900, lng: 77.3200 },
          { name: "Ballabgarh", lat: 28.3400, lng: 77.3200 },
          { name: "Old Faridabad", lat: 28.4120, lng: 77.3100 },
        ],
      },
    ],
  },
  {
    name: "Goa",
    cities: [
      {
        name: "Panaji", lat: 15.4909, lng: 73.8278,
        colonies: [
          { name: "Panjim City", lat: 15.4980, lng: 73.8300 },
          { name: "Dona Paula", lat: 15.4600, lng: 73.8050 },
          { name: "Miramar", lat: 15.4700, lng: 73.8100 },
          { name: "Caranzalem", lat: 15.4650, lng: 73.8130 },
          { name: "Taleigao", lat: 15.4550, lng: 73.8350 },
        ],
      },
      {
        name: "Margao", lat: 15.2832, lng: 73.9862,
        colonies: [
          { name: "City Centre", lat: 15.2850, lng: 73.9880 },
          { name: "Aquem", lat: 15.2800, lng: 73.9830 },
          { name: "Fatorda", lat: 15.2900, lng: 73.9900 },
          { name: "Navelim", lat: 15.2750, lng: 73.9810 },
        ],
      },
      {
        name: "Vasco da Gama", lat: 15.3982, lng: 73.8113,
        colonies: [
          { name: "Baina", lat: 15.4000, lng: 73.8050 },
          { name: "Chicalim", lat: 15.3900, lng: 73.8200 },
          { name: "Mangor Hill", lat: 15.4050, lng: 73.8100 },
        ],
      },
    ],
  },
  {
    name: "Gujarat",
    cities: [
      {
        name: "Ahmedabad", lat: 23.0225, lng: 72.5714,
        colonies: [
          { name: "SG Highway", lat: 23.0469, lng: 72.5300 },
          { name: "Prahlad Nagar", lat: 23.0132, lng: 72.5153 },
          { name: "Navrangpura", lat: 23.0395, lng: 72.5604 },
          { name: "Satellite", lat: 23.0204, lng: 72.5274 },
          { name: "Bopal", lat: 22.9792, lng: 72.4655 },
          { name: "CG Road", lat: 23.0350, lng: 72.5600 },
          { name: "Vastrapur", lat: 23.0350, lng: 72.5300 },
          { name: "Maninagar", lat: 23.0050, lng: 72.6000 },
        ],
      },
      {
        name: "Surat", lat: 21.1702, lng: 72.8311,
        colonies: [
          { name: "Adajan", lat: 21.1867, lng: 72.7951 },
          { name: "Vesu", lat: 21.1550, lng: 72.7760 },
          { name: "Athwa", lat: 21.1752, lng: 72.8110 },
          { name: "Piplod", lat: 21.1604, lng: 72.7893 },
          { name: "Varachha", lat: 21.2100, lng: 72.8600 },
          { name: "Katargam", lat: 21.2200, lng: 72.8300 },
        ],
      },
      {
        name: "Vadodara", lat: 22.3072, lng: 73.1812,
        colonies: [
          { name: "Alkapuri", lat: 22.3100, lng: 73.1700 },
          { name: "Fatehgunj", lat: 22.3200, lng: 73.1850 },
          { name: "Karelibaug", lat: 22.3300, lng: 73.2000 },
          { name: "Manjalpur", lat: 22.2800, lng: 73.1900 },
          { name: "Gotri", lat: 22.3150, lng: 73.1500 },
        ],
      },
      {
        name: "Rajkot", lat: 22.3039, lng: 70.8022,
        colonies: [
          { name: "Kalawad Road", lat: 22.3100, lng: 70.7900 },
          { name: "University Road", lat: 22.3000, lng: 70.8100 },
          { name: "150 Feet Ring Road", lat: 22.2900, lng: 70.7800 },
          { name: "Yagnik Road", lat: 22.3050, lng: 70.8000 },
        ],
      },
    ],
  },
  {
    name: "Haryana",
    cities: [
      {
        name: "Chandigarh", lat: 30.7333, lng: 76.7794,
        colonies: [
          { name: "Sector 17", lat: 30.7420, lng: 76.7800 },
          { name: "Sector 22", lat: 30.7350, lng: 76.7750 },
          { name: "Sector 35", lat: 30.7200, lng: 76.7600 },
          { name: "Sector 43", lat: 30.7250, lng: 76.7700 },
          { name: "Panchkula", lat: 30.6942, lng: 76.8606 },
        ],
      },
      {
        name: "Ambala", lat: 30.3782, lng: 76.7767,
        colonies: [
          { name: "Ambala Cantt", lat: 30.3600, lng: 76.8200 },
          { name: "Ambala City", lat: 30.3780, lng: 76.7770 },
          { name: "Sadar Bazar", lat: 30.3650, lng: 76.8100 },
        ],
      },
      {
        name: "Karnal", lat: 29.6857, lng: 76.9905,
        colonies: [
          { name: "Sector 6", lat: 29.6900, lng: 76.9950 },
          { name: "Model Town", lat: 29.6800, lng: 76.9850 },
          { name: "NDRI Area", lat: 29.7000, lng: 77.0000 },
        ],
      },
      {
        name: "Panipat", lat: 29.3909, lng: 76.9635,
        colonies: [
          { name: "GT Road", lat: 29.3930, lng: 76.9660 },
          { name: "Model Town", lat: 29.3880, lng: 76.9610 },
          { name: "Sector 25", lat: 29.3960, lng: 76.9690 },
        ],
      },
    ],
  },
  {
    name: "Himachal Pradesh",
    cities: [
      {
        name: "Shimla", lat: 31.1048, lng: 77.1734,
        colonies: [
          { name: "Mall Road", lat: 31.1050, lng: 77.1700 },
          { name: "Lakkar Bazaar", lat: 31.1070, lng: 77.1680 },
          { name: "Sanjauli", lat: 31.0980, lng: 77.1900 },
          { name: "Chhota Shimla", lat: 31.0950, lng: 77.1800 },
          { name: "Totu", lat: 31.0900, lng: 77.1600 },
        ],
      },
      {
        name: "Manali", lat: 32.2432, lng: 77.1892,
        colonies: [
          { name: "Old Manali", lat: 32.2550, lng: 77.1850 },
          { name: "Mall Road", lat: 32.2450, lng: 77.1900 },
          { name: "Aleo", lat: 32.2350, lng: 77.1800 },
        ],
      },
      {
        name: "Dharamshala", lat: 32.2190, lng: 76.3234,
        colonies: [
          { name: "McLeod Ganj", lat: 32.2426, lng: 76.3213 },
          { name: "Kotwali Bazaar", lat: 32.2200, lng: 76.3240 },
          { name: "Bhagsu Nag", lat: 32.2460, lng: 76.3280 },
        ],
      },
    ],
  },
  {
    name: "Jharkhand",
    cities: [
      {
        name: "Ranchi", lat: 23.3441, lng: 85.3096,
        colonies: [
          { name: "Main Road", lat: 23.3550, lng: 85.3350 },
          { name: "Lalpur", lat: 23.3600, lng: 85.3250 },
          { name: "Doranda", lat: 23.3350, lng: 85.3400 },
          { name: "Bariatu", lat: 23.3700, lng: 85.3200 },
          { name: "Kanke Road", lat: 23.3800, lng: 85.3100 },
          { name: "Ashok Nagar", lat: 23.3500, lng: 85.3300 },
        ],
      },
      {
        name: "Jamshedpur", lat: 22.8046, lng: 86.2029,
        colonies: [
          { name: "Bistupur", lat: 22.7850, lng: 86.2100 },
          { name: "Sakchi", lat: 22.7900, lng: 86.2000 },
          { name: "Sonari", lat: 22.8000, lng: 86.1850 },
          { name: "Kadma", lat: 22.7700, lng: 86.2200 },
          { name: "Telco Area", lat: 22.7600, lng: 86.1750 },
        ],
      },
      {
        name: "Dhanbad", lat: 23.7957, lng: 86.4304,
        colonies: [
          { name: "Bank More", lat: 23.7980, lng: 86.4330 },
          { name: "Hirapur", lat: 23.7930, lng: 86.4270 },
          { name: "Saraidhela", lat: 23.8010, lng: 86.4360 },
        ],
      },
    ],
  },
  {
    name: "Karnataka",
    cities: [
      {
        name: "Bengaluru", lat: 12.9716, lng: 77.5946,
        colonies: [
          { name: "Koramangala", lat: 12.9352, lng: 77.6245 },
          { name: "Indiranagar", lat: 12.9784, lng: 77.6408 },
          { name: "Whitefield", lat: 12.9698, lng: 77.7500 },
          { name: "HSR Layout", lat: 12.9121, lng: 77.6446 },
          { name: "Electronic City", lat: 12.8440, lng: 77.6700 },
          { name: "Jayanagar", lat: 12.9308, lng: 77.5838 },
          { name: "Malleshwaram", lat: 13.0035, lng: 77.5710 },
          { name: "Bannerghatta Road", lat: 12.8896, lng: 77.5968 },
          { name: "Marathahalli", lat: 12.9591, lng: 77.7010 },
          { name: "Hebbal", lat: 13.0358, lng: 77.5970 },
          { name: "Yelahanka", lat: 13.1005, lng: 77.5940 },
          { name: "BTM Layout", lat: 12.9166, lng: 77.6101 },
        ],
      },
      {
        name: "Mysuru", lat: 12.2958, lng: 76.6394,
        colonies: [
          { name: "Vijayanagar", lat: 12.3050, lng: 76.6200 },
          { name: "Kuvempunagar", lat: 12.2900, lng: 76.6300 },
          { name: "Saraswathipuram", lat: 12.3100, lng: 76.6450 },
          { name: "Gokulam", lat: 12.3150, lng: 76.6350 },
          { name: "JP Nagar", lat: 12.2850, lng: 76.6500 },
        ],
      },
      {
        name: "Hubli-Dharwad", lat: 15.3647, lng: 75.1240,
        colonies: [
          { name: "Vidyanagar", lat: 15.3700, lng: 75.1280 },
          { name: "Gokul Road", lat: 15.3600, lng: 75.1200 },
          { name: "Keshwapur", lat: 15.3750, lng: 75.1350 },
          { name: "Deshpande Nagar", lat: 15.3550, lng: 75.1150 },
        ],
      },
      {
        name: "Mangaluru", lat: 12.9141, lng: 74.8560,
        colonies: [
          { name: "Hampankatta", lat: 12.8720, lng: 74.8430 },
          { name: "Kadri", lat: 12.8850, lng: 74.8500 },
          { name: "Bejai", lat: 12.8900, lng: 74.8350 },
          { name: "Kankanady", lat: 12.8780, lng: 74.8550 },
        ],
      },
      {
        name: "Belagavi", lat: 15.8497, lng: 74.4977,
        colonies: [
          { name: "Camp Area", lat: 15.8550, lng: 74.5050 },
          { name: "Shahapur", lat: 15.8450, lng: 74.4920 },
          { name: "Tilakwadi", lat: 15.8600, lng: 74.5100 },
          { name: "Maratha Colony", lat: 15.8400, lng: 74.4900 },
        ],
      },
    ],
  },
  {
    name: "Kerala",
    cities: [
      {
        name: "Thiruvananthapuram", lat: 8.5241, lng: 76.9366,
        colonies: [
          { name: "Kowdiar", lat: 8.5150, lng: 76.9200 },
          { name: "Pattom", lat: 8.5200, lng: 76.9400 },
          { name: "Vellayambalam", lat: 8.5100, lng: 76.9350 },
          { name: "Kazhakkoottam", lat: 8.5550, lng: 76.8800 },
          { name: "Technopark", lat: 8.5570, lng: 76.8760 },
          { name: "Kesavadasapuram", lat: 8.5050, lng: 76.9280 },
        ],
      },
      {
        name: "Kochi", lat: 9.9312, lng: 76.2673,
        colonies: [
          { name: "Marine Drive", lat: 9.9816, lng: 76.2752 },
          { name: "Edappally", lat: 10.0261, lng: 76.3125 },
          { name: "Kakkanad", lat: 10.0159, lng: 76.3419 },
          { name: "Fort Kochi", lat: 9.9639, lng: 76.2441 },
          { name: "Aluva", lat: 10.1004, lng: 76.3574 },
          { name: "Kaloor", lat: 9.9950, lng: 76.2950 },
          { name: "MG Road", lat: 9.9750, lng: 76.2830 },
          { name: "Infopark", lat: 10.0100, lng: 76.3550 },
        ],
      },
      {
        name: "Kozhikode", lat: 11.2588, lng: 75.7804,
        colonies: [
          { name: "Mananchira", lat: 11.2600, lng: 75.7820 },
          { name: "Nadakkavu", lat: 11.2550, lng: 75.7780 },
          { name: "Beach Road", lat: 11.2500, lng: 75.7700 },
          { name: "Palayam", lat: 11.2650, lng: 75.7850 },
          { name: "Cyber Park", lat: 11.2800, lng: 75.7900 },
        ],
      },
      {
        name: "Thrissur", lat: 10.5276, lng: 76.2144,
        colonies: [
          { name: "Swaraj Round", lat: 10.5280, lng: 76.2150 },
          { name: "Punkunnam", lat: 10.5350, lng: 76.2100 },
          { name: "Ayyanthole", lat: 10.5200, lng: 76.2200 },
          { name: "Kuttanellur", lat: 10.5400, lng: 76.2050 },
        ],
      },
    ],
  },
  {
    name: "Madhya Pradesh",
    cities: [
      {
        name: "Bhopal", lat: 23.2599, lng: 77.4126,
        colonies: [
          { name: "MP Nagar", lat: 23.2330, lng: 77.4320 },
          { name: "Arera Colony", lat: 23.2200, lng: 77.4400 },
          { name: "New Market", lat: 23.2380, lng: 77.4100 },
          { name: "Kolar Road", lat: 23.1900, lng: 77.4300 },
          { name: "Hoshangabad Road", lat: 23.2100, lng: 77.4500 },
          { name: "Habibganj", lat: 23.2300, lng: 77.4380 },
        ],
      },
      {
        name: "Indore", lat: 22.7196, lng: 75.8577,
        colonies: [
          { name: "Vijay Nagar", lat: 22.7500, lng: 75.8900 },
          { name: "Palasia", lat: 22.7250, lng: 75.8700 },
          { name: "MG Road", lat: 22.7200, lng: 75.8600 },
          { name: "Rajwada", lat: 22.7180, lng: 75.8550 },
          { name: "AB Road", lat: 22.7100, lng: 75.8500 },
          { name: "Bhawarkua", lat: 22.7350, lng: 75.8650 },
        ],
      },
      {
        name: "Jabalpur", lat: 23.1815, lng: 79.9864,
        colonies: [
          { name: "Wright Town", lat: 23.1700, lng: 79.9500 },
          { name: "Civil Lines", lat: 23.1800, lng: 79.9700 },
          { name: "Napier Town", lat: 23.1750, lng: 79.9600 },
          { name: "Madan Mahal", lat: 23.1650, lng: 79.9400 },
        ],
      },
      {
        name: "Gwalior", lat: 26.2183, lng: 78.1828,
        colonies: [
          { name: "City Center", lat: 26.2200, lng: 78.1850 },
          { name: "Lashkar", lat: 26.2150, lng: 78.1800 },
          { name: "Morar", lat: 26.2300, lng: 78.2000 },
          { name: "Phool Bagh", lat: 26.2100, lng: 78.1750 },
        ],
      },
    ],
  },
  {
    name: "Maharashtra",
    cities: [
      {
        name: "Mumbai", lat: 19.076, lng: 72.8777,
        colonies: [
          { name: "Andheri West", lat: 19.1362, lng: 72.8296 },
          { name: "Bandra East", lat: 19.0596, lng: 72.8495 },
          { name: "Borivali West", lat: 19.2307, lng: 72.8567 },
          { name: "Dadar West", lat: 19.0178, lng: 72.8436 },
          { name: "Goregaon East", lat: 19.1663, lng: 72.8526 },
          { name: "Juhu", lat: 19.1075, lng: 72.8263 },
          { name: "Powai", lat: 19.1196, lng: 72.9051 },
          { name: "Worli", lat: 19.0176, lng: 72.8152 },
          { name: "Lower Parel", lat: 18.9930, lng: 72.8300 },
          { name: "Chembur", lat: 19.0522, lng: 72.8990 },
          { name: "Malad West", lat: 19.1874, lng: 72.8484 },
          { name: "Thane West", lat: 19.2183, lng: 72.9781 },
          { name: "Vashi", lat: 19.0771, lng: 73.0007 },
          { name: "Navi Mumbai", lat: 19.0330, lng: 73.0297 },
          { name: "BKC", lat: 19.0660, lng: 72.8651 },
        ],
      },
      {
        name: "Pune", lat: 18.5204, lng: 73.8567,
        colonies: [
          { name: "Kothrud", lat: 18.5074, lng: 73.8077 },
          { name: "Hinjawadi", lat: 18.5912, lng: 73.7390 },
          { name: "Wakad", lat: 18.5986, lng: 73.7636 },
          { name: "Baner", lat: 18.5590, lng: 73.7868 },
          { name: "Viman Nagar", lat: 18.5679, lng: 73.9143 },
          { name: "Koregaon Park", lat: 18.5362, lng: 73.8930 },
          { name: "Hadapsar", lat: 18.5089, lng: 73.9260 },
          { name: "Shivajinagar", lat: 18.5308, lng: 73.8474 },
          { name: "Aundh", lat: 18.5580, lng: 73.8070 },
          { name: "Pimpri-Chinchwad", lat: 18.6279, lng: 73.8009 },
        ],
      },
      {
        name: "Nagpur", lat: 21.1458, lng: 79.0882,
        colonies: [
          { name: "Dharampeth", lat: 21.1426, lng: 79.0720 },
          { name: "Sadar", lat: 21.1509, lng: 79.0860 },
          { name: "Sitabuldi", lat: 21.1439, lng: 79.0853 },
          { name: "Civil Lines", lat: 21.1537, lng: 79.0748 },
          { name: "Ramdaspeth", lat: 21.1362, lng: 79.0788 },
          { name: "Hingna", lat: 21.1100, lng: 79.0400 },
        ],
      },
      {
        name: "Nashik", lat: 19.9975, lng: 73.7898,
        colonies: [
          { name: "College Road", lat: 20.0000, lng: 73.7900 },
          { name: "Gangapur Road", lat: 20.0100, lng: 73.7800 },
          { name: "Panchavati", lat: 19.9900, lng: 73.7950 },
          { name: "CIDCO", lat: 20.0200, lng: 73.7700 },
        ],
      },
      {
        name: "Aurangabad", lat: 19.8762, lng: 75.3433,
        colonies: [
          { name: "CIDCO", lat: 19.8900, lng: 75.3500 },
          { name: "Jalna Road", lat: 19.8700, lng: 75.3600 },
          { name: "City Chowk", lat: 19.8780, lng: 75.3400 },
          { name: "Waluj", lat: 19.8650, lng: 75.2900 },
        ],
      },
    ],
  },
  {
    name: "Manipur",
    cities: [
      {
        name: "Imphal", lat: 24.8170, lng: 93.9368,
        colonies: [
          { name: "Thangal Bazaar", lat: 24.8150, lng: 93.9380 },
          { name: "Paona Bazaar", lat: 24.8130, lng: 93.9350 },
          { name: "Keishampat", lat: 24.8100, lng: 93.9320 },
          { name: "Singjamei", lat: 24.8050, lng: 93.9300 },
          { name: "Sagolband", lat: 24.8200, lng: 93.9400 },
        ],
      },
    ],
  },
  {
    name: "Meghalaya",
    cities: [
      {
        name: "Shillong", lat: 25.5788, lng: 91.8933,
        colonies: [
          { name: "Police Bazaar", lat: 25.5780, lng: 91.8940 },
          { name: "Laitumkhrah", lat: 25.5750, lng: 91.8900 },
          { name: "Lachumiere", lat: 25.5810, lng: 91.8960 },
          { name: "Nongthymmai", lat: 25.5720, lng: 91.8880 },
        ],
      },
    ],
  },
  {
    name: "Mizoram",
    cities: [
      {
        name: "Aizawl", lat: 23.7271, lng: 92.7176,
        colonies: [
          { name: "Bara Bazaar", lat: 23.7290, lng: 92.7190 },
          { name: "Zarkawt", lat: 23.7260, lng: 92.7160 },
          { name: "Dawrpui", lat: 23.7310, lng: 92.7210 },
          { name: "Chanmari", lat: 23.7240, lng: 92.7140 },
        ],
      },
    ],
  },
  {
    name: "Nagaland",
    cities: [
      {
        name: "Kohima", lat: 25.6751, lng: 94.1086,
        colonies: [
          { name: "Main Town", lat: 25.6760, lng: 94.1100 },
          { name: "High School Area", lat: 25.6740, lng: 94.1070 },
          { name: "Bayavu Hill", lat: 25.6780, lng: 94.1120 },
        ],
      },
      {
        name: "Dimapur", lat: 25.9065, lng: 93.7272,
        colonies: [
          { name: "Super Market", lat: 25.9080, lng: 93.7290 },
          { name: "Midland", lat: 25.9050, lng: 93.7250 },
          { name: "Duncan", lat: 25.9100, lng: 93.7310 },
        ],
      },
    ],
  },
  {
    name: "Odisha",
    cities: [
      {
        name: "Bhubaneswar", lat: 20.2961, lng: 85.8245,
        colonies: [
          { name: "Sahid Nagar", lat: 20.2880, lng: 85.8440 },
          { name: "Nayapalli", lat: 20.2960, lng: 85.8150 },
          { name: "Patia", lat: 20.3350, lng: 85.8230 },
          { name: "Chandrasekharpur", lat: 20.3250, lng: 85.8130 },
          { name: "Jaydev Vihar", lat: 20.3000, lng: 85.8200 },
          { name: "Khandagiri", lat: 20.2550, lng: 85.7770 },
        ],
      },
      {
        name: "Cuttack", lat: 20.4625, lng: 85.8830,
        colonies: [
          { name: "Buxi Bazaar", lat: 20.4650, lng: 85.8850 },
          { name: "College Square", lat: 20.4600, lng: 85.8810 },
          { name: "Badambadi", lat: 20.4680, lng: 85.8870 },
          { name: "Naya Bazaar", lat: 20.4570, lng: 85.8790 },
        ],
      },
      {
        name: "Rourkela", lat: 22.2604, lng: 84.8536,
        colonies: [
          { name: "Sector 1", lat: 22.2620, lng: 84.8550 },
          { name: "Uditnagar", lat: 22.2580, lng: 84.8510 },
          { name: "Civil Township", lat: 22.2650, lng: 84.8580 },
        ],
      },
    ],
  },
  {
    name: "Punjab",
    cities: [
      {
        name: "Ludhiana", lat: 30.9010, lng: 75.8573,
        colonies: [
          { name: "Model Town", lat: 30.9050, lng: 75.8600 },
          { name: "Civil Lines", lat: 30.9100, lng: 75.8500 },
          { name: "Sarabha Nagar", lat: 30.8900, lng: 75.8450 },
          { name: "BRS Nagar", lat: 30.8800, lng: 75.8650 },
          { name: "Dugri", lat: 30.8750, lng: 75.8400 },
        ],
      },
      {
        name: "Amritsar", lat: 31.6340, lng: 74.8723,
        colonies: [
          { name: "Golden Temple Area", lat: 31.6200, lng: 74.8770 },
          { name: "Lawrence Road", lat: 31.6350, lng: 74.8700 },
          { name: "Ranjit Avenue", lat: 31.6450, lng: 74.8600 },
          { name: "GT Road", lat: 31.6300, lng: 74.8800 },
        ],
      },
      {
        name: "Jalandhar", lat: 31.3260, lng: 75.5762,
        colonies: [
          { name: "Model Town", lat: 31.3280, lng: 75.5780 },
          { name: "GT Road", lat: 31.3240, lng: 75.5740 },
          { name: "BMC Chowk", lat: 31.3300, lng: 75.5800 },
          { name: "Lajpat Nagar", lat: 31.3220, lng: 75.5720 },
        ],
      },
      {
        name: "Patiala", lat: 30.3398, lng: 76.3869,
        colonies: [
          { name: "Leela Bhawan", lat: 30.3420, lng: 76.3890 },
          { name: "Model Town", lat: 30.3380, lng: 76.3850 },
          { name: "Rajpura Road", lat: 30.3350, lng: 76.3830 },
        ],
      },
    ],
  },
  {
    name: "Rajasthan",
    cities: [
      {
        name: "Jaipur", lat: 26.9124, lng: 75.7873,
        colonies: [
          { name: "C-Scheme", lat: 26.9053, lng: 75.7878 },
          { name: "Malviya Nagar", lat: 26.8554, lng: 75.8019 },
          { name: "Vaishali Nagar", lat: 26.9120, lng: 75.7283 },
          { name: "Mansarovar", lat: 26.8667, lng: 75.7625 },
          { name: "Tonk Road", lat: 26.8727, lng: 75.7941 },
          { name: "Jagatpura", lat: 26.8300, lng: 75.8300 },
          { name: "Sodala", lat: 26.9200, lng: 75.7700 },
          { name: "Raja Park", lat: 26.9000, lng: 75.8000 },
        ],
      },
      {
        name: "Jodhpur", lat: 26.2389, lng: 73.0243,
        colonies: [
          { name: "Ratanada", lat: 26.2680, lng: 73.0100 },
          { name: "Sardarpura", lat: 26.2600, lng: 73.0200 },
          { name: "Paota", lat: 26.2800, lng: 73.0050 },
          { name: "Mandore Road", lat: 26.3000, lng: 73.0100 },
        ],
      },
      {
        name: "Udaipur", lat: 24.5854, lng: 73.7125,
        colonies: [
          { name: "Hiran Magri", lat: 24.5700, lng: 73.7050 },
          { name: "Fateh Sagar", lat: 24.6000, lng: 73.7000 },
          { name: "Bapu Bazaar", lat: 24.5800, lng: 73.6900 },
          { name: "University Area", lat: 24.5900, lng: 73.7200 },
        ],
      },
      {
        name: "Kota", lat: 25.2138, lng: 75.8648,
        colonies: [
          { name: "Talwandi", lat: 25.2100, lng: 75.8600 },
          { name: "Gumanpura", lat: 25.2050, lng: 75.8550 },
          { name: "Mahaveer Nagar", lat: 25.2200, lng: 75.8700 },
          { name: "Dadabari", lat: 25.1900, lng: 75.8500 },
        ],
      },
    ],
  },
  {
    name: "Sikkim",
    cities: [
      {
        name: "Gangtok", lat: 27.3389, lng: 88.6065,
        colonies: [
          { name: "MG Marg", lat: 27.3380, lng: 88.6080 },
          { name: "Deorali", lat: 27.3250, lng: 88.5970 },
          { name: "Tadong", lat: 27.3100, lng: 88.5950 },
          { name: "Development Area", lat: 27.3450, lng: 88.6100 },
        ],
      },
    ],
  },
  {
    name: "Tamil Nadu",
    cities: [
      {
        name: "Chennai", lat: 13.0827, lng: 80.2707,
        colonies: [
          { name: "T. Nagar", lat: 13.0418, lng: 80.2341 },
          { name: "Adyar", lat: 13.0067, lng: 80.2566 },
          { name: "Anna Nagar", lat: 13.0860, lng: 80.2101 },
          { name: "Velachery", lat: 12.9815, lng: 80.2180 },
          { name: "OMR (Sholinganallur)", lat: 12.9010, lng: 80.2279 },
          { name: "Porur", lat: 13.0382, lng: 80.1568 },
          { name: "Mylapore", lat: 13.0339, lng: 80.2688 },
          { name: "Guindy", lat: 13.0067, lng: 80.2206 },
          { name: "Tambaram", lat: 12.9249, lng: 80.1278 },
          { name: "Nungambakkam", lat: 13.0569, lng: 80.2425 },
          { name: "Egmore", lat: 13.0732, lng: 80.2609 },
          { name: "Thoraipakkam", lat: 12.9347, lng: 80.2328 },
        ],
      },
      {
        name: "Coimbatore", lat: 11.0168, lng: 76.9558,
        colonies: [
          { name: "RS Puram", lat: 11.0100, lng: 76.9500 },
          { name: "Gandhipuram", lat: 11.0180, lng: 76.9650 },
          { name: "Saibaba Colony", lat: 11.0250, lng: 76.9450 },
          { name: "Peelamedu", lat: 11.0300, lng: 77.0050 },
          { name: "Singanallur", lat: 10.9950, lng: 76.9800 },
        ],
      },
      {
        name: "Madurai", lat: 9.9252, lng: 78.1198,
        colonies: [
          { name: "KK Nagar", lat: 9.9300, lng: 78.1100 },
          { name: "Anna Nagar", lat: 9.9350, lng: 78.1250 },
          { name: "Tallakulam", lat: 9.9200, lng: 78.1150 },
          { name: "Thirunagar", lat: 9.9100, lng: 78.0900 },
        ],
      },
      {
        name: "Trichy", lat: 10.7905, lng: 78.7047,
        colonies: [
          { name: "Cantonment", lat: 10.8000, lng: 78.6900 },
          { name: "Thillai Nagar", lat: 10.7950, lng: 78.7100 },
          { name: "Srirangam", lat: 10.8600, lng: 78.6900 },
          { name: "KK Nagar", lat: 10.7850, lng: 78.7000 },
        ],
      },
      {
        name: "Salem", lat: 11.6643, lng: 78.1460,
        colonies: [
          { name: "Fairlands", lat: 11.6700, lng: 78.1400 },
          { name: "Hasthampatti", lat: 11.6600, lng: 78.1500 },
          { name: "Alagapuram", lat: 11.6550, lng: 78.1550 },
          { name: "Shevapet", lat: 11.6650, lng: 78.1450 },
        ],
      },
    ],
  },
  {
    name: "Telangana",
    cities: [
      {
        name: "Hyderabad", lat: 17.3850, lng: 78.4867,
        colonies: [
          { name: "HITEC City", lat: 17.4435, lng: 78.3772 },
          { name: "Gachibowli", lat: 17.4401, lng: 78.3489 },
          { name: "Banjara Hills", lat: 17.4139, lng: 78.4488 },
          { name: "Jubilee Hills", lat: 17.4326, lng: 78.4071 },
          { name: "Madhapur", lat: 17.4483, lng: 78.3915 },
          { name: "Kukatpally", lat: 17.4849, lng: 78.3990 },
          { name: "Secunderabad", lat: 17.4399, lng: 78.4983 },
          { name: "Ameerpet", lat: 17.4375, lng: 78.4483 },
          { name: "Miyapur", lat: 17.4948, lng: 78.3520 },
          { name: "LB Nagar", lat: 17.3477, lng: 78.5481 },
          { name: "Begumpet", lat: 17.4434, lng: 78.4680 },
          { name: "Kondapur", lat: 17.4620, lng: 78.3622 },
        ],
      },
      {
        name: "Warangal", lat: 17.9784, lng: 79.5941,
        colonies: [
          { name: "Hanamkonda", lat: 17.9830, lng: 79.5800 },
          { name: "Kazipet", lat: 17.9620, lng: 79.5650 },
          { name: "Subedari", lat: 17.9700, lng: 79.5700 },
          { name: "Mulugu Road", lat: 17.9900, lng: 79.6000 },
        ],
      },
      {
        name: "Karimnagar", lat: 18.4386, lng: 79.1288,
        colonies: [
          { name: "Mankammathota", lat: 18.4400, lng: 79.1310 },
          { name: "Kothirampur", lat: 18.4350, lng: 79.1260 },
          { name: "Choppadandi Road", lat: 18.4450, lng: 79.1340 },
        ],
      },
      {
        name: "Nizamabad", lat: 18.6725, lng: 78.0940,
        colonies: [
          { name: "Pragathi Nagar", lat: 18.6750, lng: 78.0960 },
          { name: "Dichpally Road", lat: 18.6700, lng: 78.0910 },
          { name: "Giri Nagar", lat: 18.6780, lng: 78.0990 },
        ],
      },
    ],
  },
  {
    name: "Tripura",
    cities: [
      {
        name: "Agartala", lat: 23.8315, lng: 91.2868,
        colonies: [
          { name: "Gol Bazar", lat: 23.8330, lng: 91.2880 },
          { name: "Krishnanagar", lat: 23.8300, lng: 91.2850 },
          { name: "Banamalipur", lat: 23.8360, lng: 91.2910 },
          { name: "Ramnagar", lat: 23.8280, lng: 91.2830 },
        ],
      },
    ],
  },
  {
    name: "Uttar Pradesh",
    cities: [
      {
        name: "Lucknow", lat: 26.8467, lng: 80.9462,
        colonies: [
          { name: "Gomti Nagar", lat: 26.8559, lng: 80.9917 },
          { name: "Hazratganj", lat: 26.8516, lng: 80.9462 },
          { name: "Aliganj", lat: 26.8897, lng: 80.9397 },
          { name: "Indira Nagar", lat: 26.8762, lng: 80.9952 },
          { name: "Aminabad", lat: 26.8450, lng: 80.9350 },
          { name: "Mahanagar", lat: 26.8700, lng: 80.9500 },
        ],
      },
      {
        name: "Kanpur", lat: 26.4499, lng: 80.3319,
        colonies: [
          { name: "Mall Road", lat: 26.4550, lng: 80.3350 },
          { name: "Civil Lines", lat: 26.4600, lng: 80.3250 },
          { name: "Swaroop Nagar", lat: 26.4650, lng: 80.3400 },
          { name: "Kidwai Nagar", lat: 26.4400, lng: 80.3200 },
        ],
      },
      {
        name: "Varanasi", lat: 25.3176, lng: 82.9739,
        colonies: [
          { name: "Lanka", lat: 25.2900, lng: 82.9900 },
          { name: "Sigra", lat: 25.3150, lng: 82.9800 },
          { name: "Godowlia", lat: 25.3100, lng: 83.0000 },
          { name: "Cantonment", lat: 25.3250, lng: 82.9700 },
        ],
      },
      {
        name: "Agra", lat: 27.1767, lng: 78.0081,
        colonies: [
          { name: "Taj Ganj", lat: 27.1750, lng: 78.0420 },
          { name: "Civil Lines", lat: 27.1800, lng: 78.0000 },
          { name: "Kamla Nagar", lat: 27.1900, lng: 78.0100 },
          { name: "Sanjay Place", lat: 27.1850, lng: 78.0050 },
        ],
      },
      {
        name: "Prayagraj (Allahabad)", lat: 25.4358, lng: 81.8463,
        colonies: [
          { name: "Civil Lines", lat: 25.4400, lng: 81.8500 },
          { name: "Kydganj", lat: 25.4300, lng: 81.8400 },
          { name: "George Town", lat: 25.4450, lng: 81.8550 },
          { name: "Naini", lat: 25.3900, lng: 81.8700 },
        ],
      },
      {
        name: "Meerut", lat: 28.9845, lng: 77.7064,
        colonies: [
          { name: "Sadar Bazaar", lat: 28.9850, lng: 77.7080 },
          { name: "Pallavpuram", lat: 28.9900, lng: 77.7120 },
          { name: "Cantt Area", lat: 28.9800, lng: 77.7000 },
        ],
      },
    ],
  },
  {
    name: "Uttarakhand",
    cities: [
      {
        name: "Dehradun", lat: 30.3165, lng: 78.0322,
        colonies: [
          { name: "Rajpur Road", lat: 30.3300, lng: 78.0400 },
          { name: "Clock Tower", lat: 30.3200, lng: 78.0350 },
          { name: "ISBT Area", lat: 30.3100, lng: 78.0450 },
          { name: "Prem Nagar", lat: 30.3350, lng: 78.0250 },
          { name: "Ballupur", lat: 30.3250, lng: 78.0300 },
        ],
      },
      {
        name: "Haridwar", lat: 29.9457, lng: 78.1642,
        colonies: [
          { name: "Har Ki Pauri", lat: 29.9560, lng: 78.1690 },
          { name: "BHEL Area", lat: 29.9300, lng: 78.1500 },
          { name: "Kankhal", lat: 29.9350, lng: 78.1600 },
          { name: "Motichur", lat: 29.9600, lng: 78.1750 },
        ],
      },
      {
        name: "Nainital", lat: 29.3919, lng: 79.4542,
        colonies: [
          { name: "Mall Road", lat: 29.3930, lng: 79.4550 },
          { name: "Tallital", lat: 29.3850, lng: 79.4500 },
          { name: "Mallital", lat: 29.3980, lng: 79.4580 },
        ],
      },
    ],
  },
  {
    name: "West Bengal",
    cities: [
      {
        name: "Kolkata", lat: 22.5726, lng: 88.3639,
        colonies: [
          { name: "Salt Lake", lat: 22.5958, lng: 88.4103 },
          { name: "New Town", lat: 22.5922, lng: 88.4853 },
          { name: "Park Street", lat: 22.5527, lng: 88.3547 },
          { name: "Ballygunge", lat: 22.5274, lng: 88.3633 },
          { name: "Dum Dum", lat: 22.6233, lng: 88.4309 },
          { name: "Alipore", lat: 22.5300, lng: 88.3340 },
          { name: "Howrah", lat: 22.5958, lng: 88.2636 },
          { name: "Esplanade", lat: 22.5629, lng: 88.3530 },
          { name: "Lake Town", lat: 22.6100, lng: 88.4000 },
          { name: "Behala", lat: 22.4950, lng: 88.3240 },
        ],
      },
      {
        name: "Siliguri", lat: 26.7271, lng: 88.3953,
        colonies: [
          { name: "Hill Cart Road", lat: 26.7300, lng: 88.3980 },
          { name: "Sevoke Road", lat: 26.7250, lng: 88.3920 },
          { name: "Pradhan Nagar", lat: 26.7350, lng: 88.4010 },
          { name: "Matigara", lat: 26.7100, lng: 88.3850 },
        ],
      },
      {
        name: "Asansol", lat: 23.6889, lng: 86.9661,
        colonies: [
          { name: "GT Road", lat: 23.6900, lng: 86.9680 },
          { name: "Burnpur", lat: 23.7200, lng: 86.9400 },
          { name: "Hirapur", lat: 23.6850, lng: 86.9620 },
        ],
      },
      {
        name: "Durgapur", lat: 23.5204, lng: 87.3119,
        colonies: [
          { name: "City Centre", lat: 23.5220, lng: 87.3130 },
          { name: "Benachity", lat: 23.5150, lng: 87.3050 },
          { name: "Steel Township", lat: 23.5300, lng: 87.3200 },
        ],
      },
    ],
  },
  {
    name: "Jammu & Kashmir",
    cities: [
      {
        name: "Srinagar", lat: 34.0837, lng: 74.7973,
        colonies: [
          { name: "Lal Chowk", lat: 34.0750, lng: 74.8000 },
          { name: "Dal Gate", lat: 34.0900, lng: 74.8100 },
          { name: "Rajbagh", lat: 34.0700, lng: 74.8050 },
          { name: "Hazratbal", lat: 34.1150, lng: 74.8350 },
        ],
      },
      {
        name: "Jammu", lat: 32.7266, lng: 74.8570,
        colonies: [
          { name: "Gandhi Nagar", lat: 32.7300, lng: 74.8600 },
          { name: "Residency Road", lat: 32.7250, lng: 74.8550 },
          { name: "Kachi Chawni", lat: 32.7350, lng: 74.8650 },
          { name: "Talab Tillo", lat: 32.7200, lng: 74.8500 },
        ],
      },
    ],
  },
  {
    name: "Ladakh",
    cities: [
      {
        name: "Leh", lat: 34.1526, lng: 77.5771,
        colonies: [
          { name: "Main Bazaar", lat: 34.1530, lng: 77.5780 },
          { name: "Changspa", lat: 34.1600, lng: 77.5700 },
          { name: "Fort Road", lat: 34.1550, lng: 77.5750 },
        ],
      },
    ],
  },
  {
    name: "Puducherry",
    cities: [
      {
        name: "Puducherry", lat: 11.9416, lng: 79.8083,
        colonies: [
          { name: "White Town", lat: 11.9340, lng: 79.8310 },
          { name: "MG Road", lat: 11.9370, lng: 79.8240 },
          { name: "Lawspet", lat: 11.9600, lng: 79.8100 },
          { name: "Muthialpet", lat: 11.9300, lng: 79.8350 },
        ],
      },
    ],
  },
  {
    name: "Chandigarh",
    cities: [
      {
        name: "Chandigarh", lat: 30.7333, lng: 76.7794,
        colonies: [
          { name: "Sector 17", lat: 30.7420, lng: 76.7800 },
          { name: "Sector 22", lat: 30.7350, lng: 76.7750 },
          { name: "Sector 35", lat: 30.7200, lng: 76.7600 },
          { name: "IT Park", lat: 30.7100, lng: 76.8000 },
          { name: "Manimajra", lat: 30.7300, lng: 76.8100 },
        ],
      },
    ],
  },
];
