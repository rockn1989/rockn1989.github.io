$(function () {
	/**
	 * Toggle mobile menu
	 */

	function clickCloseCanvasMenu(e) {
		if (
			!$(e.target).hasClass("offcanvas-menu") &&
			$(".offcanvas-menu").hasClass("open")
		) {
			$(".offcanvas-menu").removeClass("open");
			$(document).unbind("click", clickCloseCanvasMenu);
			$(document).unbind("keydown", keyDownCloseCanvasMenu);
		}
	}

	function keyDownCloseCanvasMenu(e) {
		if (e.keyCode == 27) {
			$(".offcanvas-menu").removeClass("open");
			$(document).unbind("click", clickCloseCanvasMenu);
			$(document).unbind("keydown", keyDownCloseCanvasMenu);
		}
	}

	$(".js__toggle-offcanvasMenu").on("click", function (e) {
		e.preventDefault();
		e.stopPropagation();

		$(".offcanvas-menu").toggleClass("open");
		$(document).bind("click", clickCloseCanvasMenu);
		$(document).bind("keydown", keyDownCloseCanvasMenu);
	});

	/**
	 *  Tabs
	 */

	$(".tabs").on("click", "li", function (e) {
		e.preventDefault();
		let idx = $(".tabs li").index($(this));
		$(this).addClass("active").siblings("li").removeClass("active");
		$(".tabs-content>li")
			.eq(idx)
			.addClass("active")
			.siblings()
			.removeClass("active");
	});

	/**
	 * Validate form
	 */

	$(".numbers-validate input").on("input", function () {
		if (parseInt($(this).val(), 10) < 10 && parseInt($(this).val(), 10) >= 0) {
			if ($(this).next("input")[0]) {
				$(this).next("input").attr("disabled", false).focus();
			}
		}
		if (parseInt($(this).val(), 10) > parseInt($(this).attr("max"), 10)) {
			$(this).val($(this).attr("max"));
		}
		if (parseInt($(this).val(), 10) < parseInt($(this).attr("min"), 10)) {
			$(this).val($(this).attr("min"));
		}
	});

	/**
	 * SVG Polyfill
	 */

	svg4everybody();
});
