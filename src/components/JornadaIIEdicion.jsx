import { useEffect, useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  TextField, 
  Button, 
  FormControl, 
  FormLabel, 
  RadioGroup, 
  FormControlLabel, 
  Radio,
  Grid,
  Container,
  Alert,
  Snackbar
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import BadgeIcon from '@mui/icons-material/Badge';

function JornadaIIEdicion({ setSubtitle }) {
  useEffect(() => {
    setSubtitle('II Jornada de Investigación');
  }, [setSubtitle]);

  const [formData, setFormData] = useState({
    cedula: '',
    nombres: '',
    telefono: '',
    correo: '',
    tipoParticipacion: 'publico'
  });

  const [errors, setErrors] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.cedula.trim()) {
      newErrors.cedula = 'La cédula es requerida';
    } else if (!/^\d{10}$/.test(formData.cedula.trim())) {
      newErrors.cedula = 'La cédula debe tener 10 dígitos';
    }
    
    if (!formData.nombres.trim()) {
      newErrors.nombres = 'Los nombres completos son requeridos';
    } else if (formData.nombres.trim().length < 3) {
      newErrors.nombres = 'Ingrese un nombre válido';
    }
    
    if (!formData.telefono.trim()) {
      newErrors.telefono = 'El teléfono es requerido';
    } else if (!/^\d{10}$/.test(formData.telefono.trim())) {
      newErrors.telefono = 'El teléfono debe tener 10 dígitos';
    }
    
    if (!formData.correo.trim()) {
      newErrors.correo = 'El correo electrónico es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.correo.trim())) {
      newErrors.correo = 'Ingrese un correo electrónico válido';
    }
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSnackbarMessage('Por favor, complete todos los campos correctamente');
      setOpenSnackbar(true);
      return;
    }
    
    console.log('Datos del formulario:', formData);
    setSnackbarMessage('¡Registro exitoso!');
    setOpenSnackbar(true);
    
    setTimeout(() => {
      setFormData({
        cedula: '',
        nombres: '',
        telefono: '',
        correo: '',
        tipoParticipacion: 'publico'
      });
    }, 1500);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box 
      sx={{ 
        minHeight: 'calc(100vh - 64px)',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        py: 4
      }}
    >
      <Container maxWidth="lg">
        {/* Título principal */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography 
            variant="h3" 
            sx={{ 
              fontWeight: 700,
              color: '#27348b',
              mb: 1,
              fontSize: { xs: '1.75rem', sm: '2.3rem', md: '2.8rem' }
            }}
          >
            II JORNADA DE INVESTIGACIÓN,
          </Typography>
          <Typography 
            variant="h4" 
            sx={{ 
              fontWeight: 600,
              color: '#e2832f',
              fontSize: { xs: '1.25rem', sm: '1.6rem', md: '1.8rem' }
            }}
          >
            INNOVACIÓN Y TRANSFERENCIA DE TECNOLOGÍA
          </Typography>
        </Box>

        <Paper
          elevation={8}
          sx={{
            borderRadius: 4,
            overflow: 'hidden',
            background: '#ffffff'
          }}
        >
          {/* GRID RESPONSIVO */}
          <Grid container spacing={0}>
            
            {/* Banner IZQUIERDO (arriba en móvil) */}
            <Grid 
              item 
              xs={12} 
              md={6}
              sx={{
                backgroundColor: '#27348b',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                p: { xs: 3, sm: 4, md: 5 },
                height: { xs: 'auto', md: '100%' },
              }}
            >
              <Box
                component="img"
                src="/BannerJornada.jpeg"
                alt="Banner II Jornada de Investigación"
                sx={{
                  width: '75%',
                  height: 'auto',
                  objectFit: 'contain',
                  borderRadius: 2,
                  mb: 3
                }}
              />
              <Box sx={{ textAlign: 'center' }}>
              <Typography sx={{ color: '#ffffff', fontWeight: 600, mb: 0.5 }}>
                    Más información
                  </Typography>
                  <Typography sx={{ color: '#e9f0ff', fontSize: '0.95rem' }}>
                    investigacion@ister.edu.ec
                  </Typography>
              </Box>
            </Grid>

            {/* Formulario DERECHO (abajo en móvil) */}
            <Grid 
              item 
              xs={12} 
              md={6}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                p: { xs: 3, sm: 4, md: 5 },
                width: '100%'
              }}
            >
              <Typography 
                variant="h5" 
                sx={{ 
                  mb: 3, 
                  fontWeight: 600,
                  color: '#27348b',
                  borderLeft: '4px solid #e2832f',
                  pl: 2
                }}
              >
                Formulario de Registro
              </Typography>
              
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '100%', flex: 1 }}>
                  <Box sx={{ flex: 1 }}>
                    {/* Cédula */}
                    <Box sx={{ mb: 3 }}>
                      <TextField
                        fullWidth
                        label="Cédula"
                        name="cedula"
                        value={formData.cedula}
                        onChange={handleChange}
                        error={!!errors.cedula}
                        helperText={errors.cedula}
                        required
                        InputProps={{
                          startAdornment: <BadgeIcon sx={{ mr: 1, color: '#27348b' }} />
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '&:hover fieldset': { borderColor: '#e2832f' },
                            '&.Mui-focused fieldset': { borderColor: '#27348b' },
                          },
                          '& .MuiInputLabel-root.Mui-focused': { color: '#27348b' },
                        }}
                      />
                    </Box>
                    
                    {/* Nombres Completos */}
                    <Box sx={{ mb: 3 }}>
                      <TextField
                        fullWidth
                        label="Nombres Completos"
                        name="nombres"
                        value={formData.nombres}
                        onChange={handleChange}
                        error={!!errors.nombres}
                        helperText={errors.nombres}
                        required
                        InputProps={{
                          startAdornment: <PersonIcon sx={{ mr: 1, color: '#27348b' }} />
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '&:hover fieldset': { borderColor: '#e2832f' },
                            '&.Mui-focused fieldset': { borderColor: '#27348b' },
                          },
                          '& .MuiInputLabel-root.Mui-focused': { color: '#27348b' },
                        }}
                      />
                    </Box>
                    
                    {/* Teléfono */}
                    <Box sx={{ mb: 3 }}>
                      <TextField
                        fullWidth
                        label="Teléfono"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleChange}
                        error={!!errors.telefono}
                        helperText={errors.telefono}
                        required
                        InputProps={{
                          startAdornment: <PhoneIcon sx={{ mr: 1, color: '#27348b' }} />
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '&:hover fieldset': { borderColor: '#e2832f' },
                            '&.Mui-focused fieldset': { borderColor: '#27348b' },
                          },
                          '& .MuiInputLabel-root.Mui-focused': { color: '#27348b' },
                        }}
                      />
                    </Box>
                    
                    {/* Correo Electrónico */}
                    <Box sx={{ mb: 3 }}>
                      <TextField
                        fullWidth
                        label="Correo Electrónico"
                        name="correo"
                        type="email"
                        value={formData.correo}
                        onChange={handleChange}
                        error={!!errors.correo}
                        helperText={errors.correo}
                        required
                        InputProps={{
                          startAdornment: <EmailIcon sx={{ mr: 1, color: '#27348b' }} />
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '&:hover fieldset': { borderColor: '#e2832f' },
                            '&.Mui-focused fieldset': { borderColor: '#27348b' },
                          },
                          '& .MuiInputLabel-root.Mui-focused': { color: '#27348b' },
                        }}
                      />
                    </Box>
                    
                    {/* Tipo de Participación */}
                    <FormControl 
                      component="fieldset" 
                      sx={{ 
                        mb: 4,
                        width: '97%',
                        p: 2,
                        border: '1px solid rgba(0,0,0,0.08)',
                        borderRadius: 2,
                        '&:hover': {
                          borderColor: '#e2832f'
                        }
                      }}
                    >
                      <FormLabel 
                        component="legend"
                        sx={{
                          color: '#27348b',
                          fontWeight: 600,
                          mb: 1,
                          '&.Mui-focused': {
                            color: '#27348b'
                          }
                        }}
                      >
                        Tipo de Participación
                      </FormLabel>
                      <RadioGroup
                        name="tipoParticipacion"
                        value={formData.tipoParticipacion}
                        onChange={handleChange}
                      >
                        <FormControlLabel 
                          value="publico" 
                          control={
                            <Radio 
                              sx={{
                                color: '#27348b',
                                '&.Mui-checked': { color: '#e2832f' },
                              }}
                            />
                          } 
                          label="Público externo" 
                        />
                        <FormControlLabel 
                          value="estudiante" 
                          control={
                            <Radio 
                              sx={{
                                color: '#27348b',
                                '&.Mui-checked': { color: '#e2832f' },
                              }}
                            />
                          } 
                          label="Estudiante ISTER" 
                        />
                        <FormControlLabel 
                          value="docente" 
                          control={
                            <Radio 
                              sx={{
                                color: '#27348b',
                                '&.Mui-checked': { color: '#e2832f' },
                              }}
                            />
                          } 
                          label="Docente ISTER" 
                        />
                      </RadioGroup>
                    </FormControl>
                  </Box>
                  
                  {/* Botón de registro */}
                  <Button 
                    type="submit" 
                    variant="contained" 
                    size="large"
                    fullWidth
                    sx={{ 
                      py: 1.5,
                      fontSize: '1.05rem',
                      fontWeight: 600,
                      background: 'linear-gradient(135deg, #27348b 0%, #1a2357 100%)',
                      boxShadow: '0 4px 20px rgba(39, 52, 139, 0.4)',
                      transition: 'all 0.3s ease',
                      mt: 'auto',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #1a2357 0%, #27348b 100%)',
                        boxShadow: '0 6px 25px rgba(39, 52, 139, 0.6)',
                        transform: 'translateY(-2px)'
                      }
                    }}
                  >
                    Registrar Participación
                  </Button>
                </form>
            </Grid>
          </Grid>
        </Paper>

        {/* Snackbar */}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={4000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert 
            onClose={handleCloseSnackbar} 
            severity={snackbarMessage.includes('exitoso') ? 'success' : 'error'}
            sx={{ width: '100%' }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
}

export default JornadaIIEdicion;
