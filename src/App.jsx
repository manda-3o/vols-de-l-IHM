import { useEffect, useMemo, useRef, useState } from 'react';
import { flightService } from './api/flightService';
import { bookingService } from './api/bookingService';
import { supportService } from './api/supportService';

const AIRPORTS = [
  { code: 'TNR', city: 'Antananarivo', airport: 'Ivato International', flag: '🇲🇬', country: 'Madagascar' },
  { code: 'NOS', city: 'Nosy Be', airport: 'Fascene International', flag: '🇲🇬', country: 'Madagascar' },
  { code: 'TMM', city: 'Toamasina', airport: 'Aéroport de Toamasina', flag: '🇲🇬', country: 'Madagascar' },
  { code: 'MJN', city: 'Mahajanga', airport: 'Aéroport Amborovy', flag: '🇲🇬', country: 'Madagascar' },
  { code: 'TLE', city: 'Toliara', airport: 'Aéroport de Toliara', flag: '🇲🇬', country: 'Madagascar' },
  { code: 'FTU', city: 'Tolagnaro', airport: 'Aéroport de Tolagnaro', flag: '🇲🇬', country: 'Madagascar' },
  { code: 'DIE', city: 'Antsiranana', airport: 'Aéroport Arrachart', flag: '🇲🇬', country: 'Madagascar' },
  { code: 'SMS', city: 'Sainte-Marie', airport: 'Aéroport de Sainte-Marie', flag: '🇲🇬', country: 'Madagascar' },
  { code: 'SVB', city: 'Sambava', airport: 'Aéroport de Sambava', flag: '🇲🇬', country: 'Madagascar' },
  { code: 'MOQ', city: 'Morondava', airport: 'Aéroport de Morondava', flag: '🇲🇬', country: 'Madagascar' },
  { code: 'CDG', city: 'Paris', airport: 'Charles de Gaulle', flag: '🇫🇷', country: 'France' },
  { code: 'ORY', city: 'Paris Orly', airport: "Aéroport d'Orly", flag: '🇫🇷', country: 'France' },
  { code: 'RUN', city: 'La Réunion', airport: 'Roland Garros', flag: '🇷🇪', country: 'La Réunion' },
  { code: 'MRU', city: 'Maurice', airport: 'Sir Seewoosagur Ramgoolam', flag: '🇲🇺', country: 'Île Maurice' },
  { code: 'NBO', city: 'Nairobi', airport: 'Jomo Kenyatta', flag: '🇰🇪', country: 'Kenya' },
  { code: 'ADD', city: 'Addis-Abeba', airport: 'Bole International', flag: '🇪🇹', country: 'Éthiopie' },
  { code: 'IST', city: 'Istanbul', airport: 'Istanbul Airport', flag: '🇹🇷', country: 'Turquie' },
  { code: 'DXB', city: 'Dubaï', airport: 'Dubai International', flag: '🇦🇪', country: 'Émirats Arabes Unis' },
  { code: 'MXP', city: 'Milan', airport: 'Malpensa', flag: '🇮🇹', country: 'Italie' },
  { code: 'YVA', city: 'Mayotte', airport: 'Dzaoudzi-Pamandzi', flag: '🇾🇹', country: 'Mayotte' },
];

const FLIGHTS = [
  {
    airline: 'Air Madagascar',
    code: 'MD042',
    dep: 'TNR',
    arr: 'CDG',
    depTime: '08:30',
    arrTime: '21:50',
    duration: '13h 20min',
    stops: 'Direct',
    aircraft: 'Boeing 787',
    priceMga: 3430000,
    premium: false,
    seats: '⚠ 4 places restantes',
    className: 'Économique',
    displayLogo: 'AIR\nMDG',
  },
  {
    airline: 'Air France',
    code: 'AF844',
    dep: 'TNR',
    arr: 'CDG',
    depTime: '11:15',
    arrTime: '03:00+1',
    duration: '15h 45min',
    stops: '1 escale (NBI)',
    aircraft: 'Airbus A350',
    priceMga: 3705000,
    premium: false,
    seats: '✓ 32 places dispo',
    className: 'Économique',
    displayLogo: 'AF',
  },
  {
    airline: 'Turkish Airlines',
    code: 'TK072',
    dep: 'TNR',
    arr: 'CDG',
    depTime: '23:45',
    arrTime: '18:55+1',
    duration: '18h 10min',
    stops: '1 escale (IST)',
    aircraft: 'Boeing 777',
    priceMga: 10680000,
    premium: true,
    seats: '✓ 12 places dispo',
    className: 'Business',
    displayLogo: 'TK',
  },
  {
    airline: 'Ethiopian Airlines',
    code: 'ET911',
    dep: 'TNR',
    arr: 'CDG',
    depTime: '02:20',
    arrTime: '18:50',
    duration: '16h 30min',
    stops: '1 escale (ADD)',
    aircraft: 'Boeing 737',
    priceMga: 3090000,
    premium: false,
    seats: '✓ 21 places dispo',
    className: 'Économique',
    displayLogo: 'ET',
  },
  {
    airline: 'Air Madagascar',
    code: 'MD101',
    dep: 'TNR',
    arr: 'NOS',
    depTime: '07:00',
    arrTime: '08:20',
    duration: '1h 20min',
    stops: 'Direct',
    aircraft: 'ATR 72',
    priceMga: 295000,
    premium: false,
    seats: '✓ 18 places dispo',
    className: 'Économique',
    displayLogo: 'AIR\nMDG',
  },
  {
    airline: 'Air Madagascar',
    code: 'MD205',
    dep: 'TNR',
    arr: 'TMM',
    depTime: '09:30',
    arrTime: '10:30',
    duration: '1h 00min',
    stops: 'Direct',
    aircraft: 'ATR 42',
    priceMga: 185000,
    premium: false,
    seats: '✓ 24 places dispo',
    className: 'Économique',
    displayLogo: 'AIR\nMDG',
  },
  {
    airline: 'Air Madagascar',
    code: 'MD310',
    dep: 'TNR',
    arr: 'MJN',
    depTime: '11:00',
    arrTime: '12:10',
    duration: '1h 10min',
    stops: 'Direct',
    aircraft: 'ATR 72',
    priceMga: 210000,
    premium: false,
    seats: '✓ 30 places dispo',
    className: 'Économique',
    displayLogo: 'AIR\nMDG',
  },
];

const DESTINATIONS = [
  {
    code: 'TNR',
    name: 'Antananarivo',
    airport: 'Ivato International',
    routes: 'Paris · La Réunion · Maurice · Nairobi · Addis-Abeba · Nosy Be · Mahajanga · Toliara · Toamasina',
    badge: 'Hub principal',
    type: 'intl',
  },
  {
    code: 'NOS',
    name: 'Nosy Be',
    airport: 'Fascene International',
    routes: 'Antananarivo · Milan · Paris (saisonnier) · La Réunion · Mayotte',
    badge: 'International',
    type: 'intl',
  },
  {
    code: 'TMM',
    name: 'Toamasina',
    airport: 'Aéroport de Toamasina',
    routes: 'Antananarivo',
    badge: 'Domestique',
    type: 'local',
  },
  {
    code: 'MJN',
    name: 'Mahajanga',
    airport: 'Aéroport Amborovy',
    routes: 'Antananarivo · Nosy Be',
    badge: 'Domestique',
    type: 'local',
  },
  {
    code: 'TLE',
    name: 'Toliara',
    airport: 'Aéroport de Toliara',
    routes: 'Antananarivo',
    badge: 'Domestique',
    type: 'local',
  },
  {
    code: 'FTU',
    name: 'Tolagnaro',
    airport: 'Aéroport de Tolagnaro',
    routes: 'Antananarivo',
    badge: 'Domestique',
    type: 'local',
  },
  {
    code: 'DIE',
    name: 'Antsiranana',
    airport: 'Aéroport Arrachart',
    routes: 'Antananarivo · Nosy Be',
    badge: 'Domestique',
    type: 'local',
  },
  {
    code: 'SMS',
    name: 'Sainte-Marie',
    airport: 'Aéroport de Sainte-Marie',
    routes: 'Antananarivo',
    badge: 'Domestique',
    type: 'local',
  },
  {
    code: 'SVB',
    name: 'Sambava',
    airport: 'Aéroport de Sambava',
    routes: 'Antananarivo',
    badge: 'Domestique',
    type: 'local',
  },
  {
    code: 'MOQ',
    name: 'Morondava',
    airport: 'Aéroport de Morondava',
    routes: 'Antananarivo',
    badge: 'Domestique',
    type: 'local',
  },
];

const POPULAR_ROUTES = [
  { icon: '🌍', label: 'Antananarivo → Paris', route: 'TNR → CDG', description: 'Vol international fréquemment réservé' },
  { icon: '🏝', label: 'Antananarivo → Nosy Be', route: 'TNR → NOS', description: 'Escapade plage rapide' },
  { icon: '🚤', label: 'Antananarivo → Toamasina', route: 'TNR → TMM', description: 'Voyage commerce & nature' },
  { icon: '🏖', label: 'Antananarivo → Mahajanga', route: 'TNR → MJN', description: 'Destination balnéaire populaire' },
];

const RATES = { MGA: 1, EUR: 1 / 5000, USD: 1 / 4500 };
const SYMBOLS = { MGA: 'Ar', EUR: '€', USD: '$' };
const CURRENCIES = ['MGA', 'EUR', 'USD'];

const formatInputDate = (date) => date.toISOString().split('T')[0];
const TODAY_DATE = formatInputDate(new Date());
const TOMORROW_DATE = (() => {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return formatInputDate(d);
})();

const SEAT_COLUMNS = ['A', 'B', 'C', '', 'D', 'E', 'F'];
const OCCUPIED_SEATS = new Set([2, 5, 8, 14, 17, 22, 25, 30, 33, 36, 44, 51, 60, 65, 70]);
const PREMIUM_SEATS = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);

const AUTH_TABS = {
  login: 'Connexion',
  register: "Inscription",
};

function formatPrice(mga, currency) {
  const value = mga * RATES[currency];
  const symbol = SYMBOLS[currency];
  if (currency === 'MGA') {
    return `${symbol} ${Math.round(value).toLocaleString('fr-FR')}`;
  }
  return `${symbol} ${value.toFixed(2).replace('.', ',')}`;
}

function formatCardNumber(value) {
  const clean = value.replace(/\D/g, '').slice(0, 16);
  return clean.match(/.{1,4}/g)?.join(' ') || clean;
}

function App() {
  const [page, setPage] = useState('home');
  const [currency, setCurrency] = useState('MGA');
  const [theme, setTheme] = useState('light');
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchTab, setSearchTab] = useState('aller');
  const [searchDep, setSearchDep] = useState('Antananarivo (TNR)');
  const [searchDest, setSearchDest] = useState('Paris CDG (CDG)');
  const [searchDate, setSearchDate] = useState(TODAY_DATE);
  const [searchReturnDate, setSearchReturnDate] = useState(TOMORROW_DATE);
  const [searchDestinations, setSearchDestinations] = useState([{ dep: 'Antananarivo (TNR)', dest: 'Paris CDG (CDG)', date: TODAY_DATE }]);
  const [searchClass, setSearchClass] = useState('1 adulte — Économique');
  const [showACDep, setShowACDep] = useState(false);
  const [showACDest, setShowACDest] = useState(false);
  const [priceRange, setPriceRange] = useState(6000000);
  const [selectedSort, setSelectedSort] = useState('Prix ↑');
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [bookingStep, setBookingStep] = useState(1);
  const [selectedExtra, setSelectedExtra] = useState('cabine');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('MARIE RAKOTO');
  const [authEmail, setAuthEmail] = useState('marie.rakoto@email.mg');
  const [authPassword, setAuthPassword] = useState('password123');
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAddFlightForm, setShowAddFlightForm] = useState(false);
  const [newFlight, setNewFlight] = useState({ code: '', route: '', depTime: '', arrTime: '', price: '', seats: '' });
  const [toast, setToast] = useState({ msg: '✓ Action réussie', visible: false });
  const [flights, setFlights] = useState([]);
  const [popularFlights, setPopularFlights] = useState([]);
  const [flightsLoading, setFlightsLoading] = useState(false);
  const [flightsError, setFlightsError] = useState(null);
  const [flightFilters, setFlightFilters] = useState({
    direct: true,
    oneStop: true,
    multiStop: true,
    airlines: {
      'Air Madagascar': true,
      'Air France': true,
      'Ethiopian Airlines': true,
      'Turkish Airlines': true,
      'Emirates': true,
    },
    classes: {
      Économique: true,
      Affaires: true,
      Premium: true,
    },
    depEndHour: 24,
  });
  const [helpForm, setHelpForm] = useState({ email: '', subject: '', message: '' });
  const toastTimer = useRef(null);
  const depRef = useRef(null);
  const destRef = useRef(null);

  const [bookingFlight, setBookingFlight] = useState({
    route: 'TNR → CDG',
    priceMga: 3430000,
    taxMga: 490000,
    airline: 'Air Madagascar',
    flightNum: 'MD042',
    depTime: '08:30',
    arrTime: '21:50',
    duration: '13h 20min',
    stops: 'Direct',
    aircraft: 'Boeing 787',
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  // Check for admin access via URL parameter
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('admin') === 'true') {
      setPage('admin');
    }
  }, []);

  // Load flights from API
  useEffect(() => {
    const loadFlights = async () => {
      setFlightsLoading(true);
      setFlightsError(null);
      try {
        const data = await flightService.getFlights();
        const flightsWithUI = data.map(flight => ({
          ...flight,
          airline: flight.airline || 'Air Madagascar',
          displayLogo: flight.displayLogo || 'AIR\nMDG',
          className: flight.className || 'Économique',
          route: flight.route || `${flight.dep} → ${flight.arr}`,
          priceMga: flight.price || flight.priceMga,
          premium: flight.premium || false,
          seats: flight.seats || '✓ Plusieurs places',
          duration: flight.duration || '13h',
          stops: flight.stops || 'Direct',
        }));
        setFlights(flightsWithUI);
        if (flightsWithUI.length > 0) {
          setBookingFlight(prev => ({
            ...prev,
            route: flightsWithUI[0].route,
            priceMga: flightsWithUI[0].priceMga,
            airline: flightsWithUI[0].airline,
          }));
        }
      } catch (error) {
        console.error('Failed to load flights:', error);
        setFlightsError(error.message);
      } finally {
        setFlightsLoading(false);
      }
    };
    loadFlights();
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      if (depRef.current && !depRef.current.contains(e.target)) {
        setShowACDep(false);
      }
      if (destRef.current && !destRef.current.contains(e.target)) {
        setShowACDest(false);
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  useEffect(() => {
    if (toast.visible) {
      clearTimeout(toastTimer.current);
      toastTimer.current = setTimeout(() => setToast((prev) => ({ ...prev, visible: false })), 3200);
    }
    return () => clearTimeout(toastTimer.current);
  }, [toast.visible]);

  const depSuggestions = useMemo(() => {
    const q = searchDep.toLowerCase();
    return AIRPORTS.filter(
      (a) =>
        !q ||
        a.city.toLowerCase().includes(q) ||
        a.code.toLowerCase().includes(q) ||
        a.airport.toLowerCase().includes(q) ||
        a.country.toLowerCase().includes(q)
    ).slice(0, 8);
  }, [searchDep]);

  const destSuggestions = useMemo(() => {
    const q = searchDest.toLowerCase();
    return AIRPORTS.filter(
      (a) =>
        !q ||
        a.city.toLowerCase().includes(q) ||
        a.code.toLowerCase().includes(q) ||
        a.airport.toLowerCase().includes(q) ||
        a.country.toLowerCase().includes(q)
    ).slice(0, 8);
  }, [searchDest]);

  const clampToToday = (value) => (value < TODAY_DATE ? TODAY_DATE : value);
  const handleSearchDateChange = (value) => {
    const nextValue = clampToToday(value);
    setSearchDate(nextValue);
    if (searchReturnDate < nextValue) {
      setSearchReturnDate(nextValue);
    }
  };

  const handleSearchReturnDateChange = (value) => {
    const nextValue = value < searchDate ? searchDate : value;
    setSearchReturnDate(nextValue);
  };

  const selectedExtraAmount = selectedExtra === 'soute' ? 225000 : selectedExtra === 'repas' ? 90000 : 0;
  const bookingTotalStep1 = bookingFlight.priceMga + bookingFlight.taxMga;
  const bookingTotalAll = bookingTotalStep1 + selectedExtraAmount;
  const priceLabel = `${SYMBOLS[currency]}`;

  const airlineRatings = {
    'Air Madagascar': 4.9,
    'Air France': 4.7,
    'Ethiopian Airlines': 4.5,
    'Turkish Airlines': 4.6,
    'Emirates': 4.8,
  };

  const parseDuration = (duration) => {
    const parts = duration.match(/(\d+)h\s*(\d+)?/);
    if (!parts) return 0;
    return Number(parts[1]) * 60 + Number(parts[2] || 0);
  };

  const filteredFlights = useMemo(() => {
    const base = flights.filter((flight) => {
      const price = flight.priceMga || flight.price || 0;
      if (price > priceRange) return false;
      const stops = flight.stops?.toLowerCase() || '';
      if (!flightFilters.direct && stops.includes('direct')) return false;
      if (!flightFilters.oneStop && stops.includes('1 escale')) return false;
      if (!flightFilters.multiStop && (stops.includes('2 escale') || stops.includes('escales') || stops.includes('+'))) return false;
      if (!flightFilters.airlines[flight.airline]) return false;
      if (!flightFilters.classes[flight.className]) return false;
      const hour = Number(flight.depTime?.split(':')[0] || 0);
      if (hour > flightFilters.depEndHour) return false;
      return true;
    });

    return base.sort((a, b) => {
      if (selectedSort === 'Prix ↑') {
        return (a.priceMga || a.price || 0) - (b.priceMga || b.price || 0);
      }
      if (selectedSort === 'Durée ↑') {
        return parseDuration(a.duration) - parseDuration(b.duration);
      }
      if (selectedSort === 'Rapidité') {
        const aPriority = a.stops?.includes('Direct') ? 0 : 1;
        const bPriority = b.stops?.includes('Direct') ? 0 : 1;
        if (aPriority !== bPriority) return aPriority - bPriority;
        return parseDuration(a.duration) - parseDuration(b.duration);
      }
      if (selectedSort === 'Note compagnie') {
        return (airlineRatings[b.airline] || 0) - (airlineRatings[a.airline] || 0);
      }
      return 0;
    });
  }, [flights, priceRange, selectedSort, flightFilters]);

  const showToast = (msg) => {
    setToast({ msg, visible: true });
  };

  const handleCurrencyChange = (currencyCode) => {
    setCurrency(currencyCode);
    showToast('💱 Devise changée : ' + SYMBOLS[currencyCode]);
  };

  const handleSearch = () => {
    if (searchDate < TODAY_DATE) {
      setSearchDate(TODAY_DATE);
      showToast('⚠️ La date de départ ne peut pas être antérieure à aujourd\'hui.');
      return;
    }
    if (searchTab === 'retour' && searchReturnDate < searchDate) {
      setSearchReturnDate(searchDate);
      showToast('⚠️ La date de retour doit être égale ou postérieure au départ.');
      return;
    }
    setPage('results');
    showToast('🔍 Vols trouvés pour ' + searchDep + ' → ' + searchDest);
  };

  const handlePopularReserve = (routeLabel) => {
    const flight = popularFlights.find((f) => f.route === routeLabel) || flights.find((f) => f.route === routeLabel) || FLIGHTS.find((f) => f.route === routeLabel) || flights[0];
    if (flight) {
      handleFlightSelect(flight);
    } else {
      setPage('results');
    }
    setSearchDep('Antananarivo (TNR)');
    setSearchDest(routeLabel.split(' → ')[1] + ' (TBD)');
    showToast('✈ Réservation rapide vers ' + routeLabel);
  };

  const handleHelpSubmit = async () => {
    if (!helpForm.email || !helpForm.subject || !helpForm.message) {
      showToast('⚠️ Merci de remplir tous les champs du formulaire.');
      return;
    }
    if (!helpForm.email.includes('@')) {
      showToast('❌ Email invalide.');
      return;
    }

    try {
      await supportService.submitHelp(helpForm);
      setHelpForm({ email: '', subject: '', message: '' });
      showToast('✅ Votre demande a bien été envoyée au support.');
    } catch (error) {
      console.error('Support submit error:', error);
      showToast('❌ Erreur en envoyant le formulaire. Réessayez plus tard.');
    }
  };

  const handleFillSearch = (from, to = '') => {
    setSearchDep(from);
    setSearchDest(to);
    setPage('home');
    showToast('🛫 Départ: ' + from);
  };

  const handleFlightSelect = (flight) => {
    setBookingFlight({
      ...flight,
      id: flight.id,
      route: flight.route || (flight.dep + ' → ' + flight.arr),
      taxMga: Math.round((flight.priceMga || flight.price || 0) * 0.14),
    });
    setSelectedSeat(null);
    setBookingStep(1);
    setPage('booking');
    showToast('✈ Vol sélectionné : ' + (flight.airline || 'Air Madagascar') + ' ' + (flight.code || 'Vol'));
  };

  const handleAuth = (type) => {
    setAuthMode(type);
    setAuthOpen(true);
  };

  const handleAuthSubmit = (type) => {
    setAuthOpen(false);
    setIsAuthenticated(true);
    showToast(type === 'login' ? '👋 Bienvenue, Marie Rakoto !' : '🎉 Compte créé avec succès !');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPage('home');
    showToast('👋 Vous êtes déconnecté. À bientôt !');
  };

  const handleAdminLogin = () => {
    if (adminEmail === 'mandazo@gmail.com' && adminPassword === '18471844') {
      setIsAdmin(true);
      setPage('admin');
      showToast('🔐 Accès admin autorisé !');
      setAdminEmail('');
      setAdminPassword('');
    } else {
      showToast('❌ Email ou mot de passe incorrect');
    }
  };

  const handleAddFlight = () => {
    if (!newFlight.code || !newFlight.route || !newFlight.depTime || !newFlight.arrTime || !newFlight.price) {
      showToast('⚠️ Veuillez remplir tous les champs');
      return;
    }
    showToast('✅ Vol ' + newFlight.code + ' ajouté avec succès!');
    setNewFlight({ code: '', route: '', depTime: '', arrTime: '', price: '', seats: '' });
    setShowAddFlightForm(false);
  };

  const handleConfirmPayment = async () => {
    if (paymentMethod === 'card') {
      const digits = cardNumber.replace(/\D/g, '');
      if (digits.length < 16) {
        showToast('❌ Numéro de carte invalide.');
        return;
      }
      if (!cardHolder.trim()) {
        showToast('❌ Nom du titulaire manquant.');
        return;
      }
    }

    showToast('🔒 Paiement de ' + formatPrice(bookingTotalAll, currency) + ' en cours...');
    try {
      const bookingData = {
        userId: 1,
        flightId: bookingFlight.id || 1,
        seat: selectedSeat || '12A',
      };
      await bookingService.createBooking(bookingData);
      
      setTimeout(() => {
        setPage('ticket');
        showToast('🎉 Paiement confirmé ! Billet généré.');
      }, 1800);
    } catch (error) {
      console.error('Payment error:', error);
      showToast('❌ Erreur lors du paiement. Veuillez vérifier vos informations et réessayer.');
    }
  };

  const handleSeatSelect = (seat, occupied) => {
    if (occupied) return;
    setSelectedSeat(seat);
    showToast('✅ Siège ' + seat + ' sélectionné !');
  };

  const seatRows = useMemo(() => {
    const rows = [];
    let idx = 0;
    for (let row = 1; row <= 12; row += 1) {
      const seats = SEAT_COLUMNS.map((col) => {
        if (!col) return { type: 'aisle' };
        idx += 1;
        const occupied = OCCUPIED_SEATS.has(idx);
        const premium = PREMIUM_SEATS.has(idx) && !occupied;
        const label = `${row}${col}`;
        return {
          type: 'seat',
          label,
          occupied,
          premium,
        };
      });
      rows.push({ row, seats });
    }
    return rows;
  }, []);

  const currentPriceLabel = formatPrice(priceRange, currency);
  const priceMinLabel = formatPrice(500000, currency);

  const updateCardValue = (value) => {
    const formatted = formatCardNumber(value);
    setCardNumber(formatted);
  };

  const navPages = [
    { id: 'home', label: 'Accueil', icon: '🏠' },
    { id: 'results', label: 'Vols', icon: '✈️' },
    { id: 'ticket', label: 'Mon billet', icon: '🎫' },
    { id: 'help', label: 'Aide', icon: '❓' },
    { id: 'dashboard', label: 'Mon Espace', icon: '👤' },
  ];

  return (
    <div className="app-shell">
      <div className="background-plane">
        <div className="background-plane-icon">✈️</div>
      </div>
      {!isAuthenticated && page !== 'admin' ? (
        <div className="modal-overlay open" id="authModal" onClick={(e) => e.target === e.currentTarget && setAuthOpen(false)}>
          <div className="modal">
            <button className="modal-close" onClick={() => setAuthOpen(false)}>✕</button>
            <div className="auth-logo">✦ MANIDINA</div>
            <p className="auth-subtitle">{authMode === 'login' ? 'Connectez-vous à votre compte' : 'Créez votre compte gratuitement'}</p>
            <div className="auth-tabs">
              {Object.entries(AUTH_TABS).map(([key,label]) => (
                <button key={key} className={`auth-tab ${authMode === key ? 'active' : ''}`} onClick={() => setAuthMode(key)}>{label}</button>
              ))}
            </div>
            {authMode === 'login' ? (
              <div className="auth-form">
                <div className="form-group"><label>Email</label><input type="email" placeholder="vous@email.com" value={authEmail} onChange={(e) => setAuthEmail(e.target.value)} /></div>
                <div className="form-group"><label>Mot de passe</label><input type="password" placeholder="••••••••" value={authPassword} onChange={(e) => setAuthPassword(e.target.value)} /></div>
                <a href="#" style={{ fontSize: '0.82rem', color: 'var(--primary)', textAlign: 'right', display: 'block', marginTop: '-8px' }}>Mot de passe oublié ?</a>
                <button className="btn btn-primary" style={{ padding: 13 }} onClick={() => handleAuthSubmit('login')}>Connexion →</button>
                <div className="divider">ou</div>
                <div className="social-sync">
                  <div className="social-sync-label">Synchronisation de compte</div>
                  <div className="social-buttons">
                    <button type="button" className="social-btn" onClick={() => showToast('🔗 Connexion Google...')}>🔍 Google</button>
                    <button type="button" className="social-btn" onClick={() => showToast('🔗 Connexion Facebook...')}>📘 Facebook</button>
                    <button type="button" className="social-btn" onClick={() => showToast('🔗 Connexion Apple...')}>🍎 Apple</button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="auth-form" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div className="form-group"><label>Prénom</label><input type="text" placeholder="Marie" /></div>
                  <div className="form-group"><label>Nom</label><input type="text" placeholder="RAKOTO" /></div>
                </div>
                <div className="form-group"><label>Email</label><input type="email" placeholder="vous@email.com" /></div>
                <div className="form-group"><label>Téléphone (optionnel)</label><input type="tel" placeholder="+261 34 00 000 00" /></div>
                <div className="form-group"><label>Mot de passe (min 8 car.)</label><input type="password" placeholder="••••••••" /></div>
                <div className="form-group"><label>Confirmation</label><input type="password" placeholder="••••••••" /></div>
                <button className="btn btn-primary" style={{ padding: 13 }} onClick={() => handleAuthSubmit('register')}>Créer mon compte →</button>
                <div className="social-sync">
                  <div className="social-sync-label">Synchronisation de compte</div>
                  <div className="social-buttons">
                    <button type="button" className="social-btn" onClick={() => showToast('🔗 Inscription Google...')}>🔍 Google</button>
                    <button type="button" className="social-btn" onClick={() => showToast('🔗 Inscription Facebook...')}>📘 Facebook</button>
                    <button type="button" className="social-btn" onClick={() => showToast('🔗 Inscription Apple...')}>🍎 Apple</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <>
          <nav>
            <div className="logo" onClick={() => setPage('home')}>✦ MANIDINA</div>
            <ul className="nav-links">
              {navPages.map((item) => (
                <li key={item.id}>
                  <button className={page === item.id ? 'active' : ''} onClick={() => setPage(item.id)}>{item.icon} {item.label}</button>
                </li>
              ))}
            </ul>
            <div className="nav-actions">
              <button className="btn btn-ghost" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
                {theme === 'dark' ? '☀️ Clair' : '🌙 Sombre'}
              </button>
              <div className="currency-bar">
                {CURRENCIES.map((code) => (
                  <button
                    key={code}
                    className={`currency-btn ${currency === code ? 'active' : ''}`}
                    onClick={() => handleCurrencyChange(code)}
                  >
                    {code === 'MGA' ? 'Ar' : code === 'EUR' ? '€' : '$'}
                  </button>
                ))}
              </div>
              <button className="btn btn-ghost" title="Se déconnecter" onClick={handleLogout}>🚪</button>
            </div>
          </nav>

          <main>
        <section className={`page ${page === 'home' ? 'active' : ''}`} id="page-home">
          <div className="hero">
            <div className="hero-badge">✦ Plateforme de réservation aérienne</div>
            <h1>Volez vers l'<span className="accent">inconnu</span>,<br />avec <span className="gold">style</span>.</h1>
            <p className="hero-sub">Réservez vos billets en quelques secondes. Sièges, suppléments, paiement sécurisé — tout en un seul endroit.</p>

            <div className="hero-visual">
              <div className="hero-visual-card">
                <div className="hero-badge small">Classe affaires</div>
                <div className="flight-hero-plane">
                  <div className="wing wing-left" />
                  <div className="wing wing-right" />
                  <div className="fuselage" />
                  <div className="tail" />
                  <div className="engine engine-left" />
                  <div className="engine engine-right" />
                </div>
                <div className="hero-route-row">
                  <div>
                    <div className="hero-route-label">TNR</div>
                    <div className="hero-route-city">Antananarivo</div>
                  </div>
                  <div className="hero-route-line">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <div>
                    <div className="hero-route-label">CDG</div>
                    <div className="hero-route-city">Paris</div>
                  </div>
                </div>
                <div className="hero-flight-meta">
                  <div>
                    <strong>15h 45min</strong>
                    <small>Escales optimisées</small>
                  </div>
                  <div>
                    <strong>Airbus A350</strong>
                    <small>Cabine premium</small>
                  </div>
                  <div>
                    <strong>4.9 / 5</strong>
                    <small>Note passagers</small>
                  </div>
                </div>
                <div className="flight-path" />
              </div>
            </div>

            <div className="search-box">
              <div className="search-tabs">
                <button className={`search-tab ${searchTab === 'aller' ? 'active' : ''}`} onClick={() => setSearchTab('aller')}>Aller simple</button>
                <button className={`search-tab ${searchTab === 'retour' ? 'active' : ''}`} onClick={() => setSearchTab('retour')}>Aller-retour</button>
                <button className={`search-tab ${searchTab === 'multi' ? 'active' : ''}`} onClick={() => setSearchTab('multi')}>Multi-destinations</button>
              </div>
              <div className="search-grid">
                {/* Départ */}
                <div className="form-group" style={{ position: 'relative' }} ref={depRef}>
                  <label>Départ</label>
                  <input
                    type="text"
                    placeholder="🛫 Ville ou code IATA"
                    value={searchDep}
                    onFocus={() => setShowACDep(true)}
                    onChange={(e) => setSearchDep(e.target.value)}
                    autoComplete="off"
                  />
                  <div className={`ac-dropdown ${showACDep ? 'open' : ''}`}>
                    {depSuggestions.map((airport) => (
                      <div
                        key={airport.code}
                        className="ac-item"
                        onClick={() => {
                          setSearchDep(`${airport.city} (${airport.code})`);
                          setShowACDep(false);
                        }}
                      >
                        <span className="ac-flag">{airport.flag}</span>
                        <span className="ac-code">{airport.code}</span>
                        <div className="ac-info">
                          <div className="ac-city">{airport.city}</div>
                          <div className="ac-airport">{airport.airport} · {airport.country}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Destination */}
                <div className="form-group" style={{ position: 'relative' }} ref={destRef}>
                  <label>Destination</label>
                  <input
                    type="text"
                    placeholder="🛬 Ville ou code IATA"
                    value={searchDest}
                    onFocus={() => setShowACDest(true)}
                    onChange={(e) => setSearchDest(e.target.value)}
                    autoComplete="off"
                  />
                  <div className={`ac-dropdown ${showACDest ? 'open' : ''}`}>
                    {destSuggestions.map((airport) => (
                      <div
                        key={airport.code}
                        className="ac-item"
                        onClick={() => {
                          setSearchDest(`${airport.city} (${airport.code})`);
                          setShowACDest(false);
                        }}
                      >
                        <span className="ac-flag">{airport.flag}</span>
                        <span className="ac-code">{airport.code}</span>
                        <div className="ac-info">
                          <div className="ac-city">{airport.city}</div>
                          <div className="ac-airport">{airport.airport} · {airport.country}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Date départ */}
                <div className="form-group">
                  <label>Date départ</label>
                  <input
                    type="date"
                    value={searchDate}
                    min={TODAY_DATE}
                    onChange={(e) => handleSearchDateChange(e.target.value)}
                  />
                </div>

                {/* Date retour - visible seulement pour Aller-retour */}
                {searchTab === 'retour' && (
                  <div className="form-group">
                    <label>Date retour</label>
                    <input
                      type="date"
                      value={searchReturnDate}
                      min={searchDate || TODAY_DATE}
                      onChange={(e) => handleSearchReturnDateChange(e.target.value)}
                    />
                  </div>
                )}

                {/* Passagers / Classe */}
                <div className="form-group">
                  <label>Passagers / Classe</label>
                  <select value={searchClass} onChange={(e) => setSearchClass(e.target.value)}>
                    <option>1 adulte — Économique</option>
                    <option>2 adultes — Business</option>
                    <option>1 jeune — Sans carte</option>
                    <option>1 adulte — Première</option>
                    <option>Autre type</option>
                  </select>
                </div>

                <button className="btn btn-primary search-btn-lg" onClick={handleSearch}>Rechercher</button>
              </div>

              {/* Section Multi-destinations */}
              {searchTab === 'multi' && (
                <div style={{ marginTop: 24, padding: '20px', backgroundColor: 'var(--card)', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
                  <h3 style={{ marginBottom: 16, fontSize: '1rem', fontWeight: 600 }}>✈ Ajouter des destinations</h3>
                  {searchDestinations.map((dest, idx) => (
                    <div key={idx} style={{ display: 'grid', gridTemplateColumns: '1.5fr 1.5fr 1fr auto', gap: 12, marginBottom: 12 }}>
                      <input type="text" placeholder="Départ" value={dest.dep} style={{ padding: 10, borderRadius: 8, border: '1px solid var(--border)', backgroundColor: 'var(--bg)' }} readOnly />
                      <input type="text" placeholder="Destination" value={dest.dest} style={{ padding: 10, borderRadius: 8, border: '1px solid var(--border)', backgroundColor: 'var(--bg)' }} readOnly />
                      <input type="date" value={dest.date} style={{ padding: 10, borderRadius: 8, border: '1px solid var(--border)', backgroundColor: 'var(--bg)' }} readOnly />
                      <button className="btn btn-ghost" onClick={() => setSearchDestinations(searchDestinations.filter((_, i) => i !== idx))}>✕</button>
                    </div>
                  ))}
                  <button className="btn btn-primary" style={{ width: '100%', marginTop: 12 }} onClick={() => setSearchDestinations([...searchDestinations, { dep: 'Antananarivo (TNR)', dest: 'Paris CDG (CDG)', date: TODAY_DATE }])}>+ Ajouter destination</button>
                </div>
              )}
            </div>

            <div className="stats-row">
              <div className="stat"><div className="stat-num">340+</div><div className="stat-label">Compagnies partenaires</div></div>
              <div className="stat"><div className="stat-num">2.4M</div><div className="stat-label">Voyageurs satisfaits</div></div>
              <div className="stat"><div className="stat-num">180+</div><div className="stat-label">Destinations</div></div>
              <div className="stat"><div className="stat-num">98%</div><div className="stat-label">Taux de satisfaction</div></div>
            </div>

            <div className="popular-section">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, marginTop: 44, marginBottom: 18, flexWrap: 'wrap' }}>
                <div>
                  <h2 style={{ fontSize: '1.8rem', marginBottom: 6 }}>Vols populaires</h2>
                  <p className="sub">Les destinations les plus réservées par nos clients.</p>
                </div>
                <button className="btn btn-primary" onClick={() => setPage('results')}>Voir tous les vols</button>
              </div>
              <div className="popular-cards">
                {(popularFlights.length ? popularFlights : POPULAR_ROUTES).map((item) => {
                  const routeLabel = item.route || item.label;
                  return (
                    <div key={routeLabel} className="dest-card" style={{ cursor: 'pointer', minHeight: 160 }} onClick={() => handlePopularReserve(routeLabel)}>
                      <div style={{ fontSize: '1.4rem', marginBottom: 14 }}>{item.icon || '✈️'}</div>
                      <div style={{ fontWeight: 700, marginBottom: 8 }}>{routeLabel}</div>
                      <div style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>{item.description || item.subtitle || 'Réservez ce trajet en un clic.'}</div>
                      <div style={{ marginTop: 16, display: 'grid', gap: 8 }}>
                        {item.priceMga ? <span style={{ fontSize: '0.9rem', color: 'var(--text)' }}>À partir de {formatPrice(item.priceMga, currency)}</span> : null}
                        <button type="button" className="btn btn-ghost" style={{ padding: '10px 16px' }} onClick={(e) => { e.stopPropagation(); handlePopularReserve(routeLabel); }}>Réserver</button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="destinations-section">
            <h2>Aéroports & Destinations Madagascar</h2>
            <p className="sub">Tous les vols au départ et à destination des aéroports malgaches</p>
            <div className="dest-grid">
              {DESTINATIONS.map((dest) => (
                <div
                  key={dest.code}
                  className={`dest-card ${dest.type === 'intl' ? 'intl' : ''}`}
                  onClick={() => handleFillSearch(`${dest.name} (${dest.code})`, '')}
                >
                  <div className="dest-iata">{dest.code}</div>
                  <div className="dest-name">{dest.name}</div>
                  <div className="dest-airport">{dest.airport}</div>
                  <div className="dest-routes">{dest.routes}</div>
                  <span className={`dest-badge ${dest.type === 'intl' ? 'intl' : 'local'}`}>{dest.badge}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={`page ${page === 'results' ? 'active' : ''}`} id="page-results">
          <div className="page-inner">
            <h1 className="page-title">Résultats de recherche</h1>
            <p className="page-subtitle">{searchDep} → {searchDest} · {new Date(searchDate).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })} · 1 passager</p>
            <div className="results-layout">
              <aside className="filter-sidebar">
                <div className="filter-title">⚙ Filtres</div>
                <div className="filter-section">
                  <div className="filter-section-title">Budget max <span id="currencyLabel">{priceLabel}</span></div>
                  <input type="range" className="filter-range" min="500000" max="15000000" value={priceRange} onChange={(e) => setPriceRange(Number(e.target.value))} />
                  <div className="filter-range-labels"><span>{priceMinLabel}</span><span>{currentPriceLabel}</span></div>
                </div>
                <div className="filter-section">
                  <div className="filter-section-title">Escales</div>
                  <div className="checkbox-group">
                    <label className="checkbox-item"><input type="checkbox" checked={flightFilters.direct} onChange={(e) => setFlightFilters((prev) => ({ ...prev, direct: e.target.checked }))} /> Vol direct</label>
                    <label className="checkbox-item"><input type="checkbox" checked={flightFilters.oneStop} onChange={(e) => setFlightFilters((prev) => ({ ...prev, oneStop: e.target.checked }))} /> 1 escale</label>
                    <label className="checkbox-item"><input type="checkbox" checked={flightFilters.multiStop} onChange={(e) => setFlightFilters((prev) => ({ ...prev, multiStop: e.target.checked }))} /> 2 escales+</label>
                  </div>
                </div>
                <div className="filter-section">
                  <div className="filter-section-title">Compagnies</div>
                  <div className="checkbox-group">
                    {Object.keys(flightFilters.airlines).map((airline) => (
                    <label className="checkbox-item" key={airline}>
                      <input
                        type="checkbox"
                        checked={flightFilters.airlines[airline]}
                        onChange={(e) => setFlightFilters((prev) => ({
                          ...prev,
                          airlines: {
                            ...prev.airlines,
                            [airline]: e.target.checked,
                          },
                        }))}
                      /> {airline}
                    </label>
                ))}
                  </div>
                </div>
                <div className="filter-section">
                  <div className="filter-section-title">Classe</div>
                  <div className="checkbox-group">
                    {Object.keys(flightFilters.classes).map((classType) => (
                    <label className="checkbox-item" key={classType}>
                      <input
                        type="checkbox"
                        checked={flightFilters.classes[classType]}
                        onChange={(e) => setFlightFilters((prev) => ({
                          ...prev,
                          classes: {
                            ...prev.classes,
                            [classType]: e.target.checked,
                          },
                        }))}
                      /> {classType}
                    </label>
                ))}
                  </div>
                </div>
                <div className="filter-section">
                  <div className="filter-section-title">Heure de départ</div>
                  <input type="range" className="filter-range" min="0" max="24" value={flightFilters.depEndHour} onChange={(e) => setFlightFilters((prev) => ({ ...prev, depEndHour: Number(e.target.value) }))} />
                  <div className="filter-range-labels"><span>00:00</span><span>{flightFilters.depEndHour}:00</span></div>
                </div>
              </aside>
              <div>
                <div className="sort-bar">
                  {['Prix ↑', 'Durée ↑', 'Rapidité', 'Note compagnie'].map((label) => (
                    <button key={label} className={`sort-chip ${selectedSort === label ? 'active' : ''}`} onClick={() => setSelectedSort(label)}>{label}</button>
                  ))}
                </div>
                {filteredFlights.map((flight) => (
                  <div
                    key={flight.code}
                    className={`flight-card ${flight.premium ? 'premium' : ''}`}
                    onClick={() => handleFlightSelect(flight)}
                  >
                    <div className="airline-logo" style={flight.premium ? { color: 'var(--gold)' } : undefined}>
                      {flight.displayLogo.split('\n').map((line, index) => (
                        <span key={index} style={{ display: 'block', lineHeight: 1 }}>{line}</span>
                      ))}
                    </div>
                    <div className="flight-route">
                      <div>
                        <div className="route-time">{flight.depTime}</div>
                        <div className="route-code">{flight.dep}</div>
                      </div>
                      <div className="route-line">
                        <div className="route-duration">{flight.duration}</div>
                        <div className="route-bar"></div>
                        <div className={`route-stops ${flight.stops.includes('escale') ? 'has-stop' : ''}`}>{flight.stops}</div>
                      </div>
                      <div>
                        <div className="route-time">{flight.arrTime}</div>
                        <div className="route-code">{flight.arr}</div>
                      </div>
                    </div>
                    <div className="flight-info">
                      <div className={`flight-class ${flight.className.toLowerCase().includes('business') ? 'business' : ''}`}>{flight.className}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{flight.aircraft}</div>
                      <div style={{ fontSize: '0.78rem', marginTop: '4px', color: String(flight.seats).startsWith('✓') ? 'var(--success)' : 'var(--error)' }}>{flight.seats}</div>
                    </div>
                    <div className="flight-price">
                      <div className="price-amount" data-mga={flight.priceMga}>{formatPrice(flight.priceMga, currency)}</div>
                      <div className="price-per">par passager</div>
                      <button className={`btn ${flight.premium ? 'btn-gold' : 'btn-primary'} select-btn`} type="button">Sélectionner →</button>
                    </div>
                  </div>
                ))}
                <div style={{ marginTop: 28, marginBottom: 12, fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: '1rem', color: 'var(--text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  ✈ Vols intérieurs Madagascar
                </div>
                {flights.filter((flight) => ['NOS', 'TMM', 'MJN'].includes(flight.arr || flight.route?.split('→')[1]?.trim())).map((flight) => (
                  <div
                    key={flight.code}
                    className="flight-card"
                    onClick={() => handleFlightSelect(flight)}
                  >
                    <div className="airline-logo" style={{ fontSize: '0.65rem' }}>
                      {flight.displayLogo.split('\n').map((line, index) => (
                        <span key={index} style={{ display: 'block', lineHeight: 1 }}>{line}</span>
                      ))}
                    </div>
                    <div className="flight-route">
                      <div>
                        <div className="route-time">{flight.depTime}</div>
                        <div className="route-code">{flight.dep}</div>
                      </div>
                      <div className="route-line">
                        <div className="route-duration">{flight.duration}</div>
                        <div className="route-bar"></div>
                        <div className="route-stops">{flight.stops}</div>
                      </div>
                      <div>
                        <div className="route-time">{flight.arrTime}</div>
                        <div className="route-code">{flight.arr}</div>
                      </div>
                    </div>
                    <div className="flight-info">
                      <div className="flight-class">{flight.className}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{flight.aircraft}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--success)', marginTop: '4px' }}>{flight.seats}</div>
                    </div>
                    <div className="flight-price">
                      <div className="price-amount" data-mga={flight.priceMga}>{formatPrice(flight.priceMga, currency)}</div>
                      <div className="price-per">par passager</div>
                      <button className="btn btn-primary select-btn" type="button">Sélectionner →</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className={`page ${page === 'booking' ? 'active' : ''}`} id="page-booking">
          <div className="page-inner">
            <h1 className="page-title">Votre réservation</h1>
            <p className="page-subtitle">{bookingFlight.airline} · {bookingFlight.route} · {new Date(searchDate).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
            <div className="steps-nav" id="stepsNav">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className={`step-item ${bookingStep === step ? 'active' : bookingStep > step ? 'done' : ''}`} onClick={() => setBookingStep(step)}>
                  <span className="step-num">{step}</span> {step === 1 ? 'Sièges' : step === 2 ? 'Passagers' : step === 3 ? 'Suppléments' : 'Paiement'}
                </div>
              ))}
            </div>

            {bookingStep === 1 && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 24 }}>
                <div className="seat-layout">
                  <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, marginBottom: 20 }}>Sélectionnez votre siège</h3>
                  <div className="aircraft-cabin">✈ Boeing 787 — Dreamliner</div>
                  <div id="seatMap">
                    {seatRows.map((row) => (
                      <div className="seat-row" key={row.row}>
                        <span className="seat-row-num">{row.row}</span>
                        {row.seats.map((seat, index) => {
                          if (seat.type === 'aisle') {
                            return <div className="seat-aisle" key={`aisle-${index}`} />;
                          }
                          const className = seat.occupied ? 'occupied' : seat.premium ? 'premium' : 'available';
                          const selected = selectedSeat === seat.label;
                          return (
                            <div
                              key={seat.label}
                              className={`seat ${className} ${selected ? 'selected' : ''}`}
                              title={seat.label}
                              onClick={() => handleSeatSelect(seat.label, seat.occupied)}
                            >
                              {seat.occupied ? '✕' : seat.label}
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                  <div className="seat-legend">
                    <div className="legend-item"><div className="legend-dot" style={{ background: 'rgba(59,164,255,0.3)', border: '1.5px solid var(--primary)' }}></div>Disponible</div>
                    <div className="legend-item"><div className="legend-dot" style={{ background: 'rgba(239,68,68,0.15)', border: '1.5px solid rgba(239,68,68,0.4)' }}></div>Occupé</div>
                    <div className="legend-item"><div className="legend-dot" style={{ background: 'rgba(214,178,94,0.15)', border: '1.5px solid var(--gold)' }}></div>Premium</div>
                    <div className="legend-item"><div className="legend-dot" style={{ background: 'var(--success)' }}></div>Sélectionné</div>
                  </div>
                </div>
                <div className="order-summary">
                  <div className="summary-title">Récapitulatif</div>
                  <div className="summary-row"><span className="label" id="bookingRouteLbl">Vol {bookingFlight.route}</span><span>{formatPrice(bookingFlight.priceMga, currency)}</span></div>
                  <div className="summary-row"><span className="label">Siège sélectionné</span><span id="selectedSeatLabel" style={{ color: 'var(--primary)' }}>{selectedSeat || '—'}</span></div>
                  <div className="summary-row"><span className="label">Taxes & frais</span><span>{formatPrice(bookingFlight.taxMga, currency)}</span></div>
                  <div className="summary-row total"><span className="label">TOTAL</span><span className="value">{formatPrice(bookingTotalStep1, currency)}</span></div>
                  <button className="btn btn-primary" style={{ width: '100%', marginTop: 20, padding: 13 }} onClick={() => setBookingStep(2)}>Continuer →</button>
                  <button className="btn btn-ghost" style={{ width: '100%', marginTop: 8, padding: 12, fontSize: '0.85rem' }} onClick={() => setPage('results')}>← Retour aux vols</button>
                </div>
              </div>
            )}

            {bookingStep === 2 && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 24 }}>
                <div>
                  <div className="form-card">
                    <div className="form-card-title"><div className="icon">👤</div>Informations passager 1</div>
                    <div className="form-row">
                      <div className="form-group"><label>Prénom</label><input type="text" placeholder="Jean" defaultValue="Marie" /></div>
                      <div className="form-group"><label>Nom</label><input type="text" placeholder="DUPONT" defaultValue="RAKOTO" /></div>
                      <div className="form-group"><label>Date de naissance</label><input type="date" defaultValue="1990-03-22" /></div>
                    </div>
                    <div className="form-row">
                      <div className="form-group"><label>Nationalité</label><select><option>Malgache</option><option>Française</option></select></div>
                      <div className="form-group"><label>N° Passeport</label><input type="text" placeholder="AB123456" defaultValue="MG8754321" /></div>
                      <div className="form-group"><label>Expiration passeport</label><input type="date" defaultValue="2030-07-10" /></div>
                    </div>
                  </div>
                  <div className="form-card">
                    <div className="form-card-title"><div className="icon">📦</div>Suppléments bagages</div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                      {[
                        { key: 'cabine', icon: '🧳', label: 'Cabine 8kg', price: 'Inclus', selected: selectedExtra === 'cabine' },
                        { key: 'soute', icon: '🧳', label: 'Soute 23kg', price: `+ ${formatPrice(225000, currency)}` },
                        { key: 'repas', icon: '🍽', label: 'Repas spécial', price: `+ ${formatPrice(90000, currency)}` },
                      ].map((extra) => (
                        <label key={extra.key} style={{ display: 'flex', flexDirection: 'column', gap: 8, cursor: 'pointer' }}>
                          <div
                            className="extra-opt"
                            style={{
                              background: selectedExtra === extra.key ? 'rgba(59,164,255,0.08)' : 'rgba(255,255,255,0.03)',
                              borderColor: selectedExtra === extra.key ? 'var(--primary)' : 'var(--border)',
                            }}
                            onClick={() => setSelectedExtra(extra.key)}
                          >
                            <div style={{ fontSize: '1.5rem', marginBottom: 8 }}>{extra.icon}</div>
                            <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{extra.label}</div>
                            <div style={{ color: extra.key === 'cabine' ? 'var(--primary)' : 'var(--gold)', fontWeight: 700, marginTop: 6 }}>{extra.price}</div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                  <button className="btn btn-primary" style={{ padding: '13px 32px' }} onClick={() => setBookingStep(3)}>Continuer → Paiement</button>
                </div>
                <div className="order-summary">
                  <div className="summary-title">Récapitulatif</div>
                  <div className="summary-row"><span className="label">Vol {bookingFlight.route}</span><span>{formatPrice(bookingFlight.priceMga, currency)}</span></div>
                  <div className="summary-row"><span className="label">Siège <span id="seatLabel2" style={{ color: 'var(--primary)' }}>{selectedSeat || '12A'}</span></span><span>Inclus</span></div>
                  <div className="summary-row"><span className="label">Bagages soute</span><span>{formatPrice(selectedExtraAmount, currency)}</span></div>
                  <div className="summary-row"><span className="label">Taxes & frais</span><span>{formatPrice(bookingFlight.taxMga, currency)}</span></div>
                  <div className="summary-row total"><span className="label">TOTAL</span><span className="value">{formatPrice(bookingTotalAll, currency)}</span></div>
                </div>
              </div>
            )}

            {bookingStep === 3 && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 24 }}>
                <div>
                  <div className="form-card">
                    <div className="form-card-title"><div className="icon">💳</div>Moyen de paiement</div>
                    <div className="payment-methods" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
                      {[
                        { key: 'card', label: 'Carte bancaire', icon: '💳' },
                        { key: 'mvola', label: 'MVola', icon: '📱' },
                        { key: 'orange', label: 'Orange Money', icon: '🟠' },
                        { key: 'paypal', label: 'PayPal', icon: '🅿' },
                      ].map((method) => (
                        <div
                          key={method.key}
                          className={`payment-method ${paymentMethod === method.key ? 'active' : ''}`}
                          onClick={() => setPaymentMethod(method.key)}
                        >
                          <span className="pm-icon">{method.icon}</span>
                          {method.label}
                        </div>
                      ))}
                    </div>
                    {paymentMethod === 'card' && (
                      <div id="payForm-card">
                        <div className="card-preview">
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                            <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: '1.2rem' }}>MANIDINA</span>
                            <span style={{ fontSize: '1.5rem' }}>💳</span>
                          </div>
                          <div className="card-number" id="cardNum">{(formatCardNumber(cardNumber) || '•••• •••• •••• 4242').padEnd(19, '•')}</div>
                          <div className="card-details">
                            <div><div style={{ fontSize: '0.7rem', marginBottom: 2, opacity: 0.6 }}>TITULAIRE</div>{cardHolder}</div>
                            <div><div style={{ fontSize: '0.7rem', marginBottom: 2, opacity: 0.6 }}>EXPIRE</div>09/28</div>
                          </div>
                        </div>
                        <div className="form-row form-row-2">
                          <div className="form-group"><label>Numéro de carte</label><input type="text" placeholder="1234 5678 9012 3456" value={cardNumber} onChange={(e) => updateCardValue(e.target.value)} maxLength={19} /></div>
                          <div className="form-group"><label>Nom du titulaire</label><input type="text" placeholder="MARIE RAKOTO" value={cardHolder} onChange={(e) => setCardHolder(e.target.value)} /></div>
                        </div>
                        <div className="form-row form-row-2">
                          <div className="form-group"><label>Date d'expiration</label><input type="text" placeholder="MM/AA" defaultValue="09/28" maxLength={5} /></div>
                          <div className="form-group"><label>CVV</label><input type="text" placeholder="•••" maxLength={3} style={{ letterSpacing: '0.2em' }} /></div>
                        </div>
                      </div>
                    )}
                    {paymentMethod === 'mvola' && (
                      <div id="payForm-mvola">
                        <div style={{ background: 'linear-gradient(135deg,#1a0d2e,#2d1060)', borderRadius: 16, padding: 24, marginBottom: 20, textAlign: 'center' }}>
                          <div style={{ fontSize: '2rem', marginBottom: 8 }}>📱</div>
                          <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: '1.1rem', color: '#a855f7', marginBottom: 4 }}>MVola</div>
                          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Paiement mobile sécurisé</div>
                        </div>
                        <div className="form-group" style={{ marginBottom: 16 }}><label>Numéro MVola (034 / 038)</label><input type="tel" placeholder="034 00 000 00" defaultValue="034 12 345 67" /></div>
                        <div style={{ background: 'rgba(168,85,247,0.08)', border: '1px solid rgba(168,85,247,0.2)', borderRadius: 8, padding: 12, fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                          📩 Un code de confirmation sera envoyé par SMS au numéro saisi.
                        </div>
                      </div>
                    )}
                    {paymentMethod === 'orange' && (
                      <div id="payForm-orange">
                        <div style={{ background: 'linear-gradient(135deg,#2e1a00,#5c3500)', borderRadius: 16, padding: 24, marginBottom: 20, textAlign: 'center' }}>
                          <div style={{ fontSize: '2rem', marginBottom: 8 }}>🟠</div>
                          <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: '1.1rem', color: '#f97316', marginBottom: 4 }}>Orange Money</div>
                          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Paiement mobile Orange</div>
                        </div>
                        <div className="form-group" style={{ marginBottom: 16 }}><label>Numéro Orange (032 / 033)</label><input type="tel" placeholder="032 00 000 00" defaultValue="032 98 765 43" /></div>
                        <div style={{ background: 'rgba(249,115,22,0.08)', border: '1px solid rgba(249,115,22,0.2)', borderRadius: 8, padding: 12, fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                          📩 Un code de confirmation sera envoyé par SMS au numéro saisi.
                        </div>
                      </div>
                    )}
                    {paymentMethod === 'paypal' && (
                      <div id="payForm-paypal">
                        <div style={{ background: 'linear-gradient(135deg,#001a4e,#003087)', borderRadius: 16, padding: 24, marginBottom: 20, textAlign: 'center' }}>
                          <div style={{ fontSize: '2rem', marginBottom: 8 }}>🅿</div>
                          <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: '1.1rem', color: '#009cde', marginBottom: 4 }}>PayPal</div>
                          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Paiement international sécurisé</div>
                        </div>
                        <div className="form-group" style={{ marginBottom: 16 }}><label>Adresse email PayPal</label><input type="email" placeholder="vous@email.com" defaultValue="marie.rakoto@email.mg" /></div>
                        <div style={{ background: 'rgba(0,156,222,0.08)', border: '1px solid rgba(0,156,222,0.2)', borderRadius: 8, padding: 12, fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                          🔗 Vous serez redirigé vers PayPal pour finaliser le paiement.
                        </div>
                      </div>
                    )}
                  </div>
                  <button className="btn btn-success" style={{ padding: '15px 40px', fontSize: '1rem', borderRadius: 'var(--radius-sm)' }} onClick={handleConfirmPayment}>🔒 Payer {formatPrice(bookingTotalAll, currency)} — Confirmer</button>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 12 }}>🔐 Paiement sécurisé · Toutes les transactions sont chiffrées SSL 256-bit</p>
                </div>
                <div className="order-summary">
                  <div className="summary-title">Récapitulatif final</div>
                  <div className="summary-row"><span className="label">Vol {bookingFlight.route}</span><span>{formatPrice(bookingFlight.priceMga, currency)}</span></div>
                  <div className="summary-row"><span className="label">Siège {selectedSeat || '12A'}</span><span>Inclus</span></div>
                  <div className="summary-row"><span className="label">Bagages soute</span><span>{formatPrice(selectedExtraAmount, currency)}</span></div>
                  <div className="summary-row"><span className="label">Taxes & frais</span><span>{formatPrice(bookingFlight.taxMga, currency)}</span></div>
                  <div className="summary-row total"><span className="label">TOTAL</span><span className="value">{formatPrice(bookingTotalAll, currency)}</span></div>
                  <div style={{ marginTop: 16, padding: 12, background: 'rgba(16,185,129,0.07)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 8, fontSize: '0.8rem', color: 'var(--success)' }}>
                    ✓ Remboursable jusqu'à 48h avant le vol
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        <section className={`page ${page === 'ticket' ? 'active' : ''}`} id="page-ticket">
          <div className="page-inner" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '4rem', marginBottom: 16, animation: 'fadeDown 0.5s ease' }}>✅</div>
            <h1 className="page-title" style={{ textAlign: 'center', color: 'var(--success)', marginBottom: 8 }}>Réservation confirmée !</h1>
            <p style={{ color: 'var(--text-muted)', marginBottom: 40 }}>Votre billet électronique a été envoyé à <strong>marie.rakoto@email.mg</strong></p>
            <div className="ticket">
              <div className="ticket-header">
                <div style={{ fontSize: '0.8rem', opacity: 0.7, marginBottom: 4 }}>✦ MANIDINA · BILLET ÉLECTRONIQUE</div>
                <h2>Air Madagascar</h2>
                <div className="pnr">PNR: MNI-2025-KX7R4</div>
              </div>
              <div className="ticket-body">
                <div className="ticket-route">
                  <div className="ticket-city">
                    <div className="city-code">TNR</div>
                    <div className="city-name">Antananarivo</div>
                    <div className="city-time">08:30</div>
                  </div>
                  <div style={{ flex: 1, textAlign: 'center' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 6 }}>13h 20min · Direct</div>
                    <div className="ticket-plane-icon">✈</div>
                  </div>
                  <div className="ticket-city">
                    <div className="city-code">CDG</div>
                    <div className="city-name">Paris</div>
                    <div className="city-time">21:50</div>
                  </div>
                </div>
                <hr className="ticket-divider" />
                <div className="ticket-details">
                  <div className="ticket-detail-item"><div className="td-label">Passager</div><div className="td-value">MARIE RAKOTO</div></div>
                  <div className="ticket-detail-item"><div className="td-label">Siège</div><div className="td-value" style={{ color: 'var(--primary)' }}>{selectedSeat || '12A'}</div></div>
                  <div className="ticket-detail-item"><div className="td-label">Classe</div><div className="td-value">Économique</div></div>
                  <div className="ticket-detail-item"><div className="td-label">Date</div><div className="td-value">{new Date(searchDate).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })}</div></div>
                  <div className="ticket-detail-item"><div className="td-label">Porte</div><div className="td-value" style={{ color: 'var(--gold)' }}>G22</div></div>
                  <div className="ticket-detail-item"><div className="td-label">Embarquement</div><div className="td-value">07:50</div></div>
                </div>
                <div className="qr-area">
                  <svg className="qr-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <rect width="100" height="100" fill="#0d1a2e" />
                    <rect x="5" y="5" width="30" height="30" fill="none" stroke="#3BA4FF" strokeWidth="3" />
                    <rect x="10" y="10" width="20" height="20" fill="#3BA4FF" />
                    <rect x="65" y="5" width="30" height="30" fill="none" stroke="#3BA4FF" strokeWidth="3" />
                    <rect x="70" y="10" width="20" height="20" fill="#3BA4FF" />
                    <rect x="5" y="65" width="30" height="30" fill="none" stroke="#3BA4FF" strokeWidth="3" />
                    <rect x="10" y="70" width="20" height="20" fill="#3BA4FF" />
                    <rect x="42" y="5" width="6" height="6" fill="#3BA4FF" />
                    <rect x="50" y="5" width="6" height="6" fill="#3BA4FF" />
                    <rect x="42" y="13" width="6" height="6" fill="#3BA4FF" />
                    <rect x="58" y="13" width="6" height="6" fill="#3BA4FF" />
                    <rect x="42" y="21" width="6" height="6" fill="#3BA4FF" />
                    <rect x="50" y="21" width="6" height="6" fill="#3BA4FF" />
                    <rect x="42" y="42" width="6" height="6" fill="#3BA4FF" />
                    <rect x="50" y="42" width="6" height="6" fill="#3BA4FF" />
                    <rect x="58" y="42" width="6" height="6" fill="#3BA4FF" />
                    <rect x="66" y="42" width="6" height="6" fill="#3BA4FF" />
                    <rect x="74" y="42" width="6" height="6" fill="#3BA4FF" />
                    <rect x="5" y="42" width="6" height="6" fill="#3BA4FF" />
                    <rect x="13" y="42" width="6" height="6" fill="#3BA4FF" />
                    <rect x="21" y="42" width="6" height="6" fill="#3BA4FF" />
                    <rect x="29" y="42" width="6" height="6" fill="#3BA4FF" />
                    <rect x="37" y="42" width="6" height="6" fill="#3BA4FF" />
                    <rect x="5" y="50" width="6" height="6" fill="#3BA4FF" />
                    <rect x="21" y="50" width="6" height="6" fill="#3BA4FF" />
                    <rect x="37" y="50" width="6" height="6" fill="#3BA4FF" />
                    <rect x="58" y="50" width="6" height="6" fill="#3BA4FF" />
                    <rect x="74" y="50" width="6" height="6" fill="#3BA4FF" />
                    <rect x="5" y="58" width="6" height="6" fill="#3BA4FF" />
                    <rect x="13" y="58" width="6" height="6" fill="#3BA4FF" />
                    <rect x="29" y="58" width="6" height="6" fill="#3BA4FF" />
                    <rect x="42" y="58" width="6" height="6" fill="#3BA4FF" />
                    <rect x="50" y="58" width="6" height="6" fill="#3BA4FF" />
                    <rect x="66" y="58" width="6" height="6" fill="#3BA4FF" />
                    <rect x="42" y="66" width="6" height="6" fill="#D6B25E" />
                    <rect x="58" y="66" width="6" height="6" fill="#D6B25E" />
                    <rect x="66" y="66" width="6" height="6" fill="#D6B25E" />
                    <rect x="74" y="66" width="6" height="6" fill="#D6B25E" />
                    <rect x="50" y="74" width="6" height="6" fill="#D6B25E" />
                    <rect x="66" y="74" width="6" height="6" fill="#D6B25E" />
                    <rect x="42" y="82" width="6" height="6" fill="#D6B25E" />
                    <rect x="58" y="82" width="6" height="6" fill="#D6B25E" />
                    <rect x="74" y="82" width="6" height="6" fill="#D6B25E" />
                    <rect x="42" y="90" width="6" height="6" fill="#3BA4FF" />
                    <rect x="50" y="90" width="6" height="6" fill="#3BA4FF" />
                    <rect x="66" y="90" width="6" height="6" fill="#3BA4FF" />
                    <rect x="74" y="90" width="6" height="6" fill="#3BA4FF" />
                  </svg>
                </div>
              </div>
            </div>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                <button className="btn btn-primary" style={{ padding: '12px 28px' }} onClick={() => showToast('📥 Billet PDF téléchargé !')}>📥 Télécharger PDF</button>
                <button className="btn btn-ghost" style={{ padding: '12px 28px' }} onClick={() => showToast('✉ Email envoyé à marie.rakoto@email.mg')}>✉ Renvoyer par email</button>
                <button className="btn btn-ghost" style={{ padding: '12px 28px' }} onClick={() => setPage('dashboard')}>← Mon espace</button>
              </div>
            </div>
          </section>

          <section className={`page ${page === 'help' ? 'active' : ''}`} id="page-help">
            <div className="page-inner">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16, marginBottom: 32 }}>
                <div>
                  <h1 className="page-title">Aide & Support</h1>
                  <p className="page-subtitle">Besoin d'aide ? Nous sommes là pour vous accompagner.</p>
                </div>
                <button className="btn btn-primary" onClick={() => showToast('📨 Notre équipe de support vous contactera bientôt.')}>Contacter le support</button>
              </div>
              <div className="dashboard-grid" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))' }}>
                <div className="dash-card"><span className="dash-card-icon">📩</span><span className="dash-card-value">Support 24/7</span><div className="dash-card-label">Réponse rapide sous 15 min</div></div>
                <div className="dash-card"><span className="dash-card-icon">💳</span><span className="dash-card-value">Paiement</span><div className="dash-card-label">Sécurisé et simple</div></div>
                <div className="dash-card gold-card"><span className="dash-card-icon">✈</span><span className="dash-card-value">Vols</span><div className="dash-card-label">Modification gratuite</div></div>
                <div className="dash-card"><span className="dash-card-icon">🛂</span><span className="dash-card-value">Documents</span><div className="dash-card-label">Conseils de voyage</div></div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginTop: 32 }}>
                <div style={{ padding: 24, backgroundColor: 'var(--card)', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
                  <h3>Questions fréquentes</h3>
                  <div style={{ marginTop: 18, display: 'grid', gap: 16 }}>
                    <div><strong>Comment modifier ma réservation ?</strong><p style={{ marginTop: 6, color: 'var(--text-muted)' }}>Rendez-vous sur Mon Espace, sélectionnez votre réservation puis cliquez sur Gérer.</p></div>
                    <div><strong>Quel est le délai pour obtenir un remboursement ?</strong><p style={{ marginTop: 6, color: 'var(--text-muted)' }}>Les remboursements sont possibles jusqu'à 48h avant le départ.</p></div>
                    <div><strong>Comment changer la devise de paiement ?</strong><p style={{ marginTop: 6, color: 'var(--text-muted)' }}>Utilisez le sélecteur de devise dans le menu principal.</p></div>
                  </div>
                </div>
                <div style={{ padding: 24, backgroundColor: 'var(--card)', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
                  <h3>Contact rapide</h3>
                  <div style={{ marginTop: 18, display: 'grid', gap: 14 }}>
                    <div><strong>Email</strong><p style={{ marginTop: 6, color: 'var(--text-muted)' }}>support@manidina.mg</p></div>
                    <div><strong>Téléphone</strong><p style={{ marginTop: 6, color: 'var(--text-muted)' }}>+261 34 12 34 56</p></div>
                    <div><strong>Chat live</strong><p style={{ marginTop: 6, color: 'var(--text-muted)' }}>Disponible 24/7</p></div>
                    <div><strong>Aéroport</strong><p style={{ marginTop: 6, color: 'var(--text-muted)' }}>Ivato, Antananarivo</p></div>
                  </div>
                </div>
              </div>
              <div style={{ marginTop: 28, padding: 24, backgroundColor: 'var(--card)', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
                <h3>Envoyer une demande d'aide</h3>
                <div style={{ display: 'grid', gap: 16, marginTop: 18 }}>
                  <div className="form-group"><label>Email</label><input type="email" placeholder="vous@email.com" value={helpForm.email} onChange={(e) => setHelpForm((prev) => ({ ...prev, email: e.target.value }))} /></div>
                  <div className="form-group"><label>Objet</label><input type="text" placeholder="Sujet de la demande" value={helpForm.subject} onChange={(e) => setHelpForm((prev) => ({ ...prev, subject: e.target.value }))} /></div>
                  <div className="form-group"><label>Message</label><textarea rows="4" placeholder="Votre message" value={helpForm.message} onChange={(e) => setHelpForm((prev) => ({ ...prev, message: e.target.value }))} style={{ resize: 'vertical' }} /></div>
                  <button className="btn btn-primary" onClick={handleHelpSubmit}>📩 Envoyer la demande</button>
                </div>
              </div>
            </div>
          </section>

        <section className={`page ${page === 'dashboard' ? 'active' : ''}`} id="page-dashboard">
            <div className="page-inner">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32 }}>
                <div>
                  <h1 className="page-title">Bonjour, Marie 👋</h1>
                  <p className="page-subtitle">Bienvenue dans votre espace personnel</p>
                </div>
                <button className="btn btn-primary" onClick={() => setPage('home')}>+ Nouveau vol</button>
              </div>
              <div className="dashboard-grid">
                <div className="dash-card"><span className="dash-card-icon">✈</span><span className="dash-card-value">12</span><div className="dash-card-label">Vols effectués</div></div>
                <div className="dash-card"><span className="dash-card-icon">📅</span><span className="dash-card-value">3</span><div className="dash-card-label">Réservations à venir</div></div>
                <div className="dash-card gold-card"><span className="dash-card-icon">⭐</span><span className="dash-card-value">4 820</span><div className="dash-card-label">Miles accumulés</div></div>
                <div className="dash-card"><span className="dash-card-icon">💰</span><span className="dash-card-value">€ 3 740</span><div className="dash-card-label">Total dépensé</div></div>
              </div>
              <div className="bookings-table-wrap">
                <div className="table-header-bar">
                  <h3>Mes réservations</h3>
                  <input type="text" placeholder="Rechercher..." />
                </div>
                <table>
                  <thead>
                    <tr>
                      <th>PNR</th>
                      <th>Trajet</th>
                      <th>Date</th>
                      <th>Classe</th>
                      <th>Siège</th>
                      <th>Montant</th>
                      <th>Statut</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ color: 'var(--primary)', fontWeight: 600 }}>MNI-KX7R4</td>
                      <td>TNR → CDG</td>
                      <td>15 Sept 2025</td>
                      <td>Économique</td>
                      <td>12A</td>
                      <td>€ 830</td>
                      <td><span className="badge badge-success">Confirmé</span></td>
                      <td><button className="btn btn-ghost" style={{ padding: '5px 12px', fontSize: '0.78rem' }} onClick={() => setPage('ticket')}>Voir billet</button></td>
                    </tr>
                    <tr>
                      <td style={{ color: 'var(--primary)', fontWeight: 600 }}>MNI-JR291</td>
                      <td>CDG → NYC</td>
                      <td>22 Oct 2025</td>
                      <td>Business</td>
                      <td>3C</td>
                      <td>€ 2 140</td>
                      <td><span className="badge badge-pending">En attente</span></td>
                      <td><button className="btn btn-ghost" style={{ padding: '5px 12px', fontSize: '0.78rem' }}>Gérer</button></td>
                    </tr>
                    <tr>
                      <td style={{ color: 'var(--primary)', fontWeight: 600 }}>MNI-BZ834</td>
                      <td>NBI → TNR</td>
                      <td>08 Août 2025</td>
                      <td>Économique</td>
                      <td>21F</td>
                      <td>€ 380</td>
                      <td><span className="badge badge-success">Effectué</span></td>
                      <td><button className="btn btn-ghost" style={{ padding: '5px 12px', fontSize: '0.78rem' }} onClick={() => showToast('📥 Téléchargement...')}>Télécharger</button></td>
                    </tr>
                    <tr>
                      <td style={{ color: 'var(--primary)', fontWeight: 600 }}>MNI-QP018</td>
                      <td>CDG → TNR</td>
                      <td>15 Juin 2025</td>
                      <td>Économique</td>
                      <td>18B</td>
                      <td>€ 687</td>
                      <td><span className="badge badge-cancelled">Annulé</span></td>
                      <td><span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Remboursé</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <section className={`page ${page === 'admin' ? 'active' : ''}`} id="page-admin">
            {!isAdmin ? (
              <div className="page-inner" style={{ maxWidth: 500, margin: '80px auto' }}>
                <h2 style={{ textAlign: 'center', marginBottom: 32 }}>🔐 Accès Admin</h2>
                <div className="form-group"><label>Email Admin</label><input type="email" placeholder="mandazo@gmail.com" value={adminEmail} onChange={(e) => setAdminEmail(e.target.value)} /></div>
                <div className="form-group"><label>Mot de passe</label><input type="password" placeholder="••••••••" value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)} /></div>
                <button className="btn btn-primary" style={{ width: '100%', padding: 13 }} onClick={handleAdminLogin}>Accéder au tableau de bord →</button>
              </div>
            ) : (
              <div className="page-inner">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
                  <div>
                    <h1 className="page-title">Dashboard Admin</h1>
                    <p className="page-subtitle">Vue d'ensemble de la plateforme MANIDINA</p>
                  </div>
                  <button className="btn btn-primary" onClick={() => setShowAddFlightForm(true)}>+ Ajouter un vol</button>
                </div>

                {showAddFlightForm && (
                  <div style={{ padding: 24, backgroundColor: 'var(--card)', borderRadius: 'var(--radius)', border: '1px solid var(--border)', marginBottom: 32 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                      <h3>Ajouter un nouveau vol</h3>
                      <button className="btn btn-ghost" onClick={() => setShowAddFlightForm(false)}>✕</button>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
                      <div className="form-group">
                        <label>Code vol</label>
                        <input type="text" placeholder="ex: AF844" value={newFlight.code} onChange={(e) => setNewFlight({ ...newFlight, code: e.target.value })} />
                      </div>
                      <div className="form-group">
                        <label>Trajet</label>
                        <input type="text" placeholder="ex: TNR → CDG" value={newFlight.route} onChange={(e) => setNewFlight({ ...newFlight, route: e.target.value })} />
                      </div>
                      <div className="form-group">
                        <label>Heure départ</label>
                        <input type="time" value={newFlight.depTime} onChange={(e) => setNewFlight({ ...newFlight, depTime: e.target.value })} />
                      </div>
                      <div className="form-group">
                        <label>Heure arrivée</label>
                        <input type="time" value={newFlight.arrTime} onChange={(e) => setNewFlight({ ...newFlight, arrTime: e.target.value })} />
                      </div>
                      <div className="form-group">
                        <label>Prix (Ar)</label>
                        <input type="number" placeholder="ex: 3430000" value={newFlight.price} onChange={(e) => setNewFlight({ ...newFlight, price: e.target.value })} />
                      </div>
                      <div className="form-group">
                        <label>Nombre de sièges</label>
                        <input type="number" placeholder="ex: 280" value={newFlight.seats} onChange={(e) => setNewFlight({ ...newFlight, seats: e.target.value })} />
                      </div>
                    </div>
                    <button className="btn btn-primary" style={{ width: '100%', padding: 12 }} onClick={handleAddFlight}>✅ Confirmer l'ajout</button>
                  </div>
                )}

                <div className="dashboard-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
                  <div className="dash-card"><span className="dash-card-icon">💰</span><span className="dash-card-value">€ 842K</span><div className="dash-card-label">Revenus totaux</div></div>
                  <div className="dash-card gold-card"><span className="dash-card-icon">🎫</span><span className="dash-card-value">12 481</span><div className="dash-card-label">Réservations</div></div>
                  <div className="dash-card"><span className="dash-card-icon">👥</span><span className="dash-card-value">8 320</span><div className="dash-card-label">Utilisateurs</div></div>
                  <div className="dash-card"><span className="dash-card-icon">✈</span><span className="dash-card-value">1 248</span><div className="dash-card-label">Vols actifs</div></div>
                </div>
                <div className="chart-area">
                  <h3>Revenus mensuels 2025 (€)</h3>
                  <svg viewBox="0 0 860 200" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto' }}>
                    <defs>
                      <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3BA4FF" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#3BA4FF" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <line x1="50" y1="20" x2="840" y2="20" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                    <line x1="50" y1="60" x2="840" y2="60" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                    <line x1="50" y1="100" x2="840" y2="100" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                    <line x1="50" y1="140" x2="840" y2="140" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                    <line x1="50" y1="180" x2="840" y2="180" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                    <text x="40" y="24" fill="#7a9abf" fontSize="11" textAnchor="end">100K</text>
                    <text x="40" y="64" fill="#7a9abf" fontSize="11" textAnchor="end">80K</text>
                    <text x="40" y="104" fill="#7a9abf" fontSize="11" textAnchor="end">60K</text>
                    <text x="40" y="144" fill="#7a9abf" fontSize="11" textAnchor="end">40K</text>
                    <text x="40" y="184" fill="#7a9abf" fontSize="11" textAnchor="end">20K</text>
                    <path d="M90,140 L160,120 L230,130 L300,100 L370,80 L440,60 L510,70 L580,40 L650,55 L720,30 L790,20 L790,180 L90,180 Z" fill="url(#chartGrad)" />
                    <path d="M90,140 L160,120 L230,130 L300,100 L370,80 L440,60 L510,70 L580,40 L650,55 L720,30 L790,20" fill="none" stroke="#3BA4FF" strokeWidth="2.5" strokeLinejoin="round" />
                    {[90, 160, 230, 300, 370, 440, 510, 580, 650, 720, 790].map((x, index) => (
                      <circle key={`dot-${x}`} cx={x} cy={[140, 120, 130, 100, 80, 60, 70, 40, 55, 30, 20][index]} r="4" fill={index < 7 ? '#3BA4FF' : index < 10 ? '#D6B25E' : '#10B981'} />
                    ))}
                    {['Jan','Fév','Mar','Avr','Mai','Jun','Jul','Aoû','Sep','Oct','Nov'].map((label, index) => (
                      <text key={label} x={90 + index * 70} y="198" fill="#7a9abf" fontSize="11" textAnchor="middle">{label}</text>
                    ))}
                  </svg>
                </div>
                <div className="bookings-table-wrap">
                  <div className="table-header-bar">
                    <h3>Gestion des vols</h3>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <input type="text" placeholder="Rechercher..." style={{ width: 180 }} />
                      <button className="btn btn-primary" style={{ fontSize: '0.85rem', padding: '8px 16px' }} onClick={() => setShowAddFlightForm(true)}>+ Ajouter</button>
                    </div>
                  </div>
                  <table>
                    <thead>
                      <tr>
                        <th>N° Vol</th>
                        <th>Trajet</th>
                        <th>Départ</th>
                        <th>Arrivée</th>
                        <th>Compagnie</th>
                        <th>Sièges libres</th>
                        <th>Statut</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { flight: 'MD 042', route: 'TNR → CDG', dep: '08:30', arr: '21:50', company: 'Air Madagascar', seats: '4 / 280', status: 'Actif', badge: 'success' },
                        { flight: 'AF 844', route: 'CDG → TNR', dep: '22:15', arr: '14:30+1', company: 'Air France', seats: '142 / 350', status: 'Actif', badge: 'success' },
                        { flight: 'TK 072', route: 'IST → TNR', dep: '14:00', arr: '02:40+1', company: 'Turkish Airlines', seats: '89 / 300', status: 'En attente', badge: 'pending' },
                      ].map((row) => (
                        <tr key={row.flight}>
                          <td style={{ color: 'var(--primary)', fontWeight: 600 }}>{row.flight}</td>
                          <td>{row.route}</td>
                          <td>{row.dep}</td>
                          <td>{row.arr}</td>
                          <td>{row.company}</td>
                          <td><span style={{ color: row.badge === 'success' ? 'var(--success)' : 'var(--error)' }}>{row.seats}</span></td>
                          <td><span className={`badge badge-${row.badge}`}>{row.status}</span></td>
                          <td style={{ display: 'flex', gap: 6 }}>
                            <button className="btn btn-ghost" style={{ padding: '5px 10px', fontSize: '0.75rem' }} onClick={() => showToast('✏ Modification en cours...')}>✏</button>
                            <button className="btn btn-ghost" style={{ padding: '5px 10px', fontSize: '0.75rem', color: 'var(--error)' }} onClick={() => showToast('🗑 Vol supprimé')}>🗑</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </section>
        </main>
        </>
      )}

      {isAuthenticated && (
        <div className={`modal-overlay ${authOpen ? 'open' : ''}`} id="authModal" onClick={(e) => e.target === e.currentTarget && setAuthOpen(false)}>
          <div className="modal">
            <button className="modal-close" onClick={() => setAuthOpen(false)}>✕</button>
            <div className="auth-logo">✦ MANIDINA</div>
            <p className="auth-subtitle">{authMode === 'login' ? 'Connectez-vous à votre compte' : 'Créez votre compte gratuitement'}</p>
            <div className="auth-tabs">
              {Object.entries(AUTH_TABS).map(([key,label]) => (
                <button key={key} className={`auth-tab ${authMode === key ? 'active' : ''}`} onClick={() => setAuthMode(key)}>{label}</button>
              ))}
            </div>
            {authMode === 'login' ? (
              <div className="auth-form">
                <div className="form-group"><label>Email</label><input type="email" placeholder="vous@email.com" value={authEmail} onChange={(e) => setAuthEmail(e.target.value)} /></div>
                <div className="form-group"><label>Mot de passe</label><input type="password" placeholder="••••••••" value={authPassword} onChange={(e) => setAuthPassword(e.target.value)} /></div>
                <a href="#" style={{ fontSize: '0.82rem', color: 'var(--primary)', textAlign: 'right', display: 'block', marginTop: '-8px' }}>Mot de passe oublié ?</a>
                <button className="btn btn-primary" style={{ padding: 13 }} onClick={() => handleAuthSubmit('login')}>Connexion →</button>
                <div className="divider">ou</div>
                <div className="social-sync">
                  <div className="social-sync-label">Synchronisation de compte</div>
                  <div className="social-buttons">
                    <button type="button" className="social-btn" onClick={() => showToast('🔗 Connexion Google...')}>🔍 Google</button>
                    <button type="button" className="social-btn" onClick={() => showToast('🔗 Connexion Facebook...')}>📘 Facebook</button>
                    <button type="button" className="social-btn" onClick={() => showToast('🔗 Connexion Apple...')}>🍎 Apple</button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="auth-form" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div className="form-group"><label>Prénom</label><input type="text" placeholder="Marie" /></div>
                  <div className="form-group"><label>Nom</label><input type="text" placeholder="RAKOTO" /></div>
                </div>
                <div className="form-group"><label>Email</label><input type="email" placeholder="vous@email.com" /></div>
                <div className="form-group"><label>Téléphone (optionnel)</label><input type="tel" placeholder="+261 34 00 000 00" /></div>
                <div className="form-group"><label>Mot de passe (min 8 car.)</label><input type="password" placeholder="••••••••" /></div>
                <div className="form-group"><label>Confirmation</label><input type="password" placeholder="••••••••" /></div>
                <button className="btn btn-primary" style={{ padding: 13 }} onClick={() => handleAuthSubmit('register')}>Créer mon compte →</button>
              </div>
            )}
          </div>
        </div>
      )}

      <div className={`toast ${toast.visible ? 'show' : ''}`} id="toast">
        <span id="toastMsg">{toast.msg}</span>
      </div>
    </div>
  );
}

export default App;
