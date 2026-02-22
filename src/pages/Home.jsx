import Hero from '../components/Hero';
import PromoSection from '../components/PromoSection';
import HomeProductCarousel from '../components/HomeProductCarousel';
import Process from '../components/Process';
import BenefitCards from '../components/BenefitCards';
import Features from '../components/Features';
import Gallery from '../components/Gallery';
import QuoteForm from '../components/QuoteForm';
import About from '../components/About';

const Home = () => {
    return (
        <main>
            <Hero />
            <PromoSection />
            <HomeProductCarousel />
            <Process />
            <BenefitCards />
            <Features />
            <Gallery />
            <About />
            <QuoteForm />
        </main>
    );
};

export default Home;
