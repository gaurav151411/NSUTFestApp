import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export const HeaderPage = () => {
  const [hovered, setHovered] = useState(null);

  const handleMouseEnter = (index) => {
    setHovered(index);
  };

  const handleMouseLeave = () => {
    setHovered(null);
  };

  return (
    <header style={headerStyle}>
      <div>
        <div className="topNav" style={topNavStyle}>
          <Image src={'/images/ytlogo.jpeg'} width={50} height={50} alt="Logo" />
          <nav>
            <ul style={ulStyle}>
              {links.map((link, index) => (
                <li key={index} style={liStyle}>
                  <Link href={link.href}>
                    <div
                      style={{
                        ...linkStyle,
                        backgroundColor: hovered === index ? '#f0ad4e' : '#649568'
                      }}
                      onMouseEnter={() => handleMouseEnter(index)}
                      onMouseLeave={handleMouseLeave}
                    >
                      {link.text}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <h1 style={h1Style}>
          Explore Upcoming Events and Plan Your Perfect Day At NSUT
        </h1>
      </div>
    </header>
  );
};

const links = [
  { href: '/', text: 'Home' },
  { href: '/about-us', text: 'About us' },
  { href: '/exploreevents', text: 'Explore Events' },
  { href: '/events', text: 'Events' },
  { href: '/analytics', text: 'Analytics' },
];

const headerStyle = {
  backgroundColor: '#0e6b0e',
  padding: '20px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

const topNavStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};

const ulStyle = {
  display: 'flex',
  listStyle: 'none',
  padding: 0,
  margin: 0,
};

const liStyle = {
  margin: '0 10px',
};

const linkStyle = {
  display: 'block',
  padding: '10px 20px',
  backgroundColor: '#ff4500',
  color: '#CFFF04',
  textDecoration: 'none',
  borderRadius: '5px',
  transition: 'background-color 0.3s',
  textAlign: 'center',
  fontSize: '16px',
  fontWeight: 'bold',
  fontFamily: 'Arial, sans-serif',
  cursor: 'pointer',  // Add cursor pointer to indicate clickable
};

const h1Style = {
  color: '#CFFF04',
  textAlign: 'center',
  marginTop: '20px',
  fontSize: '40px',
  fontFamily: 'monospace',
  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
};

export default HeaderPage;
