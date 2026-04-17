import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Business from "./pages/Business";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="services" element={<Business />} />
          <Route path="blog" element={<Blog />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
      
      {/* Floating CTA */}
      <a 
        href="/contact" 
        className="fixed bottom-8 right-8 z-50 bg-accent hover:bg-amber-500 text-white font-extrabold px-6 py-4 rounded-full shadow-2xl flex items-center transition-transform hover:scale-110 hover:-translate-y-1 animate-[bounce_3s_infinite]"
      >
        <span className="hidden sm:inline-block mr-2">Contact Akin</span> 👋
      </a>
    </>
  );
}

export default App;
