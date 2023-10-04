
const { Observable } = rxjs;

const obj = new Observable( (observer) => {
    console.log('Observable started');

    let next1= 'next1';
    let next2= 'next2';
    let next3= 'next3';
     
    observer.next(next1);
    observer.next(next2);
    observer.next(next3);
    observer.error('error')
    observer.complete('observable completed');
    observer.next('not work');
   
     

});

var handle = {
    next: (data)=>{
            console.log(data);
    },
    error: ()=>{

    },
    complete: () => {
            console.log('success')
    }
}



var handle2 = {
    next: (data)=>{
            console.log(data + "2");
    },
    error: ()=>{

    },
    complete: () => {
            console.log('success')
    }
}

obj.subscribe(handle);
obj.subscribe(handle2);


// let subscription = obj.subscribe(console.log);

// subscription.unsubscribe(console.log('observable unsbscribed'));
console.log('hello after the observable')
