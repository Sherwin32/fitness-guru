
/* Function returns object!  Two prop: .bmi, .bmiStr */
function calcBMI (weightPounds, heightInches) {
	var kg = weightPounds / 2.2;
  	var m = heightInches * 0.0254;
  	var bmi = kg / Math.pow(m,2);
  // console.log("parts",kg, m, bmi);
  	if ( bmi<18.5 ) {
  		var bmiStr = "Underweight";
  	} else if ( bmi=>25 ) {
  		var bmiStr = "Overweight";
  	} else {
  		var bmiStr = "Healthy";
  	}
	return ({'bmi':bmi,'bmiStr':bmiStr});
}

console.log (calcBMI(174.5,5*12+8));


function feetInchToInch (feet, inch) {
	return feet * 12 + inch;
}

console.log(feetInchToInch(5,8));

var resistance = [
	"Recommend a moderate amount of resistance exercise.  Do a variety of exercises, for various body parts.  Lift the maximum amount of weight possible for 6-8 reps per set.", 
  "Recommend a moderate amount of resistance exercise.  Do a variety of exercises, for various body parts.  Lift the maximum amount of weight possible for 10-12 reps per set.",
	"Recommend a moderate amount of resistance exercise.  Do a variety of exercises, for various body parts.  Lift the maximum amount of weight possible for 14+ reps per set."
  ]

var cardio = [
	"Recommend a moderate amount of cardiovascular exercise 2 times per week for 15-20 minutes.  Your heart rate should stay in zone 3 or 4 for your age as indicated by the chart. That will be 70-80% or 80-90% of maximum heart rate.", 
  "Recommend a moderate amount of cardiovascular exercise 2 times per week for 15-20 minutes.  Your heart rate should stay in zone 2 or 3 for your age as indicated by the chart. That will be 60-70% or 70-80% of maximum heart rate.  To target burning fat, aim for zone 2 and increase time to 30+ minutes.", 
  "Recommend a moderate amount of cardiovascular exercise 3 times per week for 15-20 minutes.  Your heart rate should stay in zone 2 or 3 for your age as indicated by the chart. That will be 60-70% or 70-80% of maximum heart rate.  To target burning fat, aim for zone 2 and increase time to 30+ minutes."
  ]

var nutrition = [
	"All calories are made up of macronutrients.  For your goal, it is recommended that those calories come 30% from protein, 40% from carbs and  30% from fat.",
  "All calories are made up of macronutrients.  For your goal, it is recommended that those calories come 35% from protein, 40% from carbs and 25% fat.", 
  "All calories are made up of macronutrients.  For your goal, it is recommended that those calories come 25% from protein, 50% from carbs and 25% from fat."
  ]


function profileToRecomm( userProfile, bmi ) {
	var fitnessGoal = userProfile.fitnessGoal;
 	var recommendation = new Object;

  if (fitnessGoal[0].toLowerCase() === "s") {
  	recommendation.resistance = resistance[0];
    recommendation.cardio = cardio[0];
    recommendation.nutrition = nutrition[0];
  } else if (fitnessGoal[0].toLowerCase() === "b") {
  	recommendation.resistance = resistance[1];
    recommendation.cardio = cardio[1];
    recommendation.nutrition = nutrition[1];
  } else {
    recommendation.resistance = resistance[2];
    recommendation.cardio = cardio[2];
    recommendation.nutrition = nutrition[2];
  }
 
  // var middleWeight = 21.75 * (height * 0.0254) ** 2;
  
  if (bmi.bmiStr[0].toLowerCase() === 'o') {
  	var weightLoss = " It is also recommended that you reduce your overall calories to lose weight.  Try reducing your overall calories by 500 calories per day.";
  } else if (bmi.bmiStr[0].toLowerCase() === 'u') {
  	var weightLoss = " It is also recommended that you increase your overall calories to gain weight.  Try adding to your overall calories by 500 calories day.";
  } else {
  	var weightLoss = "";
  }
  recommendation.nutrition += weightLoss;
  
  return recommendation;
}

var foo = {
	fitnessGoal: "Strength"
}
var moo = {
	bmiStr: "Underweight"
}
console.log('###################');
console.log(profileToRecomm(foo,moo));

/***** for calcing BMR -- for future *****/
//Men	BMR = 66 + ( 6.2 × weight in pounds ) + ( 12.7 × height in inches ) – ( 6.76 × age in years )
//Women BMR = 655.1 + ( 4.35 × weight in pounds ) + ( 4.7 × height in inches ) - ( 4.7 × age in years )
