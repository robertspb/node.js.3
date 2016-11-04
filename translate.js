// Подключаем модули
var request = require('request');
var url = require('url');
var cheerio = require('cheerio');
var readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Парсим url для запроса
var params = url.parse(
    'https://translate.yandex.net/api/v1.5/tr/translate?key=mykey&text=mytext&lang=langs',
    true
);

// Задаем настройки ключа API и направления перевода
params.search = undefined;
params.query = {
    key: 'trnsl.1.1.20161104T173132Z.1e7380b544791e16.0861c43e83c7df46af6be045cf06ff18a605778b',
    lang: 'en-ru'
};

// Запрос ввода текста для перевода
rl.write('-- Что перевести?\n');

// Запуск обработчика
rl.on('line', function (text)
{
    params.query.text = text;   // Донастройка параметра url - включение текста для перевода

    var translateUrl = url.format(params); // Формируем url
    
    // Делаем GET запрос на сформированный url
    request({
        method: 'get',
        uri: translateUrl,
    }, function (error, response, body) {
        if (error)
            throw error;

        var $ = cheerio.load(body);
        
        // Выделяем с полученного документа текст перевода и выводим его в консоль
        var translation = $('text').text().trim();
        console.log('-- Перевод:\n' + translation);
    });

    this.close(); // Завершаем работу обработчика
});