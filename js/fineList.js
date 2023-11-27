"use strict";
window.fineList = {
    searchFines: searchFines
}

//Ця зміна містить всі дані які в нас зберігаються у файлі data
let DB = data.finesData;

function searchFines(searchKey) {
    /*
     Напишіть свій код тут!
     Як ви бачите функція повертає статичні дані.
     Замість масиву який прописаний хардкодом, вам необхідно реалізувати цю функцію
     так, щоб вона повертала масив відповідно переданому значенню в функцію.
     Саме значення - це "Пошук за номером" або "Пошук за типом штрафу"
     Тип штрафу може бути тільки
     - Перевищення швидкості
     - Невірне паркування
     - Їзда у не тверезому стані
     */

    let targetArray = [];
    let fineTypeRegex = /^(Перевищення швидкості|Невірне паркування|Їзда у не тверезому стані)$/;
    // Check if input is empty or not
    if (searchKey == '') {
        alert('Задайте критерій пошуку!');
        return;
    };

    // Check if input is fine number or type
    if (isNaN(Number(searchKey))) {
        if (fineTypeRegex.test(searchKey)) {
            targetArray = DB.filter(item => item['тип'] == searchKey);
        } else {
            alert('Недопустимий тип штрафу!');
        }
    } else {
        targetArray = DB.filter(item => Number(item['номер']) == Number(searchKey));
    }
    return targetArray;
}

