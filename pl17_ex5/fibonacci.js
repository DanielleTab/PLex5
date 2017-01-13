var naive_fibonacci = function f (n) {
    return (n===0 || n === 1) ? n : f(n-1) + f(n-2);
}

var fibonacci = (function () {
    var memo = [0, 1];
    var fib = function f (n) {
        var result = memo[n];
        if (typeof(result) === "undefined") {
            result = f(n-1) + f(n-2);
            memo[n] = result;
        }
        return result;
    };
    return fib;
})();

// is memo in scope here?
// is memo live in memory here?


var memoize = (function (f) {
                            var memo = [];
                            var memFun = function memFunImpl (n) {
                                            /* 
                                            * If the function result already in the memo 
                                            *   we do not need to call the function f at all.
                                            * Otherwise, call the function and save the result to memo
                                            */
                                            var memRes = memo[n];
                                            if (typeof(memRes) !== "undefined") 
                                            {   
                                                /* return memo value */
                                                return memRes;
                                            }

                                            /* call function and save result */
                                            var fRes = f(n);
                                            memo[n] = fRes;

                                            return fRes;
                                            };  

                            return memFun;
                        });



var cool_fibonacci = memoize(function(n) {
    return (n===0 || n === 1) ? n : cool_fibonacci(n-1) + cool_fibonacci(n-2);
});
console.log(cool_fibonacci(100) + " wow, this was fast!");

