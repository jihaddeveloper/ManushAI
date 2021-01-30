//  Author: Mohammad Jihad Hossain
//  Create Date: 29/01/2021
//  Modify Date: 29/01/2021
//  Description: Secret config file

module.exports = {
  mongoURI: "mongodb+srv://jihad:password1234@jihadcluster.ximgp.mongodb.net/manushai_db?retryWrites=true&w=majority",
  port: process.env.PORT || 9000,
  secretKey: "Jihad@Dev!"
};


