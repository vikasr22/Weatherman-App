import { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";

export default function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const API_KEY = "4e4a8b1ad0f050bce9ca8ecfae6c5cb8";

  const fetchWeather = async () => {
    if (!city.trim()) {
      setError("Please enter a city");
      setWeather(null);
      return;
    }

    setError("");

    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeather(res.data);
    } catch {
      setWeather(null);
      setError("City not found");
    }
  };

  // Subtle mouse-based blob movement
  useEffect(() => {
    const handleMouse = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      document.querySelectorAll(".music-layer").forEach((b, i) => {
        b.style.transform = `translate(${x * (i + 1)}px, ${y * (i + 1)}px)`;
      });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  return (
    <div className="app">
      {/* Animated background blobs */}
      <div className="music-layer layer1"></div>
      <div className="music-layer layer2"></div>
      <div className="music-layer layer3"></div>

      <div className="container">
        <h1 className="title">Weather</h1>

        <div className="search-container">
          <input
            className="input"
            placeholder="Search city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button className="music-button" onClick={fetchWeather}>
            Search
          </button>
        </div>

        {error && <p className="error">{error}</p>}

        {weather && (
          <div className="weather-card fade-up">
            <h2 className="city">
              {weather.name}, {weather.sys.country}
            </h2>

            <img
              className="weather-icon"
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="icon"
            />

            <p className="temperature">{Math.round(weather.main.temp)}°C</p>

            <p className="description">{weather.weather[0].description}</p>

            <div className="stats">
              <span>💧 {weather.main.humidity}%</span>
              <span>💨 {weather.wind.speed} m/s</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
