 let counter = 0;
 function incrementCounter() {
     counter++;
     console.log(`Counter: ${counter}`);
     incrementCounter(); 
 }
 try {
     incrementCounter();
 } catch (e) {
     console.error(`Error: ${e.message}`);
     console.log(`Counter value at error: ${counter}`);
 }

function flattenArray(arr) {
    return arr.reduce((acc, val) => {
        if (Array.isArray(val)) {
            return acc.concat(flattenArray(val));
        } else {
            return acc.concat(val);
        }
    }, []);
}


const nestedArray = [1, [2, [3, 4], 5], 6, [7, 8]];
console.log(flattenArray(nestedArray)); 
 
function trampoline(fn) {
    return function(...args) {
        let result = fn.apply(this, args);
        while (typeof result === 'function') {
            result = result();
        }
        return result;
    };
}

function flattenArrayTrampoline(arr) {
    function flatten(arr) {
        return function() {
            return arr.reduce((acc, val) => {
                if (Array.isArray(val)) {
                    return acc.concat(flatten(val)());
                } else {
                    return acc.concat(val);
                }
            }, []);
        };
    }
    return trampoline(flatten)(arr);
}


console.log(flattenArrayTrampoline(nestedArray)); // [1, 2, 3, 4, 5, 6, 7, 8]
