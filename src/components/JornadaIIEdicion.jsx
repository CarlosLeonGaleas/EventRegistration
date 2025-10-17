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
  Snackbar,
  CircularProgress
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import BadgeIcon from '@mui/icons-material/Badge';

import { collection, query, where, getDocs, setDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { v4 as uuidv4 } from "uuid";
import { QRCodeCanvas } from "qrcode.react";
import html2canvas from 'html2canvas';
import BannerJornada from '/BannerJornada.jpeg';

function JornadaIIEdicion({ setSubtitle, event }) {
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

  const [loading, setLoading] = useState(false);
  const [registroExitoso, setRegistroExitoso] = useState(false);
  const [participantID, setParticipantID] = useState(null);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSnackbarMessage('Por favor, complete todos los campos correctamente');
      setOpenSnackbar(true);
      return;
    }

    try {
      // 1. Verificar si ya existe un registro idéntico
      const registrosRef = collection(db, event);
      const q = query(
        registrosRef,
        where("cedula", "==", formData.cedula),
        where("nombres", "==", formData.nombres),
        where("telefono", "==", formData.telefono),
        where("correo", "==", formData.correo),
        where("tipoParticipacion", "==", formData.tipoParticipacion)
      );

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // Si ya existe, obtener el docID del participante
        const existingDoc = querySnapshot.docs[0];
        setSnackbarMessage("Ya se encuentra registrado un participante con los mismos datos!");
        console.log("ID del participante existente:", existingDoc.id);
        setParticipantID(existingDoc.id);
        setRegistroExitoso(true);

        setOpenSnackbar(true);
        return;
      }

      // 2. Crear un nuevo ID de participante (UUID)
      const participantID = uuidv4();

      // 3. Crear documento con el ID generado
      const newDocRef = doc(db, event, participantID);

      await setDoc(newDocRef, {
        ...formData,
        participantID,
        checkedIn: false,
        fechaRegistro: new Date().toISOString()
      });

      console.log("✅ Nuevo registro creado con ID:", participantID);
      setParticipantID(participantID)

      setSnackbarMessage('¡Registro exitoso!');
      setRegistroExitoso(true);
      setOpenSnackbar(true);

    } catch (error) {
      console.error("Error al registrar:", error);
      setSnackbarMessage('Ocurrió un error al registrar los datos');
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadQR = async () => {
    try {
      const ticketElement = document.getElementById('ticketContainer');

      if (!ticketElement) {
        console.error('No se encontró el contenedor del ticket');
        return;
      }

      // Usar html2canvas para convertir el elemento a imagen
      const canvas = await html2canvas(ticketElement, {
        scale: 2, // Mayor calidad
        backgroundColor: '#ffffff',
        logging: false,
        useCORS: true
      });

      // Convertir el canvas a blob
      canvas.toBlob((blob) => {
        if (!blob) {
          console.error('Error al crear la imagen');
          return;
        }

        // Crear URL temporal del blob
        const url = URL.createObjectURL(blob);

        // Crear elemento <a> para descargar
        const link = document.createElement('a');
        link.href = url;
        link.download = `ticket-${formData.cedula}-${participantID}.png`;

        // Simular click para descargar
        document.body.appendChild(link);
        link.click();

        // Limpiar
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }, 'image/png');

    } catch (error) {
      console.error('Error al descargar el ticket:', error);
      // Aquí podrías mostrar un mensaje de error al usuario
    }
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
          <Grid
            container
            spacing={0}
            sx={{
              flexDirection: { xs: 'column', md: 'row' }, // Banner arriba en móvil, lado izquierdo en desktop
              height: { md: '100%' }
            }}
          >

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
                width: { xs: '100%', sm: '100%', md: '50%' },
                minHeight: { xs: 'auto', md: '100%' }, // se asegura de mantener tamaño en desktop
              }}
            >
              <Box
                component="img"
                src={BannerJornada}
                alt="Banner II Jornada de Investigación"
                sx={{
                  width: { xs: '90%', sm: '80%', md: '90%' },
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

            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                p: { xs: 3, sm: 4, md: 5 },
                width: { xs: '100%', sm: '100%', md: '50%' },
                minHeight: { xs: 'auto', md: '100%' }, // asegura altura pareja con el banner
              }}
            >
              {/* Formulario DERECHO (abajo en móvil) */}
              {!registroExitoso ? (
                <Box sx={{ width: '100%', maxWidth: '480px' }}>
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

                  <form
                    onSubmit={handleSubmit}
                    style={{ display: 'flex', flexDirection: 'column', width: '100%' }}
                  >
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
                      disabled={loading}
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
                      {loading ? (
                        <>
                          <CircularProgress
                            size={22}
                            sx={{ color: "white", mr: 1 }}
                          />
                          Registrando...
                        </>
                      ) : (
                        "Registrar Participación"
                      )}
                    </Button>
                  </form>
                </Box>
              ) : (
                <Box sx={{ width: '100%', maxWidth: '480px' }}>
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
                    Registro realizado
                  </Typography>

                  {participantID && (
                    <Box>
                      {/* Ticket/Carnet */}
                      <Box
                        id="ticketContainer"
                        sx={{
                          width: '100%',
                          maxWidth: '400px',
                          margin: '0 auto', //centrar horizontalmente
                          background: 'linear-gradient(135deg, #ffffff 0%, #f5f7fa 100%)',
                          borderRadius: 3,
                          overflow: 'hidden',
                          boxShadow: '0 8px 32px rgba(39, 52, 139, 0.15)',
                          border: '2px solid #27348b',
                          mb: 3
                        }}
                      >
                        {/* Header del ticket */}
                        <Box
                          sx={{
                            background: 'linear-gradient(135deg, #27348b 0%, #1a2357 100%)',
                            py: 2.5,
                            px: 3,
                            textAlign: 'center'
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: '1.1rem',
                              fontWeight: 700,
                              color: '#ffffff',
                              lineHeight: 1.3,
                              mb: 0.5
                            }}
                          >
                            II JORNADA DE INVESTIGACIÓN,
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: '0.9rem',
                              fontWeight: 600,
                              color: '#e2832f',
                              lineHeight: 1.2
                            }}
                          >
                            INNOVACIÓN Y TRANSFERENCIA DE TECNOLOGÍA
                          </Typography>
                        </Box>

                        {/* Código QR */}
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            py: 3,
                            background: '#ffffff'
                          }}
                        >
                          <Box
                            sx={{
                              p: 2,
                              borderRadius: 2,
                              background: '#ffffff',
                              border: '3px solid #27348b',
                              boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
                            }}
                          >
                            <QRCodeCanvas id="qrCanvas" value={participantID} size={180} />
                          </Box>
                        </Box>

                        {/* Información del participante */}
                        <Box
                          sx={{
                            px: 3,
                            pb: 3,
                            background: '#ffffff'
                          }}
                        >
                          {/* Nombre */}
                          <Box sx={{ mb: 2, textAlign: 'center' }}>
                            <Typography
                              sx={{
                                fontSize: '0.75rem',
                                fontWeight: 600,
                                color: '#27348b',
                                mb: 0.5,
                                letterSpacing: '0.5px'
                              }}
                            >
                              PARTICIPANTE
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: '1rem',
                                fontWeight: 700,
                                color: '#1a2357',
                                textTransform: 'uppercase',
                                letterSpacing: '0.3px'
                              }}
                            >
                              {formData.nombres}
                            </Typography>
                          </Box>

                          {/* Cédula */}
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              mb: 1.5,
                              py: 1,
                              px: 2,
                              borderRadius: 1.5,
                              background: 'linear-gradient(135deg, #f5f7fa 0%, #e9ecef 100%)'
                            }}
                          >
                            <BadgeIcon sx={{ fontSize: '1.1rem', color: '#27348b', mr: 1 }} />
                            <Typography
                              sx={{
                                fontSize: '0.9rem',
                                fontWeight: 600,
                                color: '#1a2357'
                              }}
                            >
                              {formData.cedula}
                            </Typography>
                          </Box>

                          {/* Teléfono */}
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              mb: 1.5,
                              py: 1,
                              px: 2,
                              borderRadius: 1.5,
                              background: 'linear-gradient(135deg, #f5f7fa 0%, #e9ecef 100%)'
                            }}
                          >
                            <PhoneIcon sx={{ fontSize: '1.1rem', color: '#27348b', mr: 1 }} />
                            <Typography
                              sx={{
                                fontSize: '0.9rem',
                                fontWeight: 600,
                                color: '#1a2357'
                              }}
                            >
                              {formData.telefono}
                            </Typography>
                          </Box>

                          {/* Correo */}
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              py: 1,
                              px: 2,
                              borderRadius: 1.5,
                              background: 'linear-gradient(135deg, #f5f7fa 0%, #e9ecef 100%)'
                            }}
                          >
                            <EmailIcon sx={{ fontSize: '1.1rem', color: '#27348b', mr: 1 }} />
                            <Typography
                              sx={{
                                fontSize: '0.85rem',
                                fontWeight: 600,
                                color: '#1a2357',
                                wordBreak: 'break-all'
                              }}
                            >
                              {formData.correo}
                            </Typography>
                          </Box>
                        </Box>

                        {/* Footer decorativo */}
                        <Box
                          sx={{
                            height: '8px',
                            background: 'linear-gradient(90deg, #27348b 0%, #e2832f 100%)'
                          }}
                        />
                      </Box>

                      <Typography
                        variant="body2"
                        sx={{
                          mb: 3,
                          fontSize: '0.9rem',
                          color: '#555',
                          textAlign: 'center',
                          fontStyle: 'italic'
                        }}
                      >
                        Muestra este código QR al ingreso del evento
                      </Typography>

                      <Button
                        onClick={handleDownloadQR}
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
                          maxWidth: '400px',
                          '&:hover': {
                            background: 'linear-gradient(135deg, #1a2357 0%, #27348b 100%)',
                            boxShadow: '0 6px 25px rgba(39, 52, 139, 0.6)',
                            transform: 'translateY(-2px)'
                          }
                        }}
                      >
                        Descargar Ticket
                      </Button>
                    </Box>
                  )}
                </Box>
              )}
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
