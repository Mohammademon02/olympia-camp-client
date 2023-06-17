import { useState } from "react";
import CountUp from 'react-countup';
import ScrollTrigger from "react-scroll-trigger";


const CounterSection = () => {
    const [counterOn, setCounterOn] = useState(false)
    return (
        <div className="px-5">
            <h1 className='text-3xl font-bold text-center my-9 text-orange-300'> Counter Section</h1>
            <ScrollTrigger onEnter={() => setCounterOn(true)} onExit={() => setCounterOn(false)}>
                <div className="bg-orange-200 md:w-[100%] sm:w-[90%] mx-auto my-12 rounded-lg">
                    <div className="grid grid-flow-col gap-5 text-center py-6">
                        <div className="flex flex-col">
                            {counterOn && <CountUp className="text-4xl" start={0} end={50} duration={5} delay={0}></CountUp>}
                            <h4 className="text-2xl">Total Instructor</h4>
                        </div>
                        <div className="flex flex-col">
                            {counterOn && <CountUp className="text-4xl" start={0} end={750} duration={5} delay={0}></CountUp>}
                            <h4 className="text-2xl">Total Student</h4>
                        </div>
                    </div>
                </div>
            </ScrollTrigger>
        </div>
    );
};

export default CounterSection;