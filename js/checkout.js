const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
let errors = [];

function checkoutValid() {
    let description = document.getElementById('description');
    let button = document.querySelector('.check-btn');

    validation();

    if(errors.length < 1) {
        notification('success', 'Звонок оформлен. Вы будете перенаправлены в каталог через 5 секунд');
        setTimeout(function () {
            location.href = 'index.html';
        }, 5000)
    } else {
        return false
    }

    return true;

}

function validation()
{

    errors = [];

    let name = document.getElementById('name');
    let phone = document.getElementById('phone');
    let email = document.getElementById('email');

    if(name.value < 2) {
        name.classList.add('error-input');
        notification('error', 'Имя введено неверно');
        errors.push({'name': 'error format'})
    } else {
        name.classList.remove('error-input');
    }

    let phoneNumber = phone.value.replace(/\D/g, '');
    if(phoneNumber.length < 11) {
        phone.classList.add('error-input');
        notification('error', 'Номер телефона введен неверно');
        errors.push({'phone': 'error format'})
    } else {
        phone.classList.remove('error-input');
    }

    if(!re.test(email.value)) {
        email.classList.add('error-input');
        notification('error', 'Электронный адрес введен неверно');
        errors.push({'email': 'error format'})
    } else {
        email.classList.remove('error-input');
    }
}

document.getElementById('phone').addEventListener('input', function (e) {

    let number = e.target.value.replace(/\D/g, '');
    let x = number.match(/(\d{1})(\d{3})(\d{3})(\d{4})/);

    if(x && x.length > 4) {
        if(x[1] != 7) {
            x[1] = 7;
        }

        e.target.value = '+' + x[1] + ' (' + x[2] + ') ' + x[3] + '-' + x[4];
    }
});

document.getElementById('name').addEventListener("input", function (e) {
    let name = e.target.value.replace(/[0-9]/g, "");

    e.target.value = name;
});


function notificationDelete() {


    let notification = document.getElementsByClassName("notification");

    if(notification.length > 0) {
        notification[0].remove();
    }

}

function notification(type, text) {
    let notification = document.querySelector('.notification-wrap');

    let notificationContent =  '<div class="notification ' + type + '-notification"> ' +
        '<p class="added"> ' + text + ' </p> ' +
        '<a onclick="closeNotification(this)" title="Close" class="close close-not">×</a>' +
        '</div>';
    notification.insertAdjacentHTML('beforeend', notificationContent);

    setTimeout(() => notificationDelete(), 5000);
}

function closeNotification(event) {
    event.parentElement.remove();
}
