
// Подключаем модули
var request = require('request');
var cheerio = require('cheerio');

// Делаем запрос на новостной ресурс
request('https://ria.ru/lenta', function (error, response, html)
{
    if (error)
    {
       throw error;
    }

    if (response.statusCode !== 200)
    {
        console.log('Incorrect statusCode: ' + response.statusCode);
    }

    var $ = cheerio.load(html);

    // Выделяем блоки новостей в ленте и выводим в консоль информацию из каждого необходимого элемента блока
    $('.b-list__item').each(function (i, elem)
    {
        console.log('Новость с РИА #' + ++i);
        console.log('Заголовок: ' + $(elem).find('a').text().trim());
        console.log('Текст: ' + $(elem).find('.b-list__item-announce').text().trim());
        console.log('Время: ' + $(elem).find('.b-list__item-time').text().trim() + ' | Дата: ' + $(elem).find('.b-list__item-date').text().trim());
        console.log('Комментариев: ' + $(elem).find('.m-comments > .b-statistic__number').text().trim() + ' | Просмотров: ' + $(elem).find('.m-views > .b-statistic__number').text().trim());
        console.log('----------------------');
    });
});
