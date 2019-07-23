var balanceHolder = document.getElementById('balance');
var amountHolder = document.getElementById('amount');
var storeButton = document.getElementById('store');
var transactions = [];

storeButton.addEventListener('click', function addAmount() {
    var intValue = parseInt(amountHolder.value);
    transactions.push(intValue);
    console.log(transactions);
    amountHolder.value = '';
    balanceHolder.textContent = calculateBalance();
})

function calculateBalance() {
    var balance = 0;
    for(var i = 0; i < transactions.length; i++) {
        balance += transactions[i];
    }
    return balance;
}