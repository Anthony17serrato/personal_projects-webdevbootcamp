function average(testScores){
	var sum= 0;
	for(var i = 0; i<testScores.length;i++){
		sum += testScores[i];
	}
	console.log(Math.round(sum/testScores.length));
}
var scores = [90, 98, 89,100, 100, 86, 94];
average(scores);