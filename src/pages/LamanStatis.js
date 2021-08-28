import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../apiconfig";
import { LastEditTime } from "../hooks/TimeDate";
import { Alert, AlertTitle } from "@material-ui/lab";
import { motion } from "framer-motion";
import DOMPurify from "dompurify";

export default function LamanStatis() {
  const { id } = useParams();
  const [isiPost, setIsiPost] = useState([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchData = async () => {
      try {
        setStatus("memuat");

        const result = await axios.get(`${API_URL}/static-page/${id}`, {
          cancelToken: source.token,
          timeout: 60000,
        });

        if (result.data.length === 0) {
          setStatus("data kosong");
        } else {
          setIsiPost(result.data);
          setStatus("selesai");
        }
      } catch (err) {
        if (!axios.isCancel(err)) {
          setStatus("gagal");
        }
      }
    };
    fetchData();

    return () => {
      source.cancel();
    };
  }, [id]);

  function PageSection() {
    switch (status) {
      case "memuat":
        return (
          <div className="p-5 d-flex align-items-center">
            <strong>Memuat halaman...</strong>
            <div
              className="spinner-border text-primary ms-auto"
              role="status"
              aria-hidden="true"
            />
          </div>
        );
      case "data kosong":
        return (
          <div className="p-5">
            <Alert variant="filled" severity="warning">
              <AlertTitle>Tidak Ada Data</AlertTitle>
              Data halaman tidak ditemukan, coba segarkan kembali laman ini.
              Jika masih belum berhasil, hubungi pemilik website.
            </Alert>
          </div>
        );
      case "gagal":
        return (
          <div className="p-5">
            <Alert variant="filled" severity="error">
              <AlertTitle>Kesalahan</AlertTitle>
              Gagal memuat data halaman, ada masalah pada server atau jaringan.
              Coba segarkan kembali laman ini.
            </Alert>
          </div>
        );
      case "selesai":
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <nav className="pt-2 pb-3" aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/" className="text-decoration-none">
                    <i className="bi bi-house-door" /> Beranda
                  </Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  <i className="bi bi-file-text" /> {isiPost.title}
                </li>
              </ol>
            </nav>
            <h1 className="mb-4 text-center text-danger border-bottom border-3 border-danger">
              {isiPost.title}
            </h1>
            <div
              className="text-wrap text-break py-2"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(isiPost.content),
              }}
            />
            <div className="d-flex">
              <span className="text-muted ms-auto">
                Terakhir diperbarui: {LastEditTime(isiPost.updated_at)}
              </span>
            </div>
          </motion.div>
        );
      default:
        return (
          <div className="p-5">
            <Alert variant="filled" severity="info">
              Menunggu permintaan...
            </Alert>
          </div>
        );
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="container">
        <PageSection />
      </div>
    </motion.div>
  );
}
