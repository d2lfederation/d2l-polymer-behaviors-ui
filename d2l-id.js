var Id = {

	getUniqueId: function() {

		if (window.D2L.Id._unique_index === undefined) {
			window.D2L.Id._unique_index = 0;
		}
		window.D2L.Id._unique_index++;
		return 'd2l-uid-' + window.D2L.Id._unique_index;

	}

};

window.D2L = window.D2L || {};
window.D2L.Id = Id;
