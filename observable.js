
const { Observable } = rxjs;

const obj = new Observable( (observer) => {
    console.log('Observable started');

    const url = 'https://api-generator.retool.com/s6cCW2/employee-data';

    const http = new XMLHttpRequest();
    http.onload = function(){
        if(http.status === 200){
            observer.next(JSON.parse(http.response));
        } else{
            observer.error(http.status);
        }
    }
     http.open('GET', url);
     http.send();
     
    // observer.next('Get');
    // observer.next('Put');
    // observer.next('Delete');
    // observer.complete('observable completed')
    // observer.next('Delete');
   
     

});

// let subscription = obj.subscribe(console.log);

// subscription.unsubscribe(console.log('observable unsbscribed'));
// console.log('hello after the observable')
var appenID = document.getElementById("studentDataInfo");
var table   =   document.getElementById('studentDataInfo'),
    getPopupContent =   document.getElementById('edit-content'),
    msg =       document.getElementById('message-content'),
    fname   =   document.getElementById('fname'),
    lname   =   document.getElementById('lname'),
    subject =   document.getElementById('subject');

obj.subscribe({
    next: (data) =>{
       
        data.forEach((employee,index) => {
           // console.log(employee);
         
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
                    let editInfo =  {};
                    editInfo.edit('https://api-generator.retool.com/s6cCW2/employee-data/'+employee.id, data);
                }
                 
             });

             deletebtn.addEventListener('click', function () {

                 let deleteInfo =  {};
                 deleteInfo.delete('https://api-generator.retool.com/s6cCW2/employee-data/'+employee.id, (response, error) =>{
                    let delConfirm = confirm("Are you sure want to delete this record?");
                     if(response){
                        if(delConfirm){
                            document.getElementById(id).remove();
                        }
                     }else{
                         alert('error while deleting the record:', error);
                     }
                 });

             });
     
             // append button to <td></td> element
             let action_col = document.getElementById('action-col');
             document.getElementById(td_id).appendChild(editbtn);
             document.getElementById(td_id).appendChild(deletebtn);
     
         });
    },
    error: (error) => {
        alert('API data not found, Status:', error);
    }
});

// function apiData(){
//      var http = new XMLHttpRequest();
//      var getHttp = function getHttp(){
//          return http;
//      }
//      var setHttp = function setHttp(newHttp){
//         http = newHttp;
//     }
//      return {
//         "get" : getHttp,
//         "set": setHttp
//      }
// }
// apiData.prototype.data = function(){
//     alert()
// }

// apiData().get();
// apiData().set();

Object.prototype.delete = (url, callback) =>{

    this.http = new XMLHttpRequest();
    this.http.open("DELETE", url, true);
    this.http.setRequestHeader(
        'Content-type', 'application/json');

    let self = this;
        
    // When the response is ready
    this.http.onload = function () {
        // Checking status
        if (self.http.status === 200) {
            callback("Post Deleted", null);
        } else {
            callback(null, "Error: " + self.http.status);
        }
    };
    this.http.send();

}

Object.prototype.edit = (url,data) =>{

        // this.http = new XMLHttpRequest();
        // this.http.open("PUT", url, true);
        // this.http.setRequestHeader(
        //     'Content-type', 'application/json');

        // let self = this;
            
        // // When the response is ready
        // this.http.onload = function () {
        //     // Checking status
        //     if (self.http.status === 200) {
        //         callback("Post Updated", null);
        //     }
        // };
        // this.http.send(JSON.stringify(data));


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