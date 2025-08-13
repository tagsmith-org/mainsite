# 🚀 Полноценная система управления проектами с SQLite

## 🏗️ Архитектура системы

### **База данных SQLite:**
```
projects.db
├── orders          # Заказы
├── projects        # Проекты в работе
├── tasks           # Задачи проектов
├── comments        # Комментарии к проектам
├── files           # Файлы проектов
└── clients         # Клиенты
```

### **Структура таблиц:**

#### **orders** - Заказы
```sql
CREATE TABLE orders (
    id TEXT PRIMARY KEY,
    status TEXT DEFAULT 'new',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    contact TEXT NOT NULL,
    site_type TEXT NOT NULL,
    pages TEXT,
    design TEXT,
    content TEXT,
    deadline TEXT,
    cooperation TEXT,
    original_price INTEGER,
    discounted_price INTEGER,
    monthly_price INTEGER,
    discount REAL,
    is_promo_active BOOLEAN,
    description TEXT,
    user_agent TEXT,
    features TEXT, -- JSON array
    integrations TEXT, -- JSON array
    extra_services TEXT -- JSON array
)
```

#### **projects** - Проекты
```sql
CREATE TABLE projects (
    id TEXT PRIMARY KEY,
    order_id TEXT,
    status TEXT DEFAULT 'planning',
    start_date DATETIME,
    estimated_completion DATETIME,
    actual_completion DATETIME,
    assigned_to TEXT,
    progress INTEGER DEFAULT 0,
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders (id)
)
```

#### **tasks** - Задачи
```sql
CREATE TABLE tasks (
    id TEXT PRIMARY KEY,
    project_id TEXT,
    title TEXT NOT NULL,
    description TEXT,
    status TEXT DEFAULT 'todo',
    priority TEXT DEFAULT 'medium',
    assigned_to TEXT,
    due_date DATETIME,
    completed_at DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES projects (id)
)
```

## 🚀 Запуск системы

### **1. Установка зависимостей:**
```bash
npm install better-sqlite3 express cors
```

### **2. Запуск сервера:**
```bash
node server-sqlite.js
```

### **3. Запуск фронтенда:**
```bash
npm run dev
```

## 📊 API Endpoints

### **Заказы:**
- `GET /api/orders` - получить все заказы с фильтрацией
- `POST /api/orders` - создать новый заказ
- `PATCH /api/orders/:id/status` - обновить статус заказа

### **Проекты:**
- `GET /api/projects` - получить все проекты
- `POST /api/projects` - создать проект из заказа
- `PATCH /api/projects/:id/progress` - обновить прогресс проекта

### **Задачи:**
- `GET /api/projects/:projectId/tasks` - получить задачи проекта
- `POST /api/tasks` - создать задачу
- `PATCH /api/tasks/:id/status` - обновить статус задачи

### **Комментарии:**
- `GET /api/projects/:projectId/comments` - получить комментарии
- `POST /api/comments` - добавить комментарий

### **Статистика и экспорт:**
- `GET /api/stats` - получить статистику
- `GET /api/export` - экспорт всех данных

## 🎯 Функциональность

### **📋 Управление заказами:**
- ✅ Создание заказов через калькулятор
- ✅ Просмотр всех заказов
- ✅ Фильтрация по статусу, поиск
- ✅ Обновление статуса заказов
- ✅ Автоматическое создание клиентов

### **🏗️ Управление проектами:**
- ✅ Создание проекта из заказа
- ✅ Отслеживание прогресса
- ✅ Назначение исполнителей
- ✅ Управление сроками
- ✅ Статусы проектов (planning, in-progress, testing, completed)

### **📝 Управление задачами:**
- ✅ Создание задач для проектов
- ✅ Приоритеты задач (low, medium, high)
- ✅ Назначение исполнителей
- ✅ Сроки выполнения
- ✅ Отметка о завершении

### **💬 Комментарии и коммуникация:**
- ✅ Добавление комментариев к проектам
- ✅ История обсуждений
- ✅ Авторство комментариев

### **📊 Статистика и аналитика:**
- ✅ Общее количество заказов
- ✅ Статистика по статусам
- ✅ Общая выручка
- ✅ Ежемесячные платежи
- ✅ Прогресс проектов

### **📁 Экспорт данных:**
- ✅ Экспорт всех данных в JSON
- ✅ Резервное копирование
- ✅ Перенос данных между серверами

## 🔒 Безопасность

### **Защита по IP:**
- Разрешенные IP в `.env`: `VITE_ADMIN_IPS=127.0.0.1,::1,YOUR_IP`
- Проверка на уровне роутера и компонентов
- Автоматическое перенаправление неавторизованных пользователей

### **Валидация данных:**
- Проверка обязательных полей
- Санитизация входных данных
- Логирование всех операций

## 🔄 Workflow

### **1. Создание заказа:**
1. Клиент заполняет калькулятор на сайте
2. Данные сохраняются в таблицу `orders`
3. Автоматически создается запись в `clients`

### **2. Создание проекта:**
1. Администратор просматривает новые заказы
2. Создает проект из заказа
3. Назначает исполнителя и сроки
4. Статус заказа меняется на "processing"

### **3. Управление проектом:**
1. Создание задач для проекта
2. Отслеживание прогресса
3. Добавление комментариев
4. Обновление статуса проекта

### **4. Завершение проекта:**
1. Все задачи выполнены
2. Статус проекта "completed"
3. Статус заказа "completed"
4. Проект архивируется

## 📈 Преимущества SQLite

### **✅ Простота:**
- Один файл базы данных
- Не требует установки сервера БД
- Легко переносить и резервировать

### **✅ Надежность:**
- ACID транзакции
- Автоматическое восстановление
- Проверка целостности данных

### **✅ Производительность:**
- Быстрые запросы
- Эффективные индексы
- Минимальное потребление ресурсов

### **✅ Масштабируемость:**
- Поддержка сложных запросов
- Связи между таблицами
- Возможность миграции на PostgreSQL/MySQL

## 🔧 Расширение функциональности

### **Добавление новых полей:**
1. Обновите схему базы данных
2. Добавьте валидацию
3. Обновите API endpoints
4. Обновите интерфейс

### **Интеграция с внешними сервисами:**
- Email уведомления
- Платежные системы
- CRM системы
- Системы контроля версий

### **Дополнительные функции:**
- Управление файлами
- Временные отчеты
- Автоматические уведомления
- Интеграция с календарем

## 📝 Примеры использования

### **Создание заказа:**
```javascript
const orderData = {
    contact: "client@example.com",
    siteType: "E-commerce",
    originalPrice: 3550,
    discountedPrice: 2840,
    features: ["Cart/orders", "Online payment"],
    integrations: ["Analytics"],
    extra: ["Domain registration/setup"]
}

const result = await createOrder(orderData)
console.log('Order created:', result.id)
```

### **Создание проекта:**
```javascript
const projectData = {
    orderId: "order-abc123",
    assignedTo: "developer@example.com",
    estimatedCompletion: "2025-02-21T12:00:00.000Z",
    notes: "Начинаем с дизайна"
}

const result = await createProject(projectData)
console.log('Project created:', result.id)
```

### **Обновление прогресса:**
```javascript
await updateProjectProgress(
    "project-xyz789",
    75, // progress %
    "in-progress",
    "Верстка завершена, начинаем интеграцию"
)
```

## 🎉 Результат

Теперь у вас есть **полноценная система управления проектами** с:

- ✅ **SQLite базой данных** для надежного хранения
- ✅ **Полным API** для всех операций
- ✅ **Управлением заказами** и проектами
- ✅ **Системой задач** и комментариев
- ✅ **Статистикой** и аналитикой
- ✅ **Экспортом данных** и резервным копированием
- ✅ **Защитой по IP** для админки

Система готова для профессионального использования! 🚀 