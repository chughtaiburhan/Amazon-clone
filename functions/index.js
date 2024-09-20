const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")("sk_test_51Q0dUNImcE946K0EhlgtrxnPC3wlfYZlCBLFVL6cXKerOpq78sJdB6oXIPHVZoxFVRfDpxpSr47LirpiMSwd3PMi00w3jza1Jp");

// API

// - App config
const app = express();

// - Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// - API routes
app.get("/", (request, response) => response.status(200).send("hello world"));

app.post("/payments/create", async (request, response) => {
  const total = request.query.total;

  console.log("Payment Request Received for this amount >>> ", total);

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total, // subunits of the currency
      currency: "usd",
    });

    response.status(201).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    response.status(500).send({ error: error.message });
  }
});

// - Listen command
exports.api = functions.https.onRequest(app);

// http://127.0.0.1:5001/clone-91e80/us-central1/api