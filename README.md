# Mansion De Subastas - Vefþjónustur - HR 2019

Mansion De Subastas is a fictional art selling company that needed a REST API to handle their auctions.

The API is written in NodeJS with Express and MongoDB and is an assignment in the Web Services course in Reykjavik University.

## Available routes

### Artists

#### GET

- `api/artists/` - Returns all existing Artists
- `api/artists/:artistId` - Returns specific existing Artist

#### POST

- `api/artists/` - Create a new Artist, returns the created Artist.

### Arts

#### GET

- `api/arts/` - Returns all existing Art
- `api/arts/:artId` - Returns specific existing Art

#### POST

- `api/arts/` - Create new Art, returns the created Art.

### Auctions

#### GET

- `api/auctions/` - Returns all existing Auctions
- `api/auctions/:auctionId` - Returns specific existing Auction
- `api/auctions/:auctionId/winner` - Returns winner of existing Auction if it has finished.
- `api/auctions/:auctionId/bids` - Returns all bids of existing Auction.

#### POST

- `api/auctions/` - Create a new Auction, returns the created Auction.
- `api/acutions/:auctionId/bids` - Places a new bid for an existing Auction.

### Customers

#### GET

- `api/customers/` - Returns all existing Customers
- `api/customers/:customerId` - Returns specific existing Customer.
- `api/customers/:customerId/auction-bids` - Returns all bids of specific existing customer.

#### POST

- `api/customers/` - Create a new Customer, returns the created Customer.
