import { useEffect } from 'react';
import inscriptioLogo from '/Inscriptio.svg';
import inscriptionLogoBN from '/Inscriptio-BN.svg';
import inscriptioBanner from '/InscriptioBanner.svg';
import { Box, Typography, Card, CardContent, Container, Grid } from '@mui/material';
import { QrCode2, PhoneAndroid, CloudDownload, Speed, Security, EventNote } from '@mui/icons-material';

function Start({ setSubtitle }) {
  useEffect(() => {
    setSubtitle('');
  }, [setSubtitle]);

  const features = [
    { icon: <EventNote sx={{ fontSize: 48, color: '#FE8300' }} />, title: 'Registro Simplificado', description: 'Formulario web intuitivo para que los participantes se inscriban a tus eventos en segundos.' },
    { icon: <QrCode2 sx={{ fontSize: 48, color: '#FE8300' }} />, title: 'Credenciales con QR', description: 'Genera automáticamente tickets personalizados con código QR único para cada participante.' },
    { icon: <PhoneAndroid sx={{ fontSize: 48, color: '#FE8300' }} />, title: 'App Móvil de Control', description: 'Escanea los códigos QR al ingreso del evento y registra la asistencia en tiempo real.' },
    { icon: <CloudDownload sx={{ fontSize: 48, color: '#FE8300' }} />, title: 'Exportación a Excel', description: 'Descarga todos los datos de participantes y asistentes en formato Excel para tus reportes.' },
    { icon: <Speed sx={{ fontSize: 48, color: '#FE8300' }} />, title: 'Gestión Rápida', description: 'Administra múltiples eventos simultáneamente con una interfaz ágil y eficiente.' },
    { icon: <Security sx={{ fontSize: 48, color: '#FE8300' }} />, title: 'Control de Acceso', description: 'Evita duplicados y controla el ingreso de participantes con verificación por QR.' }
  ];

  const steps = [
    { number: '1', title: 'Crea tu Evento', description: 'Solicita la creación del evento con banner personalizado y formulario de registro' },
    { number: '2', title: 'Participantes se Inscriben', description: 'Los usuarios completan el formulario y descargan su ticket con QR' },
    { number: '3', title: 'Control de Ingreso', description: 'Escanea los QR con la app móvil al momento del evento' },
    { number: '4', title: 'Obtén tus Reportes', description: 'Descarga los datos de asistencia en Excel para análisis' }
  ];

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #E3F2FD 0%, #FFFFFF 100%)', py: 6 }}>
      <Container maxWidth="lg">
        {/* HERO SECTION */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Box
            component="img"
            src={inscriptioBanner}
            alt="Inscriptio Banner"
            sx={{
              maxWidth: { xs: '90%', sm: '70%', md: '50%' },
              height: 'auto',
              mb: 4,
              filter: 'drop-shadow(0px 4px 8px rgba(0,0,0,0.1))'
            }}
          />
          <Typography variant="h3" sx={{ fontWeight: 700, color: '#1976D2', mb: 2, fontSize: { xs: '1.8rem', md: '2.5rem' } }}>
            La solución completa para gestionar tus eventos
          </Typography>
          <Typography variant="h6" sx={{ color: '#546E7A', maxWidth: 800, mx: 'auto', lineHeight: 1.6 }}>
            Inscriptio digitaliza el proceso completo: desde el registro hasta el control de asistencia,
            todo en una plataforma integrada.
          </Typography>
        </Box>

        {/* FEATURES SECTION */}
        <Grid container spacing={3} justifyContent="center" sx={{ mb: 8 }}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Card
                sx={{
                  width: '100%',
                  maxWidth: 360,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 24px rgba(0,0,0,0.15)'
                  }
                }}
              >
                <CardContent
                  sx={{
                    textAlign: 'center',
                    p: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    flexGrow: 1
                  }}
                >
                  <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: '#1976D2', mb: 2 }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#03355A', lineHeight: 1.6 }}>
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* HOW IT WORKS SECTION */}
        <Box
          sx={{
            p: { xs: 4, sm: 6 },
            borderRadius: 3,
            background: 'linear-gradient(135deg, #1976D2 0%, #2196F3 100%)',
            color: 'white',
            mb: 8
          }}
        >
          <Typography variant="h4" sx={{ textAlign: 'center', fontWeight: 700, mb: 6 }}>
            ¿Cómo Funciona?
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {steps.map((step, index) => (
              <Grid item xs={12} sm={6} md={3} key={index} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Box sx={{ textAlign: 'center', maxWidth: 280 }}>
                  <Box
                    sx={{
                      width: 64,
                      height: 64,
                      borderRadius: '50%',
                      background: 'rgba(255,255,255,0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 16px',
                      border: '3px solid white',
                      fontSize: 28,
                      fontWeight: 700
                    }}
                  >
                    {step.number}
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    {step.title}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.95, lineHeight: 1.5 }}>
                    {step.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* BENEFITS SECTION */}
        <Box
          sx={{
            p: { xs: 4, sm: 6 },
            borderRadius: 3,
            textAlign: 'center',
            background: 'linear-gradient(135deg, #FFF3E0 0%, #FFFFFF 100%)'
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#FE8300', mb: 4 }}>
            ¿Por qué elegir Inscriptio?
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {[
              { title: 'Sin Complicaciones', text: 'Olvídate de planillas manuales y listas en papel. Todo es digital y automático.' },
              { title: 'Ahorra Tiempo', text: 'El registro y control de asistencia toma segundos, no minutos ni horas.' },
              { title: 'Datos Precisos', text: 'Información exacta de quiénes se inscribieron y quiénes asistieron realmente.' }
            ].map((benefit, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Typography variant="h6" sx={{ fontWeight: 600, color: '#1976D2', mb: 2 }}>
                  {benefit.title}
                </Typography>
                <Typography variant="body2" sx={{ color: '#546E7A', lineHeight: 1.6 }}>
                  {benefit.text}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}

export default Start;