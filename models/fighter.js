exports.fighter = {
    id: "",
    name: value => value !== '',
    health: 100,
    power: value => !isNaN(Number(value)) && value < 100 & value >= 0,
    defense: value => value >= 1 && value <= 10, // 1 to 10
}