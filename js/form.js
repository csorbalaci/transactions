function form(onSaveTransactionsCallback, onSuccesfulSave) {
    var dateTimeHolder = document.getElementById('datetime');
    var amountHolder = document.getElementById('amount');
    var storeButton = document.getElementById('store');
    var saveButton = document.getElementById('save');

    saveButton.addEventListener('click', onSaveTransactionsCallback);
    storeButton.addEventListener('click', onClickStoreButton)

    function onClickStoreButton() {
        if (isTransactionValid(amountHolder, dateTimeHolder)) {
            var amount = parseInt(amountHolder.value);
            var date = new Date(dateTimeHolder.value);
            amountHolder.value = '';
            dateTimeHolder.value = '';
            onSuccesfulSave(amount, date);
        }
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
}