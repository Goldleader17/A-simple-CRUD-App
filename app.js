const form = document.getElementById('crud-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const textareaInput = document.getElementById('note');
const dataList = document.getElementById('data-list');
const data = JSON.parse(localStorage.getItem('data')) || [];

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const name = nameInput.value;
  const email = emailInput.value;
  const note = textareaInput.value;

  if (name && email && note) {
    const entry = { name, email, note };
    data.push(entry);
    saveData();
    displayData();
    form.reset();
  }
});

function displayData() {
  dataList.innerHTML = '';
  data.forEach((entry, index) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <span>${entry.name} - ${entry.email}</span>
      <p>${entry.note}</p>
      <button onclick="editEntry(${index})">Edit</button>
      <button onclick="deleteEntry(${index})">Delete</button>
    `;
    dataList.appendChild(listItem);
  });
}

function editEntry(index) {
  const entry = data[index];
  nameInput.value = entry.name;
  emailInput.value = entry.email;
  textareaInput.value = entry.note;

  // Remove the entry from the list, but don't save it yet (allow editing).
  data.splice(index, 1);
  displayData();
}

function deleteEntry(index) {
  // Remove the entry from the data array and save the updated data.
  data.splice(index, 1);
  saveData();
  displayData();
}

function saveData() {
  localStorage.setItem('data', JSON.stringify(data));
}

displayData();
