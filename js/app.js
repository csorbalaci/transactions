var dateTimeHolder = document.getElementById('datetime');
var balanceHolder = document.getElementById('balance');
var amountHolder = document.getElementById('amount');
var storeButton = document.getElementById('store');
var transactions = [];

function Episode(title, length) {
    this.title = title;
    this.length = length;
    this.watch = function () {
        return "Watching " + this.title + " for " + this.length + " minutes";
    }
}

var ep = new Episode("valami", 50);
var ep2 = new Episode("valami más", 60)

console.log(ep.watch());
console.log(ep2.watch());

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
    var amountValid = true;
    var datetimeValid = true;
    if (isNaN(parseInt(amountHolder.value))) {
        amountValid = false;
        amountHolder.classList.add('invalid');
    } else {
        amountHolder.classList.remove('invalid');
    }
    return amountValid && datetimeValid;
}

function calculateBalance() {
    var balance = 0;
    for (var i = 0; i < transactions.length; i++) {
        balance += transactions[i];
    }
    return balance;
}