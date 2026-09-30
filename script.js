const day=document.querySelector("#day");
const month=document.querySelector("#month");
const year=document.querySelector("#year");

const empty = document.querySelectorAll(".empty");
const invalidDay=document.querySelector(".invalid-day");
const invalidMonth=document.querySelector(".invalid-month");
const invalidYear=document.querySelector(".invalid-year");

const calculateBtn=document.querySelector(".calculate-btn");
const form = document.querySelector(".user-data");

const yearsOutput = document.querySelector("#years span");
const monthsOutput = document.querySelector("#months span");
const daysOutput = document.querySelector("#days span");

const currentYear = new Date().getFullYear();



function validateInput(input, emptyError, invalidError, condition) {

    // Check if input is empty

     if(input.value===""){
         emptyError.style.display = "block";
         invalidError.style.display = "none";
         input.classList.add("error");
         input.parentElement.classList.add("error");

         return false;
     }

     // Check if input is invalid

     if(condition){
        invalidError.style.display = "block";
        emptyError.style.display = "none";
        input.classList.add("error");
        input.parentElement.classList.add("error");
        return false;
     }

    // Everything is valid

    emptyError.style.display = "none";
    invalidError.style.display = "none";
    input.classList.remove("error");
    input.parentElement.classList.remove("error");
    return true;
}
     
form.addEventListener("submit", (e) => {
  e.preventDefault();
  
  const dayValid = validateInput(day, empty[0], invalidDay,Number(day.value) < 1 || Number(day.value) > 31);
  const monthValid = validateInput(month, empty[1], invalidMonth,Number(month.value) < 1 || Number(month.value) > 12);
  const yearValid = validateInput(year, empty[2], invalidYear,Number(year.value) > currentYear);

  // Check if all fields are valid
  if (dayValid && monthValid && yearValid) {
    const daysInMonth = new Date( Number(year.value), Number(month.value), 0).getDate();
    if (Number(day.value) > daysInMonth) {        
        invalidDay.style.display = "block";
         day.classList.remove("error");
        day.parentElement.classList.add("error");
        return;
    } 
    invalidDay.style.display = "none";
    day.classList.remove("error");
    day.parentElement.classList.remove("error");
   

    // Today's date

    const today = new Date();
    
    // Birth date

    const birthDate = new Date( Number(year.value),Number(month.value) - 1,Number(day.value));
    
    // Calculate age
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    // If today's day is before the birth day

    if(days<0){
        months--;
        const previousMonth= new Date(today.getFullYear(), today.getMonth(),0);
        days+=previousMonth.getDate();
        
    }
    // If months are negative, // borrow one year
    if(months<0){
        years--;
        months+=12;
        
    }
    yearsOutput.textContent = String(years).padStart(2, "0");
    monthsOutput.textContent = String(months).padStart(2, "0");
    daysOutput.textContent = String(days).padStart(2, "0");

   
}  

});

