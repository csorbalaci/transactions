(function() {

    form(onSaveTransactions, onSuccesfulSave);
    var list = transactionList();
    var showToast = toasts(2000).showToast;
    var transactionStore = storage();

    transactionStore.getTransactions().forEach(function (transaction, index) {
        list.insertTransactionRow(transaction.amount, transaction.date, index, onDeleteTransactionRow);
    });
    
    setInterval(onSaveTransactions, 20000);
    list.setBalance(calculateBalance() + " Ft");

    function onSaveTransactions() {
        transactionStore.save();
        showToast("Mentve!");
    }

    function onSuccesfulSave(amount, date) {
        transactionStore.add(amount, date);
        list.insertTransactionRow(amount, date, transactionStore.getNumberOfTransactions() - 1, onDeleteTransactionRow);
        list.setBalance(calculateBalance() + " Ft");
    }

    function onDeleteTransactionRow(event, index) {
        if (calculateBalance() < 100000) {
            list.deleteTransactionRow(event)
            transactionStore.remove(index);
            list.setBalance(calculateBalance() + " Ft");
        } else {
            showToast("Biztosan törölni akarsz tömm, mint 100000 ft-ot?");
        }
    }

    function calculateBalance() {
        var balance = 0;
        var transactions = transactionStore.getTransactions();
        for (var i = 0; i < transactions.length; i++) {
            balance += transactions[i].amount;
        }
        return balance;
    }
})()