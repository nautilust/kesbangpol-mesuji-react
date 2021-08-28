import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL, INS_ID } from "../apiconfig";
import { Alert, AlertTitle } from "@material-ui/lab";

export default function BeritaArtikelSection() {
  const [beritaData, setBeritaData] = useState([]),
    [artikelData, setArtikelData] = useState([]),
    [status, setStatus] = useState("");

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchData = async () => {
      try {
        setStatus("memuat");
        const berita = await axios.get(
          `${API_URL}/news?instansi_id=${INS_ID}&per-page=12`,
          {
            cancelToken: source.token,
            timeout: 60000,
          }
        );
        const artikel = await axios.get(
          `${API_URL}/article?instansi_id=${INS_ID}&per-page=4`,
          {
            cancelToken: source.token,
            timeout: 60000,
          }
        );

        if (berita.data.items.length === 0) {
          setArtikelData(artikel.data.items);
          setStatus("berita data kosong");
        } else if (artikel.data.items.length === 0) {
          setBeritaData(berita.data.items);
          setStatus("artikel data kosong");
        } else if (
          berita.data.items.length === 0 &&
          artikel.data.items.length === 0
        ) {
          setStatus("data kosong");
        } else {
          setBeritaData(berita.data.items);
          setArtikelData(artikel.data.items);
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
  }, []);

  function CarouselStatus() {
    switch (status) {
      case "memuat":
        return (
          <div className="mt-3 d-flex justify-content-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        );
      case "data kosong":
      case "berita data kosong":
        return (
          <div className="mt-3">
            <Alert variant="filled" severity="warning">
              <AlertTitle>Tidak Ada Data</AlertTitle>
              Data berita tidak ditemukan, coba segarkan kembali laman ini. Jika
              masih belum berhasil, hubungi pemilik website.
            </Alert>
          </div>
        );
      case "gagal":
        return (
          <div className="mt-3">
            <Alert variant="filled" severity="error">
              <AlertTitle>Kesalahan</AlertTitle>
              Gagal memuat data berita, ada masalah pada server atau jaringan.
              Coba segarkan kembali laman ini.
            </Alert>
          </div>
        );
      case "artikel data kosong":
      case "selesai":
        return (
          <div
            id="carouselBerita"
            className="mt-3 carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner ratio ratio-21x9">
              <div className="carousel-item active">
                <img
                  src={`data:${beritaData[0].image_mime_type};base64,${beritaData[0].image_file_data}`}
                  className="d-block w-100"
                  alt="1 active"
                />
                <div className="carousel-caption d-none d-md-block bg-dark rounded bg-opacity-75">
                  <Link
                    className="text-decoration-none"
                    to={`/berita/baca/${beritaData[0].id}`}
                  >
                    <h5>{beritaData[0].title}</h5>
                  </Link>
                  <p>{beritaData[0].content.slice(3, 150)}</p>
                </div>
              </div>
              {beritaData.slice(1, 8).map((item, i) => (
                <div className="carousel-item" key={i}>
                  <img
                    src={`data:${item.image_mime_type};base64,${item.image_file_data}`}
                    className="d-block w-100"
                    alt={i}
                  />
                  <div className="carousel-caption d-none d-md-block bg-dark rounded bg-opacity-75">
                    <Link
                      className="text-decoration-none"
                      to={`/berita/baca/${item.id}`}
                    >
                      <h5>{item.title}</h5>
                    </Link>
                    <p>{item.content.slice(3, 150)}</p>
                  </div>
                </div>
              ))}
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselBerita"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon" aria-hidden="true" />
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselBerita"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon" aria-hidden="true" />
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        );
      default:
        // kondisi jika axios didalam useEffect belum tereksekusi
        return (
          <div className="mt-3">
            <Alert variant="filled" severity="info">
              Menunggu permintaan...
            </Alert>
          </div>
        );
    }
  }

  function BeritaStatus() {
    switch (status) {
      case "memuat":
        return (
          <div className="py-1 d-flex justify-content-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        );
      case "data kosong":
      case "berita data kosong":
        return (
          <small className="py-1">
            <Alert variant="filled" severity="warning">
              Tidak Ada Data
            </Alert>
          </small>
        );
      case "gagal":
        return (
          <small className="py-1">
            <Alert variant="filled" severity="error">
              Gagal memuat data berita
            </Alert>
          </small>
        );
      case "artikel data kosong":
      case "selesai":
        return (
          <div className="py-1 list-group">
            {beritaData.slice(8, 12).map((item, i) => (
              <Link
                to={`/berita/baca/${item.id}`}
                className="list-group-item list-group-item-action"
                key={i}
              >
                <small className="text-decoration-none text-dark">
                  {item.title}
                </small>
              </Link>
            ))}
          </div>
        );
      default:
        // kondisi jika axios didalam useEffect belum tereksekusi
        return (
          <small className="py-1">
            <Alert variant="filled" severity="info">
              Menunggu permintaan...
            </Alert>
          </small>
        );
    }
  }

  function ArtikelStatus() {
    switch (status) {
      case "memuat":
        return (
          <div className="py-1 d-flex justify-content-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        );
      case "data kosong":
      case "artikel data kosong":
        return (
          <small className="py-1">
            <Alert variant="filled" severity="warning">
              Tidak Ada Data
            </Alert>
          </small>
        );
      case "gagal":
        return (
          <small className="py-1">
            <Alert variant="filled" severity="error">
              Gagal memuat data artikel
            </Alert>
          </small>
        );
      case "berita data kosong":
      case "selesai":
        return (
          <div className="py-1 list-group">
            {artikelData.map((item, i) => (
              <Link
                to={`/artikel/baca/${item.id}`}
                className="list-group-item list-group-item-action"
                key={i}
              >
                <small className="text-decoration-none text-dark">
                  {item.title}
                </small>
              </Link>
            ))}
          </div>
        );
      default:
        // kondisi jika axios didalam useEffect belum tereksekusi
        return (
          <small className="py-1">
            <Alert variant="filled" severity="info">
              Menunggu permintaan...
            </Alert>
          </small>
        );
    }
  }

  return (
    <div className="container-fluid">
      <div className="my-3 mx-2 row">
        <div className="col-lg-8">
          <h3 className="mt-3 pb-1 border-bottom border-2 border-success text-success">
            <i className="bi bi-cup"></i> Berita Terkini
          </h3>
          <CarouselStatus />
        </div>
        <div className="col-lg-2">
          <h3 className="mt-3 pb-1 border-bottom border-2 border-danger text-danger">
            <i className="bi bi-newspaper"></i> Berita
          </h3>
          <BeritaStatus />
        </div>
        <div className="col-lg-2">
          <h3 className="mt-3 pb-1 border-bottom border-2 border-danger text-danger">
            <i className="bi bi-file-earmark-richtext"></i> Artikel
          </h3>
          <ArtikelStatus />
        </div>
      </div>
    </div>
  );
}
