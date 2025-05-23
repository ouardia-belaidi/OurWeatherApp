// utils/getWeatherTips.ts
export interface WeatherTip {
  icon: string;
  label: string;
  url: string;
}

export const getWeatherTips = (weatherCondition: string): WeatherTip[] => {
  switch (weatherCondition.toLowerCase()) {
    case 'rain':
      return [
        { icon: 'umbrella-outline', label: 'Prenez un parapluie', url: 'https://www.weather.com/' },
        { icon: 'car-outline', label: 'Roulez prudemment', url: 'https://www.securite-routiere.gouv.fr/' },
        { icon: 'home-outline', label: 'Restez au sec à la maison', url: 'https://www.netflix.com/' },
        { icon: 'shirt-outline', label: 'Portez un imperméable', url: 'https://www.decathlon.fr/' },
      ];
    case 'clear':
      return [
        { icon: 'sunny-outline', label: 'Profitez du soleil', url: 'https://www.santepubliquefrance.fr/' },
        { icon: 'walk-outline', label: 'Faites une promenade', url: 'https://www.runnersworld.com/' },
        { icon: 'ice-cream-outline', label: 'Prenez une glace', url: 'https://www.google.com/maps/search/glace/' },
        { icon: 'camera-outline', label: 'Prenez des photos', url: 'https://www.instagram.com/' },
      ];
    case 'clouds':
      return [
        { icon: 'cloud-outline', label: 'Couvrez-vous légèrement', url: 'https://www.meteofrance.com/' },
        { icon: 'book-outline', label: 'Lisez un bon livre', url: 'https://www.goodreads.com/' },
        { icon: 'cafe-outline', label: 'Prenez un café chaud', url: 'https://www.starbucks.fr/' },
        { icon: 'headset-outline', label: 'Écoutez un podcast', url: 'https://open.spotify.com/' },
      ];
    case 'snow':
      return [
        { icon: 'snow-outline', label: 'Habillez-vous chaudement', url: 'https://www.decathlon.fr/' },
        { icon: 'car-outline', label: 'Roulez doucement', url: 'https://www.securite-routiere.gouv.fr/' },
        { icon: 'tv-outline', label: 'Regardez un film au chaud', url: 'https://www.netflix.com/' },
        { icon: 'flame-outline', label: 'Allumez la cheminée', url: 'https://www.castorama.fr/' },
      ];
    default:
      return [
        { icon: 'information-circle-outline', label: 'Consultez la météo', url: 'https://www.weather.com/' },
        { icon: 'alert-circle-outline', label: 'Soyez prudent en déplacement', url: 'https://www.service-public.fr/' },
        { icon: 'water-outline', label: 'Hydratez-vous bien', url: 'https://www.doctissimo.fr/' },
        { icon: 'leaf-outline', label: 'Prenez soin de votre santé', url: 'https://www.ameli.fr/' },
      ];
  }
};
