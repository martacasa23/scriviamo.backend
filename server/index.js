import express from 'express';
import multer from 'multer';
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet'; // Importa helmet

const app = express();  // Inizializza l'app

const PORT = process.env.PORT || 5000;  // Imposta la porta

// Usa Helmet per aumentare la sicurezza
app.use(helmet({
  noCache: true, // Disabilita le intestazioni di cache
  contentSecurityPolicy: false, // Disabilita la CSP
}));

// Middleware per analizzare il corpo delle richieste
app.use(express.json()); // Middleware per analizzare JSON
app.use(cors({
  origin: ['https://scriviamo.org', 'http://localhost:3000'], // Permetti CORS
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configura Multer per gestire l'upload del file
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Cartella di destinazione per i file
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Usa il nome originale del file
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

    // Verifica che tutti i campi necessari siano presenti
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

app.get('/api', (req, res) => {
  res.send('Endpoint API');
});

// Avvia il server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend server running on port ${PORT}`);
});
