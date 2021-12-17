(function () {
    let form = document.querySelector('#register-form');
    let emailInput = document.querySelector('#email');
    let passwordInput = document.querySelector('#password');

function showErrorMessage (input, message) {
    let container = input.parentElement;

    //Remove existing error
    let error = container.querySelector('.error-message');
    if (error) {
        container.removeChild(error);
    }

    //Error if the message isn't empty
    if (message) {
        let error = document.createElement('div');
        error.classList.add('error-message');
        error.innerText = message;
        container.appendChild(error);
    }
}

function validateEmail() {
    let value = emailInput.value;

    if (!value) {
        showErrorMessage (emailInput, 'Email is a required field.');
        return false;
    }

    if (value.indexOf('@') === -1) {
        showErrorMessage (emailInput, 'You must enter a valid email address.');
        return false;
    }

    showErrorMessage (emailInput, null);
    return true;
}

function validatePassword() {
    let value = passwordInput.value;
    
    if (!value) {
        showErrorMessage (passwordInput, 'Password is a required field.');
        return false;
    }

    if (value.length < 8) {
        showErrorMessage (passwordInput, 'The password needs to be at least 8 characters long.');
        return false;
    }

    showErrorMessage(passwordInput, null);
    return true;
}

function validateForm() {
    let isValidEmail = validateEmail();
    let isValidPassword = validatePassword();
    return isValidEmail && isValidPassword;
}

form.addEventListener('submit', function(e) {
    e.preventDefault();

    if (validateForm()) {
        alert('Success!');
    }
});

emailInput.addEventListener('input', validateEmail);
passwordInput.addEventListener('input', validatePassword);
})();

//Dialog

let pokemonRepository = (function () {
    let modalContainer = document.querySelector('#modal-container');

    function showModal(title, text) {
        modalContainer.innerHTML = '';
        let modal = document.createElement('div');
        modal.classList.add('modal');

        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'Close';
        closeButtonElement.addEventListener('click', hideModal);

        let titleElement = document.createElement('h1');
        titleElement.innerText = title;

        let contentElement = document.createElement('p');
        contentElement.innerText = text;

        modal.appendChild(closeButtonElement);
        modal.appendChild(titleElement);
        modal.appendChild(contentElement);
        modalContainer.appendChild(modal);

        modalContainer.classList.add('is-visible');
    }

    let dialogPromiseReject;

    function hideModal() {
        modalContainer.classList.remove('is-visible');

        if (dialogPromiseReject) {
            dialogPromiseReject();
            dialogPromiseReject = null;
        }
    }

    function showDialog(title, text) {
        showModal(title, text);

        let modal = modalContainer.querySelector('.modal');
        
        let confirmButton = document.createElement('button');
        confirmButton.classList.add('modal-confirm');
        confirmButton.innerText = 'Confirm';

        let cancelButton = document.createElement('button');
        cancelButton.classList.add('modal-cancel');
        cancelButton.innerText = 'Cancel';

        modal.appendChild(confirmButton);
        modal.appendChild(cancelButton);

        //Focus on confirmButton so it works with "Enter"
        confirmButton.focus();
        return new Promise(function(resolve, reject) {
            cancelButton.addEventListener('click', hideModal);
            confirmButton.addEventListener('click', function() {
                dialogPromiseReject = null;
                hideModal();
                resolve();
            });
            dialogPromiseReject = reject;
        });
    }

    document.querySelector('#show-dialog').addEventListener('click', function() {
        showDialog('Confirm action', 'Are you sure you want to do this?').then(function() {
            alert('Confirmed!');
        }, function() {
            alert('Not confirmed!');
        });
    });

    window.addEventListener('keydow', function(e) {
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
            hideModal();
        }
    });

    modalContainer.addEventListener('click', function(e) {
        let target = e.target;
        if (target === modalContainer) {
            hideModal();
        }
    });

    document.querySelector('#show-modal').addEventListener('click', function() {
        showModal('Modal title', 'This is the modal content!');
    });
})();