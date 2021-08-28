import Logo from "../assets/images/logo_heroes.png";
// import HeroesBackground from "../assets/images/heroes_background.jpg";

export default function HeroesBanner() {
  // const HeroesStyles = {
  //   backgroundImage: `url(${HeroesBackground})`,
  //   backgroundPosition: "center",
  //   backgroundRepeat: "no-repeat",
  //   backgroundSize: "cover",
  // };

  return (
    <div
      className="px-4 py-5 text-center"
      // style={HeroesStyles}
    >
      <img
        className="d-block mx-auto mb-4"
        src={Logo}
        width="143"
        height="180"
        alt="logo heroes"
      />
      <h4 className="fw-bold">
        Selamat Datang di Website Badan Kesatuan Bangsa dan Politik Kabupaten
        Mesuji
      </h4>
      <div className="col-lg-6 mx-auto">
        <p className="lead mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
          condimentum ultricies mauris vel tempor. Maecenas sit amet magna at ex
          pharetra tincidunt. Integer mi libero, sollicitudin nec lorem id,
          gravida sollicitudin mauris. Praesent ornare ante dui, eu vulputate
          purus suscipit sit amet. Ut nec tempor libero.
        </p>
      </div>
    </div>
  );
}
