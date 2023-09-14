const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');

// Set token secret and expiration date
const secret = 'mysecretsshhhhh';
const expiration = '7200000';

module.exports = {
  AuthenticationError: new GraphQLError('Could not authenticate user.', {
    extensions: {
      code: 'UNAUTHENTICATED',
    },
  }),
  
  // Function for authenticating routes
  parseAdmin: async (req) => {
    let token = req.headers.authorization?.split(' ').pop().trim() || req.query.token;

    if (!token) {
      return null;
    }

    try {
      const { data: admin } = await jwt.verify(token, secret, { maxAge: expiration });
      req.admin = admin
    } catch (error) {
      console.error('Invalid token', error);
      
    }
    return req

  },
  signToken: function ({ name, email, _id }) {
    const payload = { name, email, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
