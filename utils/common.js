module.exports = {
    api: async (res, action) => {
        try {
            await action();
        } catch (error) {
            console.error("Error: ", error);
            res.status(500).json({ success: false, error: error.message });
        }
    },
};
