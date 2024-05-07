export const PrepareMapStyle = (gameMode: string) => {
    if (gameMode === "countries") {
        return "mapbox://styles/mapbox/streets-v12"
    }
    if (gameMode === "states") {
        return "mapbox://styles/dk413/clvwxtcj3010z01pc0crr52to"
    }
    if (gameMode === "currencies") {
        return "mapbox://styles/dk413/clv9sggnm00qx01qveclgctu2"
    }
    if (gameMode === "shapes") {
        return "mapbox://styles/dk413/clv9sggnm00qx01qveclgctu2"
    }
    return "mapbox://styles/mapbox/streets-v12"
}