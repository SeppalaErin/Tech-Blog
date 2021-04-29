const User = require('./User');
const Blogpost = require('./Blogpost');
const Comment = require('./Comment')

User.hasMany(Blogpost, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Blogpost.belongsTo(User, {
  foreignKey: 'user_id'
});

User.hasMany(Comment, {
  foreignKey: 'user_id'
});

Comment.belongsTo(User, {
  foreignKey: 'user_id'
});

Blogpost.hasMany(Comment, {
  foreignKey: 'post_id',
  allowNull: true
});

Comment.belongsTo(Blogpost, {
  foreignKey: 'post_id',
});

module.exports = { User, Blogpost, Comment };