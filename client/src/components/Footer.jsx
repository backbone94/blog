import { Toast } from "bootstrap";
import { useRef } from "react";
import "../css/footer.css";

const Footer = () => {
  const textRef = useRef();
  const year = new Date().getFullYear();

  function onClick(e) {
    navigator.clipboard.writeText(e.target.textContent);
    let toast = new Toast(textRef.current);
    toast.show();
  }

  return (
    <div className="footer">
      <p>이정준</p>
      <p>
        <span>
          <img alt="email" src="images/email.svg" />{" "}
          <text
            style={{ cursor: "pointer" }}
            onClick={onClick}
            title="복사하기"
          >
            backbone94@naver.com
          </text>
        </span>
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

      {/* toast 창 */}
      <div
        className="position-fixed bottom-0 end-0 p-3 "
        style={{ zIndex: 11 }}
      >
        <div
          ref={textRef}
          className="toast"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="toast-body">복사 완료!</div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
