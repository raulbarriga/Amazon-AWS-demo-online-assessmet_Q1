const processLogs = (logs, threshold) => {
  // object to count the # of occurrences
  let count = {}; // key is the id, value is the # of occurrences

  // to store our result of string ids (have to be in ascending order[small to big #'s])
  let result = [];

  for (let i = 0; i < logs.length; i++) {
    // break up the transaction values (we just need to check the first 2 for each)
    let transValues = logs[i].split(" ");
    let senderId = transValues[0];
    let receiverId = transValues[1];

    // check if the sender's id is not the same as the receiver's (if it is, count the id as 1 not 2)
    if (senderId != receiverId) {
      // now we can compare the 2:

      // check if the sender & receiver's ids are already in the count object, increment it by 1, else initialize it equal to 1
      if (count[senderId]) {
        count[senderId] += 1;
      } else {
        count[senderId] = 1;
      }

      if (count[receiverId]) {
        count[receiverId] += 1;
      } else {
        count[receiverId] = 1;
      }
    } else {
      // if the sender & receiver ids are the same
      if (count[senderId]) {
        count[senderId] += 1;
      }
    }
  }

  // iterate over object & check the threshold
  for (let key in count) {
    // get each key's value
    let eachValue = count[key];
    //compare the integer value with threshold
    if (eachValue >= threshold) {
      result.push(key);
    }
  }
  if (result.length > 1) {
    // sort from small to great
    result.sort((a, b) => a - b);
  }
  // console.log("count:", count);

  return result;
};

let logs1 = ["88 99 200", "88 99 300", "99 32 100", "12 12 15"];
let threshold1 = 2;

let logs2 = ["1 2 50", "1 7 70", "1 3 20", "2 2 17"];
let threshold2 = 2;

let logs3 = ["9 7 50", "22 7 20", "33 7 50", "22 7 30"];
let threshold3 = 3;

let logs4 = [
  "345366 89921 45",
  "029323 38239 23",
  "38239 345366 15",
  "029323 38239 77",
  "345366 38239 23",
  "029323 345366 13",
  "38239 38239 23",
];

let threshold4 = 3;

console.log(processLogs(logs4, threshold4));