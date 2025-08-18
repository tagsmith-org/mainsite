import express from 'express'
import nodemailer from 'nodemailer'
import cors from 'cors'

const app = express()

// Более широкие CORS настройки
app.use(cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
    credentials: false, // Изменили на false
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    preflightContinue: false,
    optionsSuccessStatus: 204
}))

// Дополнительные CORS заголовки
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173')
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept')
    res.header('Access-Control-Allow-Credentials', 'false')
    
    if (req.method === 'OPTIONS') {
        res.sendStatus(200)
    } else {
        next()
    }
})

app.use(express.json())

// Gmail SMTP transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'serg.kostyuk@gmail.com',
        pass: 'hqfc smar mbja gpku'
    }
})

// Email endpoint
app.post('/api/email/order', async (req, res) => {
    try {
        console.log('=== EMAIL REQUEST START ===')
        console.log('Request body:', JSON.stringify(req.body, null, 2))
        
        const { name, email, location, business, requirements, contentType } = req.body

        console.log('Extracted data:', { name, email, location, business, requirements, contentType })

        const mailOptions = {
            from: 'serg.kostyuk@gmail.com',
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

        console.log('Mail options:', mailOptions)
        console.log('Attempting to send email...')

        const result = await transporter.sendMail(mailOptions)
        console.log('Email sent successfully:', result)
        console.log('=== EMAIL REQUEST END ===')
        
        res.json({ success: true, message: 'Email sent successfully' })
    } catch (error) {
        console.error('=== EMAIL ERROR ===')
        console.error('Error type:', error.constructor.name)
        console.error('Error message:', error.message)
        console.error('Error stack:', error.stack)
        console.error('Full error object:', JSON.stringify(error, null, 2))
        console.error('=== EMAIL ERROR END ===')
        
        res.status(500).json({ 
            error: 'Failed to send email',
            message: error.message,
            type: error.constructor.name
        })
    }
})

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() })
})

app.listen(3002, () => {
    console.log('Server running on port 3000')
    console.log('Health check: http://localhost:3000/health')
})
