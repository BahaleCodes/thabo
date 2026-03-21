import React, { useState, useEffect } from "react";
import ReactGA from "react-ga";
import Header from "./Components/Header";
import Hero from "./Components/Hero";
import About from "./Components/About";
import Journey from "./Components/Journey";
import Expertise from "./Components/Expertise";
import Contact from "./Components/Contact";
import Footer from "./Components/Footer";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/resumeData.json")
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error("Failed to load data:", err));
  }, []);

  useEffect(() => {
    if (data?.analytics?.trackingId) {
      ReactGA.initialize(data.analytics.trackingId);
      ReactGA.pageview(window.location.pathname);
    }
  }, [data]);

  if (!data) return null;

  return (
    <div className="min-h-screen bg-cream font-sans">
      <Header data={data.main} />
      <Hero data={data.main} />
      <About data={data.about} />
      <Journey data={data.journey} />
      <Expertise data={data.expertise} />
      <Contact data={data.main} />
      <Footer data={data.main} />
    </div>
  );
}

export default App;
