import { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button, Box, Menu, MenuItem, Container } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Start from './components/Start.jsx';
import ContactUs from './components/ContactUs.jsx';
import BinTech from './components/BinTech.jsx';
import './App.css';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';

const pages = [
  { name: 'Acerca de', path: '/EventRegistration/' },
  { name: 'Contáctanos', path: '/EventRegistration/ContactUs' }
];

function ResponsiveAppBar({ title, subtitle }) {
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#27348b' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo e imagen para desktop */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 2, alignItems: 'center' }}>
            <img 
              src="/RU_Blanco.svg" 
              alt="Rumiñahui" 
              style={{ height: '50px', marginRight: '10px' }}
            />
          </Box>
          
          {/* Título y subtítulo para desktop */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, flexDirection: 'column', mr: 2 }}>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                fontFamily: 'monospace',
                fontWeight: 700,
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              {title}
            </Typography>
            {subtitle && (
              <Typography
                variant="subtitle2"
                noWrap
                component="div"
                sx={{
                  color: 'inherit',
                }}
              >
                {subtitle}
              </Typography>
            )}
          </Box>

          {/* Menú hamburguesa para mobile */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Link to={page.path} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Typography sx={{ textAlign: 'center' }}>{page.name}</Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Logo e imagen para mobile */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, mr: 1, alignItems: 'center' }}>
            <img 
              src="/RU_Blanco.svg" 
              alt="Rumiñahui"
              style={{ height: '40px' }}
            />
          </Box>

          {/* Título para mobile */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, flexDirection: 'column', flexGrow: 1 }}>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                fontFamily: 'monospace',
                fontWeight: 700,
                color: 'inherit',
                fontSize: '1rem',
              }}
            >
              {title}
            </Typography>
            {subtitle && (
              <Typography
                variant="subtitle2"
                noWrap
                component="div"
                sx={{
                  color: 'inherit',
                  fontSize: '0.75rem',
                }}
              >
                {subtitle}
              </Typography>
            )}
          </Box>

          {/* Botones de navegación para desktop */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                component={Link}
                to={page.path}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.name}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

function AppContent() {
  const location = useLocation();
  const [title] = useState('Registrar Participantes');
  const [subtitle, setSubtitle] = useState('');

  // Actualizar subtítulo según la ruta
  useState(() => {
    if (location.pathname === '/EventRegistration/') {
      setSubtitle('');
    } else if (location.pathname === '/EventRegistration/BINTECH2025') {
      setSubtitle('BINTECH 2025');
    } else if (location.pathname === '/EventRegistration/ContactUs') {
      setSubtitle('');
    }
  }, [location]);

  return (
    <div id='AppMain'>
      <header>
        <ResponsiveAppBar title={title} subtitle={subtitle} />
      </header>
      <section>
        <Routes>
          <Route path="/EventRegistration/" element={<Start setSubtitle={setSubtitle} />} />
          <Route path="/EventRegistration/ContactUs" element={<ContactUs setSubtitle={setSubtitle} />} />
          <Route path="/EventRegistration/BINTECH2025" element={<BinTech setSubtitle={setSubtitle} />} />
        </Routes>
      </section>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
