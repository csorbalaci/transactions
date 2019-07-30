var dateTimeHolder = document.getElementById('datetime');
var amountHolder = document.getElementById('amount');
var storeButton = document.getElementById('store');
var saveButton = document.getElementById('save');
var list = transactionList();
var showToast = toasts(2000).showToast;
var transactionStore = storage();

transactionStore.getTransactions().forEach(function (transaction, index) {
    list.insertTransactionRow(transaction.amount, transaction.date, index, onDeleteTransactionRow);
});

function saveTransactions() {
    transactionStore.save;
    showToast("Mentve!");
}

setInterval(saveTransactions, 20000);

saveButton.addEventListener('click', saveTransactions);

storeButton.addEventListener('click', function addAmount() {
    if (isTransactionValid(amountHolder, dateTimeHolder)) {
        var amount = parseInt(amountHolder.value);
        var date = new Date(dateTimeHolder.value);
        transactionStore.add(amount, date);
        list.insertTransactionRow(amount, date, transactions.length - 1, onDeleteTransactionRow);
        amountHolder.value = '';
        dateTimeHolder.value = '';
    }
})

function onDeleteTransactionRow(index) {
    transactionStore.remove(index);
    list.setBalance(calculateBalance());
}

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
    var transactions = transactionStore.getTransactions();
    for (var i = 0; i < transactions.length; i++) {
        balance += transactions[i].amount;
    }
    return balance + " Ft";
}