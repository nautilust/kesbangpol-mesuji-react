import { motion } from "framer-motion";
import HeroesBanner from "../components/HeroesBanner";
import CarouselBanner from "../components/CarouselBanner";
import CarouselGallery from "../components/CarouselGallery";
import BeritaArtikelSection from "../components/BeritaArtikelSection";
import Covid19Cards from "../components/Covid19Cards";

export default function Beranda() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <HeroesBanner />
      <CarouselBanner />
      <Covid19Cards />
      <BeritaArtikelSection />
      <CarouselGallery />
    </motion.div>
  );
}
