const Navbar = () => {
  return (
    <nav style={{ backgroundColor: 'blue' }}>
      <div style={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
        <a href="/" style={{ color: 'white', marginRight: '20px', fontSize: '20px' }}>
          Rick and Morty
        </a>
        <button
          style={{ border: 'none', backgroundColor: 'transparent', marginRight: '10px' }}
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
        </button>
        <div style={{ display: 'none' }} id="navbarNav">
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ margin: '10px 0' }}>
              <a href="/" style={{ color: 'white', textDecoration: 'none', fontSize: '16px' }}>
                Scenes
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
