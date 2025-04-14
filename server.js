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

const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); // Разрешаем все домены для CORS
app.use(express.json()); // Для работы с JSON

app.post('/', (req, res) => {
  console.log(req.body); // Проверка данных, отправленных с Rambox

  // Пример: просто логируем данные
  res.status(200).json({ message: "Data received" });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

