<template>
    <!-- Pricing Section -->
    <section class="mx-auto max-w-6xl px-4 py-12">
        <header class="mb-8 text-center">
            <h2 class="text-3xl font-bold tracking-tight">Тарифы на разработку сайтов</h2>
            <p class="mt-2 text-gray-600">Прозрачно: код — ваш. Хостинг и поддержка — по желанию.</p>
        </header>

        <!-- Cards: Только разработка / Разработка + обслуживание -->
        <div class="grid gap-6 md:grid-cols-2">
            <!-- Только разработка -->
            <div class="rounded-2xl border border-gray-200 p-6 shadow-sm">
                <h3 class="text-xl font-semibold">Только разработка</h3>
                <p class="mt-1 text-sm text-gray-600">Исходники и инструкции — на вашей стороне.</p>
                <div class="mt-4 space-y-2 text-sm">
                    <div class="flex items-start gap-2">
                        <span class="mt-1 inline-block h-2 w-2 rounded-full bg-emerald-500"></span>
                        <span>Разработка сайта выбранного типа (Landing, многостраничный, портфолио, магазин и
                            т.д.)</span>
                    </div>
                    <div class="flex items-start gap-2">
                        <span class="mt-1 inline-block h-2 w-2 rounded-full bg-emerald-500"></span>
                        <span>Исходный код: архив или GitHub-репозиторий</span>
                    </div>
                    <div class="flex items-start gap-2">
                        <span class="mt-1 inline-block h-2 w-2 rounded-full bg-emerald-500"></span>
                        <span>README с понятными шагами развёртывания</span>
                    </div>
                </div>
                <div class="mt-6">
                    <div class="text-2xl font-bold">от $100 до $900</div>
                    <div class="text-xs text-gray-500">в зависимости от типа и сложности</div>
                </div>
                <div class="mt-6">
                    <a href="#contact"
                        class="inline-flex items-center justify-center rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50">Оставить
                        заявку</a>
                </div>
            </div>

            <!-- Разработка + обслуживание -->
            <div class="rounded-2xl border border-gray-200 p-6 shadow-sm">
                <h3 class="text-xl font-semibold">Разработка + обслуживание</h3>
                <p class="mt-1 text-sm text-gray-600">Я размещаю и поддерживаю ваш сайт.</p>
                <div class="mt-4 space-y-2 text-sm">
                    <div class="flex items-start gap-2">
                        <span class="mt-1 inline-block h-2 w-2 rounded-full bg-blue-600"></span>
                        <span>Всё из тарифа «Только разработка»</span>
                    </div>
                    <div class="flex items-start gap-2">
                        <span class="mt-1 inline-block h-2 w-2 rounded-full bg-blue-600"></span>
                        <span>Хостинг на Hetzner VPS</span>
                    </div>
                    <div class="flex items-start gap-2">
                        <span class="mt-1 inline-block h-2 w-2 rounded-full bg-blue-600"></span>
                        <span>Техподдержка: обновления, мониторинг, мелкие правки</span>
                    </div>
                </div>
                <div class="mt-6">
                    <div class="text-2xl font-bold">+$15–30/мес</div>
                    <div class="text-xs text-gray-500">дополнительно к цене разработки</div>
                </div>
                <div class="mt-6">
                    <a href="#contact"
                        class="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Подключить
                        обслуживание</a>
                </div>
                <div class="mt-4 text-xs text-gray-500">
                    Домен клиент оплачивает самостоятельно (по желанию помогу оформить).
                </div>
            </div>
        </div>

        <!-- Примеры цен по типам сайтов -->
        <div class="mt-12 overflow-hidden rounded-2xl border border-gray-200">
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                    <tr>
                        <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">Тип сайта</th>
                        <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">Цена разработки</th>
                        <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">С обслуживанием</th>
                        <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">Кому подходит</th>
                        <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">Демо</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-100 bg-white">
                    <tr>
                        <td class="px-4 py-3 text-sm font-medium">Сайт-визитка</td>
                        <td class="px-4 py-3 text-sm">$100–200</td>
                        <td class="px-4 py-3 text-sm">+$15/мес</td>
                        <td class="px-4 py-3 text-sm text-gray-600">Индивидуальные специалисты, консультанты, юристы
                        </td>
                        <td class="px-4 py-3 text-sm"><a href="/demo/personal/"
                                class="text-blue-600 hover:underline">смотреть</a></td>
                    </tr>
                    <tr>
                        <td class="px-4 py-3 text-sm font-medium">Лендинг</td>
                        <td class="px-4 py-3 text-sm">$150–300</td>
                        <td class="px-4 py-3 text-sm">+$15/мес</td>
                        <td class="px-4 py-3 text-sm text-gray-600">Запуск продукта, услуга, акция, событие</td>
                        <td class="px-4 py-3 text-sm"><a href="/demo/landing/"
                                class="text-blue-600 hover:underline">смотреть</a></td>
                    </tr>
                    <tr>
                        <td class="px-4 py-3 text-sm font-medium">Портфолио</td>
                        <td class="px-4 py-3 text-sm">$250–500</td>
                        <td class="px-4 py-3 text-sm">+$20/мес</td>
                        <td class="px-4 py-3 text-sm text-gray-600">Дизайнеры, фотографы, архитекты, фрилансеры</td>
                        <td class="px-4 py-3 text-sm"><a href="/demo/portfolio/"
                                class="text-blue-600 hover:underline">смотреть</a></td>
                    </tr>
                    <tr>
                        <td class="px-4 py-3 text-sm font-medium">Многостраничный промо-сайт</td>
                        <td class="px-4 py-3 text-sm">$300–600</td>
                        <td class="px-4 py-3 text-sm">+$20/мес</td>
                        <td class="px-4 py-3 text-sm text-gray-600">Компании услуг: салоны, юристы, ремонт, агентства
                        </td>
                        <td class="px-4 py-3 text-sm"><a href="/demo/promo/"
                                class="text-blue-600 hover:underline">смотреть</a></td>
                    </tr>
                    <tr>
                        <td class="px-4 py-3 text-sm font-medium">Мини-магазин (до 20 товаров)</td>
                        <td class="px-4 py-3 text-sm">$500–900</td>
                        <td class="px-4 py-3 text-sm">+$30/мес</td>
                        <td class="px-4 py-3 text-sm text-gray-600">Авторские товары, пекарни, флористы, ремесленники
                        </td>
                        <td class="px-4 py-3 text-sm"><a href="/demo/shop/"
                                class="text-blue-600 hover:underline">смотреть</a></td>
                    </tr>
                    <tr>
                        <td class="px-4 py-3 text-sm font-medium">Инфо-сайт / блог</td>
                        <td class="px-4 py-3 text-sm">$300–700</td>
                        <td class="px-4 py-3 text-sm">+$20/мес</td>
                        <td class="px-4 py-3 text-sm text-gray-600">Статьи, новости, образовательные проекты</td>
                        <td class="px-4 py-3 text-sm"><a href="/demo/blog/"
                                class="text-blue-600 hover:underline">смотреть</a></td>
                    </tr>
                    <tr>
                        <td class="px-4 py-3 text-sm font-medium">Event-page / рекламная</td>
                        <td class="px-4 py-3 text-sm">$150–300</td>
                        <td class="px-4 py-3 text-sm">+$15/мес</td>
                        <td class="px-4 py-3 text-sm text-gray-600">Концерты, конференции, мастер-классы</td>
                        <td class="px-4 py-3 text-sm"><a href="/demo/event/"
                                class="text-blue-600 hover:underline">смотреть</a></td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Notices -->
        <div class="mt-6 space-y-2 text-sm text-gray-600">
            <p>Все цены ориентировочные и зависят от дизайна и интеграций. Итоговая смета фиксируется перед началом
                работ.</p>
            <p>Домен <span class="font-medium">не входит</span> в стоимость: клиент оплачивает самостоятельно (по
                желанию помогу оформить).</p>
        </div>
    </section>


    <section id="support" class="py-20 bg-neutral-800 text-neutral-300">
        <div class="max-w-5xl mx-auto px-6">
            <h2 class="text-2xl font-semibold text-center mb-12 text-amber-400">Technical Help & Hosting</h2>
            <div class="grid md:grid-cols-2 gap-6">
                <div class="bg-neutral-900 p-6 rounded-lg shadow">
                    <h3 class="text-lg font-bold mb-2 text-white">Hosting on My Server</h3>
                    <p class="text-sm">
                        No hosting? No problem. I can host your site securely on my private server for a small monthly
                        fee or as part of a care plan.
                    </p>
                </div>
                <div class="bg-neutral-900 p-6 rounded-lg shadow">
                    <h3 class="text-lg font-bold mb-2 text-white">Setup on Your Hosting</h3>
                    <p class="text-sm">
                        I’ll deploy the site to your own hosting platform, set up DNS, and make sure everything runs
                        smoothly — even if you’re not tech-savvy.
                    </p>
                </div>
                <div class="bg-neutral-900 p-6 rounded-lg shadow">
                    <h3 class="text-lg font-bold mb-2 text-white">Custom Domain & Email</h3>
                    <p class="text-sm">
                        I can help you register a domain name and set up a branded email address (like
                        info@yourbusiness.com).
                    </p>
                </div>
                <div class="bg-neutral-900 p-6 rounded-lg shadow">
                    <h3 class="text-lg font-bold mb-2 text-white">One-Time Tech Support</h3>
                    <p class="text-sm">
                        Need post-launch tweaks, bug fixes, or help with 3rd-party integrations? I offer one-time
                        support and troubleshooting.
                    </p>
                </div>
            </div>
        </div>
    </section>

    <section id="tech-services" class="py-20 bg-neutral-900 text-white">
        <div class="max-w-5xl mx-auto px-6">
            <h2 class="text-2xl font-semibold text-center mb-12 text-amber-400">Technical Services</h2>
            <div class="grid md:grid-cols-2 gap-6 text-neutral-300 text-sm">
                <div class="bg-neutral-800 p-6 rounded-lg shadow hover:shadow-md transition">
                    <h3 class="text-lg font-bold text-white mb-2">🖥️ Hosting on My Server</h3>
                    <p>Optional monthly hosting on my secure VPS. Fast, optimized, and maintained.</p>
                </div>
                <div class="bg-neutral-800 p-6 rounded-lg shadow hover:shadow-md transition">
                    <h3 class="text-lg font-bold text-white mb-2">🛠️ Installation Help</h3>
                    <p>I can assist with installing the site on your own hosting, or do it fully for you.</p>
                </div>
                <div class="bg-neutral-800 p-6 rounded-lg shadow hover:shadow-md transition">
                    <h3 class="text-lg font-bold text-white mb-2">🌐 Domain & DNS Setup</h3>
                    <p>I'll help configure your domain, DNS records, and optional email redirection.</p>
                </div>
                <div class="bg-neutral-800 p-6 rounded-lg shadow hover:shadow-md transition">
                    <h3 class="text-lg font-bold text-white mb-2">🔧 Ongoing Support</h3>
                    <p>Need minor edits or fixes later? I'm available for light support as needed.</p>
                </div>
                <div class="bg-neutral-800 p-6 rounded-lg shadow hover:shadow-md transition">
                    <h3 class="text-lg font-bold text-white mb-2">📦 GitHub Delivery</h3>
                    <p>Code is delivered via GitHub with clear instructions. You're in full control.</p>
                </div>
                <div class="bg-neutral-800 p-6 rounded-lg shadow hover:shadow-md transition">
                    <h3 class="text-lg font-bold text-white mb-2">💡 Tech Consulting</h3>
                    <p>Need feedback on your existing site or hosting setup? I’ll review it and offer simple, actionable
                        suggestions.</p>
                </div>
            </div>
        </div>
    </section>



</template>