# 📊 Организация хранения заказов и проектов

## 🏗️ Архитектура системы

### **Файловая структура:**
```
/data/
├── orders.json      # Все заказы
├── projects.json    # Проекты в работе
└── archive.json     # Завершенные проекты
```

### **Формат данных:**

#### **orders.json** - Заказы
```json
{
  "orders": [
    {
      "id": "order-abc123",
      "status": "new", // new, processing, completed, cancelled
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
```

#### **projects.json** - Проекты в работе
```json
{
  "projects": [
    {
      "id": "project-xyz789",
      "orderId": "order-abc123",
      "status": "in-progress", // planning, in-progress, testing, completed
      "startDate": "2025-01-21T12:00:00.000Z",
      "estimatedCompletion": "2025-02-21T12:00:00.000Z",
      "assignedTo": "developer@example.com",
      "progress": 25,
      "notes": "Дизайн утвержден, начинаем верстку"
    }
  ]
}
```

#### **archive.json** - Завершенные проекты
```json
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
```

## 🚀 Настройка сервера

### **1. Установка зависимостей:**
```bash
npm install express cors
```

### **2. Запуск сервера:**
```bash
node server-example.js
```

### **3. API Endpoints:**
- `GET /api/orders` - получить все заказы
- `POST /api/orders` - создать новый заказ
- `PATCH /api/orders/:id/status` - обновить статус заказа
- `DELETE /api/orders/:id` - удалить заказ
- `GET /api/orders/export` - экспорт заказов

## 🔄 Интеграция с фронтендом

### **Обновление утилит хранения:**

В `src/utils/orderStorage.js` раскомментируйте API вызовы:

```javascript
// Сохранение заказа
const response = await fetch('/api/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderWithMeta)
})

// Загрузка заказов
const response = await fetch('/api/orders')
const orders = await response.json()
```

### **Настройка URL сервера:**

Добавьте в `.env`:
```env
VITE_API_URL=http://localhost:3001
```

## 📁 Резервное копирование

### **Автоматическое резервное копирование:**
```bash
# Скрипт для создания бэкапа
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
cp -r data/ backup/data_$DATE/
echo "Backup created: backup/data_$DATE/"
```

### **Экспорт через интерфейс:**
- Нажмите "📄 Экспорт JSON" в админке
- Файл скачается автоматически
- Формат: `orders-export-2025-01-21.json`

## 🔒 Безопасность

### **Защита по IP:**
- Разрешенные IP в `.env`: `VITE_ADMIN_IPS=127.0.0.1,::1,YOUR_IP`
- Проверка на уровне роутера и компонентов
- Автоматическое перенаправление неавторизованных пользователей

### **Валидация данных:**
- Проверка обязательных полей
- Санитизация входных данных
- Логирование всех операций

## 📊 Мониторинг

### **Логи сервера:**
```bash
# Просмотр логов в реальном времени
tail -f server.log

# Поиск ошибок
grep "ERROR" server.log
```

### **Метрики:**
- Количество заказов
- Средняя стоимость
- Время обработки
- Статусы проектов

## 🔧 Расширение функциональности

### **Добавление новых полей:**
1. Обновите структуру JSON
2. Добавьте валидацию
3. Обновите интерфейс

### **Интеграция с внешними сервисами:**
- Email (SendGrid, Mailgun)
- Платежи (Stripe, PayPal)
- CRM (AmoCRM, Bitrix24)

## 📝 Примеры использования

### **Создание заказа:**
```javascript
const orderData = {
    contact: "client@example.com",
    siteType: "E-commerce",
    originalPrice: 3550,
    discountedPrice: 2840,
    // ... остальные поля
}

const response = await fetch('/api/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData)
})
```

### **Обновление статуса:**
```javascript
await fetch(`/api/orders/${orderId}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status: 'processing' })
})
```

## 🎯 Преимущества системы

✅ **Простота** - JSON файлы легко читать и редактировать  
✅ **Надежность** - данные сохраняются на сервере  
✅ **Масштабируемость** - легко добавить новые поля  
✅ **Резервное копирование** - простой экспорт/импорт  
✅ **Безопасность** - защита по IP адресам  
✅ **Мониторинг** - логирование всех операций 