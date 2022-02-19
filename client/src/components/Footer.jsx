import { Tooltip, message } from "antd";
import { GithubFilled, MailFilled } from "@ant-design/icons";
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
          <MailFilled style={{ fontSize: 20, marginRight: 5 }} />
          <Tooltip color={"#2db7f5"} onClick={onClick} title="복사하기">
            <span style={{ cursor: "pointer" }}>backbone94@naver.com</span>
          </Tooltip>
        </span>
        <a
          style={{ marginLeft: 30 }}
          target="_blank"
          href="https://github.com/backbone94?tab=repositories"
          rel="noreferrer"
        >
          <GithubFilled style={{ fontSize: 20 }} />{" "}
          <span className="github">Github</span>
        </a>
      </p>

      <p>
        <span>Copyright {year}. All Rights Reserved. </span>
      </p>
    </div>
  );
};

export default Footer;
