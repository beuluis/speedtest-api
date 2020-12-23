// Routes controller
// Return single server entity
const getHealthCheck = async (req, res, next) => {
    res.status(200);
    res.json({ health: 'healthy'});

    return next();
};

// Export functions
module.exports = {
    getHealthCheck,
};
