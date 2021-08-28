export default function FooterSectio() {
  return (
    <div className="bg-dark text-white">
      <div className="container">
        <footer className="py-3">
          <div className="row">
            <div className="col-sm">
              <div className="m-3">
                <h2>Pemerintah Kabupaten Mesuji</h2>
                <h4>Badan Kesatuan Bangsa dan Politik</h4>
                <p>Jl. ZA Pagar Alam 34699</p>
              </div>
            </div>
            <div className="col-sm">
              <div className="ratio ratio-21x9">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15887.322566256868!2d105.254809!3d-5.4426691!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x205caa90b9c9afe!2sBadan%20Kesatuan%20Bangsa%20dan%20Politik%20Provinsi%20Lampung!5e0!3m2!1sid!2sid!4v1628662632342!5m2!1sid!2sid"
                  width="100%"
                  height="100%"
                  border="0"
                  allowFullScreen=""
                  aria-hidden="false"
                  tabIndex="0"
                  title="Maps frame"
                />
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-between py-1 my-3 border-top">
            <p>
              © 2021 Badan Kesatuan Bangsa dan Politik Kabupaten Mesuji. All
              rights reserved.
            </p>
            <ul className="list-unstyled d-flex">
              <li className="ms-3">
                <i className="bi bi-twitter"></i>
              </li>
              <li className="ms-3">
                <i className="bi bi-instagram"></i>
              </li>
              <li className="ms-3">
                <i className="bi bi-facebook"></i>
              </li>
            </ul>
          </div>
        </footer>
      </div>
    </div>
  );
}
