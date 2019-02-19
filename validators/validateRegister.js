const rules = [
    body('foo', 'must be not empty 2').not().isEmpty()
]

module.exports = {
    rules
}