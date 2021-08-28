import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL, INS_ID } from "../../apiconfig";
import { PostTime } from "../../hooks/TimeDate";
import { Alert, AlertTitle, Pagination, Skeleton } from "@material-ui/lab";
import { motion } from "framer-motion";

export default function Artikel() {
  const searchData = useRef();
  const [artikelData, setArtikelData] = useState([]),
    [halaman, setHalaman] = useState(1),
    [status, setStatus] = useState(""),
    [statusSearch, setStatusSearch] = useState(false),
    [searchTitle, setSearchTitle] = useState("");

  const handleHalaman = (event, value) => {
    setHalaman(value);
  };

  function handleSearch(event) {
    event.preventDefault();
    setSearchTitle(searchData.current.value);
    setHalaman(1);
    setStatusSearch(true);
  }

  function handleReset() {
    setHalaman(1);
    setStatusSearch(false);
    setSearchTitle("");
  }

  useEffect(() => {
    const source = axios.CancelToken.source();
    const titleData =
      statusSearch === true
        ? `&title=${searchTitle}&page=${halaman}`
        : `&page=${halaman}`;

    const fetchData = async () => {
      try {
        setStatus("memuat");

        const artikelResult = await axios.get(
          `${API_URL}/article?instansi_id=${INS_ID}${titleData}&per-page=8`,
          { cancelToken: source.token, timeout: 60000 }
        );

        if (artikelResult.data.items.length === 0) {
          setStatus("data kosong");
        } else {
          setArtikelData(artikelResult.data);
          setStatus("selesai");
        }

        window.scrollTo(0, 0);
      } catch (err) {
        if (!axios.isCancel(err)) {
          setStatus("gagal");
          window.scrollTo(0, 0);
        }
      }
    };

    fetchData();

    return () => {
      source.cancel();
    };
  }, [halaman, statusSearch, searchTitle]);

  function ArtikelSection() {
    switch (status) {
      case "memuat":
        return Array.from(new Array(8)).map((item, i) => (
          <div className="card mb-3" id={item} key={i}>
            <div className="row g-0">
              <div className="col-md-4">
                <Skeleton variant="rect" className="rounded-start h-100" />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <Skeleton variant="text" className="card-title" />
                  <Skeleton variant="text" className="card-text" />
                  <Skeleton variant="text" className="card-text" />
                </div>
              </div>
            </div>
          </div>
        ));
      case "data kosong":
        return (
          <Alert variant="filled" severity="warning">
            <AlertTitle>Tidak Ada Data</AlertTitle>
            Data artikel tidak ditemukan, coba segarkan kembali laman ini. Jika
            masih belum berhasil, hubungi pemilik website.
          </Alert>
        );
      case "gagal":
        return (
          <Alert variant="filled" severity="error">
            <AlertTitle>Kesalahan</AlertTitle>
            Gagal memuat data artikel, ada masalah pada server atau jaringan.
            Coba segarkan kembali laman ini.
          </Alert>
        );
      case "selesai":
        return artikelData.items.map((item, i) => (
          <div className="card mb-3" key={i}>
            <div className="row g-0">
              <div className="col-md-4">
                <div className="ratio ratio-4x3">
                  <img
                    src={`data:${item.image_mime_type};base64,${item.image_file_data}`}
                    className="img-fluid rounded-start"
                    alt={i}
                  />
                </div>
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <Link
                    className="text-decoration-none"
                    to={`/artikel/baca/${item.id}`}
                  >
                    <h5 className="card-title">{item.title}</h5>
                  </Link>
                  <small className="card-text text-muted fw-bold">
                    <i className="bi bi-person-fill" />
                    {` ${item.creator} | `}
                    <i className="bi bi-tag-fill" />
                    {` ${item.kategori} | `}
                    <i className="bi bi-clock-fill" />
                    {` ${PostTime(item.created_at)}`}
                  </small>
                  <div className="card-text">
                    <p>{item.content.slice(3, 100)}...</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ));
      default:
        return (
          <Alert variant="filled" severity="info">
            Menunggu permintaan...
          </Alert>
        );
    }
  }

  // TODO: ketika sudah ada api artikel populer sebaiknya fungsi ini dibuat terpisah
  function ListGroupSection() {
    switch (status) {
      case "memuat":
        return Array.from(new Array(5)).map((item, i) => (
          <Skeleton
            variant="rect"
            className="p-3 list-group-item list-group-item-action disabled"
            aria-disabled="true"
            id={item}
            key={i}
          />
        ));
      case "data kosong":
        return (
          <div className="my-1">
            <Alert variant="filled" severity="warning">
              Tidak ada data kategori
            </Alert>
          </div>
        );
      case "gagal":
        return (
          <div className="my-1">
            <Alert variant="filled" severity="error">
              Tidak dapat mengambil data
            </Alert>
          </div>
        );
      default:
        return (
          <div className="my-1">
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
        <nav className="pt-2 pb-3" aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/" className="text-decoration-none">
                <i className="bi bi-house-door" /> Beranda
              </Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              <i className="bi bi-file-earmark-richtext" /> Artikel
            </li>
          </ol>
        </nav>
        <div className="row">
          <div className="col-lg-9">
            <h4 className="p-1 border-bottom border-3 border-danger opacity-75">
              <i className="bi bi-file-earmark-richtext" /> Artikel Terbaru
            </h4>
            {status === "selesai" && statusSearch === true && (
              <div className="py-1 d-flex">
                <h5 className="me-auto">
                  Hasil pencarian dari "{searchTitle}" (
                  {artikelData._meta.totalCount} data)
                </h5>
                <button
                  className="btn btn-sm btn-outline-danger ms-auto"
                  onClick={handleReset}
                >
                  Hapus Pencarian
                </button>
              </div>
            )}
            {/* bagian fungsi ArtikelSection */}
            <ArtikelSection />
            <div className="col-lg">
              {status === "memuat" ? (
                <Skeleton variant="text" className="d-flex m-3" />
              ) : (
                status === "selesai" && (
                  <Pagination
                    className="d-flex m-3 justify-content-center"
                    shape="rounded"
                    color="primary"
                    count={artikelData._meta.pageCount}
                    page={halaman}
                    onChange={handleHalaman}
                  />
                )
              )}
            </div>
          </div>
          <div className="col-lg-3">
            <h4 className="p-1 text-center border-bottom border-3 border-success opacity-75">
              <i className="bi bi-search" /> Pencarian
            </h4>
            <form className="d-flex" onSubmit={handleSearch}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Cari artikel..."
                aria-label="Search"
                ref={searchData}
                pattern="^[a-zA-Z0-9 ]*$"
                required
              />
              <button className="btn btn-outline-success" type="submit">
                Cari
              </button>
            </form>
            <h4 className="mt-4 p-1 text-center border-bottom border-3 border-success opacity-75">
              <i className="bi bi-star-fill" /> Populer
            </h4>
            {/* untuk sementara ini tampilkan artikel terbaru dulu sembari nunggu api artikel populer */}
            <ol className="list-group list-group-numbered">
              {status === "selesai" ? (
                artikelData.items.slice(0, 5).map((item, i) => (
                  <li
                    className="list-group-item list-group-item-action"
                    key={i}
                  >
                    <Link
                      className="text-body text-decoration-none"
                      to={`/artikel/baca/${item.id}`}
                    >
                      {item.title}
                    </Link>
                  </li>
                ))
              ) : (
                <ListGroupSection />
              )}
            </ol>
            <h4 className="mt-4 p-1 text-center border-bottom border-3 border-success opacity-75">
              <i className="bi bi-tags-fill" /> Kategori
            </h4>
            <div className="list-group">
              <SidebarSection />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function SidebarSection() {
  const [kategoriId, setKategoriId] = useState([]),
    [kategoriData, setKategoriData] = useState([]),
    [status, setStatus] = useState("");

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchData = async () => {
      try {
        setStatus("memuat");

        const kategoriResult = await axios.get(
          `${API_URL}/article/categories/${INS_ID}`,
          { cancelToken: source.token, timeout: 60000 }
        );

        if (kategoriResult.data.length === 0) {
          setStatus("data kosong");
        } else {
          setKategoriId(Object.keys(kategoriResult.data));
          setKategoriData(Object.values(kategoriResult.data));
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

  switch (status) {
    case "memuat":
      return Array.from(new Array(5)).map((item, i) => (
        <Skeleton
          variant="rect"
          className="p-3 list-group-item list-group-item-action disabled"
          aria-disabled="true"
          id={item}
          key={i}
        />
      ));
    case "data kosong":
      return (
        <div className="my-1">
          <Alert variant="filled" severity="warning">
            Tidak ada data kategori
          </Alert>
        </div>
      );
    case "gagal":
      return (
        <div className="my-1">
          <Alert variant="filled" severity="error">
            Tidak dapat mengambil data
          </Alert>
        </div>
      );
    case "selesai":
      return kategoriData.map((item, i) => (
        <Link
          className="list-group-item list-group-item-action"
          to={`/artikel/kategori/${kategoriId[i]}`}
          key={i}
        >
          {item}
        </Link>
      ));
    default:
      return (
        <div className="my-1">
          <Alert variant="filled" severity="info">
            Menunggu permintaan...
          </Alert>
        </div>
      );
  }
}
