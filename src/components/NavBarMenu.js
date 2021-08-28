import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { API_URL, INS_ID } from "../apiconfig";

export default function NavBarMenu() {
  const [menuData, setMenuData] = useState([]);
  const [status, setStatus] = useState("");
  const menuList = [];

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchMenu = async () => {
      try {
        setStatus("requesting");
        const response = await axios.get(`${API_URL}/menu/list/${INS_ID}`, {
          cancelToken: source.token,
          timeout: 30000,
        });

        if (response.data.length === 0) {
          setStatus("no data");
        } else {
          setMenuData(response.data);
          setStatus("success");
        }
      } catch (err) {
        if (!axios.isCancel(err)) {
          setStatus("failed");
        }
      }
    };
    fetchMenu();

    return () => {
      source.cancel();
    };
  }, []);

  // Proses submenu jika menuData sudah ada (true)
  // Hal ini untuk mencegah proses submenu tereksekusi saat
  // return selesai ketika fungsi NavBarMenu terpanggil
  if (menuData) {
    const rawMenu = menuData.reduce((acc, cur) => {
      if (cur.lvl === 2) {
        const lastIndex = acc.length - 1;
        const lastItem = acc[lastIndex];
        return Object.assign(acc, {
          [lastIndex]: {
            ...lastItem,
            sub: [...lastItem.sub, cur],
          },
        });
      } else {
        return [...acc, { ...cur, sub: [] }];
      }
    }, []);

    for (let i = 1; i < rawMenu.length; i++) {
      menuList.push(rawMenu[i]);
    }
  }

  function MenuStatus() {
    switch (status) {
      case "requesting":
        return <span className="text-muted">Memuat daftar menu...</span>;
      case "no data":
        return <span className="text-muted">Tidak ada daftar menu!</span>;
      case "failed":
        return <span className="text-muted">Gagal memuat daftar menu!</span>;
      case "success":
        return menuList.map((item, i) =>
          // inline conditioning ini membaca apakah array sub: [] kosong
          // atau tidak. Jika kosong maka jadikan sebagai menu utama,
          // jika tidak maka jadikan sebagai menu dropdown lengkap beserta
          // isi subnya
          item.sub.length === 0 ? (
            <li className="nav-item" key={i}>
              <NavLink
                className="nav-link"
                activeClassName="fw-bold text-light"
                to={item.action_url}
                exact
              >
                {item.name}
              </NavLink>
            </li>
          ) : (
            <li className="nav-item dropdown" key={i}>
              <span
                className="nav-link dropdown-toggle"
                id="navbarDropdownMenuLink"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {item.name}
              </span>
              <ul
                className="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                {item.sub.map((subItem, subI) => (
                  <li key={subI}>
                    <NavLink
                      className="dropdown-item"
                      activeClassName="fw-bold"
                      to={subItem.action_url}
                      exact
                    >
                      {subItem.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </li>
          )
        );
      default:
        // kondisi jika axios didalam useEffect belum tereksekusi
        return <span className="text-muted">Menunggu permintaan...</span>;
    }
  }

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark sticky-top"
      style={{ backgroundColor: "#616161" }}
    >
      <div className="container">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarToggler"
          aria-controls="navbarToggler"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarToggler">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <MenuStatus />
          </ul>
        </div>
      </div>
    </nav>
  );
}
