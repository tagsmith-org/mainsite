// Утилиты для работы с SQLite базой данных

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

// ===== ЗАКАЗЫ =====

// Получить все заказы
export async function getOrders(filters = {}) {
    try {
        const params = new URLSearchParams()
        if (filters.status) params.append('status', filters.status)
        if (filters.search) params.append('search', filters.search)
        if (filters.limit) params.append('limit', filters.limit)
        if (filters.offset) params.append('offset', filters.offset)
        
        const response = await fetch(`${API_BASE_URL}/api/orders?${params}`)
        if (!response.ok) throw new Error('Failed to fetch orders')
        
        return await response.json()
    } catch (error) {
        console.error('Failed to get orders:', error)
        throw error
    }
}

// Создать новый заказ
export async function createOrder(orderData) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/orders`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderData)
        })
        
        if (!response.ok) throw new Error('Failed to create order')
        
        return await response.json()
    } catch (error) {
        console.error('Failed to create order:', error)
        throw error
    }
}

// Обновить статус заказа
export async function updateOrderStatus(orderId, status) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/orders/${orderId}/status`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status })
        })
        
        if (!response.ok) throw new Error('Failed to update order status')
        
        return await response.json()
    } catch (error) {
        console.error('Failed to update order status:', error)
        throw error
    }
}

// ===== ПРОЕКТЫ =====

// Получить все проекты
export async function getProjects(filters = {}) {
    try {
        const params = new URLSearchParams()
        if (filters.status) params.append('status', filters.status)
        if (filters.assigned_to) params.append('assigned_to', filters.assigned_to)
        
        const response = await fetch(`${API_BASE_URL}/api/projects?${params}`)
        if (!response.ok) throw new Error('Failed to fetch projects')
        
        return await response.json()
    } catch (error) {
        console.error('Failed to get projects:', error)
        throw error
    }
}

// Создать проект из заказа
export async function createProject(projectData) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/projects`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(projectData)
        })
        
        if (!response.ok) throw new Error('Failed to create project')
        
        return await response.json()
    } catch (error) {
        console.error('Failed to create project:', error)
        throw error
    }
}

// Обновить прогресс проекта
export async function updateProjectProgress(projectId, progress, status, notes) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/projects/${projectId}/progress`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ progress, status, notes })
        })
        
        if (!response.ok) throw new Error('Failed to update project progress')
        
        return await response.json()
    } catch (error) {
        console.error('Failed to update project progress:', error)
        throw error
    }
}

// ===== ЗАДАЧИ =====

// Получить задачи проекта
export async function getProjectTasks(projectId) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/projects/${projectId}/tasks`)
        if (!response.ok) throw new Error('Failed to fetch tasks')
        
        return await response.json()
    } catch (error) {
        console.error('Failed to get tasks:', error)
        throw error
    }
}

// Создать задачу
export async function createTask(taskData) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/tasks`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(taskData)
        })
        
        if (!response.ok) throw new Error('Failed to create task')
        
        return await response.json()
    } catch (error) {
        console.error('Failed to create task:', error)
        throw error
    }
}

// Обновить статус задачи
export async function updateTaskStatus(taskId, status) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/tasks/${taskId}/status`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status })
        })
        
        if (!response.ok) throw new Error('Failed to update task status')
        
        return await response.json()
    } catch (error) {
        console.error('Failed to update task status:', error)
        throw error
    }
}

// ===== КОММЕНТАРИИ =====

// Получить комментарии проекта
export async function getProjectComments(projectId) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/projects/${projectId}/comments`)
        if (!response.ok) throw new Error('Failed to fetch comments')
        
        return await response.json()
    } catch (error) {
        console.error('Failed to get comments:', error)
        throw error
    }
}

// Добавить комментарий
export async function addComment(commentData) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/comments`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(commentData)
        })
        
        if (!response.ok) throw new Error('Failed to add comment')
        
        return await response.json()
    } catch (error) {
        console.error('Failed to add comment:', error)
        throw error
    }
}

// ===== СТАТИСТИКА =====

// Получить статистику
export async function getStats() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/stats`)
        if (!response.ok) throw new Error('Failed to fetch stats')
        
        return await response.json()
    } catch (error) {
        console.error('Failed to get stats:', error)
        throw error
    }
}

// ===== ЭКСПОРТ =====

// Экспорт всех данных
export async function exportData() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/export`)
        if (!response.ok) throw new Error('Failed to export data')
        
        const blob = await response.blob()
        const url = URL.createObjectURL(blob)
        
        const a = document.createElement('a')
        a.href = url
        a.download = `project-export-${new Date().toISOString().split('T')[0]}.json`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
        
        return true
    } catch (error) {
        console.error('Failed to export data:', error)
        throw error
    }
}

// ===== УТИЛИТЫ =====

// Проверка подключения к серверу
export async function checkServerConnection() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/stats`)
        return response.ok
    } catch (error) {
        console.warn('Server connection failed:', error)
        return false
    }
}

// Fallback для localStorage (если сервер недоступен)
export function getOrdersFromLocalStorage() {
    try {
        const saved = localStorage.getItem('orders')
        return saved ? JSON.parse(saved) : []
    } catch (error) {
        console.warn('Failed to load from localStorage:', error)
        return []
    }
}

export function saveOrdersToLocalStorage(orders) {
    try {
        localStorage.setItem('orders', JSON.stringify(orders))
    } catch (error) {
        console.warn('Failed to save to localStorage:', error)
    }
} 