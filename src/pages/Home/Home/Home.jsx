import PopularInstructor from "../PopularInstructor/PopularInstructor";
import TopSlider from "../TopSlider/TopSlider";
import CounterSection from "./CounterSection/CounterSection";


const Home = () => {
    return (
        <div className="container mx-auto">
            <TopSlider></TopSlider>
            <PopularInstructor></PopularInstructor>
            <CounterSection></CounterSection>
        </div>
    );
};

export default Home;