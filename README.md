# 🌤️ OurWeatherApp

A modern, theme-based weather forecast app built with **React Native**, **Expo**, and the **OpenWeatherMap API**. 
This app displays current weather, hourly and weekly forecasts, weather-based tips, and keeps track of your recent city searches.

## 📱 Features

* 🌍 Fetch weather by city or current location (with permissions)
* 🗕️ 5-days and hourly weather forecast
* 🎨 Dynamic UI themes based on weather condition and time of day
* 💡 Lifestyle tips based on forecast
* 🔎 Search for cities and store search history
* 🧠 Modular hooks and reusable components

## 🏗️ Project Structure
app/
├── (tabs)/
│   ├── index.tsx                # Home screen with all weather data
│
├── search-history.tsx          # History screen showing recent searches
│
components/
├── SearchBar.tsx               # City search input
├── WeatherCard.tsx             # Weather condition card
├── WeeklyForecast.tsx          # 7-day forecast
├── DailyForecast.tsx           # Hourly forecast
├── CurrentWeatherCard.tsx      # Current weather section
├── Tips.tsx                    # Dynamic weather tips section
│
hooks/
├── useLocation.ts              # Get current geolocation
├── useFetchWeather.tsx         # Custom hook to fetch weather data
├── useSearch.tsx               # Search state management (city, history)
│
themes/
├── theme.ts                    # Theme logic based on weather & time
├── theme2.ts                   # Theme configurations (colors, backgrounds)
│
utils/
├── getTips.ts                  # Get weather tips based on condition
├── history.ts                  # AsyncStorage save/load logic


## 🚀 Getting Started

### Prerequisites

* Node.js (LTS)
* Expo CLI
* OpenWeatherMap API key

### Installation

1. Clone the repository:

   git clone https://github.com/yourusername/MyWeatherApp.git
   cd MyWeatherApp


2. Install dependencies:

   npm install
   

3. Run the project:

   npx expo start


4. Scan the QR code using Expo Go on your phone or run it on an emulator.

## 🧹 Technologies Used

* [React Native](https://reactnative.dev/)
* [Expo](https://expo.dev/)
* [OpenWeatherMap API](https://openweathermap.org/)
* [React Navigation + Expo Router](https://expo.github.io/router/docs)
* [AsyncStorage](https://react-native-async-storage.github.io/async-storage/)
...

## 📸 UI Preview
![Clouds](https://github.com/user-attachments/assets/d2ee620b-911b-4207-9abd-26c52beb4aeb)
![Clear](https://github.com/user-attachments/assets/bfabf4b6-68fa-4a78-bfdb-6e6c948e85f7)


---

**Developed with ❤️ by Dihia , Lynda & Ouardia .**
