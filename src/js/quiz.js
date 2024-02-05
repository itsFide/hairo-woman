$('.page-quiz__btn').on("click", function () {
	$(".page-quiz__button").addClass("hidden");
	$(".page-quiz__container").slideToggle(400);
});

// Quiz
if ($(".step--js").length > 0) {
    $('.step--js').on("click", function (e) {
        e.preventDefault();

        var step = $(this).data("next-step");
        var $activeStep = $(this).closest('.quiz__step');

        // Выводим в консоль элементы внутри активного шага
        $activeStep.find('.radio, .quiz__label, .checkbox').each(function(index, element) {
            console.log($(element).html());
        });

		// Проверяем, есть ли активные радиобаттоны внутри активного шага
		var $checkedRadio = $activeStep.find('.radio input[type="radio"]:checked');
		if ($checkedRadio.length === 0 && $activeStep.find('.radio input[type="radio"]').length > 0) {
			console.log("Выберите вариант ответа");
			
			if ($(this).hasClass('btn-next')) {
				// Блокируем переход, если радиобаттон не выбран
				$activeStep.addClass("error");
				return;
			}
		} else {
			// Если радиобаттон выбран, выводим его значение в консоль
			console.log("Выбран радиобаттон с значением: " + $checkedRadio.val());
		}

        // Проверяем, есть ли активные текстовые поля внутри активного шага
        var $prevTextFields = $activeStep.find('.quiz__label input[type="tel"]').filter(function() {
			return $(this).val() !== null && $(this).val() !== undefined && $(this).val().trim() !== "";
		});

        if ($prevTextFields.length === 0 && $activeStep.find('.quiz__label').length > 0) {
            console.log("Введите текст");
            if ($(this).hasClass('btn-next')) {
				$activeStep.addClass("error");
				return; // Блокируем переход, если радиобаттон не выбран
			}
        }

        // Проверяем, есть ли активные чекбоксы внутри активного шага
        var $prevCheckboxes = $activeStep.find('.checkbox input[type="checkbox"]:checked');
        if ($prevCheckboxes.length === 0 && $activeStep.find('.checkbox').length > 0) {
            console.log("Выберите вариант ответа");
            if ($(this).hasClass('btn-next')) {
				$activeStep.addClass("error");
				return; // Блокируем переход, если радиобаттон не выбран
			}
        }

        // Удаляем класс "active" с предыдущего активного шага
        $activeStep.removeClass('active');

        // Находим следующий активный шаг и добавляем ему класс "active"
        var $nextStep = $('.quiz__step[data-step="' + step + '"]');
        $nextStep.addClass("active");

        // Очищаем консоль
        console.clear();

        // Устанавливаем ширину span до значения step
        var spanWidth = step * 10; // Пример: умножаем на 10 для получения ширины в 10 пикселях на шаг
        $(".quizStepCount").css("width", spanWidth + "%");

        // Проверяем, имеет ли кнопка класс btn-next
        if ($(this).hasClass('btn-next')) {
            console.log("Это кнопка 'Next'");
            // Блокируем переход только для кнопок с классом btn-next
            return;
        }

        var href;
        if (selectedGender === "Male") {
            href = "product.html";
        } else if (selectedGender === "Female") {
            href = "product.html";
        }

        if (href) {
            window.location.href = href;
        }
    });
}



/*Focus*/
if ($(".quiz__field").length > 0) {
	$('.quiz__field').on('focus', function () {
		$(this).parent().find('.quiz__label-caption').addClass("active");
	});
	$('.quiz__field').on('blur', function () {
	  let email = $(this).val();
	  if (email.length == 0) {
		$(this).parent().find('.quiz__label-caption').removeClass("active");
	  } else {
		$(this).parent().find('.quiz__label-caption').addClass("active");
	  }
	});
  }