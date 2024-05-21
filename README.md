# Integrating Credix API into Sandbox Market

This repository intends to integrate the Credix Credipay API into a working virtual grocery store frontend and backend implementation.
This repository contains:
- A frontend implementation of a catalog and checkout flow
- A backend implementation for the order creation and integration with Credipay API

The frontend is implemented in react. To start it, run:
´´´
cd frontend
npm install
npm start
´´´

The backend was developed on nest.js. To start it, run:
```
cd backend/credix-integration
npm install
npm run start
```

## Implemented features

On the backend it was implemented:
- Order creation endpoint: POST /orders
  - Receives an array containing the products Ids
  - Get buyer's data and creates the order on the database
  - Returns the order data:
    - Order external id
    - Buyers and sellers tax ids
    - Order creation datetime
    - Buyers max payments term days
- Submit order to Credipay endoint: PATCH /orders/:externalId
  - Receives the term payment days and checks if the buyer can have this amount of days to pay
  - Creates the order on Credipay
  - Updates the order on the database with the Credipay order ID
  - Return the updated order data

On the Frontend it was implemented:
- A product catalog with a button to add product into the cart
- A checkout page that shows the order information and allows the user to set the payment term days
  - The payment term days can be selected according to the buyer's information on credix
  - Minimum term days is 7 and the maximum is the maximum allowed
  - Payment term days increase from 10 days to 10 days
- When the order is created, the user is redirected to the Credix order acceptance screen