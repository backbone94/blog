import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Header() {
  let [category, setCategory] = useState([
    { en: "Lang", ko: "언어" },
    { en: "Frame", ko: "프레임워크" },
    { en: "Git", ko: "git" },
    { en: "Major", ko: "컴퓨터 전공" },
  ]);

  return (
    <div className="header">
      <a href="/">
        <img src="images/house.svg" className="homeImg" alt="house" />
      </a>
      <div className="category">
        {category.map((c) => (
          <Link key={c.en} to={`/${c.en}`}>
            <Button variant="outline-secondary" className="btn">
              {c.ko}
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
}
