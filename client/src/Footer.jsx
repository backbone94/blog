const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div className="footer">
      <p>이정준</p>
      <p>
        <img alt="email" src="images/email.svg" /> backbone94@naver.com
        <a
          style={{ textDecoration: "none", color: "black", marginLeft: "30px" }}
          target="_blank"
          href="https://github.com/backbone94?tab=repositories"
          rel="noreferrer"
        >
          <img alt="github" src="images/github.svg" /> Github
        </a>
      </p>

      <p>
        <span>Copyright {year}. All Rights Reserved. </span>
      </p>
    </div>
  );
};

export default Footer;
