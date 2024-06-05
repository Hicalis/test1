import { Flex, Form, Input, Layout, Space } from "antd";
import AppHeader from "./AppHeader";
import { FC, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { WeatherProps } from "./Weather";

const Search: FC = () => {
  const [weather, setWeather] = useState<WeatherProps>();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (localStorage.getItem("isLogin") === "false") {
      const timer = setTimeout(() => {
        navigate("/login");
      }, 2000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [navigate]);

  return (
    <Layout style={{ height: "100vh" }}>
      <Space direction="vertical" size="middle">
        <AppHeader />
        <Flex vertical={true} align="center">
          {localStorage.getItem("isLogin") === "false" ? (
            <h1>Необходимо авторизоваться</h1>
          ) : (
            <>
              <Form style={{ width: "300px" }}>
                <Form.Item
                  validateDebounce={1000}
                  hasFeedback
                  name="field_b"
                  rules={[
                    {
                      validator: async (_, value) => {
                        const q = await fetch(
                          `http://api.weatherapi.com/v1/current.json?key=c189b30964774edbae3212811240406&q=${value}&aqi=no`
                        )
                          .then((res) => res.json())
                          .then((res) => {
                            if (res.error) {
                              if (res.error.code === 1003) {
                                throw new Error(`Введите город`);
                              } else throw new Error(`${res.error.message}`);
                            }
                            return res;
                          });
                        setWeather(q);
                        return q;
                      },
                    },
                  ]}
                >
                  <Input placeholder="Введите город" />
                </Form.Item>
              </Form>
              {weather ? (
                <Flex
                  vertical={true}
                  align="center"
                  style={{ display: "inline" }}
                >
                  <h1>
                    {weather.location.name} {weather.current.temp_c} °C
                    <img src={`${weather.current.condition.icon}`} alt="img" />
                  </h1>
                  <h2>
                    Местное время: {weather.location.localtime.split(" ")[1]}
                  </h2>
                  <h2>
                    Дата:{" "}
                    {new Date(
                      weather.location.localtime.split(" ")[0]
                    ).toLocaleDateString("ru-RU", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </h2>
                </Flex>
              ) : null}
            </>
          )}
        </Flex>
      </Space>
    </Layout>
  );
};

export default Search;
