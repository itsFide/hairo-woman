if ($(".result").length > 0) {
	var swiper = new Swiper(".result__swiper", {
		slidesPerView: 1,
		spaceBetween: 20,
		pagination: {
			el: ".result .swiper-pagination",
			clickable: true,
			renderBullet: function (index, className) {
				return '<span class="' + className + '">' + (index + 1) + "</span>";
			},
		},
		navigation: {
			nextEl: ".result .arrow_next",
			prevEl: ".result .arrow_prev",
		},
	});
}