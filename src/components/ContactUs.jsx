import { useEffect } from 'react';
import inscriptioBanner from '/InscriptioBanner.svg';
import { Box, Typography, Card, CardContent, Container, Grid, Button } from '@mui/material';
import { Email, WhatsApp, Phone, Schedule, CheckCircle, TrendingUp } from '@mui/icons-material';

function ContactUs({ setSubtitle }) {
  useEffect(() => {
    setSubtitle('');
  }, [setSubtitle]);

  const contactMethods = [
    {
      icon: <Email sx={{ fontSize: 48, color: '#FF9800' }} />,
      title: 'Correo Electrónico',
      value: 'jostinleon18@gmail.com',
      link: 'mailto:jostinleon18@gmail.com',
      description: 'Escríbenos y te responderemos en menos de 24 horas'
    },
    {
      icon: <WhatsApp sx={{ fontSize: 48, color: '#25D366' }} />,
      title: 'WhatsApp',
      value: '+593 98 272 7043',
      link: 'https://wa.me/593982727043',
      description: 'Chatea con nosotros directamente'
    },
    {
      icon: <Phone sx={{ fontSize: 48, color: '#1976D2' }} />,
      title: 'Teléfono',
      value: '+593 98 272 7043',
      link: 'tel:+593982727043',
      description: 'Llámanos de Lun-Vie, 8:00 AM - 5:00 PM'
    }
  ];

  const services = [
    {
      icon: <CheckCircle sx={{ fontSize: 40, color: '#4CAF50' }} />,
      title: 'Configuración Personalizada',
      description: 'Diseñamos tu página de evento con tu branding, colores y logo'
    },
    {
      icon: <Schedule sx={{ fontSize: 40, color: '#4CAF50' }} />,
      title: 'Listo en 48 horas',
      description: 'Tu página de registro estará activa en menos de 2 días'
    },
    {
      icon: <TrendingUp sx={{ fontSize: 40, color: '#4CAF50' }} />,
      title: 'Soporte Incluido',
      description: 'Te acompañamos durante todo el proceso hasta el día del evento'
    }
  ];

  const pricingPlans = [
    {
      name: 'Evento Único',
      price: '$49',
      features: [
        'Hasta 200 participantes',
        'Página de registro personalizada',
        'Credenciales con QR',
        'App móvil de control',
        'Exportación a Excel',
        'Soporte durante 1 mes'
      ],
      color: '#1976D2'
    },
    {
      name: 'Plan Semestral',
      price: '$199',
      features: [
        'Hasta 5 eventos',
        'Hasta 500 participantes por evento',
        'Todo lo del plan Evento Único',
        'Análisis y estadísticas',
        'Soporte prioritario',
        'Válido por 6 meses'
      ],
      color: '#FF9800',
      featured: true
    },
    {
      name: 'Plan Anual',
      price: '$349',
      features: [
        'Eventos ilimitados',
        'Participantes ilimitados',
        'Todo lo del plan Semestral',
        'Personalización avanzada',
        'Capacitación incluida',
        'Válido por 12 meses'
      ],
      color: '#1976D2'
    }
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #E3F2FD 0%, #FFFFFF 100%)',
        py: { xs: 4, md: 6 }
      }}
    >
      <Container maxWidth="lg">
        {/* Hero Section */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Box
            component="img"
            src={inscriptioBanner}
            alt="Inscriptio Logo"
            sx={{
              width: { xs: '80%', sm: '60%', md: '40%' },
              height: 'auto',
              mb: 3,
              filter: 'drop-shadow(0px 4px 8px rgba(0,0,0,0.1))'
            }}
          />
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              color: '#1976D2',
              mb: 2,
              fontSize: { xs: '2rem', md: '2.8rem' }
            }}
          >
            ¿Listo para digitalizar tu evento?
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: '#546E7A',
              maxWidth: 700,
              mx: 'auto',
              lineHeight: 1.6,
              mb: 4,
              fontSize: { xs: '1rem', md: '1.2rem' }
            }}
          >
            Contáctanos y en menos de 72 horas tendrás tu página de registro lista para recibir participantes
          </Typography>
        </Box>

        {/* Contact Methods */}
        <Grid container spacing={3} justifyContent="center" sx={{ mb: 8 }}>
          {contactMethods.map((method, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 24px rgba(0,0,0,0.15)'
                  }
                }}
              >
                <CardContent sx={{ textAlign: 'center', p: 4 }}>
                  <Box sx={{ mb: 2 }}>{method.icon}</Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: '#1976D2', mb: 1 }}>
                    {method.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#546E7A',
                      mb: 2,
                      minHeight: 40,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {method.description}
                  </Typography>
                  <Button
                    variant="contained"
                    href={method.link}
                    sx={{
                      mt: 2,
                      bgcolor: method.icon.props.sx.color,
                      '&:hover': {
                        bgcolor: method.icon.props.sx.color,
                        filter: 'brightness(0.9)'
                      }
                    }}
                  >
                    {method.value}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* What We Offer */}
        <Box
          sx={{
            p: 6,
            borderRadius: 3,
            background: 'linear-gradient(135deg, #FFF3E0 0%, #FFFFFF 100%)',
            mb: 8
          }}
        >
          <Typography
            variant="h4"
            sx={{
              textAlign: 'center',
              fontWeight: 700,
              color: '#FF9800',
              mb: 5
            }}
          >
            ¿Qué incluye nuestro servicio?
          </Typography>

          <Grid container spacing={4} justifyContent="center">
            {services.map((service, index) => (
              <Grid item xs={12} sm={6} md={6} lg={4} key={index}>
                <Box sx={{ textAlign: 'center', height: '100%' }}>
                  <Box sx={{ mb: 2 }}>{service.icon}</Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: '#1976D2', mb: 1 }}>
                    {service.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#546E7A', lineHeight: 1.6 }}>
                    {service.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Pricing Plans */}
        {/*
        <Box sx={{ mb: 8 }}>
          <Typography
            variant="h4"
            sx={{
              textAlign: 'center',
              fontWeight: 700,
              color: '#1976D2',
              mb: 5
            }}
          >
            Planes y Precios
          </Typography>

          <Grid container spacing={3} alignItems="stretch" justifyContent="center">
            {pricingPlans.map((plan, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    border: plan.featured ? '3px solid #FF9800' : 'none',
                    transform: plan.featured ? 'scale(1.05)' : 'scale(1)',
                    transition: 'transform 0.3s',
                    '&:hover': {
                      transform: plan.featured ? 'scale(1.08)' : 'scale(1.03)'
                    }
                  }}
                >
                  {plan.featured && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: -15,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        bgcolor: '#FF9800',
                        color: 'white',
                        px: 3,
                        py: 0.5,
                        borderRadius: 2,
                        fontWeight: 600,
                        fontSize: '14px'
                      }}
                    >
                      MÁS POPULAR
                    </Box>
                  )}
                  <CardContent
                    sx={{
                      p: 4,
                      flexGrow: 1,
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 700,
                        color: plan.color,
                        textAlign: 'center',
                        mb: 2
                      }}
                    >
                      {plan.name}
                    </Typography>
                    <Typography
                      variant="h3"
                      sx={{
                        fontWeight: 700,
                        color: '#1976D2',
                        textAlign: 'center',
                        mb: 3
                      }}
                    >
                      {plan.price}
                    </Typography>
                    <Box sx={{ flexGrow: 1 }}>
                      {plan.features.map((feature, idx) => (
                        <Box key={idx} sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                          <CheckCircle sx={{ color: '#4CAF50', mr: 1, fontSize: 20 }} />
                          <Typography variant="body2" sx={{ color: '#546E7A' }}>
                            {feature}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                    <Button
                      variant="contained"
                      fullWidth
                      sx={{
                        mt: 3,
                        py: 1.5,
                        bgcolor: plan.color,
                        fontWeight: 600,
                        '&:hover': {
                          bgcolor: plan.color,
                          filter: 'brightness(0.9)'
                        }
                      }}
                      href="https://wa.me/593991234567"
                    >
                      Contratar Ahora
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
        */}

        {/* CTA Section */}
        <Box
          sx={{
            p: 6,
            borderRadius: 3,
            background: 'linear-gradient(135deg, #1976D2 0%, #2196F3 100%)',
            color: 'white',
            textAlign: 'center'
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
            ¿Tienes dudas o necesitas un plan personalizado?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.95 }}>
            Contáctanos y diseñaremos la solución perfecta para tu evento
          </Typography>
          <Button
            variant="contained"
            size="large"
            href="mailto:contacto@inscriptio.com"
            sx={{
              bgcolor: '#FF9800',
              color: 'white',
              px: 5,
              py: 2,
              fontSize: '18px',
              fontWeight: 600,
              '&:hover': {
                bgcolor: '#F57C00'
              }
            }}
          >
            Escríbenos Ahora
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default ContactUs;
