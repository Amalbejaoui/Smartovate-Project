function validateProduct(req, res, next) {

    const {
        name,
        price,
        stock
    } = req.body;

    if (!name || name.trim() === "") {
        return res.status(400).json({
            success: false,
            message: "Product name is required."
        });
    }

    if (price === undefined || price === null || price <= 0) {
        return res.status(400).json({
            success: false,
            message: "Price must be greater than 0."
        });
    }

    if (stock === undefined || stock < 0) {
        return res.status(400).json({
            success: false,
            message: "Stock must be 0 or greater."
        });
    }

    next();
}

module.exports = validateProduct;