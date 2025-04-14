const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
app.use(cors());
app.use(express.json());

const GOOGLE_WEBHOOK = "https://script.google.com/macros/s/YOUR_WEBHOOK_ID/exec"; // вставь свой URL сюда

app.post("/send", async (req, res) => {
  try {
    const { phone, source } = req.body;
    const response = await fetch(GOOGLE_WEBHOOK, {
      method: "POST",
      body: JSON.stringify({ phone, source }),
      headers: { "Content-Type": "application/json" }
    });

    const text = await response.text();
    res.status(200).send({ status: "ok", result: text });
  } catch (err) {
    console.error("Ошибка:", err);
    res.status(500).send({ error: "Ошибка при отправке" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Сервер слушает порт ${PORT}`));

const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;

// Разрешаем CORS
app.use(cors());
app.use(express.json());

app.post('/', async (req, res) => {
  try {
    const data = req.body;

    const response = await fetch('https://script.google.com/macros/s/https://script.google.com/macros/s/AKfycbwGo7Hrx80jLm8QUxW5SR7_Q1_FclqNLhQyDIsnPSTKuUbfuptj4ZDGewS060RrEVn8/exec', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    res.json(result);
  } catch (error) {
    console.error('Error forwarding to Google Sheets:', error);
    res.status(500).json({ status: 'error', message: error.message });
  }
});

app.get('/', (req, res) => {
  res.send('Rambox → Google Sheets middleware is working!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
