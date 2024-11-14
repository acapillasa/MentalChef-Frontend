import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-section">
          <h5>Sobre Nosotros</h5>
          <p>
            En MentalChef, creemos que la cocina es un arte accesible para todos, sin importar tu nivel de
            experiencia. Nuestra misión es crear una comunidad inclusiva y colaborativa donde los amantes de la
            cocina puedan compartir conocimientos, resolver dudas y aprender juntos.
          </p>
        </div>
        <div className="footer-section">
          <h5>Enlaces rápidos</h5>
          <ul>
            <li><a href="/">Ranking mensual</a></li>
            <li><a href="/">Contacto</a></li>
            <li><a href="/">Términos y condiciones</a></li>
            <li><a href="/">Política de privacidad</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h5>¡Síguenos!</h5>
          <ul className="social-media">
            <li><a href="/" className="facebook"><FontAwesomeIcon icon={faFacebook} /> Facebook</a></li>
            <li><a href="/" className="twitter"><FontAwesomeIcon icon={faTwitter} /> Twitter</a></li>
            <li><a href="/" className="instagram"><FontAwesomeIcon icon={faInstagram} /> Instagram</a></li>
            <li><a href="/" className="youtube"><FontAwesomeIcon icon={faYoutube} /> YouTube</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 MentalChef</p>
      </div>
    </footer>
  );
};

export default Footer;
