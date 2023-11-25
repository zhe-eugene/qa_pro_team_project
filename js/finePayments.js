"use strict";
/**
Перед вами список полів. Це можна сказати пряме посилання на кожне із полів форми.
Якщо ви додасте до змінної .value (fineNumber.value) то отримаєте значення
яке зберігається в цьому полі.
 */
let fineNumber = document.getElementById("fineNumber");
let passport = document.getElementById("passport");
let creditCardNumber = document.getElementById("creditCardNumber");
let cvv = document.getElementById("cvv");
let amount = document.getElementById("amount");
let buttonSubmit = document.getElementById("payFine");

//Ця зміна містить всі дані які в нас зберігаються у файлі data
let DB = data.finesData;


/**
Вам необхідно реалізувати наступний функціонал.
Зробити валідацію до всіх полів
1. Номер та сума повинні бути однакові як в існуючого штрафу - якщо ні видавати
alert "Номер не співпадає" або "Сума не співпадає"

2. Паспортні дані у форматі - перші дві літери укр алфавіту, та 6 цифр.
Якщо не співпадає то видавати alert "Не вірний паспортний номер"

3. Номер кредитної карки 16 цифр -
якщо не співпадає то видавати alert "Не вірна кредитна картка"

4. cvv 3 цифри - якщо не співпадає то видавати alert "Не вірний cvv".

Якщо валідація проходить успішно, то виконати оплату,
 тобто вам потрібно видалити обєкт з DB
 */
buttonSubmit.addEventListener('click', payFine);
function payFine() {
    let fineInstance;
    // Validate if all fields are not empty
    if ((!fineNumber.value /*|| !passport.value || !creditCardNumber.value || !cvv.value || !amount.value */)) {
        alert('Всі поля мають бути заповнені! Будь ласка перевірте та повторіть операцію.');
        return;
    }

    // Validate entered passport data
    let passportRegex = /^[А-ЩЬЮЯҐЄІЇа-щьюяґєії]{2}[0-9]{6}$/;
    if (!passportRegex.test(passport.value)) {
        alert("Невірний паспортний номер!");
        return;
    };

    // Validate entered credit card format
    let creditCardRegex = /[0-9]{16}/;
    let targetCreditCardNumber = creditCardNumber.value;
    //Remove possible space characters in the middle of card number
    if (!targetCreditCardNumber.startsWith(' ') && !targetCreditCardNumber.endsWith(' ')) {
        targetCreditCardNumber = targetCreditCardNumber.replaceAll(' ', '');
    }
    // Perform credit card validation
    if (!creditCardRegex.test(targetCreditCardNumber)) {
        alert("Невірна кредитна картка!");
        return;
    };

    // Validate entered cvv value
    let cvvRegex = /[0-9]{3}/;
    if (!cvvRegex.test(cvv.value)) {
        alert("Невірний cvv!");
        return;
    };

    let targetFineObject;
    let targetFineIndex;
    // Check if fine with entered number exists in DB
    for (let i = 0; i < data.finesData.length; i++) {
        if (data.finesData[i]['номер'] == fineNumber.value) {
            targetFineObject = data.finesData[i];
            targetFineIndex = i;
            break;
        }
    };

    // Check if entered amount matches the amount of fine in DB. If Yes - process payment;
    if (targetFineObject) {
        if (targetFineObject['сума'] == amount.value) {
            // Consider payment as successful
            // TBD
            alert('Штраф сплачено успішно!');
        } else {
            alert('Сума не співпадає!');
            return;
        }
    } else {
        alert('Номер не співпадає!');
        return;
    };
}