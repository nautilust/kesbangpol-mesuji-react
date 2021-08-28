import { useEffect, useState } from "react";
import axios from "axios";
import { Alert, AlertTitle } from "@material-ui/lab";

export default function Covid19Cards() {
  const [data, setData] = useState([]),
    [status, setStatus] = useState("");

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchData = async () => {
      try {
        setStatus("memuat");

        const result = await axios.get(
          "https://indonesia-covid-19.mathdro.id/api/provinsi/",
          { cancelToken: source.token, timeout: 60000 }
        );

        if (result.data.length === 0) {
          setStatus("data kosong");
        } else {
          setData(result.data.data[21]);
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

  function BodySection() {
    switch (status) {
      case "memuat":
        return (
          <div className="my-5 d-flex justify-content-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        );
      case "data kosong":
        return (
          <div className="my-5">
            <Alert variant="filled" severity="warning">
              <AlertTitle>Tidak Ada Data</AlertTitle>
              Data tidak ditemukan, coba segarkan kembali laman ini. Jika masih
              belum berhasil, hubungi pemilik website.
            </Alert>
          </div>
        );
      case "gagal":
        return (
          <div className="my-5">
            <Alert variant="filled" severity="error">
              <AlertTitle>Kesalahan</AlertTitle>
              Gagal memuat data, ada masalah pada server atau jaringan. Coba
              segarkan kembali laman ini.
            </Alert>
          </div>
        );
      case "selesai":
        return (
          <div className="my-5">
            <h2 className="text-center text-primary opacity-75">
              Kasus Virus Corona (COVID-19) di Prov. Lampung
            </h2>
            <div className="row">
              <div className="col-lg-4">
                <div className="py-1">
                  <Alert variant="filled" severity="error" icon={false}>
                    <AlertTitle>
                      <strong>Positif</strong>
                    </AlertTitle>
                    Jumlah Kasus Positif — <strong>{data.kasusPosi}</strong>
                  </Alert>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="py-1">
                  <Alert variant="filled" severity="success" icon={false}>
                    <AlertTitle>
                      <strong>Sembuh</strong>
                    </AlertTitle>
                    Jumlah Kasus Sembuh — <strong>{data.kasusSemb}</strong>
                  </Alert>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="py-1">
                  <Alert variant="filled" severity="info" icon={false}>
                    <AlertTitle>
                      <strong>Meninggal</strong>
                    </AlertTitle>
                    Jumlah Kasus Meninggal — <strong>{data.kasusMeni}</strong>
                  </Alert>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="my-5">
            <Alert variant="filled" severity="info">
              Menunggu permintaan...
            </Alert>
          </div>
        );
    }
  }

  return (
    <div className="container">
      <BodySection />
    </div>
  );
}
