const books = ['bofm', 'dc-testament', 'pgp', 'nt', 'ot'];
const bom = ['alma', '1-ne', '3-ne', 'hel', 'moro', 'mosiah'];
const nt = [
	"matt",
	"mark",
	"luke",
	"john",
	"acts",
	"rom",
	"1-cor",
	"2-cor",
	"gal",
	"eph",
	"philip",
	"col",
	"1-thes",
	"2-thes",
	"1-tim",
	"2-tim",
	"titus",
	"philem",
	"heb",
	"james",
	"1-pet",
	"2-pet",
	"1-jn",
	"2-jn",
	"3-jn",
	"jude",
	"rev"
]

const ot = [
	"gen",
	"ex",
	"lev",
	"num",
	"deut",
	"josh",
	"judg",
	"ruth",
	"1-sam",
	"2-sam",
	"1-kgs",
	"2-kgs",
	"1-chr",
	"2-chr",
	"ezra",
	"neh",
	"esth",
	"job",
	"ps",
	"prov",
	"eccl",
	"song",
	"isa",
	"jer",
	"lam",
	"ezek",
	"dan",
	"hosea",
	"joel",
	"amos",
	"obad",
	"jonah",
	"micah",
	"nahum",
	"hab",
	"zeph",
	"hag",
	"zech",
	"mal"
]
const pgp = ['abr', 'js-m']
const l3 = _.range(10).map(i => i + '');

function getRandomTimeAmount() {
  return Math.floor(Math.random() * 100000);
}

function getRandomTime() {
  let count = Math.random() * 60 * 60 * 24 * 1000 * 365;
  let rand = Math.random() * 1000 * 60 * 60;
  return {
    startTime: new Date(new Date().getTime() - count).getTime(),
    endTime: new Date(new Date().getTime() - count + rand).getTime()
  }
}

function getScriptureL2(l1) {
	switch(l1) {
		case 'bofm':
			return _.sample(bom);
		case 'dc-testament':
			return 'dc';
		case 'pgp':
			return _.sample(pgp);
		case 'nt':
			return _.sample(nt);
		case 'ot':
			return _.sample(ot);
	}
}

function getScriptureStudyElement() {
	let l1 = _.sample(books);
  return {
    type: 'SCRIPTURE',
    l1: l1,
		l2: getScriptureL2(l1),
    l3: _.sample(l3),
    time: getRandomTimeAmount()
  }
}

function getGCStudyElement() {
}

function getManualStudyElement() {
}

function getEnsignStudyElment() {
}

function getStudySession() {
	var session = getRandomTime()
	session.resources = _.range(20).map(i => { return getScriptureStudyElement() });
	return session;
}

function generateStudySessions(count=50) {
  return _.range(count).map(i => {
    return getStudySession();
  })
}

export default generateStudySessions;
