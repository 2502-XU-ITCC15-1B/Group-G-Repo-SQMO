let editMode=false;

const adminModeBtn=document.getElementById("adminModeBtn");

const allButtons=document.querySelectorAll(".report_btn,.ndreport_btn");

function toggleEdit(){

editMode=!editMode;

adminModeBtn.textContent=
editMode?"User Mode":"Admin Mode";
}

allButtons.forEach(btn=>{

const key=btn.dataset.key;

btn.addEventListener("click",()=>{

if(editMode){

let existing=localStorage.getItem(key)||"";

let newLink=prompt(
"Google Drive Link (empty = delete):",
existing
);

if(newLink===null)return;

newLink=newLink.trim();

if(newLink===""){

localStorage.removeItem(key);
alert("Link deleted");

}else{

localStorage.setItem(key,newLink);
alert("Link saved");
}

}else{

let link=localStorage.getItem(key);

if(link){
window.open(link,"_blank");
}else{
alert("No link assigned yet.");
}
}

});
});

const menuBtn=document.getElementById("menuBtn");
const sidebar=document.getElementById("sidebar");
const overlay=document.getElementById("overlay");

menuBtn.onclick=()=>{

sidebar.classList.add("active");
overlay.classList.add("active");

};

overlay.onclick=()=>{

sidebar.classList.remove("active");
overlay.classList.remove("active");

};

adminModeBtn.onclick=(e)=>{

e.preventDefault();
toggleEdit();

};