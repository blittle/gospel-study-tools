export const ONE_MINUTE = 60 * 1000;
export const THREE_MINUTES = 3 * 60 * 1000;
export const DAY = ONE_MINUTE * 60 * 24;
export const HOST = "http://0.0.0.0:4567";

export function formatL1(l1) {
	switch(l1) {
		case 'bofm':
			return 'Book of Mormon';
		case 'dc-testament':
			return 'Doctrine and Covenants';
		case 'pgp':
			return 'Pearl of Great Price';
		case 'pgp':
			return 'Pearl of Great Price';
		case 'nt':
			return 'New Testament';
		case 'ot':
			return 'Old Testament';
		case 'general-conference':
			return 'General Conference';
		case 'manual':
			return 'Manual';
		case 'ensign':
			return 'Ensign;'
	}
}
