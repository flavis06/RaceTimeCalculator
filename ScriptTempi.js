let Time100m = document.getElementById("100").cells[1];
let Time200m = document.getElementById("200").cells[1];
let Time400m = document.getElementById("400").cells[1];
let Time800m = document.getElementById("800").cells[1];
let Time1000m = document.getElementById("1000").cells[1];
let Time1500m = document.getElementById("1500").cells[1];
let Time3000m = document.getElementById("3000").cells[1];
let Time5000m = document.getElementById("5000").cells[1];
let Time10000m = document.getElementById("10000").cells[1];

let Time100mConRecord = document.getElementById("100m").cells[1];
let Time200mConRecord = document.getElementById("200m").cells[1];
let Time400mConRecord = document.getElementById("400m").cells[1];
let Time800mConRecord = document.getElementById("800m").cells[1];
let Time1000mConRecord = document.getElementById("1000m").cells[1];
let Time1500mConRecord = document.getElementById("1500m").cells[1];
let Time3000mConRecord = document.getElementById("3000m").cells[1];
let Time5000mConRecord = document.getElementById("5000m").cells[1];
let Time10000mConRecord = document.getElementById("10000m").cells[1];

let records;

let k;

let womenRecords =  {"100m": "10.49", "200m": "21.34", "400m": "47.60", "800m": "1:53.28", "1000m": "2:28.98", "1500m": "3:48.68", "3000m": "8:06.11", "5000m": "13:58.06", "10000m": "28:54.14",}

let menRecords = {"100m": "9.58", "200m": "19.19", "400m": "43.03", "800m": "1:40.91", "1000m": "2:11.96", "1500m": "3:26.00", "3000m": "7:17.55", "5000m": "12:35.36", "10000m": "26:11.00",}

function allowedTimeValue(tempoCheck) {
if (tempoCheck.includes(" ") || !(isFinite(Number(tempoCheck.replaceAll(":", "1").replaceAll(".", "1")))))
	alert("Inserire un valore di tempo valido.");
}

function ConvertiTempiInSecondi(tempo) {
let tempoArr = tempo.split(":");
if (tempoArr.length == 3) {
	let ore = +tempoArr[0];
	let minuti = +tempoArr[1];
	let secondi = +tempoArr[2];
	let t1 = 3600*ore + 60*minuti + secondi;
	return t1;
	}
else if (tempoArr.length == 2) {
	let minuti = +tempoArr[0];
	let secondi = +tempoArr[1];
	let t1 = 60*minuti + secondi;
	return t1;
	}
else if (tempoArr.length == 1) {
	let secondi = +tempoArr[0];
	let t1 = secondi;
	return t1;
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
let t = ((d2/d1)**k)*t1*100;
let t2 = (t.toFixed(0))*0.01;
return ConvertiTempiInStandard(t2);
}


function calcolaTempi() {
checkGender();
let CheckTime = document.getElementById("t1").value.trim();
let CheckDistance =
allowedTimeValue(CheckTime);
let tempo = document.getElementById("t1").value;
let t1 = ConvertiTempiInSecondi(tempo);
let d1 = Number(document.getElementById("d1").value);
Time100m.innerHTML = timeCalculator1(d1, t1, 100, k);
Time200m.innerHTML = timeCalculator1(d1, t1, 200, k);
Time400m.innerHTML = timeCalculator1(d1, t1, 400, k);
Time800m.innerHTML = timeCalculator1(d1, t1, 800, k);
Time1000m.innerHTML = timeCalculator1(d1, t1, 1000, k);
Time1500m.innerHTML = timeCalculator1(d1, t1, 1500, k);
Time3000m.innerHTML = timeCalculator1(d1, t1, 3000, k);
Time5000m.innerHTML = timeCalculator1(d1, t1, 5000, k);
Time10000m.innerHTML = timeCalculator1(d1, t1, 10000, k);
}

function calcolaTempiConRecord() {
checkGender();
let distanza = document.getElementById("distanza").value;
let t0 = document.getElementById("tempo").value;
allowedTimeValue(t0);
let t0Corretto = ConvertiTempiInSecondi(t0);
let tRecord = ConvertiTempiInSecondi(records[distanza]);
let p = tRecord/t0Corretto;
Time100mConRecord.innerHTML = timeCalculator2(p, records["100m"]);
Time200mConRecord.innerHTML = timeCalculator2(p, records["200m"]);
Time400mConRecord.innerHTML = timeCalculator2(p, records["400m"]);
Time800mConRecord.innerHTML = timeCalculator2(p, records["800m"]);
Time1000mConRecord.innerHTML = timeCalculator2(p, records["1000m"]);
Time1500mConRecord.innerHTML = timeCalculator2(p, records["1500m"]);
Time3000mConRecord.innerHTML = timeCalculator2(p, records["3000m"]);
Time5000mConRecord.innerHTML = timeCalculator2(p, records["5000m"]);
Time10000mConRecord.innerHTML = timeCalculator2(p, records["10000m"]);
document.getElementById("percentualeRecord").innerHTML = `Percentuale del record del mondo: ${(100*p).toFixed(1)}%`
}

function timeCalculator2(p, T) {
let TCorretto = ConvertiTempiInSecondi(T);
let tFinale = +(Math.trunc((TCorretto/p)*100)*0.01).toFixed(2);
return ConvertiTempiInStandard(tFinale);
}

function checkGender () {
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
}
}