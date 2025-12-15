const productValidator = (req, res, next) => {
    const { title, description, price, stock } = req.body;
    if (!title || !description || !price  || !stock)  return res.status(400).json({ error: 'El campo "title", description, price y stock es obligatorio' });
    return next();
}

module.exports = productValidator;