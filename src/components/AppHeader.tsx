import { Menu } from "antd";
import { Header } from "antd/es/layout/layout";
import { FC } from "react";
import { Link } from "react-router-dom";

const loginHeader = [
  {
    key: "home",
    label: <Link to={`/`}>Главная</Link>,
  },
  {
    key: "search",
    label: <Link to={`/search`}>Поиск</Link>,
  },
  {
    key: "login",
    label: <Link to={`/login`}>Войти</Link>,
    style: { marginLeft: "auto" },
  },
];

const logoutHeader = [
  {
    key: "home",
    label: <Link to={`/`}>Главная</Link>,
  },
  {
    key: "search",
    label: <Link to={`/search`}>Поиск</Link>,
  },
  {
    key: "logout",
    label: (
      <Link
        to={`/login`}
        onClick={() => {
          localStorage.setItem("isLogin", "false");
        }}
      >
        Выйти
      </Link>
    ),
    style: { marginLeft: "auto" },
  },
];

const AppHeader: FC = () => {
  return (
    <Header>
      {localStorage.getItem("isLogin") === "false" ? (
        <Menu theme="dark" mode="horizontal" items={loginHeader} />
      ) : (
        <Menu theme="dark" mode="horizontal" items={logoutHeader} />
      )}
    </Header>
  );
};

export default AppHeader;
