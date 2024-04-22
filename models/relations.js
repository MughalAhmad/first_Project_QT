const sequelize=require("../dataBase/dbConnection");
const Products = require("./schema/products");
const Purchases= require("./schema/purchases");
const Sales= require("./schema/sales");



const {DataTypes } = require('sequelize');

const Reaction = sequelize.define('reaction', {
    type: DataTypes.STRING
}, { timestamps: false });

const models={Products,Reaction,Purchases,Sales};


// const Post = sequelize.define('post', {
//     content: DataTypes.STRING
// }, { timestamps: false });






Products.hasOne(Reaction,{foreignKey:"productId"});
Reaction.belongsTo(Products,{foreignKey:"productId"});


Products.hasOne(Purchases,{foreignKey:"productId"});
Purchases.belongsTo(Products,{foreignKey:"productId"});

Products.hasOne(Sales,{foreignKey:"productId"});
Sales.belongsTo(Products,{foreignKey:"productId"});



// relations

// // team-project one-to-one
// Teams.hasOne(Projects , {foreignKey:"teamId"});
// Projects.belongsTo(Teams , {foreignKey:"teamId"});

// // user-session one-to-one
// Users.hasOne(Sessions , {foreignKey:"userId"});
// Sessions.belongsTo(Users , {foreignKey:"userId"});

// // project-task one-to-many
// Projects.hasMany(Tasks , {foreignKey:"projectId", onDelete: "CASCADE"});
// Tasks.belongsTo(Projects , {foreignKey:"projectId" , onDelete: "CASCADE"});

// // teamMember-user one-to-many
// TeamMembers.hasMany(Users , {foreignKey:"teamMembersId"});
// Users.belongsTo(TeamMembers , {foreignKey:"teamMembersId"});

// // teamMember-teams one-to-many
// Teams.hasMany(TeamMembers , {foreignKey:"teamsId"});
// TeamMembers.belongsTo(Teams , {foreignKey:"teamsId"});

// // users-teams one-to-many (user as a instructor)
// Users.hasMany(Teams , {foreignKey:"userId"});
// Teams.belongsTo(Users , {foreignKey:"userId"});

// Users.hasMany(Users, { 
//     foreignKey: "instructorId",
//     useJunctionTable: false,
//   });
//   // Projects.hasMany(Projects, { 
//   //   foreignKey: "instructorId",
//   //   useJunctionTable: false,
//   // });

const db={};

db.sequelize=sequelize; 
sequelize.models=models;


module.exports={db , models, sequelize};