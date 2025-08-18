const express = require('express')
const nodemailer = require('nodemailer')
const cors = require('cors')

const app = express()

// Настройка CORS
app.use(cors({
    origin: 'http://localhost:5173', // Разрешаем запросы с Vite dev server
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))

app.use(express.json())

// Gmail SMTP transporter
const transporter = nodemailer.createTransporter({
    service: 'gmail',
    auth: {
        user: 'your-email@gmail.com', // Ваш Gmail
        pass: 'your-app-password'     // App Password из Gmail
    }
})

// Email endpoint
app.post('/api/email/order', async (req, res) => {
    try {
        const { name, email, location, business, requirements, contentType } = req.body

        const mailOptions = {
            from: 'your-email@gmail.com',
            to: 'tagsmith.web@gmail.com',
            subject: 'New Website Development Request',
            text: `
New Website Development Request

Name: ${name}
Email: ${email}
Location: ${location}
Business: ${business}
Requirements: ${requirements}
Content Type: ${contentType}
Date: ${new Date().toLocaleString()}
            `.trim()
        }

        await transporter.sendMail(mailOptions)
        res.json({ success: true })
    } catch (error) {
        console.error('Email error:', error)
        res.status(500).json({ error: 'Failed to send email' })
    }
})

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'OK' })
})

app.listen(3001, () => {
    console.log('Server running on port 3001')
})
