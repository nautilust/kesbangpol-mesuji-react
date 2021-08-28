import Banner1 from "../assets/images/bannerslide/1.jpg";
import Banner2 from "../assets/images/bannerslide/2.jpg";
import Banner3 from "../assets/images/bannerslide/3.jpg";

export default function CarouselBanner() {
  return (
    <div
      id="carouselFade"
      className="carousel slide carousel-fade carousel-dark"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner ratio ratio-21x9">
        <div className="carousel-item active">
          <img src={Banner1} className="d-block w-100" alt="Banner 1" />
        </div>
        <div className="carousel-item">
          <img src={Banner2} className="d-block w-100" alt="Banner 2" />
        </div>
        <div className="carousel-item">
          <img src={Banner3} className="d-block w-100" alt="Banner 3" />
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselFade"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselFade"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}
