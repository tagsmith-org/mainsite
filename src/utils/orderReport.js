// Утилита для генерации отчета о заказе
export function generateOrderReport(orderData) {
    const report = `
=== НОВЫЙ ЗАКАЗ САЙТА ===
Дата: ${new Date(orderData.timestamp).toLocaleString('ru-RU')}

=== КОНТАКТНАЯ ИНФОРМАЦИЯ ===
Контакт: ${orderData.contact}
Описание проекта: ${orderData.description}

=== ВЫБРАННЫЕ ОПЦИИ ===
Тип сайта: ${orderData.siteType}
Количество страниц: ${orderData.pages}
Дизайн: ${orderData.design}
Контент: ${orderData.content}
Сроки: ${orderData.deadline}
Вариант сотрудничества: ${orderData.cooperation}

Функции: ${orderData.features.join(', ') || 'Не выбрано'}
Интеграции: ${orderData.integrations.join(', ') || 'Не выбрано'}
Дополнительные услуги: ${orderData.extra.join(', ') || 'Не выбрано'}

=== РАСЧЕТ СТОИМОСТИ ===
Исходная стоимость: $${orderData.originalPrice}
Скидка: ${Math.round(orderData.discount * 100)}%
Итоговая стоимость: $${orderData.discountedPrice}
Ежемесячные платежи: $${orderData.monthlyPrice}/мес.

=== ДОПОЛНИТЕЛЬНАЯ ИНФОРМАЦИЯ ===
Промо-акция активна: ${orderData.isPromoActive ? 'Да' : 'Нет'}
User Agent: ${orderData.userAgent}

=== КОНЕЦ ОТЧЕТА ===
    `.trim()
    
    return report
}

// Функция для отправки отчета по email (заглушка)
export function sendOrderReport(orderData, report) {
    // Здесь можно интегрировать с email сервисом
    // Например, SendGrid, Mailgun, или собственным API
    
    const emailData = {
        to: ['your-email@example.com', orderData.contact], // вам и клиенту
        subject: `Новый заказ сайта - ${orderData.siteType}`,
        text: report,
        html: report.replace(/\n/g, '<br>')
    }
    
    console.log('Email data:', emailData)
    
    // Пример интеграции с API
    // fetch('/api/send-order', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(emailData)
    // })
    
    return emailData
}

// Функция для сохранения заказа в базу данных (заглушка)
export function saveOrderToDatabase(orderData) {
    // Здесь можно интегрировать с базой данных
    console.log('Saving order to database:', orderData)
    
    // Пример интеграции с API
    // fetch('/api/orders', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(orderData)
    // })
} 