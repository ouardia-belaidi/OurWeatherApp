// themes.js

const weatherThemes = {
  clear: {
    day: {
      backgroundGif: require('../../assets/images/clear-day.jpg'),
      colors: {
        backgroundOverlay: '#FFD70090',
        textMain: '#333',
        textSecondary: '#555',
        cardBackground: '#ffffffaa',
      },
    },
    night: {
      backgroundGif: require('../../assets/images/night-clear.jpg'),
      colors: {
        backgroundOverlay: '#001F3F90',
        textMain: '#fff',
        textSecondary: '#ccc',
        cardBackground: '#00000080',
      },
    },
    sunset: {
      backgroundGif: require('../../assets/images/sunset-clear.jpg'), // You need to provide this image
      colors: {
        backgroundOverlay: '#FF8C4290', // warm orange tone
        textMain: '#2c1b0f',
        textSecondary: '#553311',
        cardBackground: '#ffffffaa',
      },
    },
  },
  rain : {
    day: {
      backgroundGif: require('../../assets/images/rainy.jpg'),
      colors: {
        backgroundOverlay: '#4A90E290',
        textMain: '#31255a',
        textSecondary: '#444',
        cardBackground: '#ffffff99',
      },
    },
    night: {
      backgroundGif: require('../../assets/images/rainy.jpg'),
      colors: {
        backgroundOverlay: '#1C1C1C80',
        textMain: '#eee',
        textSecondary: '#ccc',
        cardBackground: '#00000080',
      },
    },
    sunset: {
      backgroundGif: require('../../assets/images/sunset-clear.jpg'), // You need to provide this image
      colors: {
        backgroundOverlay: '#FF8C4290', // warm orange tone
        textMain: '#2c1b0f',
        textSecondary: '#553311',
        cardBackground: '#ffffffaa',
      },
    },
  },
  clouds: {
    day: {
      backgroundGif: require('../../assets/images/clouds.jpg'),
      colors: {
        backgroundOverlay: '#B0BEC590',
        textMain: '#263238',
        textSecondary: '#444',
        cardBackground: '#ffffffaa',
      },
    },
    night: {
      backgroundGif: require('../../assets/images/clouds.jpg'),
      colors: {
        backgroundOverlay: '#37474F90',
        textMain: '#fff',
        textSecondary: '#ccc',
        cardBackground: '#00000080',
      },
    },
    sunset: {
      backgroundGif: require('../../assets/images/sunset-clear.jpg'), // You need to provide this image
      colors: {
        backgroundOverlay: '#FF8C4290', // warm orange tone
        textMain: '#2c1b0f',
        textSecondary: '#553311',
        cardBackground: '#ffffffaa',
      },
    },
  },
  snow: {
    day: {
      backgroundGif: require('../../assets/images/snow-day.jpg'),
      colors: {
        backgroundOverlay: '#eaf6ffcc',
        textMain: '#222',
        textSecondary: '#333',
        cardBackground: '#ffffffcc',
      },
    },
    night: {
      backgroundGif: require('../../assets/images/snow-night2.jpg'),
      colors: {
        backgroundOverlay: '#223344cc',
        textMain: '#fff',
        textSecondary: '#eee',
        cardBackground: '#00000080',
      },
    },
    sunset: {
      backgroundGif: require('../../assets/images/sunset-clear.jpg'), // You need to provide this image
      colors: {
        backgroundOverlay: '#FF8C4290', // warm orange tone
        textMain: '#2c1b0f',
        textSecondary: '#553311',
        cardBackground: '#ffffffaa',
      },
    },
  },
  wind: {
    day: {
      backgroundGif: require('../../assets/images/clouds.jpg'),
      colors: {
        backgroundOverlay: '#A7C5BD90',
        textMain: '#2C3E50',
        textSecondary: '#333',
        cardBackground: '#ffffffaa',
      },
    },
    night: {
      backgroundGif: require('../../assets/images/clouds.jpg'),
      colors: {
        backgroundOverlay: '#34495E90',
        textMain: '#fff',
        textSecondary: '#ccc',
        cardBackground: '#00000080',
      },
    },
    sunset: {
      backgroundGif: require('../../assets/images/sunset-clear.jpg'), // You need to provide this image
      colors: {
        backgroundOverlay: '#FF8C4290', // warm orange tone
        textMain: '#2c1b0f',
        textSecondary: '#553311',
        cardBackground: '#ffffffaa',
      },
    },
  },
};

export default weatherThemes;



