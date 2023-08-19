import { FC } from 'react';
import { FaGithub, FaLinkedin, FaCode, FaEnvelope } from 'react-icons/fa';

const Footer: FC = () => {
	return (
		<footer>
			<div className="footer-links">
				<a
					href="https://github.com/0mppula"
					target="_blank"
					rel="noreferrer"
					aria-label="Github"
				>
					<FaGithub className="footer-icon" />
				</a>

				<a
					href="https://www.linkedin.com/in/omarkraidie/"
					target="_blank"
					rel="noreferrer"
					aria-label="Linkedin"
				>
					<FaLinkedin className="footer-icon" />
				</a>

				<a
					href="mailto:devomarkraidie@gmail.com"
					target="_blank"
					rel="noreferrer"
					aria-label="Email"
				>
					<FaEnvelope className="footer-icon" />
				</a>

				<a
					href="https://github.com/0mppula/BookStackr"
					target="_blank"
					rel="noreferrer"
					aria-label="Source code"
				>
					<FaCode className="footer-icon" />
				</a>
			</div>

			<hr />

			<div>
				<span>Developed by </span>
				<a href="https://www.omarkraidie.com/" target="_blank" rel="noopener noreferrer">
					Omar Kraidié
				</a>
			</div>
		</footer>
	);
};

export default Footer;
