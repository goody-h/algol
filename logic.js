arr = []

/**
 * Two more parameters were included in the function
 * @param {Boolean} first set to true to get the first occurence of largest sum
 * @param {Boolean} minRange set to true to get the largest sum with smallest range
 * 
 * @returns {Array} of size 3 of the form [largestSum, startIndex, stopIndex] 
 *  */
function check(first, minRange) {

arr = document.getElementById("array").value.split(/\s*,\s*/).map(function (v, i) {
    return Number.parseInt(v)
})

    // Result variable
    var highest = 0
    var startIndex = -1
    var stopIndex = -1

    // Indexing variables  
    var cursor = -1
    var changeStop = false
    var changeCursor = true

    // Current sum holder
    var summer = 0

    for (let i = 0; i < arr.length; i++) {
        var e = arr[i];

        // Add value to summer
        summer += e

        if (summer > 0 || (summer > -1 && !minRange)) {

            // set result to max value
            highest = Math.max(highest, summer)

            // change cursor when a new summing range has started
            if (changeCursor) {
                cursor = i
                changeCursor = false
            }

            // change result ranges when a new highest has been obtained
            changeStop = summer == highest && selectNewRange(first, minRange, cursor, i, startIndex, stopIndex)

            if (changeStop) {
                startIndex = cursor
                stopIndex = i
            }
        } else {
            // start a new summing range
            summer = 0
            changeCursor = true
        }
    }

    document.getElementById("result").innerHTML = `${highest},  form position ${startIndex + 1} to ${stopIndex + 1}`

    return [highest, startIndex, stopIndex]
}

/**
 * Check if new summing range should be set 
 */
function selectNewRange(first, minRange, cursor, i, startIndex, stopIndex) {
    // if indexes have not been set return true
    if (startIndex === -1 || stopIndex === -1) return true;

    if (first) {
        if (minRange && i - cursor > stopIndex - startIndex - 1) return false

    } else {
        if (minRange && i - cursor > stopIndex - startIndex) return false
    }

    return true
}
