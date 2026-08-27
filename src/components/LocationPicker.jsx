import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import {
  Navigation,
  MapPin,
  Building2,
  Globe2,
  Sparkles,
  Compass,
  CheckCircle2,
  ChevronDown,
} from "lucide-react";
import "leaflet/dist/leaflet.css";

// Custom Marker Icon
const customIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// Dynamic Translations for States and Cities
export const INDIA_LOCATIONS_DATA = {
  up: {
    key: "up",
    names: {
      hi: "उत्तर प्रदेश",
      hinglish: "Uttar Pradesh",
      en: "Uttar Pradesh",
    },
    cities: [
      {
        key: "muzaffarnagar",
        lat: 29.4727,
        lng: 77.7085,
        names: { hi: "मुज़फ़्फ़रनगर", hinglish: "Muzaffarnagar", en: "Muzaffarnagar" },
      },
      {
        key: "meerut",
        lat: 28.9845,
        lng: 77.7064,
        names: { hi: "मेरठ", hinglish: "Meerut", en: "Meerut" },
      },
      {
        key: "noida",
        lat: 28.5355,
        lng: 77.391,
        names: { hi: "नोएडा", hinglish: "Noida", en: "Noida" },
      },
      {
        key: "lucknow",
        lat: 26.8467,
        lng: 80.9462,
        names: { hi: "लखनऊ", hinglish: "Lucknow", en: "Lucknow" },
      },
      {
        key: "kanpur",
        lat: 26.4499,
        lng: 80.3319,
        names: { hi: "कानपुर", hinglish: "Kanpur", en: "Kanpur" },
      },
    ],
  },
  delhi: {
    key: "delhi",
    names: {
      hi: "दिल्ली एनसीआर",
      hinglish: "Delhi NCR",
      en: "Delhi NCR",
    },
    cities: [
      {
        key: "central_delhi",
        lat: 28.6139,
        lng: 77.209,
        names: { hi: "मध्य दिल्ली", hinglish: "Central Delhi", en: "Central Delhi" },
      },
      {
        key: "south_delhi",
        lat: 28.5355,
        lng: 77.261,
        names: { hi: "दक्षिण दिल्ली", hinglish: "South Delhi", en: "South Delhi" },
      },
      {
        key: "gurugram",
        lat: 28.4595,
        lng: 77.0266,
        names: { hi: "गुरुग्राम", hinglish: "Gurugram", en: "Gurugram" },
      },
    ],
  },
  maharashtra: {
    key: "maharashtra",
    names: {
      hi: "महाराष्ट्र",
      hinglish: "Maharashtra",
      en: "Maharashtra",
    },
    cities: [
      {
        key: "mumbai",
        lat: 19.076,
        lng: 72.8777,
        names: { hi: "मुंबई", hinglish: "Mumbai", en: "Mumbai" },
      },
      {
        key: "pune",
        lat: 18.5204,
        lng: 73.8567,
        names: { hi: "पुणे", hinglish: "Pune", en: "Pune" },
      },
      {
        key: "nagpur",
        lat: 21.1458,
        lng: 79.0882,
        names: { hi: "नागपुर", hinglish: "Nagpur", en: "Nagpur" },
      },
    ],
  },
  haryana: {
    key: "haryana",
    names: {
      hi: "हरियाणा",
      hinglish: "Haryana",
      en: "Haryana",
    },
    cities: [
      {
        key: "faridabad",
        lat: 28.4089,
        lng: 77.3178,
        names: { hi: "फरीदाबाद", hinglish: "Faridabad", en: "Faridabad" },
      },
      {
        key: "karnal",
        lat: 29.6857,
        lng: 76.9905,
        names: { hi: "करनाल", hinglish: "Karnal", en: "Karnal" },
      },
      {
        key: "panipat",
        lat: 29.3909,
        lng: 76.9635,
        names: { hi: "पानीपत", hinglish: "Panipat", en: "Panipat" },
      },
    ],
  },
};

// Reverse Geocoding
const fetchCityOnly = async (lat, lng, setCityName, currentLang = "hi") => {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&accept-language=${currentLang}`
    );
    const data = await res.json();

    if (data && data.address) {
      const city =
        data.address.city ||
        data.address.town ||
        data.address.village ||
        data.address.suburb ||
        data.address.city_district ||
        data.address.county ||
        "";

      setCityName(city || (currentLang === "hi" ? "मुज़फ़्फ़रनगर" : "Muzaffarnagar"));
    } else {
      setCityName(currentLang === "hi" ? "मुज़फ़्फ़रनगर" : "Muzaffarnagar");
    }
  } catch (err) {
    console.error("Failed to fetch location name:", err);
    setCityName(currentLang === "hi" ? "मुज़फ़्फ़रनगर" : "Muzaffarnagar");
  }
};

function MapController({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView([center.lat, center.lng], 13);
    }
  }, [center, map]);
  return null;
}

function LocationMarker({ position, setPosition, setCityName, lang }) {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setPosition({ lat, lng });
      fetchCityOnly(lat, lng, setCityName, lang);
    },
  });

  return position ? (
    <Marker position={[position.lat, position.lng]} icon={customIcon} />
  ) : null;
}

export default function LocationPicker({
  onSelectLocation,
  onClose,
  lang = "hinglish",
  savedStateKey = "up",
  savedCityKey = "muzaffarnagar",
  savedCoords = { lat: 29.4727, lng: 77.7085 },
  savedCityName = "",
}) {
  const [selectedStateKey, setSelectedStateKey] = useState(savedStateKey);
  const [selectedCityKey, setSelectedCityKey] = useState(savedCityKey);
  const [coords, setCoords] = useState(savedCoords);
  const [cityName, setCityName] = useState(savedCityName);
  const [isLocating, setIsLocating] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  // Update reverse-geocoded map click city name if language changes dynamically
  useEffect(() => {
    const currentCityObj = INDIA_LOCATIONS_DATA[selectedStateKey]?.cities.find(
      (c) => c.key === selectedCityKey
    );
    if (currentCityObj) {
      setCityName(currentCityObj.names[lang] || currentCityObj.names.en);
    } else {
      fetchCityOnly(coords.lat, coords.lng, setCityName, lang);
    }
  }, [lang, selectedStateKey, selectedCityKey, coords]);

  const handleStateChange = (e) => {
    const stateKey = e.target.value;
    setSelectedStateKey(stateKey);
    const firstCity = INDIA_LOCATIONS_DATA[stateKey]?.cities[0];
    if (firstCity) {
      setSelectedCityKey(firstCity.key);
      const newCoords = { lat: firstCity.lat, lng: firstCity.lng };
      setCoords(newCoords);
      setCityName(firstCity.names[lang] || firstCity.names.en);
    }
  };

  const handleCityChange = (e) => {
    const cityKey = e.target.value;
    setSelectedCityKey(cityKey);
    const cityData = INDIA_LOCATIONS_DATA[selectedStateKey]?.cities.find(
      (c) => c.key === cityKey
    );
    if (cityData) {
      const newCoords = { lat: cityData.lat, lng: cityData.lng };
      setCoords(newCoords);
      setCityName(cityData.names[lang] || cityData.names.en);
    }
  };

  const handleGPS = () => {
    setIsLocating(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const newCoords = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          };
          setCoords(newCoords);
          fetchCityOnly(newCoords.lat, newCoords.lng, setCityName, lang);
          setIsLocating(false);
        },
        () => setIsLocating(false)
      );
    } else {
      setIsLocating(false);
    }
  };

  const labels = {
    hi: {
      title: "स्थान चुनें",
      subtitle: "शहर चुनें या GPS navigation का उपयोग करें",
      gpsBtn: isLocating
        ? "स्थान खोजा जा रहा है..."
        : "वर्तमान स्थान (GPS) का उपयोग करें",
      mapHint: "शहर चुनने के लिए नक्शे पर टैप करें",
      confirmBtn: "स्थान की पुष्टि करें",
      state: "राज्य",
      city: "शहर",
    },
    hinglish: {
      title: "Location Set Karein",
      subtitle: "City choose karein ya GPS navigation use karein",
      gpsBtn: isLocating
        ? "Location dhund rahe hain..."
        : "Live Location (GPS) Use Karein",
      mapHint: "City select karne ke liye map par tap karein",
      confirmBtn: "Location Confirm Karein",
      state: "State",
      city: "City",
    },
    en: {
      title: "Set Location",
      subtitle: "Select city or use GPS navigation",
      gpsBtn: isLocating
        ? "Locating position..."
        : "Use Current Live Location (GPS)",
      mapHint: "Tap on map to pin city",
      confirmBtn: "Confirm Location",
      state: "State",
      city: "City",
    },
  }[lang] || {
    title: "Set Location",
    subtitle: "Select city or use GPS navigation",
    gpsBtn: isLocating
      ? "Locating position..."
      : "Use Current Live Location (GPS)",
    mapHint: "Tap on map to pin city",
    confirmBtn: "Confirm Location",
    state: "State",
    city: "City",
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/60 backdrop-blur-sm font-['Baloo_2'] transition-all touch-none"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-200/80 overflow-hidden max-h-[92vh] flex flex-col transform transition-transform animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="sm:hidden flex justify-center pt-3 pb-1 cursor-pointer"
          onClick={onClose}
        >
          <div className="w-12 h-1.5 bg-slate-300 rounded-full hover:bg-slate-400 transition-colors" />
        </div>

        <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-100 bg-slate-50/60">
          <div className="p-2.5 bg-[#2A52BE]/10 text-[#2A52BE] rounded-2xl">
            <Compass size={22} className="text-[#2A52BE]" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 leading-tight">
              {labels.title}
            </h2>
            <p className="text-xs text-slate-500 font-sans">
              {labels.subtitle}
            </p>
          </div>
        </div>

        <div className="p-5 overflow-y-auto space-y-4 font-sans max-h-[65vh]">
          <button
            type="button"
            onClick={handleGPS}
            className="w-full flex items-center justify-center gap-2.5 py-3 px-4 bg-[#2A52BE] hover:bg-[#2042a1] active:bg-[#1a388b] text-white rounded-2xl text-xs font-bold shadow-md shadow-[#2A52BE]/20 transition-all active:scale-[0.98]"
          >
            <Navigation
              size={16}
              className={isLocating ? "animate-spin" : "fill-current"}
            />
            <span>{labels.gpsBtn}</span>
          </button>

          <div className="grid grid-cols-2 gap-3">
            {/* Dynamic Localized State Selector */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-600 flex items-center gap-1.5">
                <Globe2 size={13} className="text-[#2A52BE]" /> {labels.state}
              </label>
              <div className="relative">
                <select
                  value={selectedStateKey}
                  onChange={handleStateChange}
                  className="w-full appearance-none px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:border-[#2A52BE] focus:bg-white transition-all cursor-pointer pr-8"
                >
                  {Object.values(INDIA_LOCATIONS_DATA).map((st) => (
                    <option key={st.key} value={st.key}>
                      {st.names[lang] || st.names.en}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={14}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                />
              </div>
            </div>

            {/* Dynamic Localized City Selector */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-600 flex items-center gap-1.5">
                <Building2 size={13} className="text-[#2A52BE]" /> {labels.city}
              </label>
              <div className="relative">
                <select
                  value={selectedCityKey}
                  onChange={handleCityChange}
                  className="w-full appearance-none px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:border-[#2A52BE] focus:bg-white transition-all cursor-pointer pr-8"
                >
                  {INDIA_LOCATIONS_DATA[selectedStateKey]?.cities.map((ct) => (
                    <option key={ct.key} value={ct.key}>
                      {ct.names[lang] || ct.names.en}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={14}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                />
              </div>
            </div>
          </div>

          <div className="relative w-full h-52 sm:h-56 rounded-2xl overflow-hidden border border-slate-200 shadow-inner group">
            <MapContainer
              center={[coords.lat, coords.lng]}
              zoom={13}
              zoomControl={false}
              attributionControl={false}
              scrollWheelZoom={true}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <MapController center={coords} />
              <LocationMarker
                position={coords}
                setPosition={setCoords}
                setCityName={setCityName}
                lang={lang}
              />
            </MapContainer>

            <div className="absolute top-3 left-3 z-[400] bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-200/80 shadow-sm flex items-center gap-1.5 text-[10px] font-bold text-slate-700">
              <Sparkles size={13} className="text-[#2A52BE]" />
              <span>{labels.mapHint}</span>
            </div>
          </div>
        </div>

        <div className="p-4 px-6 bg-slate-50/80 border-t border-slate-100 font-sans space-y-3">
          <div className="flex items-center gap-1.5 min-w-0">
            <MapPin size={16} className="text-[#2A52BE] shrink-0" />
            <p
              className="text-sm font-bold text-slate-800 truncate"
              title={cityName}
            >
              {cityName}
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              if (onSelectLocation) {
                onSelectLocation({
                  stateKey: selectedStateKey,
                  cityKey: selectedCityKey,
                  cityName: cityName,
                  coordinates: coords,
                });
              }
              if (onClose) onClose();
            }}
            className="w-full flex items-center justify-center gap-2 py-3 bg-[#2A52BE] hover:bg-[#2042a1] text-white rounded-2xl text-sm font-bold shadow-md shadow-[#2A52BE]/20 transition-all active:scale-[0.98]"
          >
            <CheckCircle2 size={18} /> {labels.confirmBtn}
          </button>
        </div>
      </div>
    </div>
  );
}