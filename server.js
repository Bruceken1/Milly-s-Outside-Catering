const express = require('express');
const cors = require('cors');
const { Resend } = require('resend');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

const resend = new Resend(process.env.RESEND_API_KEY);

app.post('/api/quote', async (req, res) => {
  console.log('📨 New quote request received:', req.body);

  try {
    const { name, email, phone, event_type, event_date, guests, message } = req.body;

    const result = await resend.emails.send({
      from: "Milly's Outside Catering <quotes@millysoutsidecatering.co.ke>",
      to: [
        'millyoutsidecatering@gmail.com',     
        'kovact476@gmail.com',
        'director@millysoutsidecatering.co.ke',
        'ken.kaibe@millysoutsidecatering.co.ke',
        'milly.okina@millysoutsidecatering.co.ke',
        
      ],
      replyTo: email,
      subject: `New Quote Request - ${name}`,
      html: `
        <h2 style="color:#d4af37;">New Quote Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Event Type:</strong> ${event_type}</p>
        <p><strong>Date:</strong> ${event_date}</p>
        <p><strong>Guests:</strong> ${guests}</p>
        <p><strong>Message:</strong><br>${message ? message.replace(/\n/g, '<br>') : ''}</p>
        <hr>
        <p style="color:#666; font-size:12px;">Sent via Milly's Outside Catering website</p>
      `
    });

    console.log('✅ Resend success:', result);
    res.json({ success: true });

  } catch (error) {
    console.error('❌ Resend ERROR:', error);
    res.status(500).json({ success: false });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`✅ Server running on port ${port}`));
