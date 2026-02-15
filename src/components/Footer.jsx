export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footerInner">
        <p className="footerEmail">
        <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=emiliagrama@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
        >
            emiliagrama@gmail.com
        </a>
        </p>

        <p className="footerCopy">
          © {new Date().getFullYear()} Emilia Grama
        </p>
      </div>
    </footer>
  );
}
