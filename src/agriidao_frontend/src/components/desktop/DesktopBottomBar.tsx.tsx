const DesktopBottomBar = () => {
  return (
    <footer className="shadow py-3 text-center">
      <p className="mb-0 text-muted">
        © {new Date().getFullYear()} agriiDAO. Developed by{" "}
        <a href="https://agriilabs.com" target="_blank" rel="noopener noreferrer">
          agriiLabs
        </a>
      </p>
    </footer>
  );
};

export default DesktopBottomBar;