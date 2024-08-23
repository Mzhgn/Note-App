// const months = ["January", "February", "March", "April", "May", "June", "July",
//     "August", "September", "October", "November", "December"];

const $ = document;
const popUpEl = $.querySelector(".popup-box");
const addBox = $.querySelector(".add-box");
const titleEl = $.querySelector("header p");
const closeEl = $.querySelector("header i");
const inputEl = $.querySelector("input");
const descriptionEl = $.querySelector("textarea");
const btnElm = $.querySelector("button");

let notes = [];

function getLocalStorageData() {
  let LocalStorageData = localStorage.getItem("notes");
  console.log(LocalStorageData);
}
getLocalStorageData();
