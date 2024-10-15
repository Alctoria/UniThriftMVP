const Item = require('../models/Item');

exports.getItems = async (req, res) => {
  try {
    const items = await Item.find().sort({ date: -1 });
    res.json(items);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.addItem = async (req, res) => {
  const { title, description, price, imageUrl } = req.body;

  if (!title || !description || !price) {
    return res.status(400).json({ msg: 'Please enter all required fields' });
  }

  if (isNaN(price) || price <= 0) {
    return res.status(400).json({ msg: 'Price must be a positive number' });
  }

  try {
    const newItem = new Item({
      title,
      description,
      price,
      imageUrl,
      user: req.user.id
    });

    const item = await newItem.save();
    res.json(item);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};