export default {
	scripture: {
		regex: /\/scriptures\/(.+)\/(.+)\/(.*)/,
		getResource: function(match) {
			return {
				type: "SCRIPTURE",
				bookGroup: match[1],
				book: match[2],
				chapter: match[3]
			}
		}
	},

	manual: {
		regex: /\/manual\/(.+)\/(.+)/,
		getResource: function(match) {
			return {
				type: "MANUAL",
				book: match[1],
				chapter: match[2]
			}
		}
	},

	conference: {
		regex: /\/general-conference\/(\d+)\/(\d+)\/(.+)/,
		getResource: function(match) {
			var title = document.querySelector('h1');
			var author = document.querySelector('[name=author]');

			if (title && author) {
				return {
					type: "GC",
					year: match[1],
					month: match[2],
					title: title.innerText,
					author: author.innerText
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
					year: match[1],
					month: match[2],
					title: title.innerText,
					author: author.content
				}
			}

			return null;
		}
	}
};
