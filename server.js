const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post('/ask', async (req, res) => {
  const { prompt } = req.body;
  try {
    const chat = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    });
    res.json({ response: chat.choices[0].message.content });
  } catch (err) {
    res.status(500).json({ error: 'Erreur IA' });
  }
});

app.listen(3000, () => console.log('Serveur lancé sur le port 3000'));
