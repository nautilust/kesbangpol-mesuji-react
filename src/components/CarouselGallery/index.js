import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css";
import Banner1 from "../../assets/images/bannerslide/1.jpg";
import Banner2 from "../../assets/images/bannerslide/2.jpg";
import Banner3 from "../../assets/images/bannerslide/3.jpg";

export default function CarouselGallery() {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 5,
    initialSlide: 0,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  return (
    <div className="bg-secondary">
      <div className="container p-5">
        <h2 className="mb-4 text-center text-white">Galeri</h2>
        <Slider {...settings}>
          <div>
            <img
              src={Banner1}
              className="p-1 ratio ratio-4x3"
              alt="Banner 1-1"
            />
          </div>
          <div>
            <img
              src={Banner2}
              className="p-1 ratio ratio-4x3"
              alt="Banner 1-2"
            />
          </div>
          <div>
            <img
              src={Banner3}
              className="p-1 ratio ratio-4x3"
              alt="Banner 1-3"
            />
          </div>
          <div>
            <img
              src={Banner1}
              className="p-1 ratio ratio-4x3"
              alt="Banner 2-1"
            />
          </div>
          <div>
            <img
              src={Banner2}
              className="p-1 ratio ratio-4x3"
              alt="Banner 2-2"
            />
          </div>
          <div>
            <img
              src={Banner3}
              className="p-1 ratio ratio-4x3"
              alt="Banner 2-3"
            />
          </div>
          <div>
            <img
              src={Banner1}
              className="p-1 ratio ratio-4x3"
              alt="Banner 3-1"
            />
          </div>
          <div>
            <img
              src={Banner2}
              className="p-1 ratio ratio-4x3"
              alt="Banner 3-2"
            />
          </div>
        </Slider>
      </div>
    </div>
  );
}
