import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '@/components/Header';
import SideBar from '@/components/SideBar';
import Footer from '@/components/Footer';
import { Container } from 'react-bootstrap';

const Layout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [filterText, setFilterText] = useState('');

  const handleSidebarToggle = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleSearch = (text) => {
    setFilterText(text);
  };

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <SideBar isCollapsed={isSidebarCollapsed} onToggle={handleSidebarToggle} />

      {/* Main Content */}
      <div
        className="flex-grow-1 d-flex flex-column"
        style={{ marginLeft: isSidebarCollapsed ? '10%' : '15%', transition: 'margin-left 0.3s' }}
      >
        {/* Header */}
        <Header isSidebarCollapsed={isSidebarCollapsed} onSearch={handleSearch} />

        {/* Main Content Area */}
        <main className="flex-grow-1" style={{ paddingTop: '60px', paddingBottom: '60px' }}>
          <Container fluid className="px-4 py-3">
            <Outlet context={{ filterText }} />
          </Container>
        </main>

        {/* Footer */}
        <Footer isSidebarCollapsed={isSidebarCollapsed} />
      </div>
    </div>
  );
};

export default Layout;
