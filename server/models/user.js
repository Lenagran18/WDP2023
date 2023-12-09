const con = require("./db_connect");

async function createTable() {
  let sql = `
    CREATE TABLE IF NOT EXISTS users (
      UserId INT NOT NULL AUTO_INCREMENT,
      FirstName VARCHAR(255) NOT NULL,
      LastName VARCHAR(255) NOT NULL, 
      Username VARCHAR(50) NOT NULL, 
      Password VARCHAR(255) NOT NULL,
      CONSTRAINT UserPK PRIMARY KEY(UserId));`

      await con.query(sql)
}

createTable()

// //Testing out login function
// let newUser = {
//   username: "cathy123",
//   password: "icecream"
// }
// login(newUser);


// CRUD Operations

// Create (Register) New User
async function register(user) {
  let userResult = await getUser(user.username)
  if(userResult.length > 0) throw Error("Username already in use!!")

  let sql = `
    INSERT INTO users(UserName, Password, Email)
    VALUES("${user.username}", "${user.password}", "${user.email}")
  `

  await con.query(sql)
  const newUser = await getUser(user.username)
  return newUser[0]
}

// Read - Login User 
async function login(user) {
  let userResult = await getUser(user.username)
  if(!userResult[0]) throw Error("Username not found!!")
  if(userResult[0].Password != user.password) throw Error("Password Incorrect!!")

  return userResult[0]
}

// Update User
async function editUser(user) {
  let updatedUser = await getUser(user.username)
  if(updatedUser.length > 0) throw Error("Username not available!")

  let sql = `UPDATE users
    SET UserName = "${user.username}"
    WHERE UserId = ${user.UserId}
  `
  await con.query(sql)
  updatedUser = await getUser(user.username)
  return updatedUser[0]
}

// Delete User 
async function deleteUser(user) {
  let sql = `DELETE FROM users
    WHERE UserId = ${user.UserId}
  `
  await con.query(sql)
}

// Useful functions
async function getUser(username) {
  let sql = `
    SELECT * FROM users 
    WHERE UserName = "${username}" 
  `
  return await con.query(sql)
}

module.exports = {login, register, editUser, deleteUser}