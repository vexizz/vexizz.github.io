// console.log("hello");
// console.log("how are you?");
// let myName = "rohit";
// console.log("hello",myName);
// this is a comment
// let a = 10;
// const b = 10;
// // console.log(a);
// //a = 30;
// console.log(a);
// console.log(b);
// b = 30;
// myName2 = "Robert";
// console.log("hello", myName);
// console.log("hello", myName2);

// string variables = text variables alphanumeric
let a = 10;
let b = 1234;
let c = a + b;
console.log(c);
const id = 12345;
const city = "melbourne";
const uni = "RMIT";

// objects: collection of related variables or data
const myStudentRecord = {
    name: "Rohit",
    id: 12345,
    city: "melbourne"
};

console.log(myStudentRecord.name);
console.log(myStudentRecord.city);

const myAssignmentRecord = {
    id: 12345,
    as1Score: 80,
    as2Score: 90,
    as3Score: 85,
};
const total = myAssignmentRecord.as1Score + myAssignmentRecord.as2Score + myAssignmentRecord.as3Score;
console.log(total);

// boolean = test condition check True or false
const isItEvening = true;
const isItRaining = false;
myName = "Rohit";

// back ticks
const myAddress = `rmit university 124
latrobe st
melbourne is ${myName}'s address`;
console.log(myAddress);
const myDetails = `hello, I am ${myName}, I work for ${uni}`;
console.log(myDetails);

const student1 = "Alice";
const student2 = "Bob";
const student3 = "Charlie";
const student4 = "David";
console.log("hello", student1);

let students = ["Alice", "Bob", "Charlie", "David"];
// console.log("hello", students[0]);
// console.log("hello", students[1]);
// console.log("hello", students[2]);
// console.log("hello", students[3]);
let ids = [12, 13, 14, 15];
console.log(ids[2]);

let score = 78;
if (score >80) {
    console.log("hey you got HD");
    console.log("time for celebration");
} else if (score <= 80 && score >70)
{
    console.log("hey you got D");
}
else if (score <=70 && score >50)
{
    console.log("hey passed");
}
else if (score <50)
{
    console.log("hey you failed");
}

let marks = "88";
let marks2 = 88;
console.log(marks === marks2); 

// continue here
console.log("array size", students.length);
for (let i = 0; i<students.length; i++)
{
    console.log("value of i is", i);
    console.log("hello", students[i]);
}