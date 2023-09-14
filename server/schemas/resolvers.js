const { Admin, Beverage, Entree, Restaurant } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');



const resolvers = {
  Query: {

    beverages: async (parent, { filter }) => {
      return Beverage.find(filter || {});
    },
    beverage: async (parent, { beverageId }) => {
      return Beverage.findOne({ _id: beverageId });
    },
    entrees: async (parent, { filter }) => {
      return Entree.find(filter || {});
    },
    entree: async (parent, { entreeId }) => {
      return Entree.findOne({ _id: entreeId });
    },
    restaurants: async () => {
      return Restaurant.find({});
    },
  },

  Mutation: {
   
    login: async (parent, { email, password }) => {
      const admin = await Admin.findOne({ email });
      console.log(admin)

      if (!admin) {
        throw AuthenticationError;
      }

      const correctPw = await admin.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(admin);
      

      return { token, admin };
    },

    createBeverage: async (parent, { beverage }, context) => {

      if (!context) {
        throw AuthenticationError;
      }
      return await Beverage.create(beverage);
    },
    createEntree: async (parent, { entree }, context) => {

      if (!context) {
        throw AuthenticationError;
      }

      return await Entree.create(entree);
    },
    createRestaurant: async (parent, { restaurant }, context) => {

      if (!context) {
        throw AuthenticationError;
      }

      return await Restaurant.create(restaurant);
    },

    removeBeverage: async (parent, { beverageId }, context) => {
      console.log(beverageId)

      if (!context) {
        throw AuthenticationError;
      }

      return await Beverage.findOneAndDelete({ _id: beverageId });
    },
    removeEntree: async (parent, { entreeId }, context) => {

      if (!context) {
        throw AuthenticationError;
      }

      try {
        const result = await Entree.findOneAndDelete({ _id: entreeId })
        return true
      }
      catch {
        return false
      }
    },
    removeRestaurant: async (parent, { restaurantId }, context) => {

      if (!context) {
        throw AuthenticationError;
      }

      console.log(restaurantId)

      return Restaurant.findOneAndDelete({ _id: restaurantId });
    },

    updateBeverage: async (parent, args, context) => {

      if (!context) {
        throw AuthenticationError;
      }

      return await Beverage.findByIdAndUpdate(args.id, args.beverage, { new: true });
    },
    updateEntree: async (parent, args, context) => {

      if (!context) {
        throw AuthenticationError;
      }

      return await Entree.findByIdAndUpdate(args.id, args.entree, { new: true });
    },
    updateRestaurant: async (parent, args, context) => {

      if (!context) {
        throw AuthenticationError;
      }

      return await Restaurant.findByIdAndUpdate(args.id, args.restaurant, { new: true } );
    },
  },
};

module.exports = resolvers;