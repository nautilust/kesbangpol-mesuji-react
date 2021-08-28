import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../apiconfig";
import { PostTime, LastEditTime } from "../../hooks/TimeDate";
import { Alert, AlertTitle } from "@material-ui/lab";
import { motion } from "framer-motion";
import DOMPurify from "dompurify";

export default function BacaBerita() {
  const { idBerita } = useParams();
  const [isiBerita, setIsiBerita] = useState([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchData = async () => {
      try {
        setStatus("memuat");

        const berita = await axios.get(`${API_URL}/news/${idBerita}`, {
          cancelToken: source.token,
          timeout: 60000,
        });

        if (berita.data.length === 0) {
          setStatus("data kosong");
        } else {
          setIsiBerita(berita.data);
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
  }, [idBerita]);

  function PageSection() {
    switch (status) {
      case "memuat":
        return (
          <div className="p-5 d-flex align-items-center">
            <strong>Memuat isi berita...</strong>
            <div
              className="spinner-border text-primary ms-auto"
              role="status"
              aria-hidden="true"
            />
          </div>
        );
      case "data kosong":
        return (
          <div className="p-3">
            <Alert variant="filled" severity="warning">
              <AlertTitle>Tidak Ada Data</AlertTitle>
              Data berita tidak ditemukan, coba segarkan kembali laman ini. Jika
              masih belum berhasil, hubungi pemilik website.
            </Alert>
          </div>
        );
      case "gagal":
        return (
          <div className="p-3">
            <Alert variant="filled" severity="error">
              <AlertTitle>Kesalahan</AlertTitle>
              Gagal memuat data berita, ada masalah pada server atau jaringan.
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
                <li className="breadcrumb-item">
                  <Link to="/berita" className="text-decoration-none">
                    <i className="bi bi-newspaper" /> Berita
                  </Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  <i className="bi bi-card-text" /> {isiBerita.title}
                </li>
              </ol>
            </nav>
            <div className="row">
              <div className="col-lg-3">
                <h1>{isiBerita.title}</h1>
                <small className="text-muted">
                  <i className="bi bi-person-fill" /> {isiBerita.creator}
                  {" | "}
                  <i className="bi bi-clock-fill" />{" "}
                  {PostTime(isiBerita.created_at)}
                  {" | "}
                  <i className="bi bi-pencil-square" />{" "}
                  {LastEditTime(isiBerita.updated_at)}
                  {" | "}
                  Kategori:{" "}
                  <span className="badge bg-secondary">
                    {isiBerita.kategori}
                  </span>
                </small>
              </div>
              <div className="col-lg-9">
                <div className="ratio ratio-16x9">
                  <img
                    src={`data:${isiBerita.image_mime_type};base64,${isiBerita.image_file_data}`}
                    className="img-fluid p-2"
                    alt={isiBerita.image_file_name}
                  />
                </div>
                <div
                  className="text-wrap text-break py-2"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(isiBerita.content),
                  }}
                />
              </div>
            </div>
          </motion.div>
        );
      default:
        return (
          <div className="p-3">
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
