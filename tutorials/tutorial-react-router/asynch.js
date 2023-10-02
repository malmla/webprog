class MyTimer {
    counter = 0;
    tick() {
        console.log(this.counter++);
    }
}

const obj = new MyTimer();
//setInterval(obj.tick.bind(obj), 1000);

setTimeout(console.log, 1093, 'three');
setTimeout(console.log, 1058, 'four');
setTimeout(console.log, 1234, 'five');
setTimeout(console.log, 0, 'two');
console.log('one');