function toasts(timeToHide) {
    var toastTemplate = document.querySelector('.toast-template');
    var toastContainer = document.getElementById('toast-container');

    return {
        showToast: function (message) {
            var toast = toastTemplate.cloneNode(true);
            toast.textContent = message;
            toast.classList.add('show');
            toastContainer.appendChild(toast);
            setTimeout(function () {
                toast.remove();
            }, timeToHide || 3000);
        }
    }
}