import logo from "../assets/images/logo_kabmesuji.png";

export default function HeaderLogo() {
  return (
    <header className="py-3 bg-gradient" style={{ backgroundColor: "#ff5722" }}>
      <div className="container d-flex flex-wrap justify-content-center">
        <div className="d-flex align-items-center mb-3 mb-lg-0 me-lg-auto text-dark text-decoration-none">
          <img className="m-1" src={logo} alt="logo" />
          <span className="m-2 fs-4 text-white">
            Badan Kesatuan Bangsa dan Politik
          </span>
        </div>
      </div>
    </header>
  );
}
