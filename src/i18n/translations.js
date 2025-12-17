export const translations = {
  es: {
    // Weather conditions
    clear: 'Despejado',
    clouds: 'Nublado',
    rain: 'Lluvia',
    drizzle: 'Llovizna',
    thunderstorm: 'Tormenta',
    snow: 'Nieve',
    mist: 'Niebla',
    smoke: 'Humo',
    haze: 'Neblina',
    dust: 'Polvo',
    fog: 'Niebla Densa',
    sand: 'Arena',
    ash: 'Ceniza',
    squall: 'Ráfaga',
    tornado: 'Tornado',
    
    // UI Labels
    temperature: 'Temperatura',
    humidity: 'Humedad',
    windSpeed: 'Velocidad del Viento',
    feelsLike: 'Sensación Térmica',
    loading: 'Cargando...',
    error: 'Error al cargar el clima',
    locationError: 'No se pudo obtener la ubicación',
    retry: 'Reintentar',
    lastUpdate: 'Última actualización',
    
    // Time
    monday: 'Lunes',
    tuesday: 'Martes',
    wednesday: 'Miércoles',
    thursday: 'Jueves',
    friday: 'Viernes',
    saturday: 'Sábado',
    sunday: 'Domingo',
    
    january: 'Enero',
    february: 'Febrero',
    march: 'Marzo',
    april: 'Abril',
    may: 'Mayo',
    june: 'Junio',
    july: 'Julio',
    august: 'Agosto',
    september: 'Septiembre',
    october: 'Octubre',
    november: 'Noviembre',
    december: 'Diciembre',
  },
  
  en: {
    // Weather conditions
    clear: 'Clear',
    clouds: 'Cloudy',
    rain: 'Rain',
    drizzle: 'Drizzle',
    thunderstorm: 'Thunderstorm',
    snow: 'Snow',
    mist: 'Mist',
    smoke: 'Smoke',
    haze: 'Haze',
    dust: 'Dust',
    fog: 'Fog',
    sand: 'Sand',
    ash: 'Ash',
    squall: 'Squall',
    tornado: 'Tornado',
    
    // UI Labels
    temperature: 'Temperature',
    humidity: 'Humidity',
    windSpeed: 'Wind Speed',
    feelsLike: 'Feels Like',
    loading: 'Loading...',
    error: 'Error loading weather',
    locationError: 'Could not get location',
    retry: 'Retry',
    lastUpdate: 'Last update',
    
    // Time
    monday: 'Monday',
    tuesday: 'Tuesday',
    wednesday: 'Wednesday',
    thursday: 'Thursday',
    friday: 'Friday',
    saturday: 'Saturday',
    sunday: 'Sunday',
    
    january: 'January',
    february: 'February',
    march: 'March',
    april: 'April',
    may: 'May',
    june: 'June',
    july: 'July',
    august: 'August',
    september: 'September',
    october: 'October',
    november: 'November',
    december: 'December',
  }
};

export const getTranslation = (lang, key) => {
  return translations[lang]?.[key] || translations.en[key] || key;
};