const express = require("express")
const router = new express.Router()
const ExpressError = require("../expressError")
const items = require("../fakeDb")


// ROUTES

// GET ITEMS
// RETURN FULL ARRAY OF ITEM OBJECTS
router.get("/", function (req, res) {
  res.json(items);
})


// POST ITEMS
// RETURN ADDED - ITEM ADDED
router.post("/", (req, res, next) => {

  try{
    if(!req.body.name) {

      throw new ExpressError("Item Name is required", 400)
      
    }

    else if (!req.body.price) {

      throw new ExpressError("Item Price is required", 400)

    }

    const newItem = { name: req.body.name , price: req.body.price}
    items.push(newItem)

    return res.status(201).json(newItem)

  } catch(e) {
    return next(e)
  }

})


// GET ITEMS BY NAME
// RETURN SPECIFIC ITEM BY NAME
router.get("/:name", (req, res) => {

  const foundItem = items.find(item => item.name === req.params.name)
  if (foundItem === undefined) {
    throw new ExpressError("Item not found", 404)
  }

  return res.json(foundItem)

})


// PATCH ITEMS BY NAME
// RETURN UPDATED - ITEM UPDATED
router.patch("/:name", (req, res, next) => {

  try{

    if(!req.body.name && !req.body.price) {

      throw new ExpressError("Item Name and Price is required", 400)

    }


    if(!req.body.name) {

      throw new ExpressError("Item Name is required", 400)
      
    }

    else if (!req.body.price) {

      let foundIndex = items.findIndex(item => item.name === req.params.name)
      if (foundIndex === -1) {
        throw new ExpressError("Item not found", 404)
      }
      replacementItem = { name: req.body.name , price: null}
      items.splice(foundIndex, 1, replacementItem)
      return res.status(200).json(replacementItem)

    }

    else {

      let foundIndex = items.findIndex(item => item.name === req.params.name)
      if (foundIndex === -1) {
        throw new ExpressError("Item not found", 404)
      }
      replacementItem = { name: req.body.name , price: req.body.price}
      items.splice(foundIndex, 1, replacementItem)
      return res.status(200).json(replacementItem)

    }

  } catch(e) {
    return next(e)
  }

})


// DELETE ITEMS BY NAME
// MESSAGE THAT SAYS "DELETED"
router.delete("/:name", (req, res) => {

  let foundIndex = items.findIndex(item => item.name === req.params.name)
  console.log(`found index no price ${foundIndex}`)
  if (foundIndex === -1) {
    throw new ExpressError("Item not found", 404)
  }
  items.splice(foundIndex, 1)
  return res.status(200).json({message: "Deleted"})

})


module.exports = router;