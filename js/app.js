var dateTimeHolder = document.getElementById('datetime');
var balanceHolder = document.getElementById('balance');
var amountHolder = document.getElementById('amount');
var storeButton = document.getElementById('store');
var saveButton = document.getElementById('save');
var transactionsListContainer = document.getElementById("transactions");
var transactionRowTemplate = document.querySelector('.transactions-row-template');

var transactions = getTransactions();
transactions.forEach(function (transaction, index) {
    insertTransactionRow(transaction.amount, transaction.date, index);
});

function saveTransactions() {
    console.log("saved!");
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

setInterval(saveTransactions, 20000);

saveButton.addEventListener('click', saveTransactions);

storeButton.addEventListener('click', function addAmount() {
    if (isTransactionValid(amountHolder, dateTimeHolder)) {
        var intValue = parseInt(amountHolder.value);
        var date = new Date(dateTimeHolder.value);
        addTransaction(intValue, date);
        insertTransactionRow(intValue, date, transactions.length - 1);
        amountHolder.value = '';
        dateTimeHolder.value = '';
    }
})

function getTransactions() {
    var transactionsString = localStorage.getItem("transactions");
    var transactions = transactionsString ? JSON.parse(transactionsString) : [];
    return transactions.map(function (transaction) {
        return {
            "amount": transaction.amount,
            "date": new Date(transaction.date)
        };
    })
}

function addTransaction(amount, date) {
    transactions.push({
        "amount": amount,
        "date": date
    });
}

function insertTransactionRow(amount, date, index) {
    var listItem = transactionRowTemplate.cloneNode(true);
    listItem.querySelector('.transaction-id').textContent = index;
    listItem.querySelector('.transaction-date').textContent = date.toDateString();
    listItem.querySelector('.transaction-amount').textContent = amount + " Ft";
    var deleteButton = listItem.querySelector('.delete-transaction');
    deleteButton.setAttribute('data-id', index)
    deleteButton.addEventListener('click', deleteTransactionRow);
    transactionsListContainer.appendChild(listItem);
    balanceHolder.textContent = calculateBalance();
}

function deleteTransactionRow(event) {
    var id = event.target.getAttribute('data-id');
    transactions.splice(id, 1);
    var row = event.target.parentNode.parentNode;
    row.parentNode.removeChild(row);
    balanceHolder.textContent = calculateBalance();
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
    for (var i = 0; i < transactions.length; i++) {
        balance += transactions[i].amount;
    }
    return balance + " Ft";
}