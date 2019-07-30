function transactionList() {
    var transactionsListContainer = document.getElementById("transactions");
    var transactionRowTemplate = document.querySelector('.transactions-row-template');
    var balanceHolder = document.getElementById('balance');

    function insertTransactionRow(amount, date, index, onDeleteTransaction) {
        var listItem = transactionRowTemplate.cloneNode(true);
        listItem.querySelector('.transaction-id').textContent = index;
        listItem.querySelector('.transaction-date').textContent = date.toDateString();
        listItem.querySelector('.transaction-amount').textContent = amount + " Ft";
        var deleteButton = listItem.querySelector('.delete-transaction');
        deleteButton.addEventListener('click', function (event) {
            onDeleteTransaction(event, index);
        });
        transactionsListContainer.appendChild(listItem);
    }

    function deleteTransactionRow(event) {
        var row = event.target.parentNode.parentNode;
        row.parentNode.removeChild(row);
    }

    function setBalance(balance) {
        balanceHolder.textContent = balance;
    }

    return {
        setBalance: setBalance,
        deleteTransactionRow: deleteTransactionRow,
        insertTransactionRow: insertTransactionRow
    }
}