import './d2l-dom.js';

var Visibility = {

	isVisible: function(node) {

		if (!node) {
			return false;
		}

		if (!node.host) {
			if (node.style === undefined) {
				return true;
			}
			if (node.style.display === 'none') {
				return false;
			}
			if (node.style.visibility === 'hidden') {
				return false;
			}
			var computedStyle = window.getComputedStyle(node, null);
			if (computedStyle.getPropertyValue('display') === 'none') {
				return false;
			}
			if (computedStyle.getPropertyValue('visibility') === 'hidden') {
				return false;
			}
		}

		var parentNode = D2L.Dom.getComposedParent(node);

		if (parentNode) {
			return this.isVisible(parentNode);
		}

		return true;

	}

};

window.D2L = window.D2L || {};
window.D2L.Dom = window.D2L.Dom || {};
window.D2L.Dom.Visibility = Visibility;
