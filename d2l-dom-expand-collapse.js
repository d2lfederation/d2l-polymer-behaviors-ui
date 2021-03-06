import './d2l-dom.js';
import 'fastdom/fastdom.js';

var ExpandCollapse = {

	DEFAULT_TRANSITION: 'height 400ms cubic-bezier(0, 0.7, 0.5, 1)',

	expand: function(node) {
		return new Promise(function(resolve, reject) {

			if (!node) reject('No element specified.');

			var transitionEnd = function() {
				node.removeEventListener('transitionend', transitionEnd);
				fastdom.mutate(function() {
					node.style.transition = node.getAttribute('data-d2l-ec-transition');
					node.removeAttribute('data-d2l-ec-transition');
					node.style.overflow = node.getAttribute('data-d2l-ec-overflow');
					node.removeAttribute('data-d2l-ec-overflow');
					node.style.height = node.getAttribute('data-d2l-ec-height');
					node.removeAttribute('data-d2l-ec-height');
					resolve();
				});
			};
			node.addEventListener('transitionend', transitionEnd);

			fastdom.mutate(function() {
				node.style.overflow = 'hidden';
				node.style.transition = '';
				node.style.height = '0px';
				node.style.display = node.getAttribute('data-d2l-ec-display') ? node.getAttribute('data-d2l-ec-display') : '';
				node.removeAttribute('data-d2l-ec-display');
				if (node.classList.contains('d2l-hidden')) node.classList.remove('d2l-hidden');

				fastdom.measure(function() {
					var height = node.getAttribute('data-d2l-ec-height');
					if (height === null) height = node.scrollHeight + 'px';
					fastdom.mutate(function() {
						node.style.transition = D2L.Dom.ExpandCollapse.DEFAULT_TRANSITION;
						node.style.height = height;
					});

				});

			});

		});
	},

	collapse: function(node) {
		return new Promise(function(resolve, reject) {

			if (!node) reject('No element specified.');

			var transitionEnd = function() {
				node.removeEventListener('transitionend', transitionEnd);
				fastdom.mutate(function() {
					node.style.display = 'none';
					resolve();
				});
			};
			node.addEventListener('transitionend', transitionEnd);

			fastdom.measure(function() {

				var original = {
					display: node.style.display,
					height: node.style.height,
					overflow: node.style.overflow,
					transition: node.style.transition
				};

				var height = node.getBoundingClientRect().height;

				fastdom.mutate(function() {

					if (original.display !== '') node.setAttribute('data-d2l-ec-display', original.display);
					if (original.height !== '') node.setAttribute('data-d2l-ec-height', original.height);
					if (original.overflow !== '') node.setAttribute('data-d2l-ec-overflow', original.overflow);
					if (original.transition !== '') node.setAttribute('data-d2l-ec-transition', original.transition);

					node.style.overflow = 'hidden';
					node.style.height = height + 'px';

					node.style.transition = D2L.Dom.ExpandCollapse.DEFAULT_TRANSITION;

					fastdom.measure(function() {
						fastdom.mutate(function() {
							node.style.height = '0px';
						});
					});

				});

			});

		});
	}

};

window.D2L = window.D2L || {};
window.D2L.Dom = window.D2L.Dom || {};
window.D2L.Dom.ExpandCollapse = ExpandCollapse;
