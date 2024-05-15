export const PrepareMapStyle = (gameMode: string) => {
    if (gameMode === "countries") {
        return "mapbox://styles/mapbox/streets-v12"
    }
    if (gameMode === "states") {
        return "mapbox://styles/dk413/clvwxtcj3010z01pc0crr52to"
    }
    if (gameMode === "currencies") {
        return "mapbox://styles/dk413/clw8a0a4h002d01qsbjpp9lhr"
    }
    if (gameMode === "shapes") {
        return "mapbox://styles/dk413/clw8a0a4h002d01qsbjpp9lhr"
    }
    return "mapbox://styles/mapbox/streets-v12"
}