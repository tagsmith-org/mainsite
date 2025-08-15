# 🔧 Исправление ошибки 404 на /services

## Проблема
Страница http://178.156.135.213/services возвращает ошибку 404, хотя маршрут настроен правильно в Vue Router.

## Причина
Неправильная конфигурация nginx для SPA (Single Page Application) маршрутов.

## Решение

### Вариант 1: Автоматическое исправление (рекомендуется)

1. Подключитесь к серверу по SSH
2. Загрузите и запустите скрипт исправления:

```bash
# Загрузить скрипт на сервер
scp fix-nginx-config.sh user@178.156.135.213:/tmp/

# Подключиться к серверу
ssh user@178.156.135.213

# Перейти в директорию со скриптом
cd /tmp

# Сделать скрипт исполняемым
chmod +x fix-nginx-config.sh

# Запустить скрипт
sudo ./fix-nginx-config.sh
```

### Вариант 2: Ручное исправление

1. Подключитесь к серверу по SSH
2. Создайте резервную копию текущей конфигурации:

```bash
sudo cp /etc/nginx/sites-available/mainsite /etc/nginx/sites-available/mainsite.backup.$(date +%Y%m%d_%H%M%S)
```

3. Отредактируйте конфигурацию nginx:

```bash
sudo nano /etc/nginx/sites-available/mainsite
```

4. Убедитесь, что в блоке `location /` указан правильный путь:

```nginx
location / {
    root /var/www/mainsite;  # НЕ /var/www/mainsite/dist
    try_files $uri $uri/ /index.html;
    
    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

5. Проверьте конфигурацию:

```bash
sudo nginx -t
```

6. Перезагрузите nginx:

```bash
sudo systemctl reload nginx
```

## Проверка

После исправления проверьте:

1. Статус nginx: `sudo systemctl status nginx`
2. Логи nginx: `sudo tail -f /var/log/nginx/error.log`
3. Доступность страницы: http://178.156.135.213/services

## Дополнительная диагностика

Если проблема остается, проверьте:

1. **Файлы на сервере:**
```bash
ls -la /var/www/mainsite/
cat /var/www/mainsite/index.html | head -10
```

2. **Права доступа:**
```bash
sudo chown -R www-data:www-data /var/www/mainsite/
sudo chmod -R 755 /var/www/mainsite/
```

3. **Конфигурация nginx:**
```bash
sudo nginx -T | grep -A 10 "server_name 178.156.135.213"
```

## Что было исправлено

1. **GitHub Actions**: Убрал лишний шаг перемещения файлов из `dist/` в корень
2. **Nginx конфигурация**: Изменил путь с `/var/www/mainsite/dist` на `/var/www/mainsite`
3. **Добавлен скрипт автоматического исправления**: `fix-nginx-config.sh`

После применения этих изменений SPA маршруты должны работать корректно.
