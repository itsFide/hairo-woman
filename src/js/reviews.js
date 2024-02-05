if ($(".reviews").length > 0) {
	var swiper = new Swiper(".reviews__swiper-desktop", {
		slidesPerView: 2,
		spaceBetween: 23,
		pagination: {
			el: ".reviews .swiper-pagination-desktop",
			clickable: true,
			renderBullet: function (index, className) {
				return '<span class="' + className + '">' + (index + 1) + "</span>";
			},
		},
		navigation: {
			nextEl: ".reviews .arrow_next",
			prevEl: ".reviews .arrow_prev",
		},
	});
	var swiper = new Swiper(".reviews__swiper", {
		slidesPerView: 1.34,
		spaceBetween: 9,
		pagination: {
			el: ".reviews .swiper-pagination-mobile",
			clickable: true,
			renderBullet: function (index, className) {
				return index < 5 ? '<span class="' + className + '">' + (index + 1) + "</span>" : "";
			},
		},
		navigation: {
			nextEl: ".reviews .arrow_next",
			prevEl: ".reviews .arrow_prev",
		},
	});
}