(function () {

    function post(url, payload) {
        return new Promise(function (resolve, reject) {
            var request = new XMLHttpRequest;
            request.open("POST", url);
            request.addEventListener("error", reject);
            request.addEventListener("timeout", reject);
            request.addEventListener("load", function () {
                if (this.status === 200) {
                    resolve(this.responseText);
                } else {
                    reject(this.responseText);
                }
            });
            request.send(payload);
        })
    }

    Promise.all([
        post("https://httpbin.org/post", JSON.stringify({ valami: 1 })),
        post("https://httpbin.org/pst", JSON.stringify({ valami: 2 })),
        post("https://httpbin.org/post", JSON.stringify({ valami: 3 }))
    ]).then(function (first, second, third) {
        console.log(first, second, third);
    })
        .catch(errorCallback)
        .then(function () {
            console.log("done everything!");
        })

    function errorCallback(responseText) {
        console.log("Error response: " + responseText)
    }

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