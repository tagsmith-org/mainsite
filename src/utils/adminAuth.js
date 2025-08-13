// Утилита для проверки прав администратора по IP

// Получение IP адреса клиента
async function getClientIP() {
    try {
        // Пытаемся получить IP через внешний сервис
        const response = await fetch('https://api.ipify.org?format=json')
        const data = await response.json()
        return data.ip
    } catch (error) {
        console.warn('Failed to get client IP:', error)
        // Fallback - возвращаем localhost для разработки
        return '127.0.0.1'
    }
}

// Проверка, является ли IP разрешенным
function isIPAllowed(clientIP, allowedIPs) {
    if (!allowedIPs || !clientIP) return false
    
    const allowedList = allowedIPs.split(',').map(ip => ip.trim())
    
    return allowedList.includes(clientIP) || 
           allowedList.includes('127.0.0.1') || // localhost
           allowedList.includes('::1') // IPv6 localhost
}

// Основная функция проверки прав администратора
export async function isAdmin() {
    // Для локальной разработки всегда возвращаем true
    if (import.meta.env.DEV) {
        console.log('Development mode - admin access granted')
        return true
    }
    
    const allowedIPs = import.meta.env.VITE_ADMIN_IPS
    const clientIP = await getClientIP()
    
    console.log('Client IP:', clientIP)
    console.log('Allowed IPs:', allowedIPs)
    
    return isIPAllowed(clientIP, allowedIPs)
}

// Синхронная версия для использования в computed свойствах
export function isAdminSync() {
    // Для синхронного использования возвращаем false по умолчанию
    // и полагаемся на асинхронную проверку
    return false
}

// Кэшированный результат проверки
let adminCheckResult = null
let adminCheckPromise = null

// Функция для получения результата проверки с кэшированием
export async function getAdminStatus() {
    if (adminCheckResult !== null) {
        return adminCheckResult
    }
    
    if (adminCheckPromise) {
        return adminCheckPromise
    }
    
    adminCheckPromise = isAdmin().then(result => {
        adminCheckResult = result
        return result
    })
    
    return adminCheckPromise
} 