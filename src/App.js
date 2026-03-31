import React, { useEffect } from "react";
import ReactGA from "react-ga";
import Header from "./Components/Header";
import Hero from "./Components/Hero";
import About from "./Components/About";
import Journey from "./Components/Journey";
import Expertise from "./Components/Expertise";
import Contact from "./Components/Contact";
import Footer from "./Components/Footer";
import Seo from "./Components/Seo";
import data from "./content/resumeData.json";

function App() {
  useEffect(() => {
    if (data?.analytics?.trackingId) {
      ReactGA.initialize(data.analytics.trackingId);
      ReactGA.pageview(window.location.pathname);
    }
  }, [data]);

  return (
    <>
      <Seo data={data} />
      <div className="min-h-screen bg-cream font-sans">
        <Header data={data.main} />
        <main>
          <Hero data={data.main} />
          <About data={data.about} />
          <Journey data={data.journey} />
          <Expertise data={data.expertise} />
          <Contact data={data.main} />
        </main>
        <Footer data={data.main} />
      </div>
    </>
  );
}

export default App;
