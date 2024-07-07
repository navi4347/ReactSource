import { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableHead, TableRow, Box, Typography, Divider, Button } from '@mui/material';

function Outlook() {
  const [portpairs, setPortpairs] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/portpair');
      console.log('Data fetched:', response.data); // Log data to ensure it's fetched
      setPortpairs(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSendEmail = async () => {
    try {
      const response = await axios.post('http://localhost:8081/api/sendEmail');
      console.log('Email sent successfully:', response.data);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Portpair
      </Typography>
      <Divider sx={{ marginBottom: 2 }} />
      <Button variant="contained" onClick={handleSendEmail} sx={{ marginBottom: 2 }}>
        Send
      </Button>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: 'black' }}>
            <TableCell sx={{ color: 'white' }}>Country</TableCell>
            <TableCell sx={{ color: 'white' }}>Location</TableCell>
            <TableCell sx={{ color: 'white' }}>Port Code</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {portpairs.map(portpair => (
            <TableRow key={portpair.portcode}>
              <TableCell>{portpair.country}</TableCell>
              <TableCell>{portpair.location}</TableCell>
              <TableCell>{portpair.portcode}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}

export default Outlook;
