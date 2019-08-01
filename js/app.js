(function () {

    post("https://httpbin.org/post", JSON.stringify({ valami: true }), function () {
        if (this.readyState === 4) {
            console.log(this.responseText)
        }
    }, function () {
        console.log("Error " + this.responseText)
    });

    form(onSaveTransactions, onSuccesfulSave);
    var list = transactionList();
    var showToast = toasts(2000).showToast;
    var transactionStore = storage();

    transactionStore.getTransactions().forEach(function (transaction, index) {
        list.insertTransactionRow(transaction.amount, transaction.date, index, onDeleteTransactionRow);
    });

    setInterval(onSaveTransactions, 20000);
    list.setBalance(calculateBalance() + " Ft");

    function post(url, payload, successCallback, errorCallback) {
        var request = new XMLHttpRequest;
        request.open("POST", url);
        request.addEventListener("error", errorCallback);
        request.addEventListener("timeout", errorCallback);
        request.addEventListener("load", function () {
            if (this.status === 200) {
                successCallback.bind(request)();
            } else {
                errorCallback.bind(request)();
            }
        });
        request.send(payload);
    }

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