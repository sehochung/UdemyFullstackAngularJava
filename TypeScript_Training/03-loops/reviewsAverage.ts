let review:number[] = [5, 5, 4.5, 5, 3];

let total:number = 0;

for (let i=0; i<review.length; i++) {
    console.log(review[i]);
    total+= review[i];
}

let average:number = total /review.length;
console.log("Review average: " + average);
