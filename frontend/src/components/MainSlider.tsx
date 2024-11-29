import Slider from "react-slick";
import MainPhoto11 from "../assets/img/MainPhoto1.1.jpg";
import MainPhoto12 from "../assets/img/MainPhoto1.2.jpg";
import MainPhoto21 from "../assets/img/MainPhoto2.1.jpg";
import MainPhoto22 from "../assets/img/MainPhoto2.2.jpg";
import MainPhoto31 from "../assets/img/MainPhoto3.1.jpg";
import MainPhoto32 from "../assets/img/MainPhoto3.2.jpg";
import MainPhoto41 from "../assets/img/MainPhoto4.1.jpg";
import MainPhoto42 from "../assets/img/MainPhoto4.2.jpg";
import "./MainSlider.scss";

export default function MainSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Slider {...settings}>
      <div className="row-slide">
        <img src={MainPhoto11} alt="photoset 1.1" />
        <img src={MainPhoto12} alt="photoset 1.2" />
      </div>

      <div className="row-slide">
        <img src={MainPhoto21} alt="photoset 2.1" />
        <img src={MainPhoto22} alt="photoset 2.2" />
      </div>

      <div className="row-slide">
        <img src={MainPhoto31} alt="photoset 3.1" />
        <img src={MainPhoto32} alt="photoset 3.2" />
      </div>

      <div className="row-slide">
        <img src={MainPhoto41} alt="photoset 4.1" />
        <img src={MainPhoto42} alt="photoset 4.2" />
      </div>
    </Slider>
  );
}
