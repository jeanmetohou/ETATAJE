// Footer.js
import React from 'react';

const Footer = ({ isSidebarCollapsed }) => {
  return (
    <footer
      className="bg-white shadow-sm p-3" style={{ width: `calc(100% - ${isSidebarCollapsed ? '10%' : '15%'})`, transition: 'width 0.3s', position: 'fixed', bottom: 0, left: isSidebarCollapsed ? '10%' : '15%',
        zIndex: 1000,
      }}
    >
      <p className="text-center mb-0">GesDosAJE©2025 </p>
    </footer>
  );
};

export default Footer;