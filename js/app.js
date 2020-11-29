//-------------//
// Form Layout //
//-------------//

// h1
let headerText = document.createElement('h1');
headerText.id = 'topH1'
headerText.innerText = 'Please fill the empty fields'

// Student Id - Label
let studentId_lbl = document.createElement('LABEL');
studentId_lbl.classList.add('label1');
studentId_lbl.innerText = 'Student ID';
// Student Id - Field
let studentId = document.createElement('input');
studentId.id = 'studentIdEntry';
studentId.classList.add('field')
studentId.name = 'studentIdEntry';
studentId.type = 'number';
studentId.placeholder ='Enter your ID ';

let EmptyRow = document.createElement('br');

// Student Name - Label
let studentName_lbl = document.createElement('LABEL');
studentName_lbl.classList.add('label2');
studentName_lbl.innerText = 'Student Name';
// Student Name - Field
let studentName = document.createElement('input');
studentName.id = 'studentNameEntry';
studentName.classList.add('field');
studentName.name = 'studentNameEntry';
studentName.type = 'text';
studentName.placeholder = 'Enter your Name';

// Empty Row
let EmptyRow2 = document.createElement('br');

// Student Surname - Label
let studentSurname_lbl = document.createElement('LABEL');
studentSurname_lbl.classList.add('label3');
studentSurname_lbl.innerText = 'Student Surname';
// Student Surname - Field
let studentSurname = document.createElement('input');
studentSurname.id = 'studentSurnameEntry';
studentSurname.classList.add('field');
studentSurname.name = 'studentSurnameEntry';
studentSurname.type = 'text';
studentSurname.placeholder = 'Enter your Surname';

// Empty Row
let EmptyRow3 = document.createElement('br');

// Student Points - Label
let studentPoints_lbl = document.createElement('LABEL');
studentPoints_lbl.classList.add('label4');
studentPoints_lbl.innerText = 'Student Points';
// Student Points - Field
let studentPoints = document.createElement('input');
studentPoints.id = 'studentPointsEntry';
studentPoints.classList.add('field');
studentPoints.name = 'studentPointsEntry';
studentPoints.type = 'number';
studentPoints.min = 0;
studentPoints.max = 100;
studentPoints.placeholder = 'Enter your Points';

// Empty Row
let EmptyRow4 = document.createElement('br');


// Btn Submit
let addSubmit = document.createElement('button');
addSubmit.classList.add('btnSubmit')
addSubmit.id = 'addSubmit';
addSubmit.innerText = 'Submit';
addSubmit.onclick = studentCreate;



// Appending 
let theContainer = document.getElementById('container');
theContainer.appendChild(headerText); // Appending h1
theContainer.appendChild(studentId_lbl); // Appending Student ID - Label
theContainer.appendChild(studentId); // Appending Student ID - Entry field
theContainer.appendChild(EmptyRow); // Empty Row
theContainer.appendChild(studentName_lbl); // Appending Student Name - Label
theContainer.appendChild(studentName); // Appending Student Name - Entry field
theContainer.appendChild(EmptyRow2); // Empty Row
theContainer.appendChild(studentSurname_lbl); // Appending Student Surname - Label
theContainer.appendChild(studentSurname); // Appending Student Surname - Entry Field
theContainer.appendChild(EmptyRow3); // Empty Row
theContainer.appendChild(studentPoints_lbl); // Appending Student Points - Label
theContainer.appendChild(studentPoints); // Appending Student Points - Entry Field
theContainer.appendChild(EmptyRow4); // Empty Row
theContainer.appendChild(addSubmit); // Form - Submit Button

//--------------//
//    D Code    //
//--------------//

// Constructor function for Student Objects
let students = []; // Global Array Variable for the Objects to check if they exists

function Student(id, name, surname, points){
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.points = points;
    this.DidPass = function(){
        if(this.points > 50){
            return true;
        }else{
            return false;
        }
    }
}

// Create New Student
function studentCreate(){
    let StudentID = studentId.value;
    let StudentName = studentName.value;
    let StudentSurname = studentSurname.value;
    let StudentPoints = studentPoints.value;
    
    let exists = checkIfStudentExists(StudentID);
    if(exists){
        alert('Student exists with the same ID')
    }else if(StudentID, StudentName,StudentSurname, StudentPoints != '' && CheckNameSurnameLetters() == true) {
        let newStudent = new Student(StudentID, StudentName, StudentSurname, StudentPoints);
        students.push(newStudent);
        console.log(students);
        // Reset form fields
        studentId.value = '';
        studentName.value = '';
        studentSurname.value = '';
        studentPoints.value = '';

        // ------------ //
        // Create Table //
        // ------------ //
        let dataCont = document.createElement('div');

        let object = {
            ID: StudentID,
            Name: StudentName,
            Surname: StudentSurname,
            Points: StudentPoints,
            get DidPass() { return this.Points > 50 ? true : false} // you have to use a getter, I think
          }

        let table = document.getElementById("table");
        let tbody = document.getElementById("tbody");
        for (const [key, value] of Object.entries(object)) { //iterate through the object's entries
        let row = tbody.insertRow(-1); // javascript has built-in table functions - insert row to back of table
        let cell1 = row.insertCell(0); //add cells
        let cell2 = row.insertCell(1);
        cell1.textContent = key;
        cell2.textContent = value;
        }

        // Second info //
        let info = document.createElement('h3');
        info.innerText = 'The student is successfully submitted!'
        info.classList.add('success');
        let data = document.createElement('p');
        data.classList.add('result');
        data.innerHTML = `New Student:  ${StudentID}  ${StudentName}  ${StudentSurname} ${StudentPoints}`;
        // Reset
        let btnReset = document.createElement('button');
        btnReset.innerText = 'Reset Form'
        btnReset.onclick = function(){
            dataCont.innerHTML = '';
            dataCont.innerHTML = '';
        }
        dataCont.appendChild(table);
        dataCont.appendChild(info);
        dataCont.appendChild(data);
        dataCont.appendChild(btnReset);

        theContainer.appendChild(dataCont);


    }else{
        alert('All fields are required or you have number in Name or Surname field');
    }
}

// Function to Check if the student exists already
function checkIfStudentExists(StudentID){
    let exists = false;
    for (let i = 0; i < students; i++){
        if(studentId.value == students[i].id){
            exists = true;
            alert('some kind of alert');
        }
    }
    return exists;
}


function CheckNameSurnameLetters(){ 
let letters = /^[A-Za-z]+$/;
if(studentName.value.match(letters) && (studentSurname.value.match(letters))){
    return true;
}else{
    alert('Name and Surname should contain letters only');
    return false;
    }
}