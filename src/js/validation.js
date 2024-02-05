document.addEventListener("DOMContentLoaded", function () {
    var form = document.querySelector('.form');
    var fields = form.querySelectorAll('.form__field');
    var zipField = document.getElementById('zip');
    var cityField = document.getElementById('city');

    form.addEventListener('submit', function (event) {
        var isValid = true;

        fields.forEach(function (field) {
            if (field.value.trim() === '' && field.id !== 'apt') {
                isValid = false;
                field.closest('.form__box').classList.add('error');
            } else {
                field.closest('.form__box').classList.remove('error');
            }
        });

        if (!isValid) {
            event.preventDefault();
            return;
        }

        // Валидация пройдена, сохраняем значения в куках
        saveCookies();

        // Теперь обработка открытия fancybox
        $.fancybox.close();
        $.fancybox.open({
            loop: false,
            src: '#final-modal',
            baseClass: 'dark-fancybox',
            touch: false,
            afterShow: function () {
                // Добавляем значение из id=address в id=new-address
                $('#new-address').text($('#address').val());

                // Устанавливаем текущую дату + 7 дней в id=new-data
                var currentDate = new Date();
                currentDate.setDate(currentDate.getDate() + 7);
                var formattedDate = currentDate.toISOString().split('T')[0];
                $('#new-data').text(formattedDate);

                // Добавляем обработчик для кнопки с классом thank--js внутри fancybox
                $('.thank--js').on('click', function () {
                    // Переход на страницу thanks.html
                    window.location.href = 'thanks.html';
                });
            },
            afterClose: function () {
                // Очищаем обработчик, чтобы избежать множественных привязок
                $('.thank--js').off('click');
            }
        });
    });

    fields.forEach(function (field) {
        field.addEventListener('change', function () {
            // При изменении значения поля проверяем, добавляем или удаляем класс error
            if (field.value.trim() === '' && field.id !== 'apt') {
                field.closest('.form__box').classList.add('error');
            } else {
                field.closest('.form__box').classList.remove('error');
            }
        });
    });

    zipField.addEventListener('keyup', function (e) {
        e.preventDefault();
        const val = $(this).val();
        $.get('https://api.zippopotam.us/US/' + val, function (data) {
            cityField.value = data.places[0]['place name'];

            if (cityField.value.trim() === '') {
                cityField.closest('.form__box').classList.add('error');
            } else {
                cityField.closest('.form__box').classList.remove('error');
            }

            $("#state").val(data.places[0]['state abbreviation']);
            $("#select-state").html(data.places[0]['state abbreviation']);
        }, 'json');
    });

    function saveCookies() {
        var firstName = document.getElementById('name').value;
        var lastName = document.getElementById('lastname').value;
        var zip = document.getElementById('zip').value;
        var address = document.getElementById('address').value;
        var apt = document.getElementById('apt').value; // Убедитесь, что apt не является обязательным
        var city = document.getElementById('city').value;
        var state = document.getElementById('select-state').textContent;
        var phone = document.getElementById('phone').value;
        var email = document.getElementById('email').value;

        // Сохраняем значения в куках, только если поле не пустое
        if (apt.trim() !== '') {
            document.cookie = 'apt=' + encodeURIComponent(apt);
        }

        document.cookie = 'firstName=' + encodeURIComponent(firstName);
        document.cookie = 'lastName=' + encodeURIComponent(lastName);
        document.cookie = 'zip=' + encodeURIComponent(zip);
        document.cookie = 'address=' + encodeURIComponent(address);
        document.cookie = 'city=' + encodeURIComponent(city);
        document.cookie = 'state=' + encodeURIComponent(state);
        document.cookie = 'phone=' + encodeURIComponent(phone);
        document.cookie = 'email=' + encodeURIComponent(email);
    }
});

