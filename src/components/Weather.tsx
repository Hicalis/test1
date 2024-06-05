import { Flex } from "antd";
import { FC } from "react";

export interface WeatherProps {
  location: {
    name: string;
    localtime: string;
  };
  current: {
    temp_c: string;
    condition: {
      temp_c: string;
      icon: string;
    };
  };
}

const Weather: FC<WeatherProps> = ({ location, current }) => {
  return (
    <Flex justify="center">
      <Flex vertical={true} align="center" style={{ display: "inline" }}>
        <h1>
          {location.name} {current.temp_c} °C
          <img src={`${current.condition.icon}`} alt="img" />
        </h1>
        <h2>Местное время: {location.localtime.split(" ")[1]}</h2>
        <h2>
          Дата:{" "}
          {new Date(location.localtime.split(" ")[0]).toLocaleDateString(
            "ru-RU",
            { year: "numeric", month: "long", day: "numeric" }
          )}
        </h2>
      </Flex>
    </Flex>
  );
};

export default Weather;
