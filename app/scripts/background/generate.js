const l2 = ['alma', '1-ne', '3-ne', 'hel', 'moro', 'mosiah'];
const l3 = _.range(20).map(i => i + '');

const l1 = {
  'bofm': {
    name: 'bofm',
    l2: ['alma', '1-ne', '3-ne', 'hel'],
    l3: _.range(20).map(i => i + '')
  }
};

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

function getStudyElement() {
  return {
    type: 'SCRIPTURE',
    l1: 'bofm',
    l2: _.sample(l2),
    l3: _.sample(l3),
    time: getRandomTimeAmount()
  }
}

function getStudySession() {
	var session = getRandomTime()
	session.resources = _.range(20).map(i => { return getStudyElement() });
	return session;
}

function generateStudySessions(count=50) {
  return _.range(count).map(i => {
    return getStudySession();
  })
}

export default generateStudySessions;
