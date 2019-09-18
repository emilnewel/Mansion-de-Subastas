const express = require("express");
const router = express.Router();

const customerService = require("../services/customerService");

router.get("/", (req, res) => {
  customerService.getAllCustomers(customers => {
    return res.status(200).json(customers);
  });
});

router.get("/:customerId", (req, res) => {
  const customerId = req.params.customerId;
  customerService.getCustomerById(
    customerId,
    customer => {
      return res.status(200).json(customer);
    },
    err => {
      return res.status(404).json(err);
    }
  );
});

router.post("/", (req, res) => {
  customerService.createCustomer(
    req.body,
    customer => {
      return res.status(201).json(customer);
    },
    err => {
      return res.status(400).json(err);
    }
  );
});

module.exports = router;
