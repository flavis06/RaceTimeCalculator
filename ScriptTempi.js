let records;
let k;
let womenRecords =  {"100m": "10.49", "200m": "21.34", "400m": "47.60", "800m": "1:53.28", "1000m": "2:28.98", "1500m": "3:48.68", "3000m": "8:06.11", "5000m": "13:58.06", "10000m": "28:54.14",};
let menRecords = {"100m": "9.58", "200m": "19.19", "400m": "43.03", "800m": "1:40.91", "1000m": "2:11.96", "1500m": "3:26.00", "3000m": "7:17.55", "5000m": "12:35.36", "10000m": "26:11.00",};
let distances = [100, 200, 400, 800, 1000, 1500, 3000, 5000, 10000,];

function preliminaryChecks(timeCheck, distanceCheck) {
let control = true;
let allowedTimeValue = function(timeCheck) {
	if (timeCheck.includes(" ") || !((isFinite(Number(timeCheck.replaceAll(":", "1").replaceAll(".", "1")))) && Number(timeCheck.replaceAll(":", "1").replaceAll(".", "1"))>0 )) {
		alert("Inserire un valore di tempo valido.");
		control = false;
	}
}
let allowedDistanceValue = function(distanceCheck) {
	if (distanceCheck.includes(" ") || !isFinite(Number(distanceCheck))) {
		alert("Inserire una distanza valida.");
		control = false;
	}
}
let checkGender = function() {
	if (document.querySelector("input[name='sesso2']:checked").value=="male") {
	records = menRecords;
	}
	else {
	records = womenRecords;
	}
	if (document.querySelector("input[name='sesso1']:checked").value=="male") {
	k = 1.123;
	}
	else {
	k = 1.06;
}}
allowedTimeValue(timeCheck);
allowedDistanceValue(distanceCheck);
checkGender();
return control
}

function ConvertiTempiInSecondi(tempo) {
let tempoArr = tempo.split(":");
if (tempoArr.length == 3) {
	let ore = +tempoArr[0];
	let minuti = +tempoArr[1];
	let secondi = +tempoArr[2];
	let tempoInSecondi = 3600*ore + 60*minuti + secondi;
	return tempoInSecondi;
	}
else if (tempoArr.length == 2) {
	let minuti = +tempoArr[0];
	let secondi = +tempoArr[1];
	let tempoInSecondi = 60*minuti + secondi;
	return tempoInSecondi;
	}
else if (tempoArr.length == 1) {
	let secondi = +tempoArr[0];
	let tempoInSecondi = secondi;
	return tempoInSecondi;
	}
else alert("Inserire un valore di tempo valido.");
}

function ConvertiTempiInStandard(t2) {
	let ore = Math.floor(t2 / 3600);
	let minuti = Math.floor((t2 - 3600*ore) / 60);
	let secondi = Math.trunc(100*(t2 - 3600*ore - 60*minuti))*0.01;
	let minutiCorretto = minuti;
	let secondiCorretto = secondi.toFixed(2);
	if (minuti < 10 && ore != 0) {
		minutiCorretto = "0" + minuti;
	}
	if (secondi < 10 && (minuti !=0 || ore != 0)) {
		secondiCorretto = "0" + secondi.toFixed(2);
	}
	let tempoStandard = ore + ":" + minutiCorretto + ":" + secondiCorretto;
	if (ore == 0) {
		tempoStandard = minutiCorretto + ":" + secondiCorretto;
	}
	if (ore == 0 && minuti < 10) {
		tempoStandard = minuti + ":" + secondiCorretto;
	}
	if (minuti == 0 && ore==0) {
		tempoStandard = secondiCorretto;
	}
	return tempoStandard;
}

function timeCalculator1(d1, t1, d2, k) {
let t2Raw = (+(((d2/d1)**k)*t1*100).toFixed(0))*0.01;
return ConvertiTempiInStandard(t2Raw);
}

function timeCalculator2(p, t) {
let tCorretto = ConvertiTempiInSecondi(t);
let tFinale = +((tCorretto / p).toFixed(2));
return ConvertiTempiInStandard(tFinale);
}

function calcolaTempi() {
if (!preliminaryChecks(document.getElementById("t1").value.trim(), document.getElementById("d1").value.trim())) return;

let t1 = ConvertiTempiInSecondi(document.getElementById("t1").value.trim());
let d1 = Number(document.getElementById("d1").value.trim());

distances.forEach(d2 => {
	let time = document.getElementById(d2.toString()).cells[1];
	time.innerHTML = timeCalculator1(d1, t1, d2, k);
})}

function calcolaTempiConRecord() {
if (!preliminaryChecks(document.getElementById("tempo").value.trim(), "0")) return;

let t0 = ConvertiTempiInSecondi(document.getElementById("tempo").value.trim());
let tRecord = ConvertiTempiInSecondi(records[document.getElementById("distanza").value]);
let p = tRecord/t0;

distances.forEach(d2WithRecord => {
	let TimeWithRecords = document.getElementById(d2WithRecord.toString() + "m").cells[1];
	TimeWithRecords.innerHTML = timeCalculator2(p, records[d2WithRecord.toString() + "m"]);
})

document.getElementById("percentualeRecord").innerHTML = `Percentuale del record del mondo: ${(100*p).toFixed(1)}%`
}
