export function getMergeSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
    return animations
}

function mergeSortHelper(mainArray, startIdx, endIdx, auxiliaryArary, animations){
    if (startIdx == endIdx) return;
    const middleIdx = Math.floor((startIdx  + endIdx) / 2);
    
}