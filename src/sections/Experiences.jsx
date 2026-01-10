import Timeline from "../components/Timeline";
import { experiences } from "../constants";
const Experiences = () => {
    return (
        <div id="experience" className="w-full scroll-mt-20">
            <div className="h-10 md:h-16" /> {/* Mobile Spacer */}
            <Timeline data={experiences} />
        </div>
    );
};

export default Experiences;
