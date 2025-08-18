import express from 'express'
import cors from 'cors'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://websmith-shop.com',
    'https://admin.websmith-shop.com',
    'https://cabinet.websmith-shop.com'
  ],
  credentials: true
}))

app.use(express.json())

// Gmail SMTP transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'serg.kostyuk@gmail.com',
    pass: 'hqfc smar mbja gpku'
  }
})

// Contact form endpoint
app.post('/api/email/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body

    console.log('Contact form submission:', { name, email, subject, message })

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        error: 'Missing required fields',
        required: ['name', 'email', 'subject', 'message']
      })
    }

    // Create email content
    const emailContent = `
New Contact Form Submission

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

Date: ${new Date().toLocaleString()}
    `.trim()

    // Send email
    const mailOptions = {
      from: 'serg.kostyuk@gmail.com',
      to: 'tagsmith.web@gmail.com',
      subject: `Contact Form: ${subject}`,
      text: emailContent
    }

    const result = await transporter.sendMail(mailOptions)
    console.log('Email sent successfully:', result.messageId)

    res.json({
      success: true,
      message: 'Contact form submitted successfully',
      messageId: result.messageId
    })

  } catch (error) {
    console.error('Contact form error:', error)
    res.status(500).json({
      error: 'Failed to send contact form',
      message: error.message
    })
  }
})

// Project order endpoint
app.post('/api/email/order', async (req, res) => {
  try {
    const { customerName, customerEmail, customerPhone, projectType, budgetRange, timeline, requirements } = req.body

    console.log('Project order submission:', { customerName, customerEmail, customerPhone, projectType, budgetRange, timeline, requirements })

    // Validate required fields
    if (!customerName || !customerEmail || !projectType || !budgetRange || !timeline || !requirements) {
      return res.status(400).json({
        error: 'Missing required fields',
        required: ['customerName', 'customerEmail', 'projectType', 'budgetRange', 'timeline', 'requirements']
      })
    }

    // Create email content
    const emailContent = `
New Project Order

Customer Information:
Name: ${customerName}
Email: ${customerEmail}
Phone: ${customerPhone || 'Not provided'}

Project Details:
Type: ${projectType}
Budget Range: ${budgetRange}
Timeline: ${timeline}

Requirements:
${requirements}

Date: ${new Date().toLocaleString()}
    `.trim()

    // Send email
    const mailOptions = {
      from: 'serg.kostyuk@gmail.com',
      to: 'tagsmith.web@gmail.com',
      subject: `New Project Order: ${projectType}`,
      text: emailContent
    }

    const result = await transporter.sendMail(mailOptions)
    console.log('Project order email sent successfully:', result.messageId)

    res.json({
      message: 'Order request submitted successfully'
    })

  } catch (error) {
    console.error('Project order error:', error)
    res.status(500).json({
      error: 'Failed to submit project order',
      message: error.message
    })
  }
})

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  })
})

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  console.log(`Health check: http://localhost:${PORT}/health`)
  console.log(`Contact endpoint: http://localhost:${PORT}/api/email/contact`)
  console.log(`Order endpoint: http://localhost:${PORT}/api/email/order`)
})
