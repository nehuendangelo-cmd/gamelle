import { Header, Hero, Features, HowItWorks, Footer } from '@/components/landing';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
      </main>
      <Footer />
    </>
  );
}
