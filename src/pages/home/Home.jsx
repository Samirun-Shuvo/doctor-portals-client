import Footer from "../shared/Footer";
import Banner from "./Banner";
import Contact from "./Contact";
import Info from "./Info";
import MakeAppoinment from "./MakeAppoinment";
import Services from "./Services";
import Terms from "./Terms";
import Testimonial from "./Testimonial";

const Home = () => {
    return (
        <div>
            <Banner/>
            <Info/>
            <Services/>
            <Terms/>
            <MakeAppoinment/>
            <Testimonial/>
            <Contact/>
            <Footer />
        </div>
    );
};

export default Home;