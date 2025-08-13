<template>
    <div class="order-viewer bg-neutral-900 text-white p-6 rounded-lg">
        <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold">Просмотр заказов</h2>
        </div>

        <!-- Фильтры -->
        <div class="mb-6 p-4 bg-neutral-800 rounded">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label class="block text-sm font-medium mb-2">Поиск по контакту:</label>
                    <input v-model="searchContact" type="text"
                        class="w-full px-3 py-2 bg-neutral-700 rounded border border-neutral-600 focus:border-amber-500 focus:outline-none"
                        placeholder="Email или телефон...">
                </div>
                <div>
                    <label class="block text-sm font-medium mb-2">Тип сайта:</label>
                    <select v-model="filterSiteType"
                        class="w-full px-3 py-2 bg-neutral-700 rounded border border-neutral-600 focus:border-amber-500 focus:outline-none">
                        <option value="">Все типы</option>
                        <option value="Landing page">Landing page</option>
                        <option value="Catalog/menu">Catalog/menu</option>
                        <option value="E-commerce">E-commerce</option>
                        <option value="Portfolio">Portfolio</option>
                        <option value="Company/blog">Company/blog</option>
                    </select>
                </div>
                <div>
                    <label class="block text-sm font-medium mb-2">Статус:</label>
                    <select v-model="filterStatus"
                        class="w-full px-3 py-2 bg-neutral-700 rounded border border-neutral-600 focus:border-amber-500 focus:outline-none">
                        <option value="">Все заказы</option>
                        <option value="new">Новые</option>
                        <option value="processing">В работе</option>
                        <option value="completed">Завершенные</option>
                        <option value="archived">Архив</option>
                    </select>
                </div>
            </div>
        </div>

        <!-- Список заказов -->
        <div v-if="filteredOrders.length === 0" class="text-center py-8 text-neutral-400">
            <p class="text-lg">Заказов пока нет</p>
            <p class="text-sm">Заказы появятся здесь после отправки форм</p>
        </div>

        <div v-else class="space-y-4">
            <div v-for="(order, index) in filteredOrders" :key="index"
                class="order-card bg-neutral-800 p-4 rounded border border-neutral-700 hover:border-amber-500 transition">

                <!-- Заголовок заказа -->
                <div class="flex justify-between items-start mb-4">
                    <div>
                        <div class="flex items-center gap-2 mb-1">
                            <h3 class="text-lg font-semibold text-amber-400">{{ order.siteType }}</h3>
                            <span class="text-lg">{{ getStatusInfo(order.status || 'new').icon }}</span>
                            <span
                                class="px-2 py-1 rounded text-xs font-medium {{ getStatusInfo(order.status || 'new').bgColor }} text-white">
                                {{ getStatusInfo(order.status || 'new').label }}
                            </span>
                        </div>
                        <div class="mb-1">
                            <span class="px-2 py-1 bg-amber-500 text-neutral-900 text-xs font-bold rounded">
                                {{ order.projectId || 'ID-' + (order.id ? order.id.substring(0, 8) : 'NEW') }}
                            </span>
                        </div>
                        <p class="text-sm text-neutral-400">{{ formatDate(order.timestamp) }}</p>
                        <p class="text-sm text-neutral-300">{{ order.contact }}</p>
                    </div>
                    <div class="text-right">
                        <div class="text-lg font-bold text-green-400">${{ order.discountedPrice }}</div>
                        <div v-if="order.monthlyPrice > 0" class="text-sm text-neutral-400">
                            +${{ order.monthlyPrice }}/мес
                        </div>
                        <div class="text-xs text-neutral-500">
                            {{ order.isPromoActive ? 'Со скидкой' : 'Без скидки' }}
                        </div>
                    </div>
                </div>

                <!-- Детали заказа -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <h4 class="font-medium text-amber-300 mb-2">Основные параметры:</h4>
                        <ul class="text-sm space-y-1">
                            <li><span class="text-neutral-400">Страниц:</span> {{ order.pages }}</li>
                            <li><span class="text-neutral-400">Дизайн:</span> {{ order.design }}</li>
                            <li><span class="text-neutral-400">Контент:</span> {{ order.content }}</li>
                            <li><span class="text-neutral-400">Сроки:</span> {{ order.deadline }}</li>
                            <li><span class="text-neutral-400">Сотрудничество:</span> {{ order.cooperation }}</li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="font-medium text-amber-300 mb-2">Дополнительно:</h4>
                        <div v-if="order.features.length > 0" class="mb-2">
                            <span class="text-neutral-400 text-sm">Функции:</span>
                            <div class="flex flex-wrap gap-1 mt-1">
                                <span v-for="feature in order.features" :key="feature"
                                    class="px-2 py-1 bg-neutral-700 rounded text-xs">
                                    {{ feature }}
                                </span>
                            </div>
                        </div>
                        <div v-if="order.integrations.length > 0" class="mb-2">
                            <span class="text-neutral-400 text-sm">Интеграции:</span>
                            <div class="flex flex-wrap gap-1 mt-1">
                                <span v-for="integration in order.integrations" :key="integration"
                                    class="px-2 py-1 bg-blue-600 rounded text-xs">
                                    {{ integration }}
                                </span>
                            </div>
                        </div>
                        <div v-if="order.extra.length > 0">
                            <span class="text-neutral-400 text-sm">Услуги:</span>
                            <div class="flex flex-wrap gap-1 mt-1">
                                <span v-for="extra in order.extra" :key="extra"
                                    class="px-2 py-1 bg-green-600 rounded text-xs">
                                    {{ extra }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Описание проекта -->
                <div v-if="order.description" class="mb-4">
                    <h4 class="font-medium text-amber-300 mb-2">Описание проекта:</h4>
                    <p class="text-sm text-neutral-300 bg-neutral-700 p-3 rounded">
                        {{ order.description }}
                    </p>
                </div>

                <!-- Действия -->
                <div class="flex justify-between pt-4 border-t border-neutral-700">
                    <div class="flex gap-2">
                        <button @click="viewOrderDetails(order)"
                            class="px-3 py-1 bg-amber-600 hover:bg-amber-700 rounded text-sm transition">
                            👁️ Детали
                        </button>
                        <button @click="editOrder(order, index)"
                            class="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm transition">
                            ✏️ Редактировать
                        </button>
                    </div>
                    <div class="flex gap-2">
                        <button @click="sendMessage(order)"
                            class="px-3 py-1 bg-green-600 hover:bg-green-700 rounded text-sm transition">
                            📧 Сообщение
                        </button>
                        <button @click="changeStatus(order, index)"
                            class="px-3 py-1 bg-purple-600 hover:bg-purple-700 rounded text-sm transition">
                            🔄 Статус
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Статистика -->
        <div class="mt-8 p-4 bg-neutral-800 rounded">
            <h3 class="text-lg font-semibold mb-4">Статистика заказов</h3>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div class="text-center">
                    <div class="text-2xl font-bold text-amber-400">{{ orders.length }}</div>
                    <div class="text-sm text-neutral-400">Всего заказов</div>
                </div>
                <div class="text-center">
                    <div class="text-2xl font-bold text-green-400">${{ totalRevenue }}</div>
                    <div class="text-sm text-neutral-400">Общая стоимость</div>
                </div>
                <div class="text-center">
                    <div class="text-2xl font-bold text-blue-400">{{ averageOrderValue }}</div>
                    <div class="text-sm text-neutral-400">Средний заказ</div>
                </div>
                <div class="text-center">
                    <div class="text-2xl font-bold text-purple-400">{{ ordersWithPromo }}</div>
                    <div class="text-sm text-neutral-400">Со скидкой</div>
                </div>
            </div>
        </div>

        <!-- Скрытый input для импорта файлов -->
        <input ref="fileInput" type="file" accept=".json" style="display: none" @change="handleFileImport" />
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { getOrders, updateOrderStatus, exportData, checkServerConnection } from '../utils/sqliteStorage.js'

// Состояние
const orders = ref([])
const searchContact = ref('')
const filterSiteType = ref('')
const filterStatus = ref('')
const fileInput = ref(null)

// Загрузка заказов из базы данных
onMounted(async () => {
    await loadOrders()
})

async function loadOrders() {
    try {
        // Проверяем подключение к серверу
        const isConnected = await checkServerConnection()

        if (isConnected) {
            // Загружаем из SQLite
            orders.value = await getOrders()
            console.log('✅ Loaded orders from database:', orders.value.length)
        } else {
            // Fallback: загружаем из localStorage
            const saved = localStorage.getItem('orders')
            orders.value = saved ? JSON.parse(saved) : []
            console.log('📦 Loaded orders from localStorage:', orders.value.length)
        }
    } catch (error) {
        console.error('Failed to load orders:', error)
        orders.value = []
    }
}

// Фильтрация заказов
const filteredOrders = computed(() => {
    return orders.value.filter(order => {
        const matchesContact = !searchContact.value ||
            order.contact.toLowerCase().includes(searchContact.value.toLowerCase())
        const matchesSiteType = !filterSiteType.value ||
            order.siteType === filterSiteType.value
        const matchesStatus = !filterStatus.value ||
            order.status === filterStatus.value

        return matchesContact && matchesSiteType && matchesStatus
    })
})

// Статистика
const totalRevenue = computed(() => {
    return orders.value.reduce((sum, order) => sum + order.discountedPrice, 0)
})

const averageOrderValue = computed(() => {
    return orders.value.length > 0 ? Math.round(totalRevenue.value / orders.value.length) : 0
})

const ordersWithPromo = computed(() => {
    return orders.value.filter(order => order.isPromoActive).length
})

// Функции
function formatDate(timestamp) {
    return new Date(timestamp).toLocaleString('ru-RU')
}

// Получить иконку и цвет для статуса
function getStatusInfo(status) {
    const statusMap = {
        'new': { icon: '🆕', color: 'text-blue-400', bgColor: 'bg-blue-500', label: 'Новый' },
        'processing': { icon: '⚙️', color: 'text-yellow-400', bgColor: 'bg-yellow-500', label: 'В работе' },
        'completed': { icon: '✅', color: 'text-green-400', bgColor: 'bg-green-500', label: 'Завершен' },
        'cancelled': { icon: '❌', color: 'text-red-400', bgColor: 'bg-red-500', label: 'Отменен' },
        'archived': { icon: '📦', color: 'text-gray-400', bgColor: 'bg-gray-500', label: 'Архив' }
    }
    return statusMap[status] || statusMap['new']
}

function viewOrderDetails(order) {
    // Форматируем детали заказа в читаемый текст
    const details = formatOrderDetails(order)

    // Создаем модальное окно с деталями
    const modal = document.createElement('div')
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'
    modal.innerHTML = `
        <div class="bg-neutral-800 text-white p-6 rounded-lg max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div class="flex justify-between items-center mb-4">
                <h3 class="text-xl font-bold text-amber-400">Детали заказа</h3>
                <button onclick="this.closest('.fixed').remove()" class="text-neutral-400 hover:text-white text-2xl">&times;</button>
            </div>
            <div class="space-y-4 text-sm">
                ${details}
            </div>
            <div class="mt-6 flex justify-end">
                <button onclick="this.closest('.fixed').remove()" class="bg-amber-500 text-neutral-900 px-4 py-2 rounded hover:bg-amber-600 transition">
                    Закрыть
                </button>
            </div>
        </div>
    `
    document.body.appendChild(modal)
}

function formatOrderDetails(order) {
    const sections = []

    // Основная информация
    sections.push(`
        <div class="bg-neutral-700 p-4 rounded">
            <h4 class="font-semibold text-amber-300 mb-2">📋 Основная информация</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div><span class="text-neutral-400">Тип сайта:</span> ${order.siteType}</div>
                <div><span class="text-neutral-400">Дата заказа:</span> ${formatDate(order.timestamp)}</div>
                <div><span class="text-neutral-400">Контакт:</span> ${order.contact}</div>
                <div><span class="text-neutral-400">Клиент:</span> ${order.clientName || 'Не указан'}</div>
                <div><span class="text-neutral-400">Email:</span> ${order.clientEmail || 'Не указан'}</div>
                <div><span class="text-neutral-400">Статус:</span> <span class="text-green-400">${order.status || 'Новый'}</span></div>
            </div>
        </div>
    `)

    // Цены
    sections.push(`
        <div class="bg-neutral-700 p-4 rounded">
            <h4 class="font-semibold text-amber-300 mb-2">💰 Стоимость</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div><span class="text-neutral-400">Итоговая цена:</span> <span class="text-green-400 font-bold">$${order.discountedPrice}</span></div>
                ${order.originalPrice !== order.discountedPrice ? `<div><span class="text-neutral-400">Исходная цена:</span> <span class="text-neutral-400 line-through">$${order.originalPrice}</span></div>` : ''}
                ${order.monthlyPrice > 0 ? `<div><span class="text-neutral-400">Ежемесячно:</span> <span class="text-blue-400">$${order.monthlyPrice}/мес</span></div>` : ''}
                ${order.isPromoActive ? `<div><span class="text-neutral-400">Скидка:</span> <span class="text-green-400">${order.discount}%</span></div>` : ''}
            </div>
        </div>
    `)

    // Параметры проекта
    sections.push(`
        <div class="bg-neutral-700 p-4 rounded">
            <h4 class="font-semibold text-amber-300 mb-2">⚙️ Параметры проекта</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div><span class="text-neutral-400">Количество страниц:</span> ${order.pages}</div>
                <div><span class="text-neutral-400">Дизайн:</span> ${order.design}</div>
                <div><span class="text-neutral-400">Контент:</span> ${order.content}</div>
                <div><span class="text-neutral-400">Сроки:</span> ${order.deadline}</div>
                <div><span class="text-neutral-400">Вариант сотрудничества:</span> ${order.cooperation}</div>
            </div>
        </div>
    `)

    // Функции
    if (order.features && order.features.length > 0) {
        sections.push(`
            <div class="bg-neutral-700 p-4 rounded">
                <h4 class="font-semibold text-amber-300 mb-2">🔧 Функции</h4>
                <div class="flex flex-wrap gap-2">
                    ${order.features.map(feature => `<span class="bg-amber-500 text-neutral-900 px-2 py-1 rounded text-xs">${feature}</span>`).join('')}
                </div>
            </div>
        `)
    }

    // Интеграции
    if (order.integrations && order.integrations.length > 0) {
        sections.push(`
            <div class="bg-neutral-700 p-4 rounded">
                <h4 class="font-semibold text-amber-300 mb-2">🔗 Интеграции</h4>
                <div class="flex flex-wrap gap-2">
                    ${order.integrations.map(integration => `<span class="bg-blue-500 text-white px-2 py-1 rounded text-xs">${integration}</span>`).join('')}
                </div>
            </div>
        `)
    }

    // Дополнительные услуги
    if (order.extra && order.extra.length > 0) {
        sections.push(`
            <div class="bg-neutral-700 p-4 rounded">
                <h4 class="font-semibold text-amber-300 mb-2">➕ Дополнительные услуги</h4>
                <div class="flex flex-wrap gap-2">
                    ${order.extra.map(service => `<span class="bg-green-500 text-white px-2 py-1 rounded text-xs">${service}</span>`).join('')}
                </div>
            </div>
        `)
    }

    // Описание проекта
    if (order.description) {
        sections.push(`
            <div class="bg-neutral-700 p-4 rounded">
                <h4 class="font-semibold text-amber-300 mb-2">📝 Описание проекта</h4>
                <div class="text-neutral-300 whitespace-pre-wrap">${order.description}</div>
            </div>
        `)
    }

    // Техническая информация
    sections.push(`
        <div class="bg-neutral-700 p-4 rounded">
            <h4 class="font-semibold text-amber-300 mb-2">🔍 Техническая информация</h4>
            <div class="grid grid-cols-1 gap-2 text-xs text-neutral-400">
                <div><span class="text-neutral-400">ID заказа:</span> ${order.id || 'Не указан'}</div>
                <div><span class="text-neutral-400">User Agent:</span> ${order.userAgent ? order.userAgent.substring(0, 50) + '...' : 'Не указан'}</div>
            </div>
        </div>
    `)

    return sections.join('')
}

function editOrder(order, index) {
    // Создаем модальное окно для редактирования
    const modal = document.createElement('div')
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'
    modal.innerHTML = `
        <div class="bg-neutral-800 text-white p-6 rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div class="flex justify-between items-center mb-4">
                <h3 class="text-xl font-bold text-amber-400">Редактировать заказ</h3>
                <button onclick="this.closest('.fixed').remove()" class="text-neutral-400 hover:text-white text-2xl">&times;</button>
            </div>
            
            <form id="editOrderForm" class="space-y-4">
                <!-- Основная информация -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium mb-2">Тип сайта:</label>
                        <select name="siteType" class="w-full px-3 py-2 bg-neutral-700 rounded border border-neutral-600 focus:border-amber-500 focus:outline-none">
                            <option value="Landing page" ${order.siteType === 'Landing page' ? 'selected' : ''}>Landing page</option>
                            <option value="Catalog/menu" ${order.siteType === 'Catalog/menu' ? 'selected' : ''}>Catalog/menu</option>
                            <option value="E-commerce" ${order.siteType === 'E-commerce' ? 'selected' : ''}>E-commerce</option>
                            <option value="Portfolio" ${order.siteType === 'Portfolio' ? 'selected' : ''}>Portfolio</option>
                            <option value="Company/blog" ${order.siteType === 'Company/blog' ? 'selected' : ''}>Company/blog</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-2">Статус:</label>
                        <select name="status" class="w-full px-3 py-2 bg-neutral-700 rounded border border-neutral-600 focus:border-amber-500 focus:outline-none">
                            <option value="new" ${order.status === 'new' ? 'selected' : ''}>Новый</option>
                            <option value="processing" ${order.status === 'processing' ? 'selected' : ''}>В работе</option>
                            <option value="completed" ${order.status === 'completed' ? 'selected' : ''}>Завершен</option>
                            <option value="cancelled" ${order.status === 'cancelled' ? 'selected' : ''}>Отменен</option>
                            <option value="archived" ${order.status === 'archived' ? 'selected' : ''}>Архив</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-2">Контакт:</label>
                        <input type="text" name="contact" value="${order.contact || ''}" 
                            class="w-full px-3 py-2 bg-neutral-700 rounded border border-neutral-600 focus:border-amber-500 focus:outline-none">
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-2">Email клиента:</label>
                        <input type="email" name="clientEmail" value="${order.clientEmail || ''}" 
                            class="w-full px-3 py-2 bg-neutral-700 rounded border border-neutral-600 focus:border-amber-500 focus:outline-none">
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-2">Имя клиента:</label>
                        <input type="text" name="clientName" value="${order.clientName || ''}" 
                            class="w-full px-3 py-2 bg-neutral-700 rounded border border-neutral-600 focus:border-amber-500 focus:outline-none">
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-2">Количество страниц:</label>
                        <input type="text" name="pages" value="${order.pages || ''}" 
                            class="w-full px-3 py-2 bg-neutral-700 rounded border border-neutral-600 focus:border-amber-500 focus:outline-none">
                    </div>
                </div>

                <!-- Цены -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label class="block text-sm font-medium mb-2">Итоговая цена ($):</label>
                        <input type="number" name="discountedPrice" value="${order.discountedPrice || 0}" 
                            class="w-full px-3 py-2 bg-neutral-700 rounded border border-neutral-600 focus:border-amber-500 focus:outline-none">
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-2">Исходная цена ($):</label>
                        <input type="number" name="originalPrice" value="${order.originalPrice || 0}" 
                            class="w-full px-3 py-2 bg-neutral-700 rounded border border-neutral-600 focus:border-amber-500 focus:outline-none">
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-2">Ежемесячно ($):</label>
                        <input type="number" name="monthlyPrice" value="${order.monthlyPrice || 0}" 
                            class="w-full px-3 py-2 bg-neutral-700 rounded border border-neutral-600 focus:border-amber-500 focus:outline-none">
                    </div>
                </div>

                <!-- Описание -->
                <div>
                    <label class="block text-sm font-medium mb-2">Описание проекта:</label>
                    <textarea name="description" rows="4" 
                        class="w-full px-3 py-2 bg-neutral-700 rounded border border-neutral-600 focus:border-amber-500 focus:outline-none">${order.description || ''}</textarea>
                </div>

                <!-- Кнопки -->
                <div class="flex justify-end gap-4 pt-4 border-t border-neutral-700">
                    <button type="button" onclick="this.closest('.fixed').remove()" 
                        class="px-4 py-2 bg-neutral-600 hover:bg-neutral-700 rounded transition">
                        Отмена
                    </button>
                    <button type="submit" 
                        class="px-4 py-2 bg-amber-500 text-neutral-900 hover:bg-amber-600 rounded transition">
                        Сохранить изменения
                    </button>
                </div>
            </form>
        </div>
    `

    document.body.appendChild(modal)

    // Обработчик отправки формы
    const form = modal.querySelector('#editOrderForm')
    form.addEventListener('submit', (e) => {
        e.preventDefault()

        const formData = new FormData(form)
        const updatedOrder = {
            ...order,
            siteType: formData.get('siteType'),
            status: formData.get('status'),
            contact: formData.get('contact'),
            clientEmail: formData.get('clientEmail'),
            clientName: formData.get('clientName'),
            pages: formData.get('pages'),
            discountedPrice: Number(formData.get('discountedPrice')),
            originalPrice: Number(formData.get('originalPrice')),
            monthlyPrice: Number(formData.get('monthlyPrice')),
            description: formData.get('description')
        }

        // Обновляем заказ в массиве
        orders.value[index] = updatedOrder

        // Сохраняем изменения
        saveOrders()

        // Закрываем модальное окно
        modal.remove()

        // Показываем уведомление
        alert('✅ Заказ успешно обновлен!')
    })
}



function sendMessage(order) {
    const clientEmail = order.clientEmail || order.contact
    if (!clientEmail) {
        alert('❌ Email клиента не указан')
        return
    }

    const subject = `${order.projectId || 'Заказ #' + (order.id || 'NEW')} - ${order.siteType}`
    const body = `Здравствуйте${order.clientName ? ', ' + order.clientName : ''}!

По поводу вашего заказа ${order.projectId || '#' + (order.id || 'NEW')}:
- Тип сайта: ${order.siteType}
- Описание: ${order.description || 'Не указано'}
- Стоимость: $${order.discountedPrice}

Пожалуйста, укажите дополнительную информацию или задайте вопросы.

С уважением,
Команда разработки`

    const mailtoLink = `mailto:${clientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

    // Создаем временную ссылку и кликаем по ней
    const link = document.createElement('a')
    link.href = mailtoLink
    link.style.display = 'none'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}

function changeStatus(order, index) {
    const statusOptions = [
        { value: 'new', label: '🆕 Новый' },
        { value: 'processing', label: '⚙️ В работе' },
        { value: 'completed', label: '✅ Завершен' },
        { value: 'cancelled', label: '❌ Отменен' },
        { value: 'archived', label: '📦 Архив' }
    ]

    const currentStatus = order.status || 'new'
    const currentStatusInfo = getStatusInfo(currentStatus)

    const modal = document.createElement('div')
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'
    modal.innerHTML = `
        <div class="bg-neutral-800 text-white p-6 rounded-lg max-w-md w-full mx-4">
            <div class="flex justify-between items-center mb-4">
                <h3 class="text-xl font-bold text-amber-400">Изменить статус заказа</h3>
                <button onclick="this.closest('.fixed').remove()" class="text-neutral-400 hover:text-white text-2xl">&times;</button>
            </div>
            
            <div class="mb-4">
                <p class="text-sm text-neutral-400 mb-2">Текущий статус:</p>
                <div class="flex items-center gap-2 p-3 bg-neutral-700 rounded">
                    <span class="text-lg">${currentStatusInfo.icon}</span>
                    <span class="font-medium ${currentStatusInfo.color}">${currentStatusInfo.label}</span>
                </div>
            </div>
            
            <div class="space-y-2">
                <p class="text-sm text-neutral-400 mb-3">Выберите новый статус:</p>
                ${statusOptions.map(option => `
                    <button onclick="changeOrderStatus('${option.value}', ${index})" 
                        class="w-full text-left p-3 rounded border border-neutral-600 hover:border-amber-500 hover:bg-neutral-700 transition ${option.value === currentStatus ? 'bg-neutral-700 border-amber-500' : ''}">
                        <span class="text-lg">${option.label.split(' ')[0]}</span>
                        <span class="ml-2">${option.label.split(' ').slice(1).join(' ')}</span>
                    </button>
                `).join('')}
            </div>
            
            <div class="mt-6 flex justify-end">
                <button onclick="this.closest('.fixed').remove()" 
                    class="px-4 py-2 bg-neutral-600 hover:bg-neutral-700 rounded transition">
                    Отмена
                </button>
            </div>
        </div>
    `

    document.body.appendChild(modal)

    // Добавляем глобальную функцию для изменения статуса
    window.changeOrderStatus = function (newStatus, index) {
        const updatedOrder = { ...orders.value[index], status: newStatus }
        orders.value[index] = updatedOrder
        saveOrders()
        modal.remove()

        const newStatusInfo = getStatusInfo(newStatus)
        alert(`✅ Статус изменен на: ${newStatusInfo.label}`)
    }
}





function saveOrders() {
    console.log('Saving orders to localStorage:', orders.value)
    localStorage.setItem('orders', JSON.stringify(orders.value))
}



// Экспорт функции для добавления новых заказов
function addOrder(orderData) {
    console.log('Adding new order:', orderData)
    orders.value.unshift(orderData)
    saveOrders()
}

// Экспортируем функцию для использования в других компонентах
defineExpose({ addOrder })


</script>

<style scoped>
.order-card {
    transition: all 0.3s ease;
}

.order-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}
</style>