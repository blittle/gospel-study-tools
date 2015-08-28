import { capitalize } from 'lodash';

const scriptureMap = {
	'1-ne': '1 Nephi',
	'2-ne': '2 Nephi',
	'w-of-m': 'Words of Mormon',
	'hel': 'Helaman',
	'3-ne': '3 Nephi',
	'4-ne': '4 Nephi',
	'morm': 'Mormon',
	'moro': 'Moroni',

  "gen": "Genesis",
  "ex": "Exodus",
  "lev": "Leviticus",
  "num": "Numbers",
  "deut": "Deuteronomy",
  "josh": "Joshua",
  "judg": "Judges",
  "ruth": "Ruth",
  "1-sam": "1 Samuel",
  "2-sam": "2 Samuel",
  "1-kgs": "1 Kings",
  "2-kgs": "2 Kings",
  "1-chr": "1 Chronicles",
  "2-chr": "2 Chronicles",
  "ezra": "Ezra",
  "neh": "Nehemiah",
  "esth": "Esther",
  "job": "Job",
  "ps": "Psalms",
  "prov": "Proverbs",
  "eccl": "Ecclesiastes",
  "song": "Song of Solomon",
  "isa": "Isaiah",
  "jer": "Jeremiah",
  "lam": "Lamentations",
  "ezek": "Ezekiel",
  "dan": "Daniel",
  "hosea": "Hosea",
  "joel": "Joel",
  "amos": "Amos",
  "obad": "Obadiah",
  "jonah": "Jonah",
  "micah": "Micah",
  "nahum": "Nahum",
  "hab": "Habakkuk",
  "zeph": "Zephaniah",
  "hag": "Haggai",
  "zech": "Zechariah",
  "mal": "Malachi",

  "matt": "Matthew",
  "mark": "Mark",
  "luke": "Luke",
  "john": "John",
  "acts": "Acts",
  "rom": "Romans",
  "1-cor": "1 Corinthians",
  "2-cor": "2 Corinthians",
  "gal": "Galatians",
  "eph": "Ephesians",
  "philip": "Philippians",
  "col": "Colossians",
  "1-thes": "1 Thessalonians",
  "2-thes": "2 Thessalonians",
  "1-tim": "1 Timothy",
  "2-tim": "2 Timothy",
  "titus": "Titus",
  "philem": "Philemon",
  "heb": "Hebrews",
  "james": "James",
  "1-pet": "1 Peter",
  "2-pet": "2 Peter",
  "1-jn": "1 John",
  "2-jn": "2 John",
  "3-jn": "3 John",
  "jude": "Jude",
  "rev": "Revelation",

	"abr": "Abraham",
	"js-m": "Joseph Smith Matthew",

	"dc": "D&C"
};

export const ONE_MINUTE = 60 * 1000;
export const THREE_MINUTES = 3 * 60 * 1000;
export const DAY = ONE_MINUTE * 60 * 24;
export const HOST = "http://0.0.0.0:4567";

export function formatL1(l1) {
	l1 = l1.trim();

	switch(l1) {
		case 'bofm':
			return 'Book of Mormon';
		case 'dc-testament':
			return 'Doctrine and Covenants';
		case 'pgp':
			return 'Pearl of Great Price';
		case 'nt':
			return 'New Testament';
		case 'ot':
			return 'Old Testament';
	}
}

export function formatType(type) {
	type = type.trim();

	if (type === 'SCRIPTURE') {
		return 'Scriptures';
	} else if (type === 'ENSIGN') {
		return `Ensign`;
	} else if (type === 'MANUAL') {
		return 'Manual'
	} else if (type === 'GC') {
		return `General Conference`;
	}
}

export function formatScripture(key) {
	key = key.trim();
	if (scriptureMap[key]) return scriptureMap[key];
	return capitalize(key);
}
