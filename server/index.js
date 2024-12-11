import express from 'express';
import multer from 'multer';
import cors from 'cors';  // Aggiungi cors

const app = express();

app.use(cors({
  origin: 'https://scriviamo.org'
}));

// Configura Multer per gestire l'upload del file
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Imposta la cartella di destinazione per il file
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Usa il nome originale del file
  }
});
const upload = multer({ storage: storage });

// Endpoint per ricevere la storia
app.post('/upload-story', upload.single('file'), (req, res) => {
  try{
  const { title, author, plot } = req.body;
  const file = req.file; // Ottieni il file caricato
  if (!file) {
    return res.status(400).json({ success: false, message: 'File non caricato' });
  }


  // Qui puoi salvare i dati nel tuo database, ad esempio MongoDB o PostgreSQL
  console.log({ title, author, plot, file });

  res.json({ success: true, message: 'Storia inviata con successo!' });
}catch (error) {
  console.error('Errore durante l\'upload:', error);
  res.status(500).json({ success: false, message: 'Errore durante l\'upload', error });
}
});
app.listen(5000, '0.0.0.0', () => {
  console.log('Server in ascolto sulla porta 5000');
});

