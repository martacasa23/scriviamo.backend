import express from 'express';
import multer from 'multer';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const express = require('express');
const port = 5000;

app.use(express.json()); // Middleware per parsare JSON

// Endpoint per caricare la storia
app.post('/upload-story', (req, res) => {
  const { title, content } = req.body;
  // Logica per salvare la storia
  console.log('Storia ricevuta:', title, content);
  res.status(200).send({ message: 'Storia caricata con successo!' });
});

// Avvio del server
app.listen(port, () => {
  console.log(`Server in ascolto su http://localhost:${port}`);
});

app.use(cors({
  origin: ['https://scriviamo.org', 'http://localhost:3000'],
}));

// Usa il middleware per parsare il body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configura Multer per gestire l'upload del file
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });

// Endpoint per ricevere la storia
app.post('/upload-story', upload.single('file'), (req, res) => {
  try {
    const { title, author, plot } = req.body;
    const file = req.file; // Ottieni il file caricato
    if (!file) {
      return res.status(400).json({ success: false, message: 'File non caricato' });
    }

    // Verifica se tutti i campi necessari sono presenti
    if (!title || !author || !plot) {
      return res.status(400).json({ success: false, message: 'Titolo, autore o trama mancanti' });
    }

    console.log({ title, author, plot, file });

    res.json({ success: true, message: 'Storia inviata con successo!' });
  } catch (error) {
    console.error('Errore durante l\'upload:', error);
    res.status(500).json({ success: false, message: 'Errore durante l\'upload', error });
  }
});

app.listen(5000, '0.0.0.0', () => {
  console.log('Server in ascolto sulla porta 5000');
});
