// Пример простого сервера для обработки заказов
// Запуск: node server-example.js

const express = require('express')
const fs = require('fs').promises
const path = require('path')
const cors = require('cors')

const app = express()
const PORT = 3001

// Middleware
app.use(cors())
app.use(express.json())

// Пути к файлам данных
const DATA_DIR = path.join(__dirname, 'data')
const ORDERS_FILE = path.join(DATA_DIR, 'orders.json')
const PROJECTS_FILE = path.join(DATA_DIR, 'projects.json')
const ARCHIVE_FILE = path.join(DATA_DIR, 'archive.json')

// Создание директории и файлов при запуске
async function initializeDataFiles() {
    try {
        await fs.mkdir(DATA_DIR, { recursive: true })
        
        // Создаем файлы если их нет
        const files = [
            { path: ORDERS_FILE, default: { orders: [], meta: { totalOrders: 0, lastUpdated: new Date().toISOString() } } },
            { path: PROJECTS_FILE, default: { projects: [] } },
            { path: ARCHIVE_FILE, default: { completedProjects: [] } }
        ]
        
        for (const file of files) {
            try {
                await fs.access(file.path)
            } catch {
                await fs.writeFile(file.path, JSON.stringify(file.default, null, 2))
                console.log(`Created ${file.path}`)
            }
        }
    } catch (error) {
        console.error('Failed to initialize data files:', error)
    }
}

// API Routes

// Получить все заказы
app.get('/api/orders', async (req, res) => {
    try {
        const data = await fs.readFile(ORDERS_FILE, 'utf8')
        const orders = JSON.parse(data)
        res.json(orders.orders)
    } catch (error) {
        console.error('Failed to load orders:', error)
        res.status(500).json({ error: 'Failed to load orders' })
    }
})

// Создать новый заказ
app.post('/api/orders', async (req, res) => {
    try {
        const orderData = req.body
        
        // Добавляем метаданные
        const orderWithMeta = {
            id: generateOrderId(),
            status: 'new',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            ...orderData
        }
        
        // Читаем существующие заказы
        const data = await fs.readFile(ORDERS_FILE, 'utf8')
        const orders = JSON.parse(data)
        
        // Добавляем новый заказ
        orders.orders.unshift(orderWithMeta)
        orders.meta.totalOrders = orders.orders.length
        orders.meta.lastUpdated = new Date().toISOString()
        
        // Сохраняем обратно
        await fs.writeFile(ORDERS_FILE, JSON.stringify(orders, null, 2))
        
        console.log('New order saved:', orderWithMeta.id)
        res.json(orderWithMeta)
    } catch (error) {
        console.error('Failed to save order:', error)
        res.status(500).json({ error: 'Failed to save order' })
    }
})

// Обновить статус заказа
app.patch('/api/orders/:id/status', async (req, res) => {
    try {
        const { id } = req.params
        const { status } = req.body
        
        // Читаем существующие заказы
        const data = await fs.readFile(ORDERS_FILE, 'utf8')
        const orders = JSON.parse(data)
        
        // Находим и обновляем заказ
        const orderIndex = orders.orders.findIndex(order => order.id === id)
        if (orderIndex === -1) {
            return res.status(404).json({ error: 'Order not found' })
        }
        
        orders.orders[orderIndex].status = status
        orders.orders[orderIndex].updatedAt = new Date().toISOString()
        orders.meta.lastUpdated = new Date().toISOString()
        
        // Сохраняем обратно
        await fs.writeFile(ORDERS_FILE, JSON.stringify(orders, null, 2))
        
        console.log(`Order ${id} status updated to: ${status}`)
        res.json(orders.orders[orderIndex])
    } catch (error) {
        console.error('Failed to update order status:', error)
        res.status(500).json({ error: 'Failed to update order status' })
    }
})

// Удалить заказ
app.delete('/api/orders/:id', async (req, res) => {
    try {
        const { id } = req.params
        
        // Читаем существующие заказы
        const data = await fs.readFile(ORDERS_FILE, 'utf8')
        const orders = JSON.parse(data)
        
        // Удаляем заказ
        const orderIndex = orders.orders.findIndex(order => order.id === id)
        if (orderIndex === -1) {
            return res.status(404).json({ error: 'Order not found' })
        }
        
        orders.orders.splice(orderIndex, 1)
        orders.meta.totalOrders = orders.orders.length
        orders.meta.lastUpdated = new Date().toISOString()
        
        // Сохраняем обратно
        await fs.writeFile(ORDERS_FILE, JSON.stringify(orders, null, 2))
        
        console.log(`Order ${id} deleted`)
        res.json({ message: 'Order deleted successfully' })
    } catch (error) {
        console.error('Failed to delete order:', error)
        res.status(500).json({ error: 'Failed to delete order' })
    }
})

// Экспорт всех заказов
app.get('/api/orders/export', async (req, res) => {
    try {
        const data = await fs.readFile(ORDERS_FILE, 'utf8')
        const orders = JSON.parse(data)
        
        const exportData = {
            exportedAt: new Date().toISOString(),
            totalOrders: orders.orders.length,
            orders: orders.orders
        }
        
        res.setHeader('Content-Type', 'application/json')
        res.setHeader('Content-Disposition', `attachment; filename=orders-export-${new Date().toISOString().split('T')[0]}.json`)
        res.json(exportData)
    } catch (error) {
        console.error('Failed to export orders:', error)
        res.status(500).json({ error: 'Failed to export orders' })
    }
})

// Вспомогательные функции
function generateOrderId() {
    const timestamp = Date.now().toString(36)
    const random = Math.random().toString(36).substr(2, 5)
    return `order-${timestamp}-${random}`
}

// Запуск сервера
async function startServer() {
    await initializeDataFiles()
    
    app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`)
        console.log(`📁 Data files in: ${DATA_DIR}`)
        console.log(`📊 API endpoints:`)
        console.log(`   GET  /api/orders - получить все заказы`)
        console.log(`   POST /api/orders - создать новый заказ`)
        console.log(`   PATCH /api/orders/:id/status - обновить статус`)
        console.log(`   DELETE /api/orders/:id - удалить заказ`)
        console.log(`   GET  /api/orders/export - экспорт заказов`)
    })
}

startServer().catch(console.error)

// Для запуска сервера нужно установить зависимости:
// npm install express cors 