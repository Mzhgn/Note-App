const $ = document;
const wrapperEl = $.querySelector(".wrapper");
const popUpEl = $.querySelector(".popup-box");
const addBox = $.querySelector(".add-box");
const titleEl = $.querySelector("header p");
const closeEl = $.querySelector("header i");
const inputEl = $.querySelector("input");
const descriptionEl = $.querySelector("textarea");
const btnElm = $.querySelector("button");

let isUpdate = false;
let updateId = null;
let notes = [];

addBox.addEventListener("click", showModal);

btnElm.addEventListener("click", () => {
  if (isUpdate) {
    let allNotes = getLocalStorageData();

    allNotes.some((note, index) => {
      if (index === updateId) {
        note.tite = inputEl.value;
        note.description = descriptionEl.value;
      }
    });
    setDataInLocalStorage(allNotes);
    generateNotes(allNotes);
    closeModal();
    clearInputs();

    isUpdate = false;
  } else {
    let newNote = {
      tite: inputEl.value,
      description: descriptionEl.value,
      date: showDate(),
    };
    notes.push(newNote);

    setDataInLocalStorage(notes);
    generateNotes(notes);
    closeModal();

    clearInputs();
  }
});
function clearInputs() {
  inputEl.value = "";
  descriptionEl.value = "";
}
function generateNotes(notes) {
  $.querySelectorAll(".note").forEach((note) => {
    note.remove();
  });
  notes.forEach((note, i) => {
    let notesLi = `<li class="note">
        <div class="details">
          <p>${note.tite}</p>
          <span>${note.description}</span>
        </div>
        <div class="bottom-content">
          <span>${note.date}</span>
          <div class="settings">
            <i class="uil uil-ellipsis-h" onclick="showSetting(this)"></i>
            <ul class="menu">
              <li onclick="editNote(${i} ,'${note.tite}','${note.description}')">
                <i class="uil uil-pen"></i>Edit
              </li>
              <li onclick="deleteNote(${i})">
                <i class="uil uil-trash" ></i>Delete
              </li>
            </ul>
          </div>
        </div>
      </li>`;
    wrapperEl.insertAdjacentHTML("beforeend", notesLi);
  });
}

function showSetting(el) {
  el.parentElement.classList.add("show");

  document.addEventListener("click", (e) => {
    if (e.target.tagName !== "I" || e.target != el) {
      el.parentElement.classList.remove("show");
    }
  });
}

function deleteNote(noteIndex) {
  let checkIfDeleted = confirm("Are you sure to delete the note?");

  if (checkIfDeleted) {
    let newNotes = getLocalStorageData();
    newNotes.splice(noteIndex, 1);

    setDataInLocalStorage(newNotes);

    generateNotes(newNotes);
  }
}

function editNote(index, noteTitle, noteDesc) {
  isUpdate = true;

  showModal(noteTitle, noteDesc);
  updateId = index;
}
function showModal(noteTitle, noteDesc) {
  if (isUpdate) {
    titleEl.innerHTML = "Update your note";
    btnElm.innerHTML = "Update the Note";

    inputEl.value = noteTitle;
    descriptionEl.value = noteDesc;
  } else {
    titleEl.innerHTML = "Add a note";
    btnElm.innerHTML = "Add the Note";
  }
  inputEl.focus();
  popUpEl.classList.add("show");
}

closeEl.addEventListener("click", closeModal);

function closeModal() {
  popUpEl.classList.remove("show");
}
window.addEventListener("keyup", (e) => {
  if (e.key === "Escape") {
    closeModal();
  }
});

function getLocalStorageData() {
  let LocalStorageData = localStorage.getItem("notes");
  if (LocalStorageData) {
    notes = JSON.parse(LocalStorageData);
  } else {
    notes = [];
  }
  return notes;
}

function setDataInLocalStorage(notes) {
  localStorage.setItem("notes", JSON.stringify(notes));
}

function showDate() {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let now = new Date();

  let day = days[now.getDay()];
  let month = months[now.getMonth()];
  let year = now.getFullYear();
  let date = now.getDate();

  let dateInfo = ` ${month} ${date} ${year}(${day} )`;

  return dateInfo;
}

window.addEventListener("load", () => {
  let notes = getLocalStorageData();
  generateNotes(notes);
});
