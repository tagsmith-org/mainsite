// Полноценный сервер управления проектами с SQLite
// Запуск: node server-sqlite.js

const express = require('express')
const cors = require('cors')
const Database = require('better-sqlite3')
const nodemailer = require('nodemailer')
const path = require('path')
const fs = require('fs')

// Load environment variables from server.env
function loadEnvFile() {
    try {
        const envContent = fs.readFileSync('server.env', 'utf8')
        const lines = envContent.split('\n')
        
        lines.forEach(line => {
            if (line && !line.startsWith('#')) {
                const [key, value] = line.split('=')
                if (key && value) {
                    process.env[key.trim()] = value.trim()
                }
            }
        })
        
        console.log('✅ Environment variables loaded from server.env')
    } catch (error) {
        console.log('⚠️ server.env not found, using default values')
    }
}

loadEnvFile()

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors())
app.use(express.json())

// Initialize SQLite database
const db = new Database('projects.db')

// Email configuration
const emailConfig = {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: process.env.SMTP_PORT || 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER || 'your-email@gmail.com',
        pass: process.env.SMTP_PASS || 'your-app-password'
    }
}

// Create email transporter
const transporter = nodemailer.createTransport(emailConfig)

// Database schema
db.exec(`
    CREATE TABLE IF NOT EXISTS orders (
        id TEXT PRIMARY KEY,
        projectId TEXT UNIQUE,
        contact TEXT,
        clientName TEXT,
        clientEmail TEXT,
        description TEXT,
        siteType TEXT,
        pages TEXT,
        design TEXT,
        features TEXT,
        integrations TEXT,
        content TEXT,
        deadline TEXT,
        cooperation TEXT,
        extra TEXT,
        originalPrice INTEGER,
        discountedPrice INTEGER,
        monthlyPrice INTEGER,
        discount INTEGER,
        isPromoActive BOOLEAN,
        timestamp TEXT,
        userAgent TEXT,
        status TEXT DEFAULT 'new'
    );
`)

// Add projectId column to existing orders table if it doesn't exist
try {
    db.prepare('SELECT projectId FROM orders LIMIT 1').get()
    console.log('✅ projectId column already exists')
} catch (error) {
    console.log('🔄 Adding projectId column to orders table...')
    db.exec('ALTER TABLE orders ADD COLUMN projectId TEXT')
    console.log('✅ projectId column added successfully')
}

db.exec(`
    CREATE TABLE IF NOT EXISTS projects (
        id TEXT PRIMARY KEY,
        orderId TEXT,
        name TEXT,
        description TEXT,
        progress INTEGER DEFAULT 0,
        startDate TEXT,
        endDate TEXT,
        status TEXT DEFAULT 'planning',
        FOREIGN KEY (orderId) REFERENCES orders (id)
    );

    CREATE TABLE IF NOT EXISTS tasks (
        id TEXT PRIMARY KEY,
        projectId TEXT,
        title TEXT,
        description TEXT,
        status TEXT DEFAULT 'pending',
        priority TEXT DEFAULT 'medium',
        assignedTo TEXT,
        dueDate TEXT,
        completedAt TEXT,
        FOREIGN KEY (projectId) REFERENCES projects (id)
    );

    CREATE TABLE IF NOT EXISTS comments (
        id TEXT PRIMARY KEY,
        projectId TEXT,
        author TEXT,
        content TEXT,
        timestamp TEXT,
        FOREIGN KEY (projectId) REFERENCES projects (id)
    );

    CREATE TABLE IF NOT EXISTS files (
        id TEXT PRIMARY KEY,
        projectId TEXT,
        filename TEXT,
        originalName TEXT,
        mimeType TEXT,
        size INTEGER,
        uploadDate TEXT,
        FOREIGN KEY (projectId) REFERENCES projects (id)
    );

    CREATE TABLE IF NOT EXISTS clients (
        id TEXT PRIMARY KEY,
        email TEXT UNIQUE,
        name TEXT,
        phone TEXT,
        firstOrderDate TEXT,
        totalOrders INTEGER DEFAULT 1,
        totalSpent INTEGER DEFAULT 0
    );
`)

// Helper function to generate unique ID
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

// Generate short project ID (e.g., PRJ-2024-001)
function generateProjectId() {
    const year = new Date().getFullYear()
    
    try {
        // Get count of orders for this year
        const result = db.prepare('SELECT COUNT(*) as count FROM orders WHERE timestamp LIKE ?').get(`${year}%`)
        const count = result ? result.count : 0
        
        // Format: PRJ-YYYY-XXX (e.g., PRJ-2024-001)
        const paddedCount = (count + 1).toString().padStart(3, '0')
        return `PRJ-${year}-${paddedCount}`
    } catch (error) {
        console.error('Error generating project ID:', error)
        // Fallback: use timestamp
        return `PRJ-${year}-${Date.now().toString().slice(-3)}`
    }
}

// Email template functions
function generateAdminEmail(orderData) {
    return {
        subject: `🎉 New Website Order ${orderData.projectId || orderData.id || 'NEW'}`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #f59e0b;">🎉 New Website Order Received!</h2>
                
                <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <h3 style="margin-top: 0;">📋 Order Details</h3>
                    <p><strong>Project ID:</strong> <span style="background: #f59e0b; color: white; padding: 2px 6px; border-radius: 4px; font-weight: bold;">${orderData.projectId || 'NEW'}</span></p>
                    <p><strong>Client:</strong> ${orderData.clientName || 'Not specified'}</p>
                    <p><strong>Email:</strong> ${orderData.clientEmail || orderData.contact}</p>
                    <p><strong>Site Type:</strong> ${orderData.siteType}</p>
                    <p><strong>Pages:</strong> ${orderData.pages}</p>
                    <p><strong>Design:</strong> ${orderData.design}</p>
                    <p><strong>Total Price:</strong> $${orderData.discountedPrice || orderData.originalPrice}</p>
                    ${orderData.isPromoActive ? `<p><strong>🎁 Promo Applied:</strong> ${orderData.discount}% discount</p>` : ''}
                </div>

                <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
                    <h4 style="margin-top: 0;">📝 Project Description</h4>
                    <p style="white-space: pre-wrap;">${orderData.description || 'No description provided'}</p>
                </div>

                <div style="background: #dbeafe; padding: 15px; border-radius: 8px; margin: 20px 0;">
                    <h4 style="margin-top: 0;">⚙️ Selected Features</h4>
                    <ul>
                        ${orderData.features?.map(f => `<li>${f}</li>`).join('') || '<li>No features selected</li>'}
                    </ul>
                    
                    <h4>🔗 Integrations</h4>
                    <ul>
                        ${orderData.integrations?.map(i => `<li>${i}</li>`).join('') || '<li>No integrations selected</li>'}
                    </ul>
                </div>

                <div style="background: #dcfce7; padding: 15px; border-radius: 8px; margin: 20px 0;">
                    <h4 style="margin-top: 0;">💰 Pricing Summary</h4>
                    <p><strong>Original Price:</strong> $${orderData.originalPrice}</p>
                    ${orderData.isPromoActive ? `<p><strong>Discounted Price:</strong> $${orderData.discountedPrice}</p>` : ''}
                    ${orderData.monthlyPrice > 0 ? `<p><strong>Monthly:</strong> $${orderData.monthlyPrice}/mo</p>` : ''}
                </div>

                <p style="color: #6b7280; font-size: 14px;">
                    Order received at: ${new Date().toLocaleString()}
                </p>
            </div>
        `
    }
}

function generateClientEmail(orderData) {
    return {
        subject: `🎉 Your Website Order Confirmation - ${orderData.projectId || 'NEW'}`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #f59e0b;">🎉 Thank You for Your Order!</h2>
                
                <p>Dear ${orderData.clientName || 'Valued Client'},</p>
                
                <p>We're excited to confirm that we've received your website order and are ready to bring your vision to life!</p>

                <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <h3 style="margin-top: 0;">📋 Your Order Summary</h3>
                    <p><strong>Project ID:</strong> <span style="background: #f59e0b; color: white; padding: 2px 6px; border-radius: 4px; font-weight: bold;">${orderData.projectId || 'NEW'}</span></p>
                    <p><strong>Site Type:</strong> ${orderData.siteType}</p>
                    <p><strong>Pages:</strong> ${orderData.pages}</p>
                    <p><strong>Design:</strong> ${orderData.design}</p>
                    <p><strong>Total Investment:</strong> $${orderData.discountedPrice || orderData.originalPrice}</p>
                    ${orderData.isPromoActive ? `<p><strong>🎁 Special Offer Applied:</strong> You saved $${orderData.originalPrice - orderData.discountedPrice}!</p>` : ''}
                </div>

                <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
                    <h4 style="margin-top: 0;">📝 Your Project</h4>
                    <p style="white-space: pre-wrap;">${orderData.description || 'No description provided'}</p>
                </div>

                <div style="background: #dbeafe; padding: 15px; border-radius: 8px; margin: 20px 0;">
                    <h4 style="margin-top: 0;">🚀 What's Next?</h4>
                    <ol>
                        <li><strong>Within 24-48 hours:</strong> We'll contact you to discuss your project in detail</li>
                        <li><strong>Planning phase:</strong> We'll create a detailed project plan and timeline</li>
                        <li><strong>Development:</strong> Your website will be built with care and attention to detail</li>
                        <li><strong>Launch:</strong> Your new website goes live!</li>
                    </ol>
                </div>

                <div style="background: #dcfce7; padding: 15px; border-radius: 8px; margin: 20px 0;">
                    <h4 style="margin-top: 0;">💬 Questions?</h4>
                    <p>If you have any questions or need to make changes to your order, please don't hesitate to reach out. We're here to help!</p>
                </div>

                <p>Thank you for choosing us for your website project. We can't wait to create something amazing together!</p>
                
                <p>Best regards,<br>
                Your Website Development Team</p>

                <p style="color: #6b7280; font-size: 14px;">
                    Order ID: ${orderData.id || 'NEW'}<br>
                    Date: ${new Date().toLocaleDateString()}
                </p>
            </div>
        `
    }
}

// Helper function to update client stats
function updateClientStats(email, name, orderAmount) {
    const client = db.prepare('SELECT * FROM clients WHERE email = ?').get(email)
    
    if (client) {
        db.prepare(`
            UPDATE clients 
            SET totalOrders = totalOrders + 1, 
                totalSpent = totalSpent + ?,
                name = COALESCE(?, name)
            WHERE email = ?
        `).run(orderAmount, name, email)
    } else {
        db.prepare(`
            INSERT INTO clients (id, email, name, firstOrderDate, totalSpent)
            VALUES (?, ?, ?, ?, ?)
        `).run(generateId(), email, name, new Date().toISOString(), orderAmount)
    }
}

// API Routes

// Create new order
app.post('/api/orders', async (req, res) => {
    try {
        const orderData = req.body
        const orderId = generateId()
        const projectId = generateProjectId()
        
        const stmt = db.prepare(`
            INSERT INTO orders (
                id, projectId, contact, clientName, clientEmail, description, siteType, pages, 
                design, features, integrations, content, deadline, cooperation, extra,
                originalPrice, discountedPrice, monthlyPrice, discount, isPromoActive,
                timestamp, userAgent
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `)
        
        stmt.run(
            orderId,
            projectId,
            orderData.contact,
            orderData.clientName,
            orderData.clientEmail,
            orderData.description,
            orderData.siteType,
            orderData.pages,
            orderData.design,
            JSON.stringify(orderData.features),
            JSON.stringify(orderData.integrations),
            orderData.content,
            orderData.deadline,
            orderData.cooperation,
            JSON.stringify(orderData.extra),
            Number(orderData.originalPrice),
            Number(orderData.discountedPrice),
            Number(orderData.monthlyPrice),
            Number(orderData.discount),
            orderData.isPromoActive ? 1 : 0,
            orderData.timestamp,
            orderData.userAgent
        )
        
        // Update client stats
        if (orderData.clientEmail) {
            updateClientStats(
                orderData.clientEmail, 
                orderData.clientName, 
                orderData.discountedPrice || orderData.originalPrice
            )
        }
        
        // Send email notifications
        try {
            console.log('📧 Sending email notifications for order:', orderId)
            
            // Send to admin
            const adminEmail = generateAdminEmail({ ...orderData, id: orderId, projectId })
            await transporter.sendMail({
                from: emailConfig.auth.user,
                to: process.env.ADMIN_EMAIL || emailConfig.auth.user,
                subject: adminEmail.subject,
                html: adminEmail.html
            })
            console.log('✅ Admin email sent')
            
            // Send to client
            const clientEmail = generateClientEmail({ ...orderData, id: orderId, projectId })
            const clientEmailAddress = orderData.clientEmail || orderData.contact
            
            if (clientEmailAddress) {
                await transporter.sendMail({
                    from: emailConfig.auth.user,
                    to: clientEmailAddress,
                    subject: clientEmail.subject,
                    html: clientEmail.html
                })
                console.log('✅ Client email sent to:', clientEmailAddress)
            } else {
                console.log('⚠️ No client email address found')
            }
            
        } catch (emailError) {
            console.error('❌ Email sending failed:', emailError.message)
        }
        
        res.json({ id: orderId, projectId, success: true })
    } catch (error) {
        console.error('Error creating order:', error)
        res.status(500).json({ error: error.message })
    }
})

// Get all orders
app.get('/api/orders', (req, res) => {
    try {
        const orders = db.prepare('SELECT * FROM orders ORDER BY timestamp DESC').all()
        
        // Parse JSON fields
        const parsedOrders = orders.map(order => ({
            ...order,
            features: JSON.parse(order.features || '[]'),
            integrations: JSON.parse(order.integrations || '[]'),
            extra: JSON.parse(order.extra || '[]')
        }))
        
        res.json(parsedOrders)
    } catch (error) {
        console.error('Error fetching orders:', error)
        res.status(500).json({ error: error.message })
    }
})

// Update order status
app.put('/api/orders/:id/status', (req, res) => {
    try {
        const { id } = req.params
        const { status } = req.body
        
        db.prepare('UPDATE orders SET status = ? WHERE id = ?').run(status, id)
        res.json({ success: true })
    } catch (error) {
        console.error('Error updating order status:', error)
        res.status(500).json({ error: error.message })
    }
})

// Generate project IDs for existing orders
app.post('/api/orders/generate-project-ids', (req, res) => {
    try {
        console.log('🔄 Generating project IDs for existing orders...')
        
        // Get all orders without projectId
        console.log('🔍 Checking database structure...')
        try {
            const testQuery = db.prepare('SELECT projectId FROM orders LIMIT 1').get()
            console.log('✅ projectId column exists and accessible')
        } catch (testError) {
            console.error('❌ projectId column test failed:', testError)
            throw testError
        }
        
        const orders = db.prepare('SELECT * FROM orders WHERE projectId IS NULL OR projectId = "" OR projectId = "undefined"').all()
        
        console.log(`📋 Found ${orders.length} orders without project ID`)
        
        let updatedCount = 0
        orders.forEach(order => {
            try {
                const projectId = generateProjectId()
                console.log(`🆔 Generated ${projectId} for order ${order.id}`)
                
                db.prepare('UPDATE orders SET projectId = ? WHERE id = ?').run(projectId, order.id)
                updatedCount++
            } catch (orderError) {
                console.error(`❌ Error updating order ${order.id}:`, orderError)
            }
        })
        
        console.log(`✅ Successfully updated ${updatedCount} orders`)
        
        res.json({ 
            success: true, 
            updatedCount,
            totalOrders: orders.length,
            message: `Generated project IDs for ${updatedCount} orders`
        })
    } catch (error) {
        console.error('❌ Error generating project IDs:', error)
        res.status(500).json({ error: error.message })
    }
})

// Send email endpoint
app.post('/api/send-email', async (req, res) => {
    try {
        const { to, subject, html } = req.body
        
        const mailOptions = {
            from: emailConfig.auth.user,
            to: to,
            subject: subject,
            html: html
        }
        
        const info = await transporter.sendMail(mailOptions)
        console.log('Email sent:', info.messageId)
        res.json({ success: true, messageId: info.messageId })
    } catch (error) {
        console.error('Error sending email:', error)
        res.status(500).json({ error: error.message })
    }
})

// Get statistics
app.get('/api/stats', (req, res) => {
    try {
        const stats = {
            totalOrders: db.prepare('SELECT COUNT(*) as count FROM orders').get().count,
            totalRevenue: db.prepare('SELECT SUM(discountedPrice) as total FROM orders').get().total || 0,
            averageOrderValue: db.prepare('SELECT AVG(discountedPrice) as avg FROM orders').get().avg || 0,
            ordersWithPromo: db.prepare('SELECT COUNT(*) as count FROM orders WHERE isPromoActive = 1').get().count,
            totalClients: db.prepare('SELECT COUNT(*) as count FROM clients').get().count
        }
        
        res.json(stats)
    } catch (error) {
        console.error('Error fetching stats:', error)
        res.status(500).json({ error: error.message })
    }
})

// Export all data
app.get('/api/export', (req, res) => {
    try {
        const data = {
            orders: db.prepare('SELECT * FROM orders').all(),
            projects: db.prepare('SELECT * FROM projects').all(),
            tasks: db.prepare('SELECT * FROM tasks').all(),
            comments: db.prepare('SELECT * FROM comments').all(),
            files: db.prepare('SELECT * FROM files').all(),
            clients: db.prepare('SELECT * FROM clients').all()
        }
        
        res.json(data)
    } catch (error) {
        console.error('Error exporting data:', error)
        res.status(500).json({ error: error.message })
    }
})

// ===== СИСТЕМА КОММУНИКАЦИИ =====

// Создать или получить беседу для заказа
app.post('/api/conversations', (req, res) => {
    try {
        const { orderId, subject } = req.body
        
        // Проверяем, есть ли уже беседа для этого заказа
        let conversation = db.prepare('SELECT * FROM conversations WHERE orderId = ?').get(orderId)
        
        if (!conversation) {
            // Создаем новую беседу
            const conversationId = generateId()
            const now = new Date().toISOString()
            
            db.prepare(`
                INSERT INTO conversations (id, orderId, subject, createdAt, updatedAt)
                VALUES (?, ?, ?, ?, ?)
            `).run(conversationId, orderId, subject || 'Обсуждение заказа', now, now)
            
            conversation = {
                id: conversationId,
                orderId,
                subject: subject || 'Обсуждение заказа',
                status: 'active',
                createdAt: now,
                updatedAt: now
            }
        }
        
        res.json(conversation)
    } catch (error) {
        console.error('Error creating conversation:', error)
        res.status(500).json({ error: error.message })
    }
})

// Получить беседу с сообщениями
app.get('/api/conversations/:orderId', (req, res) => {
    try {
        const { orderId } = req.params
        
        // Получаем беседу
        const conversation = db.prepare('SELECT * FROM conversations WHERE orderId = ?').get(orderId)
        
        if (!conversation) {
            return res.status(404).json({ error: 'Conversation not found' })
        }
        
        // Получаем сообщения
        const messages = db.prepare(`
            SELECT * FROM messages 
            WHERE conversationId = ? 
            ORDER BY timestamp ASC
        `).all(conversation.id)
        
        // Получаем отчеты об ошибках
        const bugReports = db.prepare(`
            SELECT * FROM bug_reports 
            WHERE conversationId = ? 
            ORDER BY reportedAt DESC
        `).all(conversation.id)
        
        // Получаем отчеты о тестировании
        const testingReports = db.prepare(`
            SELECT * FROM testing_reports 
            WHERE conversationId = ? 
            ORDER BY reportedAt DESC
        `).all(conversation.id)
        
        res.json({
            conversation,
            messages: messages.map(msg => ({
                ...msg,
                attachments: JSON.parse(msg.attachments || '[]')
            })),
            bugReports,
            testingReports
        })
    } catch (error) {
        console.error('Error fetching conversation:', error)
        res.status(500).json({ error: error.message })
    }
})

// Отправить сообщение
app.post('/api/messages', (req, res) => {
    try {
        const { conversationId, senderType, senderName, senderEmail, content, messageType, attachments } = req.body
        
        const messageId = generateId()
        const now = new Date().toISOString()
        
        db.prepare(`
            INSERT INTO messages (id, conversationId, senderType, senderName, senderEmail, content, messageType, attachments, timestamp)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).run(
            messageId,
            conversationId,
            senderType,
            senderName,
            senderEmail,
            content,
            messageType || 'text',
            JSON.stringify(attachments || []),
            now
        )
        
        // Обновляем время последнего сообщения в беседе
        db.prepare('UPDATE conversations SET updatedAt = ? WHERE id = ?').run(now, conversationId)
        
        res.json({ 
            id: messageId, 
            timestamp: now,
            success: true 
        })
    } catch (error) {
        console.error('Error sending message:', error)
        res.status(500).json({ error: error.message })
    }
})

// Отметить сообщения как прочитанные
app.put('/api/messages/read', (req, res) => {
    try {
        const { conversationId, senderType } = req.body
        
        db.prepare(`
            UPDATE messages 
            SET isRead = 1 
            WHERE conversationId = ? AND senderType != ?
        `).run(conversationId, senderType)
        
        res.json({ success: true })
    } catch (error) {
        console.error('Error marking messages as read:', error)
        res.status(500).json({ error: error.message })
    }
})

// Создать отчет об ошибке
app.post('/api/bug-reports', (req, res) => {
    try {
        const { conversationId, title, description, severity, browser, device, steps, expectedResult, actualResult } = req.body
        
        const reportId = generateId()
        const now = new Date().toISOString()
        
        db.prepare(`
            INSERT INTO bug_reports (id, conversationId, title, description, severity, browser, device, steps, expectedResult, actualResult, reportedAt)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).run(
            reportId,
            conversationId,
            title,
            description,
            severity || 'medium',
            browser,
            device,
            steps,
            expectedResult,
            actualResult,
            now
        )
        
        res.json({ id: reportId, reportedAt: now, success: true })
    } catch (error) {
        console.error('Error creating bug report:', error)
        res.status(500).json({ error: error.message })
    }
})

// Обновить статус отчета об ошибке
app.put('/api/bug-reports/:id/status', (req, res) => {
    try {
        const { id } = req.params
        const { status } = req.body
        
        const now = new Date().toISOString()
        const resolvedAt = status === 'fixed' || status === 'closed' ? now : null
        
        db.prepare(`
            UPDATE bug_reports 
            SET status = ?, resolvedAt = ? 
            WHERE id = ?
        `).run(status, resolvedAt, id)
        
        res.json({ success: true })
    } catch (error) {
        console.error('Error updating bug report status:', error)
        res.status(500).json({ error: error.message })
    }
})

// Создать отчет о тестировании
app.post('/api/testing-reports', (req, res) => {
    try {
        const { conversationId, title, description, testType, results, notes } = req.body
        
        const reportId = generateId()
        const now = new Date().toISOString()
        
        db.prepare(`
            INSERT INTO testing_reports (id, conversationId, title, description, testType, results, notes, reportedAt)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `).run(
            reportId,
            conversationId,
            title,
            description,
            testType,
            JSON.stringify(results || {}),
            notes,
            now
        )
        
        res.json({ id: reportId, reportedAt: now, success: true })
    } catch (error) {
        console.error('Error creating testing report:', error)
        res.status(500).json({ error: error.message })
    }
})

// Обновить статус отчета о тестировании
app.put('/api/testing-reports/:id/status', (req, res) => {
    try {
        const { id } = req.params
        const { status } = req.body
        
        const now = new Date().toISOString()
        const completedAt = status === 'passed' || status === 'failed' ? now : null
        
        db.prepare(`
            UPDATE testing_reports 
            SET status = ?, completedAt = ? 
            WHERE id = ?
        `).run(status, completedAt, id)
        
        res.json({ success: true })
    } catch (error) {
        console.error('Error updating testing report status:', error)
        res.status(500).json({ error: error.message })
    }
})

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() })
})

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`)
    console.log(`📧 Email configured for: ${emailConfig.auth.user}`)
    console.log(`💾 Database: projects.db`)
}) 