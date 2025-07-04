import React from "react";
import { useUser } from "./Context/userContext.jsx";
import { Carousel } from "react-bootstrap";

// Import carousel images
import beStronger from "../assets/images/carousel/Be Stronger.jpeg";
import workForIt from "../assets/images/carousel/WorkForIt.jpeg";
import fearNoLimit from "../assets/images/carousel/fearNoLimit.jpg";
import fitness from "../assets/images/carousel/fitness.jpeg";
import goodDay from "../assets/images/carousel/goodDay.jpeg";
import neverGiveUp from "../assets/images/carousel/neverGiveUp.jpeg";
import stayStrong from "../assets/images/carousel/stayStrong.jpeg";
import weights from "../assets/images/carousel/weights.jpg";
import together from "../assets/images/carousel/together.jpg";


function Welcome() {
  const { user } = useUser();

  return (
    <div className="container-fluid p-0">
      <Carousel
        interval={3000}
        controls={true}
        indicators={false}
        style={{
          width: "100%",
          height: "400px",
          margin: "0",
        }}
      >
        <Carousel.Item
          style={{
            height: "400px",
            backgroundImage: `url(${fitness})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <Carousel.Caption className="d-none d-md-block">
            <h5>Fitness Journey</h5>
            <p>Start your transformation today.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item
          style={{
            height: "400px",
            backgroundImage: `url(${weights})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <Carousel.Caption className="d-none d-md-block">
            <h5>Strength Training</h5>
            <p>Build your power, one rep at a time.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item
          style={{
            height: "400px",
            backgroundImage: `url(${beStronger})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <Carousel.Caption className="d-none d-md-block">
            <h5>Be Stronger</h5>
            <p>Than your excuses.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item
          style={{
            height: "400px",
            backgroundImage: `url(${neverGiveUp})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <Carousel.Caption className="d-none d-md-block">
            <h5>Never Give Up</h5>
            <p>Keep pushing forward.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item
          style={{
            height: "400px",
            backgroundImage: `url(${stayStrong})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <Carousel.Caption className="d-none d-md-block">
            <h5>Stay Strong</h5>
            <p>Build your inner strength.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item
          style={{
            height: "400px",
            backgroundImage: `url(${fearNoLimit})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <Carousel.Caption className="d-none d-md-block">
            <h5>Fear No Limits</h5>
            <p>Push beyond boundaries.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item
          style={{
            height: "400px",
            backgroundImage: `url(${workForIt})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <Carousel.Caption className="d-none d-md-block">
            <h5>Work For It</h5>
            <p>Success requires effort.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item
          style={{
            height: "400px",
            backgroundImage: `url(${goodDay})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <Carousel.Caption className="d-none d-md-block">
            <h5>Good Day</h5>
            <p>Today is your day to shine.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item
          style={{
            height: "400px",
            backgroundImage: `url(${together})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <Carousel.Caption className="d-none d-md-block">
            <h5>You can do it!</h5>
            <p>Believe in yourself and all that you are.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default Welcome;
