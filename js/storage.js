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



    function save() {
        localStorage.setItem("transactions", JSON.stringify(transactions));
    }

    function remove(index) {
        transactions.splice(index, 1);
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
        getTransactions: getTransactions,
        remove: remove
    }
}