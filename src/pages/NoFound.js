import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function NoFound() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div
        className="d-flex flex-row align-items-center"
        style={{ minHeight: "85vh" }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-12 text-center">
              <span className="display-1 d-block">404</span>
              <div className="mb-4 lead">
                Halaman yang Anda cari tidak ditemukan.
              </div>
              <Link to="/" className="btn btn-link">
                Kembali ke Beranda
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
