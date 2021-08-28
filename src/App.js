import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
// import { Provider } from "react-redux";
// import { store } from "./redux/Store";
import HeaderLogo from "./components/HeaderLogo";
import NavBarMenu from "./components/NavBarMenu";
import FooterSection from "./components/FooterSection";
import {
  Beranda,
  NoFound,
  LamanStatis,
  Berita,
  Artikel,
  BacaBerita,
  BacaArtikel,
  KategoriBerita,
  KategoriArtikel,
} from "./pages";

export default function App() {
  return (
    <>
      {/* <Provider store={store}> */}
      <HeaderLogo />
      <Router>
        <NavBarMenu />
        <div className="bg-light bg-opacity-75">
          <AnimatePresence>
            <Switch>
              <Route path="/" component={Beranda} exact />
              <Route path="/berita" component={Berita} exact strict />
              <Route
                path="/berita/baca/:idBerita"
                component={BacaBerita}
                strict
              />
              <Route
                path="/berita/kategori/:idKategori"
                component={KategoriBerita}
                strict
              />
              <Route path="/artikel" component={Artikel} exact strict />
              <Route
                path="/artikel/baca/:idArtikel"
                component={BacaArtikel}
                strict
              />
              <Route
                path="/artikel/kategori/:idKategori"
                component={KategoriArtikel}
                strict
              />
              <Route path="/statis/:id" component={LamanStatis} strict />
              <Route path="*" component={NoFound} />
            </Switch>
          </AnimatePresence>
        </div>
      </Router>
      <FooterSection />
      {/* </Provider> */}
    </>
  );
}
