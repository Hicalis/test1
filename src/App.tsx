import Weather, { WeatherProps } from "./components/Weather";
import { useEffect, useState } from "react";
import { Layout, Spin } from "antd";
import AppHeader from "./components/AppHeader";

function App() {
  const [infoWeather, setInfoWeather] = useState<WeatherProps>({
    location: {
      name: "",
      localtime: "",
    },
    current: {
      temp_c: "",
      condition: {
        temp_c: "",
        icon: "",
      },
    },
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isAvailable, setIsAvailable] = useState(true);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        const info = await fetch(
          `http://api.weatherapi.com/v1/current.json?key=c189b30964774edbae3212811240406&q=${coords.latitude},${coords.longitude}&aqi=no`
        ).then((res) => res.json());
        setIsAvailable(true);
        setInfoWeather(info);
        setIsLoading(false);
      },
      () => {
        setIsAvailable(false);
      }
    );
  }, []);

  return (
    <Layout style={{ height: "100vh" }}>
      <AppHeader />
      {isAvailable ? (
        <>{isLoading ? <Spin /> : <Weather {...infoWeather} />}</>
      ) : (
        <h1 style={{ marginLeft: "auto", marginRight: "auto" }}>
          Необходимо предоставить доступ к местоположению
        </h1>
      )}
    </Layout>
  );
}

export default App;
