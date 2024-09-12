import { Outlet, useNavigation } from "react-router-dom";
import { Header } from "../Header/Header.js";
import { Footer } from "../Footer/Footer.js";
import { Loader } from "../Loader/Loader.jsx";

export default function Layout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  return (
    <div className="h-full w-full">
      <Header />
      {isLoading && <Loader />}
      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
