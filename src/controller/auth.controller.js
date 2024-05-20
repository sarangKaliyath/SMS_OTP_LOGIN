
const authController = (req, res) => {
    try {
        return res.status(200).json({message: "working"})
    } catch (error) {
        return res.status(500).json({message: "Internal Server Error", error: error})
    }
}

module.exports = {authController};