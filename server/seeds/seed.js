const db = require('../config/connection');
const cleanDB = require('./cleanDB');
const { Admin, Beverage, Entree, Restaurant } = require('../models');
const AdminData = require('./adminData.json');
const beverageData = require('./beverageData.json');
const entreeData = require('./entreeData.json');
const restaurantData = require('./restaurantData.json')

const seedDatabase = async () => {

db.once('open', async () => {
  await cleanDB('Admin', 'admins');
  await cleanDB('Entree', 'entrees');
  await cleanDB('Beverage', 'beverages');
  await cleanDB('Restaurant', 'restaurants');

  for (const admin of AdminData) {
    await Admin.create(admin);
    };
  

  for (const beverage of beverageData) {
    await Beverage.create({
      ...beverage,
    });
  }

  for (const entree of entreeData) {
    await Entree.create({
      ...entree,
    });
  }

  for (const entree of restaurantData) {
    await Restaurant.create({
      ...entree,
    });
  }

  console.log('Seeded! 🌱');
  process.exit(0);
})};

seedDatabase();
