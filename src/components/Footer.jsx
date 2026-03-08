export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footerInner">
        <p className="footerEmail">
        <a
          href="mailto:emiliagrama@gmail.com?subject=Project%20Inquiry"            target="_blank"
            rel="noopener noreferrer"
        >
            emiliagrama@gmail.com
        </a>
        </p>
        <a
          href="https://www.linkedin.com/in/emilia-grama/"
          target="_blank"
          rel="noopener noreferrer"
          className="footerSocial"
        >
          LinkedIn
        </a>
        <p className="footerCopy">
          © {new Date().getFullYear()} Emilia Grama
        </p>
      </div>
    </footer>
  );
}
