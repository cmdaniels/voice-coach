var storage = firebase.storage();
var langPairs = pairs[0].pairs;
var questions = [];
var correctQuestions = [];

function decode(str) {
	str.replace('&oslash;', 'ø');
	str.replace('&aelig;', 'æ');
	str.replace('&aring;', 'å');
	return str;
}

function newPair(){
	var waiting = true;
	while (waiting) {
		var index = Math.floor(Math.random()*langPairs.length)
		pair = langPairs[index];
		var match = false;
		questions.forEach(function(q) {
			if (q.pair == pair) {
				match = true;
			}
		});
		if (match === false) {
			var answerIndex = Math.floor(Math.random()*pair.length);
			var pathReference = storage.ref('dansk/' + pair[answerIndex] + '.wav')
			pathReference.getDownloadURL().then(function(url){
				var audio = document.getElementById('audio');
				audio.setAttribute('src', url);
			}).catch(function(error) {
				// Handle any errors
				console.log(error);
			});
			questions.push({
				pair: pair,
				answer: pair[answerIndex],
				wrong: pair[1 - answerIndex]
			});
			waiting = false;
		}
	}
	optionOne = document.getElementById('optionOne');
	optionTwo = document.getElementById('optionTwo');
	labelOne = document.getElementById('labelOne');
	labelTwo = document.getElementById('labelTwo');
	var random = Math.floor(Math.random()*2);
	var question = questions[questions.length - 1]
	if (random === 0) {
		optionOne.value = question.wrong;
		optionTwo.value = question.answer;
		labelOne.innerHTML = decode(question.wrong);
		labelTwo.innerHTML = decode(question.answer);
	} else {
		optionOne.value = question.answer;
		optionTwo.value = question.wrong;
		labelOne.innerHTML = decode(question.answer);
		labelTwo.innerHTML = decode(question.wrong);
	}
}

function submit(){
	var selection = document.querySelector('input[name = "answer"]:checked').value;
	if (selection == questions[questions.length - 1].answer){
		correctQuestions.push(questions[questions.length - 1])
		correct(correctQuestions.length, 3);
	} else {
		incorrect();
	}
}

function correct(numCorrect, totalQuestions){
	var elem = document.getElementsByClassName("bar")[0];
	elem.style.width = (numCorrect / totalQuestions) * 100 + '%';
	newPair();
}

function incorrect(){
	var elem = document.getElementsByClassName("bar")[0];
	elem.style.width = elem.offsetWidth * 0.75 + 'px';
}

newPair();
