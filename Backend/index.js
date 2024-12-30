const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');
const cors = require('cors');

require('dotenv').config();

// Twilio credentials
const accountSid = process.env.accountSid;
const authToken = process.env.authToken;
const twilioPhoneNumber = process.env.twilioPhoneNumber;

const client = twilio(accountSid, authToken);

const app = express();
app.use(bodyParser.json());

// Use the CORS middleware
app.use(cors());

app.get("/", (req, res)=>{
    res.send("Hello World!");
});

app.post('/send-sms', (req, res) => {
  const { phoneNumber, message } = req.body;

  client.messages
    .create({
      body: message,
      from: twilioPhoneNumber,
      to: phoneNumber,
    })
    .then((message) => {
      res.json({ success: true, message: 'SMS sent successfully!' });
    })
    .catch((err) => {
      console.error(err);
      res.json({ success: false, message: 'Failed to send SMS.' });
    });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
