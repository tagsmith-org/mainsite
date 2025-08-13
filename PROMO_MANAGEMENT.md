# Управление промо-акциями

## Быстрое управление

### 1. Изменение активной акции
Отредактируйте файл `src/config/promo.js`:

```js
export const promoConfig = {
  // Измените эту строку для переключения акций
  activePromo: 'summerPromo', // или 'firstOrdersPromo', 'defaultPromo', 'winterPromo'
  
  // ... остальные настройки
}
```

### 2. Настройка акций

#### Летняя акция (summerPromo)
```js
summerPromo: {
  name: 'Summer Sale',
  discount: 0.1, // 10% скидка
  startDate: '2025-07-01',
  endDate: '2025-08-01',
  label: '10% until August 1',
  description: 'Get 10% off on all website orders until August 1st!'
}
```

#### Акция для первых заказов (firstOrdersPromo)
```js
firstOrdersPromo: {
  name: 'First Orders',
  discount: 0.5, // 50% скидка
  maxOrders: 3,
  label: '50% for first 3 orders',
  description: 'First 3 orders get 50% discount!'
}
```

#### Постоянная акция (defaultPromo)
```js
defaultPromo: {
  name: 'Default',
  discount: 0.1, // 10% скидка
  label: '10% discount',
  description: 'Standard 10% discount'
}
```

### 3. Добавление новой акции

1. Добавьте новую акцию в `src/config/promo.js`:
```js
newPromo: {
  name: 'New Year Sale',
  discount: 0.25, // 25% скидка
  startDate: '2025-12-25',
  endDate: '2026-01-15',
  label: '25% New Year Sale',
  description: 'Get 25% off for New Year!'
}
```

2. Переключитесь на неё:
```js
activePromo: 'newPromo'
```

## Управление в режиме разработки

### Promo Manager
В правом нижнем углу есть панель управления (только в режиме разработки):
- Выбор активной акции
- Статус акции (активна/неактивна)
- Текущая скидка
- Кнопка перезагрузки конфигурации

### Горячая перезагрузка
После изменения `src/config/promo.js` нажмите кнопку "🔄 Reload Config" в Promo Manager.

## Автоматическая проверка дат

Акции с датами автоматически активируются/деактивируются:
- `startDate` - дата начала акции
- `endDate` - дата окончания акции
- Если дат нет - акция всегда активна

## Примеры использования

### Временная акция
```js
temporaryPromo: {
  name: 'Flash Sale',
  discount: 0.4,
  startDate: '2025-07-15',
  endDate: '2025-07-20',
  label: '40% Flash Sale',
  description: 'Flash sale for 5 days only!'
}
```

### Постоянная скидка
```js
permanentPromo: {
  name: 'Loyalty Discount',
  discount: 0.15,
  label: '15% Loyalty Discount',
  description: 'Permanent 15% discount for loyal customers'
}
```

## Применение изменений

1. Отредактируйте `src/config/promo.js`
2. Сохраните файл
3. Нажмите "🔄 Reload Config" в Promo Manager
4. Изменения применятся мгновенно без перезагрузки страницы 