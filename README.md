# Weather Web App

## Overview
This is a **Weather Web Application** developed as part of the final project for the **BSc Software Engineering** program at Cardiff University, UK. The app is currently in its early stages of development and is built using the **MERN stack** (MongoDB, Express.js, React, Node.js).

## Features
- **Weather Predictions**: Accurate weather data for any location using the OpenWeather API.
- **Weather Forecasts**: Detailed multi-day weather forecasts.
- **Weather Alerts**: Real-time alerts for severe weather conditions.
- **Educational Tool**: Designed to be user-friendly and ideal for students learning about weather prediction and meteorology.
- **Eye-Catching Design**: A beautifully designed and visually appealing interface for an engaging user experience.

## Technologies Used
- **Frontend**: React.js
- **Backend**: Node.js with Express.js
- **Database**: MongoDB
- **API Integration**: OpenWeather API
- **Styling**: CSS, Tailwind CSS (or other frameworks, if applicable)

## Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd weather-web-app
   ```
3. Install dependencies for both frontend and backend:
   ```bash
   cd client && npm install
   cd ../server && npm install
   ```
4. Set up environment variables:
   - Create a `.env` file in the `server` directory.
   - Add the following variables:
     ```env
     PORT=5000
     MONGO_URI=<your-mongodb-connection-string>
     OPENWEATHER_API_KEY=<your-openweather-api-key>
     ```
5. Run the application:
   - Start the backend:
     ```bash
     cd server && npm start
     ```
   - Start the frontend:
     ```bash
     cd client && npm start
     ```
6. Open the app in your browser at `http://localhost:3000`.

## Usage
- Enter a location to view current weather data.
- Access detailed forecasts for the upcoming days.
- Stay informed with real-time weather alerts.
- Explore the app's educational content for better understanding of weather-related topics.

## Future Enhancements
- **User Accounts**: Add functionality for users to save locations and preferences.
- **Advanced Visualizations**: Incorporate graphs and charts for weather trends.
- **Mobile Responsiveness**: Optimize the app for seamless use on mobile devices.
- **Localization**: Support for multiple languages.

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request with your changes.

## License
This project is licensed under the [Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)](LICENSE).

## Acknowledgments
- OpenWeather for providing weather data through their API.
