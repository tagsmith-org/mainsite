# 🔗 Подключение к серверу по IP адресу

## Информация о сервере
- **IP адрес**: `178.156.135.213`
- **SSH порт**: `22` (стандартный)
- **HTTP порт**: `80` (стандартный)

## Подключение по SSH

### Вариант 1: Подключение с паролем
```bash
ssh user@178.156.135.213
```

### Вариант 2: Подключение с SSH ключом
```bash
ssh -i ~/.ssh/id_rsa user@178.156.135.213
```

### Вариант 3: Подключение как root
```bash
ssh root@178.156.135.213
```

## Загрузка файлов на сервер

### Загрузка скрипта исправления nginx
```bash
scp fix-nginx-config.sh user@178.156.135.213:/tmp/
```

### Загрузка других файлов
```bash
scp filename user@178.156.135.213:/path/to/destination/
```

## Проверка статуса сервера

### Локальная проверка (без SSH)
```bash
./check-server-status.sh
```

### Проверка через браузер
- Главная страница: http://178.156.135.213
- Страница услуг: http://178.156.135.213/services
- Портфолио: http://178.156.135.213/portfolio
- Контакты: http://178.156.135.213/contact

## Диагностика проблем

### Если SSH не работает:
1. Проверьте правильность IP адреса
2. Убедитесь, что порт 22 открыт
3. Попробуйте подключиться как root
4. Проверьте настройки SSH на сервере

### Если сайт не работает:
1. Запустите `./check-server-status.sh`
2. Проверьте логи nginx: `sudo tail -f /var/log/nginx/error.log`
3. Проверьте статус nginx: `sudo systemctl status nginx`

## Автоматическое исправление

После подключения к серверу:
```bash
cd /tmp
chmod +x fix-nginx-config.sh
sudo ./fix-nginx-config.sh
```

## Полезные команды на сервере

```bash
# Проверка статуса nginx
sudo systemctl status nginx

# Проверка конфигурации nginx
sudo nginx -t

# Перезагрузка nginx
sudo systemctl reload nginx

# Просмотр логов nginx
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log

# Проверка файлов сайта
ls -la /var/www/mainsite/
cat /var/www/mainsite/index.html | head -10

# Проверка прав доступа
sudo chown -R www-data:www-data /var/www/mainsite/
sudo chmod -R 755 /var/www/mainsite/
```
