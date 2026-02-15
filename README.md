````md
После клонирования репозитория открыть папку с проектом:

cd backend
docker compose up -d --build
docker compose exec php sh
composer install
php artisan migrate:fresh --seed

(если необходимо будет глянуть логи):
exit
docker compose logs -f php
````

Далее фронтенд часть (предварительно выйти из контейнера):

```bash
exit
cd ..\frontend
npm install
npm run dev
```

Полезные скрипты добавил для фронта: eslint, prettier и проверку typescript на ошибки, и для бэка: pint

```bash
npm run lint
npm run format
npm run typecheck

docker compose exec php composer lint
```

Особо над дизайном ui не думал, сделал просто. </br>
Если предоставите макет - повторю его в точности. </br>
Примерное затраченное вермя 10-11 часов

