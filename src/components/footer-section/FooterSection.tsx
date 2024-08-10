import { FC } from "react";

import "./FooterSection.scss";

import telephone from "../../assets/icons/telephone.webp";
import email from "../../assets/icons/email.webp";
import vk from "../../assets/icons/vk.webp";
import author from "../../assets/icons/author.webp";

const FooterSection: FC = () => {
  return (
    <footer className="footer-section">
      <div className="footer-contacts">
        <div className="footer-contacts-title">
          <p>Наши контакты</p>
        </div>
        <ul>
          <li className="contact">
            <div className="icon-wrapper">
              <img src={telephone} alt="#" loading="lazy" />
            </div>
            <p>+7 958 190 8968</p>
          </li>
          <li className="contact">
            <div className="icon-wrapper">
              <img src={email} alt="#" loading="lazy" />
            </div>
            <p>ort_marvic@mail.ru</p>
          </li>
          <li className="contact">
            <div className="icon-wrapper">
              <img src={vk} alt="#" loading="lazy" />
            </div>
            <p>https://vk.com/public221436125</p>
          </li>
          <li className="contact">
            <div className="icon-wrapper">
              <img src={author} alt="#" loading="lazy" />
            </div>
            <p>ort_marvik</p>
          </li>
        </ul>
      </div>
      <div className="fond-m-wrapper">
        <p>Создано при поддерwebp фонда содействия инновациям </p>
      </div>
    </footer>
  );
};

export default FooterSection;
