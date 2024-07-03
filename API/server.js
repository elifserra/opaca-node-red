const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Body-parser middleware'i kullan
app.use(cors());    
app.use(bodyParser.json());

// Basit bir in-memory veri deposu
let variables = {};

// GET endpoint: Değişkenin değerini döner
app.get('/variable/:name', (req, res) => {
    const varName = req.params.name;
    if (variables.hasOwnProperty(varName)) {
        res.json({ value: variables[varName] });
    } else {
        res.status(404).json({ error: 'Variable not found' });
    }
});

// POST endpoint: Değişkenin değerini günceller
app.post('/variable/:name', (req, res) => {
    const varName = req.params.name;
    const value = req.body.value;

    if (value === undefined) {
        res.status(400).json({ error: 'Value is required' });
        return;
    }

    variables[varName] = value;
    res.json({ message: 'Variable updated', variable: { name: varName, value: value } });
});

// Sunucuyu başlat
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
