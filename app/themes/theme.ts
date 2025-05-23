import weatherThemes from "./theme2";

// Valid time slots for themes
type TimeOfDay = 'day' | 'night' | 'sunset';

// Valid weather conditions
type WeatherCondition = 'clear' | 'clouds' | 'rain' | 'snow' | 'wind';

// Theme color scheme interface
interface ThemeColors {
  backgroundOverlay: string;
  textMain: string;
  textSecondary: string;
  cardBackground: string;
}

// Theme per time of day
interface WeatherTheme {
  backgroundGif: any;
  colors: ThemeColors;
}

// Object per weather condition (clear, rainy, etc.)
type WeatherConditionTheme = {
  [key in TimeOfDay]: WeatherTheme;
};

// Full themes object
type WeatherThemes = {
  [key in WeatherCondition]: WeatherConditionTheme;
};

// Assuming your weatherThemes object follows this type
const typedThemes: WeatherThemes = weatherThemes;

// Main function to get theme
export function getTheme(
  condition: string,
  currentTime: number,   // in milliseconds (Date.now())
  sunriseUTC: number,    // in seconds (UNIX timestamp from API)
  sunsetUTC: number      // in seconds (UNIX timestamp from API)
): WeatherTheme {
    const defaultTheme: WeatherTheme = {
        backgroundGif: require('../../assets/images/clear-day.jpg'),
        colors: {
        backgroundOverlay: '#FFD70090',
        textMain: '#333',
        textSecondary: '#555',
        cardBackground: '#ffffffaa',
      },
  };

  // Ensure all inputs are defined and valid
  if (!condition || !currentTime || !sunriseUTC || !sunsetUTC) {
    return defaultTheme;
  }

  const normalized = condition.toLowerCase();
  const key: WeatherCondition =
    (['clear', 'clouds', 'rain', 'snow', 'wind'].find((k) =>
      normalized.includes(k)
    ) as WeatherCondition) || 'clear';
  /*const key : WeatherCondition = (
    condition == 'rain' || 'drizzle' ? 'rainy'
    : condition == 'snow' ? 'snowy'
    : condition == 'wind' ? 'windy'
    :
  ) as WeatherCondition || 'clear';*/
  // Convert UNIX times to JS Date
  const currentDate = new Date(currentTime * 1000); // make sure it's * 1000
const currentHour = currentDate.getHours();

const sunriseHour = new Date(sunriseUTC * 1000).getHours();
const sunsetHour = new Date(sunsetUTC * 1000).getHours();

const timeOfDay: TimeOfDay =
  currentHour < sunriseHour
    ? 'night'
    : currentHour < sunsetHour - 1
    ? 'day'
    : currentHour <= sunsetHour + 1
    ? 'sunset'
    : 'night';

  return typedThemes[key][timeOfDay];
}
