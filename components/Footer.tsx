import style from "../styles/Footer.module.scss";
import { BsLinkedin, BsGithub } from "react-icons/bs";

const Footer = () => {

  // const current = new Date();
  // const date = `${current.getDate()}/${
  //   current.getMonth() + 1
  // }/${current.getFullYear()}`;

  // const time = current.getHours() + ":" + current.getMinutes();
  
  return (
    <div className={style.footer}>
      <div>
        <p className={style.find} style={{letterSpacing: '2px'}}>find me on:</p>
        <a
          href="https://www.linkedin.com/in/jdfive/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className={style.footerIcon}>
            <BsLinkedin />
          </span>
        </a>
        <a
          href="https://github.com/jddunn"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className={style.footerIcon}>
            <BsGithub />
          </span>
        </a>
      </div>
      {/* <div>{time + " | " + date}</div> */}
    </div>
  );
};

export default Footer;
