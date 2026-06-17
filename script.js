let totalScans = Number(localStorage.getItem("totalScans")) || 0;
let safeCount = Number(localStorage.getItem("safeCount")) || 0;
let dangerCount = Number(localStorage.getItem("dangerCount")) || 0;
let scanHistory = JSON.parse(localStorage.getItem("scanHistory")) || [];

function updateUI(){
document.getElementById("totalScans").innerText = totalScans;
document.getElementById("safeCount").innerText = safeCount;
document.getElementById("dangerCount").innerText = dangerCount;
}

function loadHistory(){
let history = document.getElementById("history");
history.innerHTML = "";

scanHistory.forEach(url=>{
let li = document.createElement("li");
li.innerText = url;
history.appendChild(li);
});
}

function checkLink(){

let url = document.getElementById("urlInput").value;

if(url.trim() === ""){
alert("Please enter a URL");
return;
}

let suspiciousWords = [
"login","verify","secure","account","bank",
"gift","free","prize","update","paypal",
"password","signin"
];

let score = 0;

if(url.includes("@")) score += 2;
if(url.length > 60) score += 1;
if(url.includes("-")) score += 1;

suspiciousWords.forEach(word=>{
if(url.toLowerCase().includes(word)) score++;
});

let result = document.getElementById("result");
let confidence = document.getElementById("confidence");
let bar = document.getElementById("bar");

totalScans++;

let percent = 0;

if(score >= 4){

result.innerHTML = "🔴 DANGEROUS LINK";
percent = 95;
confidence.innerHTML = "AI Confidence: 95% Dangerous";
bar.style.width = "95%";
bar.style.background = "red";
dangerCount++;

}
else if(score >= 2){

result.innerHTML = "🟡 SUSPICIOUS LINK";
percent = 65;
confidence.innerHTML = "AI Confidence: 65% Suspicious";
bar.style.width = "65%";
bar.style.background = "orange";

}
else{

result.innerHTML = "🟢 SAFE LINK";
percent = 20;
confidence.innerHTML = "AI Confidence: 80% Safe";
bar.style.width = "20%";
bar.style.background = "limegreen";

safeCount++;

}

scanHistory.unshift(url);

localStorage.setItem("totalScans", totalScans);
localStorage.setItem("safeCount", safeCount);
localStorage.setItem("dangerCount", dangerCount);
localStorage.setItem("scanHistory", JSON.stringify(scanHistory));

updateUI();
loadHistory();
}

function generateReport(){

let report = `
🔐 SAFECLICK AI SECURITY REPORT
--------------------------------
Total Scans: ${totalScans}
Safe Links: ${safeCount}
Dangerous Links: ${dangerCount}

Risk Level:
${dangerCount > safeCount ? "⚠️ HIGH RISK USER" : "✅ LOW RISK USER"}
`;

alert(report);
}

updateUI();
loadHistory();