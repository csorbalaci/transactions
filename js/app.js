var dateTimeHolder = document.getElementById('datetime');
var balanceHolder = document.getElementById('balance');
var amountHolder = document.getElementById('amount');
var storeButton = document.getElementById('store');
var transactions = [];

storeButton.addEventListener('click', function addAmount() {
    if (isTransactionValid(amountHolder, dateTimeHolder)) {
        var intValue = parseInt(amountHolder.value);
        transactions.push(intValue);
        console.log(transactions);
        amountHolder.value = '';
        balanceHolder.textContent = calculateBalance();
    }
})

function isTransactionValid(amountHolder, dateTimeHolder) {
    var amountValid = validateAmount(amountHolder);
    var datetimeValid = validateDate(dateTimeHolder);
    return amountValid && datetimeValid;
}

function validateDate(dateTimeHolder) {
    var datetimeValid = true;
    var date = new Date(dateTimeHolder.value);
    if (date.toString() === "Invalid Date") {
        datetimeValid = false;
        dateTimeHolder.classList.add('invalid');
    } else {
        dateTimeHolder.classList.remove('invalid');
    }
    return datetimeValid;
}

function validateAmount(amountHolder) {
    var amountValid = true;
    if (isNaN(parseInt(amountHolder.value))) {
        amountValid = false;
        amountHolder.classList.add('invalid');
    } else {
        amountHolder.classList.remove('invalid');
    }
    return amountValid;
}

function calculateBalance() {
    var balance = 0;
    for (var i = 0; i < transactions.length; i++) {
        balance += transactions[i];
    }
    return balance;
}