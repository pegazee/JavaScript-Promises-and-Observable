// JSON object with information about 5 students
var studentData = [
    {
    "first_name": "John",
    "last_name": "Doe",
    "subject": "Maths",
    "ID":   "42"
    },
    {
    "first_name": "Jane",
    "last_name": "Smith",
    "subject": "Science",
    "ID":   "43"
    },
    {
    "first_name": "Michael",
    "last_name": "Johnson",
    "subject": "Commerce",
    "ID":   "44"
    },
    {
    "first_name": "Emily",
    "last_name": "Brown",
    "subject": "English",
    "ID":   "45"
    },
    {
    "first_name": "David",
    "last_name": "Lee",
    "subject": "Biology",
    "ID":   "46"
    }
];

var appenID = document.getElementById("studentDataInfo");

function StudentTable(){

    var html = '';
    appenID.innerHTML = '';

    studentData.forEach((student,index) => {
       //console.log(student);
    
       //create <tr></tr> element
       let id = `student-row-${index}`;
       let td_id = `action-col${index}`;
       let tr = document.createElement('tr');
       tr.setAttribute('id', id);
       appenID.appendChild(tr);

       // add row data in <td></td> element
        tr.innerHTML = `<td>${student.first_name}</td>
                        <td>${student.last_name}</td>
                        <td>${student.subject}</td>`;

        let action_td = document.createElement('td');
        action_td.setAttribute('id',td_id);
        document.getElementById(id).appendChild(action_td);

        // create Edit and Delete button
        let editbtn = document.createElement('button');
        let deletebtn = document.createElement('button');

        editbtn.innerText = 'Edit';
        deletebtn.innerText = 'Delete';

        editbtn.setAttribute('id','editbtn');
        deletebtn.setAttribute('id','delbtn');

        editbtn.addEventListener('click', function () {
            editInfo(student,index);
        });
        deletebtn.addEventListener('click', function () {
            deleteInfo(index);
        });

        // append button to <td></td> element
        let action_col = document.getElementById('action-col');
        document.getElementById(td_id).appendChild(editbtn);
        document.getElementById(td_id).appendChild(deletebtn);

    });
}

function deleteInfo(index){
    let id = `student-row-${index}`
    var delConfirm = confirm("Are you sure want to delete this record?");
    if(delConfirm){
        document.getElementById(id).remove();
    }
}

var table   =   document.getElementById('studentDataInfo'),
    getPopupContent =   document.getElementById('edit-content'),
    msg =   document.getElementById('message-content'),
    fname   =   document.getElementById('fname'),
    lname   =   document.getElementById('lname'),
    subject =   document.getElementById('subject');


function editInfo(student,index){
    console.log(index);
    //var new_firstName = prompt("Enter New First Name", student.first_name);
    var new_firstName = 'zdvsc';

    // let leftDiv = document.createElement("div");
    // leftDiv.setAttribute('class','left');
    // leftDiv.innerText = 'First Name';
    // getPopupContent.appendChild(leftDiv);

    // let fname = document.createElement('input');
    // fname.setAttribute('type','text')
    // fname.setAttribute('id','fname')
    // fname.setAttribute('name','fname')
    // fname.setAttribute('value',new_firstName);
    // getPopupContent.appendChild(fname);


    // <div class="left">First Name:</div><div class="right"><input type="text" id="fname" name="fname"></div>
    //                 <div class="left">Last Name:</div><div class="right"><input type="text" id="lname" name="lname"></div>
    //                 <div class="left">Subject:</div><div class="right"><input type="text" id="subject" name="subject"></div>
    //                 <button> save </button>
    //                 <button id=pop-upClose>Cancel</button>
    // if( new_firstName != null){
    //     student.first_name = document.getElementById('fname').value;
    // }
    getPopupContent.classList.remove('hide');
    getPopupContent.classList.add('show');

    fname.value = table.rows['student-row-'+index].cells[0].innerHTML;
    lname.value = table.rows['student-row-'+index].cells[1].innerHTML;
    subject.value = table.rows['student-row-'+index].cells[2].innerHTML;

    var savebtn = document.getElementById('content-save');
    // savebtn.disabled = true;
    // fname.onchange = function() { savebtn.disabled = false };
    // lname.onchange = function() { savebtn.disabled = false};
    // subject.onchange = function() { savebtn.disabled = false};

    savebtn.onclick = function(event) {
        // data fillup and update
        //savebtn.disabled = true;
        table.rows['student-row-'+index].cells[0].innerHTML =  fname.value;
        table.rows['student-row-'+index].cells[1].innerHTML =  lname.value;
        table.rows['student-row-'+index].cells[2].innerHTML =  subject.value;
        getPopupContent.classList.add('hide');

        
        
        // message show
        // function message_show(){\
        // }
        msg.classList.remove('hide');
        msg.classList.add('show');
        setTimeout(function (){
            msg.classList.add('hide');
            msg.classList.remove('show');
        }, 2000);
      }
}


// Get modal
var modal = document.getElementById("edit-content");

// <span> element and close <button> that closes the modal
var close = document.getElementsByClassName("close")[0];
var cancel = document.getElementById("content-cancel");

// When the user clicks on <span> (x) and cancel button to close the modal
close.onclick = function() {
    getPopupContent.classList.remove('show');
    getPopupContent.classList.add('hide');
  }

cancel.onclick = function() {
    getPopupContent.classList.remove('show');
    getPopupContent.classList.add('hide');
  }
  
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
        getPopupContent.classList.remove('show');
        getPopupContent.classList.add('hide');
    }
  }

StudentTable();