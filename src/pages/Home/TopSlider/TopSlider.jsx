
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from  'react-responsive-carousel';


const TopSlider = () => {

  


    return (
        <section>
            <Carousel>
                <div>
                    <img src="https://i.ibb.co/ZzZd3mc/banner2.jpg" />
                </div>
                <div>
                    <img src="https://i.ibb.co/7p0JQZW/banner1.jpg" />
                </div>
                <div>
                    <img src="https://i.ibb.co/ZVCsLp2/banner3.jpg" />
                </div>
                <div>
                    <img src="https://i.ibb.co/pxqxfGC/banner4.jpg" />
                </div>
            </Carousel>
        </section>
    );
};

export default TopSlider;