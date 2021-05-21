var utils = {
  bodyCost: function (body) {
    let sum = 0
    for (let i in body) sum += BODYPART_COST[body[i]]
    return sum
  },
}

module.exports = utils
