import { useEffect, useState } from "react";
import { ForecastDailyInterface } from "./interfaces";

import { getForecast } from "./forecastApi";

type useGetForecastReturnType = [
  ForecastDailyInterface[] | [],
  boolean,
  string | null
];

const useGetForecast = (userLocation): useGetForecastReturnType => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [foreacastData, setForecastData] = useState<ForecastDailyInterface[]>(
    []
  );

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        setIsLoading(true);
        const latitude = localStorage.getItem("latitude");
        const longitude = localStorage.getItem("longitude");
        if (latitude && longitude) {
          const data: ForecastDailyInterface[] = await getForecast(
            parseFloat(latitude),
            parseFloat(longitude)
          );
          localStorage.setItem("forecastData", JSON.stringify(data));
          setForecastData(data);
        }
      } catch (error) {
        setError(error as string);
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    const forecastLocalStr = localStorage.getItem("forecastData");
    if (forecastLocalStr) {
      const foreacastLocal = JSON.parse(forecastLocalStr);
      const today = new Date().getDate();
      const forecastLocalDate = new Date(foreacastLocal[0].date).getDate();
      if (today === forecastLocalDate) {
        setForecastData(foreacastLocal);
      } else {
        fetchForecast();
      }
    } else {
      fetchForecast();
    }
  }, [userLocation]);

  return [foreacastData, isLoading, error];
};

export default useGetForecast;
