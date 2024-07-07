import express from 'express';
import nodemailer from 'nodemailer';
import mysql from 'mysql2/promise';
import cron from 'node-cron';
import cors from 'cors';

const app = express();
const port = 8081;

const connection = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'percient'
});

app.use(express.json());
app.use(cors());

app.get('/api/portpair', async (req, res) => {
  try {
    const [rows] = await connection.execute('SELECT * FROM portpair');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/sendEmail', async (req, res) => {
  try {
    const [rows] = await connection.execute('SELECT * FROM portpair');

    let tableContent = `
      <p>Dear recipient,</p>
      <p>Please find the port pair data below:</p>
      <style>
        table {
          width: 100%;
          border-collapse: collapse;
        }
        th, td {
          padding: 12px;
          border: 1px solid #ddd;
          text-align: left;
        }
        th {
          background-color: #4CAF50;
          color: white;
        }
        tr:nth-child(even) {
          background-color: #f2f2f2;
        }
        tr:hover {
          background-color: #ddd;
        }
      </style>
      <table>
        <thead>
          <tr>
            <th>Country</th>
            <th>Location</th>
            <th>Port Code</th>
          </tr>
        </thead>
        <tbody>`;

    rows.forEach(portpair => {
      tableContent += `
        <tr>
          <td>${portpair.country}</td>
          <td>${portpair.location}</td>
          <td>${portpair.portcode}</td>
        </tr>`;
    });

    tableContent += `</tbody></table>
      <p>For more information, <a href="http://www.testdata.com" target="_blank">click here to visit</a>.</p>
      <p>Best regards,</p>
      <p>Your Company Name</p>`;

    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'naveenkonda.dev@gmail.com',
        pass: 'zfhd ezpu jvss mvdi'
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    let mailOptions = {
      from: 'naveenkonda.dev@gmail.com',
      to: 'naveen.konda@percient.com',
      subject: 'Port Pair Data',
      html: `<h4>PortPair Data:</h4>${tableContent}`
    };

    let info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.response);

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const sendEmailDaily = async () => {
  try {
    const [rows] = await connection.execute('SELECT * FROM portpair');

    let tableContent = `
      <p>Dear recipient,</p>
      <p>Please find the daily port pair data below:</p>
      <style>
        table {
          width: 100%;
          border-collapse: collapse;
        }
        th, td {
          padding: 12px;
          border: 1px solid #ddd;
          text-align: left;
        }
        th {
          background-color: #4CAF50;
          color: white;
        }
        tr:nth-child(even) {
          background-color: #f2f2f2;
        }
        tr:hover {
          background-color: #ddd;
        }
      </style>
      <table>
        <thead>
          <tr>
            <th>Country</th>
            <th>Location</th>
            <th>Port Code</th>
          </tr>
        </thead>
        <tbody>`;

    rows.forEach(portpair => {
      tableContent += `
        <tr>
          <td>${portpair.country}</td>
          <td>${portpair.location}</td>
          <td>${portpair.portcode}</td>
        </tr>`;
    });

    tableContent += `</tbody></table>
      <p>For more information, <a href="http://www.testdata.com" target="_blank">click here to visit</a>.</p>
      <p>Best regards,</p>
      <p>Your Company Name</p>`;

    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'naveenkonda.dev@gmail.com',
        pass: 'zfhd ezpu jvss mvdi'
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    let mailOptions = {
      from: 'naveenkonda.dev@gmail.com',
      to: 'naveen.konda@percient.com',
      subject: 'Port Pair Data (Daily)',
      html: `<p>Here is the daily port pair data:</p>${tableContent}`
    };

    let info = await transporter.sendMail(mailOptions);
    console.log('Daily email sent successfully:', info.response);
  } catch (error) {
    console.error('Error sending daily email:', error);
  }
};

cron.schedule('41 22 * * *', () => {
  console.log('Running cron job at 6:00 PM');
  sendEmailDaily();
});

app.post('/api/sendDailyEmail', async (req, res) => {
  try {
    await sendEmailDaily();
    res.status(200).json({ message: 'Daily email sent successfully' });
  } catch (error) {
    console.error('Error sending daily email:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://127.0.0.1:${port}`);
});
