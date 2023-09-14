const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path');
const cors = require("cors");
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');
const { parseAdmin } = require("../server/utils/auth");
require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const PORT = process.env.PORT || 3001;
const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://127.0.0.1:3000",
    ],
    credentials: true,
  })
);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
});

const startApolloServer = async () => {
  await server.start();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use("/graphql", expressMiddleware(server, {
    context: async ({ req }) => ({
      admin: await parseAdmin(req),
    }),
  }),
  );

  app.post("/create-checkout", async (req, res) => {
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items: req.body.items.map(item => {
          const entreeItem = item.name
          const priceInCents = Math.round(item.price * 100);
          return {
            price_data: {
              currency: "usd",
              product_data: {
                name: entreeItem,
              },
              unit_amount: priceInCents,
            },
            //there is no quantity feature at the moment so it was set to 1
            quantity: 1,
          }
        }),
        success_url: `http://localhost:3000/success`,
        cancel_url: `http://localhost:3000/fail`,
      })
      res.json({ url: session.url })
    } catch (err) {
      res.status(500).json(err)
    }
  })

  // if we're in production, serve client/dist as static assets
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

startApolloServer();
