# Layout System Guide

## Overview

Проект использует единую систему layout компонентов для обеспечения консистентной ширины и структуры страниц.

## Components

### Layout.vue
Основной компонент layout, который содержит:
- Header с навигацией
- Main контейнер с единой шириной (`max-w-4xl mx-auto px-6 py-10`)
- Footer
- DebugInfo компонент для отладки

### Container.vue (Deprecated)
Компонент был создан, но не используется, так как Layout уже обеспечивает контейнер.

## Usage

### В App.vue
```vue
<template>
  <Layout>
    <RouterView />
  </Layout>
</template>
```

### В страницах
Layout уже обеспечивает контейнер `max-w-4xl mx-auto px-6 py-10`, поэтому в страницах используется:
```vue
<template>
  <section class="py-20">
    <div class="max-w-6xl mx-auto">
      <!-- Контент -->
    </div>
  </section>
</template>
```

## Benefits

1. **Консистентная ширина** - все страницы используют единую систему контейнеров
2. **Простота** - нет двойных контейнеров
3. **DRY принцип** - нет дублирования layout кода
4. **Легкость поддержки** - изменения в layout применяются ко всем страницам

## Current Page Widths

Все страницы теперь используют одинаковую ширину через Layout:
- **Home** - Layout container (max-w-4xl mx-auto px-6)
- **Services** - Layout container (max-w-4xl mx-auto px-6)  
- **Portfolio** - Layout container (max-w-4xl mx-auto px-6)
- **Contact** - Layout container (max-w-4xl mx-auto px-6)

## Migration

Все страницы были обновлены:
- Убраны Container компоненты (двойные контейнеры)
- Используется только Layout контейнер
- Добавлены TypeScript типы
- Улучшена структура кода 