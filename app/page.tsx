import Header from "@/app/components/Header";
import Hero from "@/app/components/Hero";
import About from "@/app/components/About";
import Journey from "@/app/components/Journey";
import Expertise from "@/app/components/Expertise";
import Projects from "@/app/components/Projects";
import AI from "@/app/components/AI";
import Contact from "@/app/components/Contact";
import Footer from "@/app/components/Footer";
import data from "@/app/content/resumeData";
import { getFeaturedRepos } from "@/app/lib/github";

export default async function Home() {
  const repos = await getFeaturedRepos();

  return (
    <>
      <Header />
      <main>
        <Hero data={data.main} />
        <About data={data.about} />
        <Journey data={data.journey} />
        <Expertise data={data.expertise} />
        <Projects heading={data.projects.heading} repos={repos} />
        <AI data={data.ai} />
        <Contact data={data.main} />
      </main>
      <Footer data={data.main} />
    </>
  );
}
