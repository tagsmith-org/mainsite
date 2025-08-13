// Утилита для хранения заказов в JSON файлах

// Структура файлов:
// /data/orders.json - все заказы
// /data/projects.json - проекты в работе
// /data/archive.json - завершенные проекты

// Сохранение заказа в JSON файл
export async function saveOrderToFile(orderData) {
    try {
        // Добавляем ID и статус
        const orderWithMeta = {
            id: generateOrderId(),
            status: 'new', // new, processing, completed, cancelled
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            ...orderData
        }

        // В реальном приложении здесь был бы API запрос
        console.log('Saving order to file:', orderWithMeta)
        
        // Пример API запроса:
        // const response = await fetch('/api/orders', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(orderWithMeta)
        // })
        
        return orderWithMeta
    } catch (error) {
        console.error('Failed to save order:', error)
        throw error
    }
}

// Загрузка всех заказов из файла
export async function loadOrdersFromFile() {
    try {
        // В реальном приложении здесь был бы API запрос
        console.log('Loading orders from file...')
        
        // Пример API запроса:
        // const response = await fetch('/api/orders')
        // const orders = await response.json()
        
        // Пока возвращаем из localStorage как fallback
        const saved = localStorage.getItem('orders')
        return saved ? JSON.parse(saved) : []
    } catch (error) {
        console.error('Failed to load orders:', error)
        return []
    }
}

// Обновление статуса заказа
export async function updateOrderStatus(orderId, newStatus) {
    try {
        console.log(`Updating order ${orderId} status to: ${newStatus}`)
        
        // Пример API запроса:
        // const response = await fetch(`/api/orders/${orderId}/status`, {
        //     method: 'PATCH',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ status: newStatus })
        // })
        
        return true
    } catch (error) {
        console.error('Failed to update order status:', error)
        return false
    }
}

// Экспорт заказов в JSON файл
export function exportOrdersToJSON(orders) {
    const exportData = {
        exportedAt: new Date().toISOString(),
        totalOrders: orders.length,
        orders: orders
    }
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    
    const a = document.createElement('a')
    a.href = url
    a.download = `orders-export-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
}

// Импорт заказов из JSON файла
export function importOrdersFromJSON(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result)
                console.log('Imported orders:', data)
                resolve(data.orders || data)
            } catch (error) {
                reject(error)
            }
        }
        
        reader.onerror = reject
        reader.readAsText(file)
    })
}

// Генерация уникального ID заказа
function generateOrderId() {
    const timestamp = Date.now().toString(36)
    const random = Math.random().toString(36).substr(2, 5)
    return `order-${timestamp}-${random}`
}

// Структура JSON файлов для сервера:

/*
/data/orders.json:
{
  "orders": [
    {
      "id": "order-abc123",
      "status": "new",
      "createdAt": "2025-01-21T12:00:00.000Z",
      "updatedAt": "2025-01-21T12:00:00.000Z",
      "contact": "client@example.com",
      "siteType": "E-commerce",
      "originalPrice": 3550,
      "discountedPrice": 2840,
      "monthlyPrice": 60,
      "features": ["Cart/orders", "Online payment"],
      "integrations": ["Analytics"],
      "extra": ["Domain registration/setup"],
      "description": "Нужен интернет-магазин...",
      "isPromoActive": true
    }
  ],
  "meta": {
    "totalOrders": 1,
    "lastUpdated": "2025-01-21T12:00:00.000Z"
  }
}

/data/projects.json:
{
  "projects": [
    {
      "id": "project-xyz789",
      "orderId": "order-abc123",
      "status": "in-progress",
      "startDate": "2025-01-21T12:00:00.000Z",
      "estimatedCompletion": "2025-02-21T12:00:00.000Z",
      "assignedTo": "developer@example.com",
      "progress": 25,
      "notes": "Дизайн утвержден, начинаем верстку"
    }
  ]
}

/data/archive.json:
{
  "completedProjects": [
    {
      "id": "project-def456",
      "orderId": "order-xyz789",
      "completedAt": "2025-01-15T12:00:00.000Z",
      "finalPrice": 2840,
      "clientFeedback": "Отличная работа!",
      "rating": 5
    }
  ]
}
*/ 