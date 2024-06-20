import { Footer } from "./_components/footer";
import { Navbar } from "./_components/navbar";

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-20">{children}</main>
      <Footer />
    </>
  );
};

export default LandingLayout;
