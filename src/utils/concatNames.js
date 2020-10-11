export const concatNames = (objectOfArrays) => {
    const fullName = [];
    let i = 0;
    for (const [key, value] of Object.entries(objectOfArrays)) {
        /*We need an array of string with FIRSTNAME LASTNAME*/

        console.log(value);
        i += 1;
        /*["FIRST, FIRST"]*/
        /*["NAME NAME"]*/
    }
    console.log("number of iterations : " + i);
}
