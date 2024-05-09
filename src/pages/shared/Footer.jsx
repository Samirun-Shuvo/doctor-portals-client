import footer from "../../assets/images/footer.png";
const Footer = () => {
    let currentYear = new Date().getFullYear();
  return (
    <footer
      style={{ background: `url(${footer})`, backgroundSize: "cover" }}
      className="p-10 "
    >
      <div className="footer">
        <nav>
          <h6 className="footer-title">Services</h6>
          <a className="link link-hover">Branding</a>
          <a className="link link-hover">Design</a>
          <a className="link link-hover">Marketing</a>
          <a className="link link-hover">Advertisement</a>
        </nav>
        <nav>
          <h6 className="footer-title">Company</h6>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </nav>
        <nav>
          <h6 className="footer-title">Legal</h6>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </nav>
      </div>
      <aside className="text-center my-10">
        <p>Copyright © {currentYear} - All right reserved</p>
      </aside>
    </footer>
  );
};

export default Footer;
