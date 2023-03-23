const express = require("express");
const {expansesController} = require("../controller");
const router = express.Router();

router.get("/expenses", expansesController.get_expenses);
router.get("/expenses/detail", expansesController.get_expenses_detail);
router.get("/", expansesController.get_data_range);
router.post("/expenses", expansesController.create_expenses);
router.patch("/expenses", expansesController.edit_expenses);
router.delete("/expenses", expansesController.delete_expenses);

module.exports = router;
