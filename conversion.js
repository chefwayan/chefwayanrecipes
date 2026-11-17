"use strict";
// Volume factors are milliliters per US customary unit; weight factors are grams.
const units = {
  volume: [
    ["US teaspoon (tsp)",4.92892159375],["US tablespoon (tbsp)",14.78676478125],
    ["US fluid ounce (fl oz)",29.5735295625],["US cup",236.5882365],
    ["US pint",473.176473],["US quart",946.352946],["US gallon",3785.411784],
    ["Milliliter (mL)",1],["Liter (L)",1000]
  ],
  weight: [["Ounce (oz)",28.349523125],["Pound (lb)",453.59237],["Gram (g)",1],["Kilogram (kg)",1000]],
  temperature: [["Fahrenheit (°F)","F"],["Celsius (°C)","C"]]
};
const category=document.getElementById("category"), amount=document.getElementById("amount"),from=document.getElementById("from"),to=document.getElementById("to"),result=document.getElementById("result"),error=document.getElementById("error");
function populate(){const options=units[category.value];from.replaceChildren();to.replaceChildren();options.forEach(([label],i)=>{for(const el of [from,to]){const option=document.createElement("option");option.value=String(i);option.textContent=label;el.append(option)}});from.value="0";to.value=category.value==="volume"?"7":category.value==="weight"?"2":"1";calculate()}
function format(n){return Number(n.toPrecision(10)).toLocaleString("en-US",{maximumFractionDigits:6})}
function calculate(){const raw=amount.value.trim();const n=Number(raw);if(raw===""||!Number.isFinite(n)){result.textContent="—";error.hidden=raw==="";error.textContent=raw===""?"":"Enter a valid number.";return}if(category.value!=="temperature"&&n<0){result.textContent="—";error.hidden=false;error.textContent="Enter a nonnegative amount.";return}const a=units[category.value][Number(from.value)][1],b=units[category.value][Number(to.value)][1];let converted;if(category.value==="temperature"){const c=a==="F"?(n-32)*5/9:n;converted=b==="F"?c*9/5+32:c}else{converted=n*a/b}error.hidden=true;error.textContent="";result.textContent=format(converted)+" "+units[category.value][Number(to.value)][0]}
category.addEventListener("change",populate);amount.addEventListener("input",calculate);from.addEventListener("change",calculate);to.addEventListener("change",calculate);document.getElementById("swap").addEventListener("click",()=>{const old=from.value;from.value=to.value;to.value=old;calculate()});document.getElementById("reset").addEventListener("click",()=>{category.value="volume";amount.value="1";populate()});populate();