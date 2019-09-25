const customerService = () => {
  const customerDb = require("../data/db").Customer;
  const auctionBidDb = require("../data/db").AuctionBid;

  const getAllCustomers = (cb, errorCb) => {
    customerDb.find({}, (err, customers) => {
      if (err) {
        throw new Error(err);
      }
      cb(customers);
    });
  };

  const getCustomerById = (id, cb, errorCb) => {
    customerDb.findById(id, (err, customer) => {
      if (err) {
        errorCb(err);
      } else {
        cb(customer);
      }
    });
  };

  const getCustomerAuctionBids = (customerId, cb, errorCb) => {
    auctionBidDb.findById({customerId: customerId}, (err, bids) => {
      if (err) {
        errorCb(err);
      } else {
        cb(bids);
      }
    });
  };

  const createCustomer = (customer, cb, errorCb) => {
    customerDb.create(customer, (err, result) => {
      if (err) {
        errorCb(err);
      } else {
        cb(result);
      }
    });
  };

  return {
    getAllCustomers,
    getCustomerById,
    getCustomerAuctionBids,
    createCustomer
  };
};

module.exports = customerService();
