var arr = []

function check(first, minRange) {

    arr = document.getElementById("array").value.split(/\s*,\s*/).map(function (v, i) {
        return Number.parseInt(v)
    })

    var highest = 0
    var startIndex = -1
    var stopIndex = -1

    var summer = 0

    var changeStop = false
    var changeCursor = true

    var cursor = -1

    for (let i = 0; i < arr.length; i++) {
        var e = arr[i];

        summer += e

        if (summer > 0 || (summer > -1 && !minRange)) {
            highest = Math.max(highest, summer)

            changeStop = summer == highest && selectNewRange(first, minRange, cursor, i, startIndex, stopIndex)

            if (changeCursor) {
                cursor = i
                changeCursor = false
            }

            if (changeStop) {
                startIndex = cursor
                stopIndex = i
            }
        } else {
            summer = 0
            changeCursor = true
        }
    }

    document.getElementById("result").innerHTML = `${highest},  form position ${startIndex + 1} to ${stopIndex + 1}`

    return highest
}

function selectNewRange(first, minRange, cursor, i, startIndex, stopIndex) {
    if (startIndex === -1 || stopIndex === -1) return true;

    if (first) {
        if (minRange && i - cursor > stopIndex - startIndex - 1) return false

    } else {
        if (minRange && i - cursor > stopIndex - startIndex) return false
    }

    return true
}

