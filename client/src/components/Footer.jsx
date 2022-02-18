import { Tooltip, message } from "antd";
import "../css/footer.css";

const Footer = () => {
  const year = new Date().getFullYear();

  function onClick(e) {
    navigator.clipboard.writeText(e.target.textContent);
    message.success({
      content: "복사되었습니다.",
      style: {
        marginTop: "10vh",
      },
    });
  }

  return (
    <div className="footer">
      <p>이정준</p>
      <p>
        <span>
          <img alt="email" src="images/email.svg" />{" "}
          <Tooltip onClick={onClick} title="복사하기">
            <span style={{ cursor: "pointer" }}>backbone94@naver.com</span>
          </Tooltip>
        </span>
        <a
          style={{ textDecoration: "none", color: "black", marginLeft: "30px" }}
          target="_blank"
          href="https://github.com/backbone94?tab=repositories"
          rel="noreferrer"
        >
          <img alt="github" src="images/github.svg" /> <span>Github</span>
        </a>
      </p>

      <p>
        <span>Copyright {year}. All Rights Reserved. </span>
      </p>
    </div>
  );
};

export default Footer;
