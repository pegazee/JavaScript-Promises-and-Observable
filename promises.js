var appenID = document.getElementById("studentDataInfo");

function EmployeeTable(){

    var html = '';
    appenID.innerHTML = '';
    studentData = fetch('https://api-generator.retool.com/s6cCW2/employee-data');

    studentData.then((response) => {
        if(response.status === 200 && response.ok === true){
            return response.json();
        }
    })
    .then((jsonData) => {

        console.log(jsonData);
        jsonData.forEach((employee,index) => {
               //console.log(employee);
            
               //create <tr></tr> element
               let id = `student-row-${employee.id}`;
               let td_id = `action-col${employee.id}`;
               let tr = document.createElement('tr');
               tr.setAttribute('id', id);
               appenID.appendChild(tr);
        
               // add row data in <td></td> element
                tr.innerHTML = `<td>${employee.first_name}</td>
                                <td>${employee.last_name}</td>
                                <td>${employee.job_title}</td>`;
        
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
                    editInfo(employee,employee.id);
                });
                deletebtn.addEventListener('click', function () {
                    deleteInfo(employee.id);
                });
        
                // append button to <td></td> element
                let action_col = document.getElementById('action-col');
                document.getElementById(td_id).appendChild(editbtn);
                document.getElementById(td_id).appendChild(deletebtn);
        
            });

    })
    .catch( (error) => console.log(error) );

    // studentData.
}

function deleteInfo(index){
    let id = `student-row-${index}`
    var delConfirm = confirm("Are you sure want to delete this record?");
    if(delConfirm){
        document.getElementById(id).remove();
        employee_fetch('https://api-generator.retool.com/s6cCW2/employee-data/'+index, 'DELETE' );
    }
}

var table   =   document.getElementById('studentDataInfo'),
    getPopupContent =   document.getElementById('edit-content'),
    msg =       document.getElementById('message-content'),
    fname   =   document.getElementById('fname'),
    lname   =   document.getElementById('lname'),
    subject =   document.getElementById('subject');


function editInfo(employee,id){
    console.log(id);
 
    getPopupContent.classList.remove('hide');
    getPopupContent.classList.add('show');

    fname.value = table.rows['student-row-'+id].cells[0].innerHTML;
    lname.value = table.rows['student-row-'+id].cells[1].innerHTML;
    subject.value = table.rows['student-row-'+id].cells[2].innerHTML;

    var savebtn = document.getElementById('content-save');

        savebtn.onclick = function(event) {
         
        getPopupContent.classList.add('hide');

        var data = {
            first_name: fname.value,
            last_name:  lname.value,
            job_title:  subject.value
        }

        employee_fetch('https://api-generator.retool.com/s6cCW2/employee-data/'+id,'PUT', data)

      }
}

function employee_fetch(url, type, data ){
    if( type === 'DELETE' ){
        var deleteData = fetch(url,{
            method:     type,
            headers:    {
                "Content-type": "application/json",
            }
        });
        deleteData.then((response) => {
             // message show
            let msg_del =   document.getElementById('messageDel-content');
            msg_del.classList.remove('hide');
            msg_del.classList.add('show');
            setTimeout(function (){
                msg_del.classList.add('hide');
                msg_del.classList.remove('show');
            }, 3000);
            console.log(response.json());
        })
        .catch((error) => console.log(error));
    }
    if( type === 'PUT' ){
        var updateData = fetch(url,{
            method:     type,
            headers:    {
                "Content-type": "application/json",
            },
            body:   JSON.stringify({
                        first_name: data.first_name,
                        last_name:  data.last_name,
                        job_title:  data.job_title                      
                    })
        });

        updateData.then((response) => {
             return response.json();
        })
        .then( (UpdatedData) => {

            console.log(UpdatedData);
            table.rows['student-row-'+UpdatedData.id].cells[0].innerHTML =  UpdatedData.first_name;
            table.rows['student-row-'+UpdatedData.id].cells[1].innerHTML =  UpdatedData.last_name;
            table.rows['student-row-'+UpdatedData.id].cells[2].innerHTML =  UpdatedData.job_title;
 
            getPopupContent.classList.add('hide');
            
            // message show
            
            msg.classList.remove('hide');
            msg.classList.add('show');
            setTimeout(function (){
                msg.classList.add('hide');
                msg.classList.remove('show');
            }, 3000);
        })
        .catch((error) => console.log(error));
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

EmployeeTable();