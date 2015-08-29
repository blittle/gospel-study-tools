export default {
	scripture: {
		regex: /\/scriptures\/(.+)\/(.+)\/(.*)/,
		getResource: function(match) {
			return {
				type: "SCRIPTURE",
				l1: match[1],
				l2: match[2],
				l3: match[3]
			}
		}
	},

	// manual: {
	// 	regex: /\/manual\/(.+)\/(.+)/,
	// 	getResource: function(match) {
	// 		return {
	// 			type: "MANUAL",
	// 			l1: match[1],
	// 			l2: match[2]
	// 		}
	// 	}
	// },

	conference: {
		regex: /\/general-conference\/(\d+)\/(\d+)\/(.+)/,
		getResource: function(match) {
			var title = document.querySelector('h1');
			var author = document.querySelector('[name=author]');

			if (title && author) {
				return {
					type: "GC",
					l1: match[1].trim(),
					l2: match[2],
					l3: title.innerText,
					l4: author.content
				}
			}

			return null;
		}
	},

	ensign: {
		regex: /\/ensign\/(\d+)\/(\d+)\/(.*)/,
		getResource: function(match) {
			var title = document.querySelector('h1');
			var author = document.querySelector('[name=author]');

			if (title && author) {
				return {
					type: "ENSIGN",
					l1: match[1],
					l2: match[2],
					l3: title.innerText,
					l4: author.content
				}
			}

			return null;
		}
	}
};
