"use strict";
window.fineList = {
    searchFines: searchFines
}

//Ця зміна містить всі дані які в нас зберігаються у файлі data
let DB = data.finesData;

function searchFines(searchKey){
    let foundNumber = checkNumber(searchKey);
    let foundFine = checkFine(searchKey);

    if (foundNumber.length) { return foundNumber;} 
    else if(foundFine.length){ return foundFine;}

    alert("not found");  

}

function checkNumber(number)  {
    const paddedNumber = String(number).padStart(3, '0');
    const includesNumer = DB.filter(item => item['номер'] === paddedNumber)
    return includesNumer;
}

function checkFine(fine)  {    
    const includesFine = DB.filter(item => item['тип'] === fine)
    return includesFine
}
