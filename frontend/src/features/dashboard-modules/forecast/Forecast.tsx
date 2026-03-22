import { useEffect, useState } from "react";
import ForecastDailyItem from "./components/ForecastdailyItem";
import LocationForm from "./components/LocationForm";
import { Button } from "@/components/ui/button";
import { Loader2, MapPinOff } from "lucide-react";
import { getForecast } from "./forecastApi";
import { ForecastDailyInterface } from "./interfaces";

const Forecast = () => {
  const [userLocation, setUserLocation] = useState<boolean>(false);
  // const [foreacastData, isLoading, error] = useGetForecast(userLocation);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [foreacastData, setForecastData] = useState<ForecastDailyInterface[]>(
    []
  );

  useEffect(() => {
    const location = localStorage.getItem("location");
    if (location) {
      setUserLocation(true);
    }
  }, []);

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

  const removeLocation = () => {
    const itemsToDelete = ["location", "latitude", "longitude"];
    for (const item of itemsToDelete) {
      localStorage.removeItem(item);
    }
    setUserLocation(false);
  };
  return (
    <div>
      {!userLocation ? (
        <LocationForm setUserLocation={setUserLocation} />
      ) : isLoading ? (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Loader2 className="animate-spin" />
        </div>
      ) : (
        <>
          <Button
            variant={"ghost"}
            size={"icon"}
            className={`absolute top-3 left-3`}
          >
            <MapPinOff size={"30"} strokeWidth={1.5} onClick={removeLocation} />
          </Button>
          <ul className="gap-2 flex flex-col text-xl font-thin mt-1">
            {foreacastData.map((dailyForecast, index) => (
              <ForecastDailyItem key={index} dailyForecast={dailyForecast} />
            ))}
          </ul>
        </>
      )}
    </div>
  );
};
export default Forecast;
