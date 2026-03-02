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

        <p className="footerCopy">
          © {new Date().getFullYear()} Emilia Grama
        </p>
      </div>
    </footer>
  );
}
