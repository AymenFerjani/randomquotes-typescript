/* The util functions  */

//returns a random integer in range [min, max]
export const getRandomInt: (arg0: number, arg1: number) => number = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
