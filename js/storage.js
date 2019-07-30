function storage() {
    var transactions = loadTransactions();

    function loadTransactions() {
        var transactionsString = localStorage.getItem("transactions");
        var transactions = transactionsString ? JSON.parse(transactionsString) : [];
        return transactions.map(function (transaction) {
            return {
                "amount": transaction.amount,
                "date": new Date(transaction.date)
            };
        })
    }

    function getTransactions() {
        return transactions.map(function (transaction) {
            return {
                "amount": transaction.amount,
                "date": transaction.date
            };
        });
    }

    function getNumberOfTransactions() {
        return transactions.length;
    }

    function remove(index) {
        transactions.splice(index, 1);
    }

    function save() {
        localStorage.setItem("transactions", JSON.stringify(transactions));
    }

    function add(amount, date) {
        transactions.push({
            "amount": amount,
            "date": date
        });
    }

    return {
        save: save,
        add: add,
        getNumberOfTransactions: getNumberOfTransactions,
        getTransactions: getTransactions,
        remove: remove
    }
}