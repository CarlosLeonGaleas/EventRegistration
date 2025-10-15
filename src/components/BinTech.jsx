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
  Radio 
} from '@mui/material';

function BinTech({ setSubtitle }) {
  useEffect(() => {
    setSubtitle('BINTECH 2025');
  }, [setSubtitle]);

  const [formData, setFormData] = useState({
    cedula: '',
    nombres: '',
    telefono: '',
    correo: '',
    tipoParticipacion: 'publico'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos del formulario:', formData);
  };

  return (
    <Box sx={{ p: 4, display: 'flex', justifyContent: 'center' }}>
      <Paper sx={{ p: 4, maxWidth: 600, width: '100%' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Registro de Participante
        </Typography>
        
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Cédula"
            name="cedula"
            value={formData.cedula}
            onChange={handleChange}
            margin="normal"
            required
          />
          
          <TextField
            fullWidth
            label="Nombres Completos"
            name="nombres"
            value={formData.nombres}
            onChange={handleChange}
            margin="normal"
            required
          />
          
          <TextField
            fullWidth
            label="Teléfono"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            margin="normal"
            required
          />
          
          <TextField
            fullWidth
            label="Correo Electrónico"
            name="correo"
            type="email"
            value={formData.correo}
            onChange={handleChange}
            margin="normal"
            required
          />
          
          <FormControl component="fieldset" margin="normal">
            <FormLabel component="legend">Tipo de Participación</FormLabel>
            <RadioGroup
              name="tipoParticipacion"
              value={formData.tipoParticipacion}
              onChange={handleChange}
            >
              <FormControlLabel 
                value="publico" 
                control={<Radio />} 
                label="Público externo" 
              />
              <FormControlLabel 
                value="estudiante" 
                control={<Radio />} 
                label="Estudiante" 
              />
              <FormControlLabel 
                value="docente" 
                control={<Radio />} 
                label="Docente" 
              />
            </RadioGroup>
          </FormControl>
          
          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            sx={{ mt: 3 }}
            fullWidth
          >
            Registrar
          </Button>
        </form>
      </Paper>
    </Box>
  );
}

export default BinTech;