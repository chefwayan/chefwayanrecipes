'use strict';
const ingredientsEl = document.getElementById('ingredients');
const servingsEl = document.getElementById('servings');
const targetEl = document.getElementById('target');
const errorEl = document.getElementById('error');
let ingredientCounter=0;
const money = amount => amount.toLocaleString('en-US',{style:'currency',currency:'USD'});
function addIngredient(name='',cost='') {
  const row=document.createElement('div'); row.className='ingredient-row';
  const nameField=document.createElement('div');nameField.className='field';
  const nameLabel=document.createElement('label');nameLabel.textContent='Ingredient name';
  const nameInput=document.createElement('input');nameInput.type='text';nameInput.placeholder='e.g., Chicken breast';nameInput.value=name;
  const costField=document.createElement('div');costField.className='field';
  const costLabel=document.createElement('label');costLabel.textContent='Cost ($)';
  const costInput=document.createElement('input');costInput.type='number';costInput.min='0';costInput.step='0.01';costInput.placeholder='0.00';costInput.inputMode='decimal';costInput.value=cost;
  const id='ingredient-'+(++ingredientCounter);
  nameInput.id=id;nameLabel.htmlFor=id;costInput.id=id+'-cost';costLabel.htmlFor=costInput.id;
  nameField.append(nameLabel,nameInput);costField.append(costLabel,costInput);
  const remove=document.createElement('button');remove.type='button';remove.className='remove';remove.textContent='×';remove.setAttribute('aria-label','Remove ingredient');
  remove.addEventListener('click',()=>{row.remove();updateRemoveButtons();calculate()});
  costInput.addEventListener('input',calculate);
  row.append(nameField,costField,remove);ingredientsEl.append(row);updateRemoveButtons();calculate();
}
function updateRemoveButtons(){const rows=ingredientsEl.querySelectorAll('.ingredient-row');rows.forEach(row=>row.querySelector('.remove').disabled=rows.length===1)}
function calculate(){
  let total=0;let invalid=false;
  ingredientsEl.querySelectorAll('input[type="number"]').forEach(input=>{const value=Number(input.value);if(input.value!==''&&(!Number.isFinite(value)||value<0||!input.validity.valid)){invalid=true}else{total+=value}});
  const servings=Number(servingsEl.value),target=Number(targetEl.value);
  if(!Number.isInteger(servings)||servings<=0||!Number.isFinite(target)||target<=0||target>100||!servingsEl.validity.valid||!targetEl.validity.valid)invalid=true;
  errorEl.hidden=!invalid;errorEl.textContent=invalid?'Enter nonnegative ingredient costs, a whole number of servings (at least 1), and a target percentage above 0 and at most 100.':'';
  const portion=invalid?null:total/servings;const price=invalid?null:portion/(target/100);
  document.getElementById('total-cost').textContent=invalid?'—':money(total);
  document.getElementById('portion-cost').textContent=invalid?'—':money(portion);
  document.getElementById('selling-price').textContent=invalid?'—':money(price);
  document.getElementById('gross-profit').textContent=invalid?'—':money(price-portion);
}
document.getElementById('add-ingredient').addEventListener('click',()=>addIngredient());
servingsEl.addEventListener('input',calculate);targetEl.addEventListener('input',calculate);
document.getElementById('reset').addEventListener('click',()=>{ingredientsEl.replaceChildren();servingsEl.value='1';targetEl.value='38';addIngredient('Main ingredient','');addIngredient('Other ingredients','')});
document.getElementById('print').addEventListener('click',()=>window.print());
document.getElementById('year').textContent=new Date().getFullYear();
addIngredient('Main ingredient','');addIngredient('Other ingredients','');
