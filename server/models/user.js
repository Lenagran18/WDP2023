const users = [
    {
        username: "Lenagran",
        Password: "password"
    },
    {
        username: "username1",
        password: "123"
    }, 
    {
        username: "granl1",
        password: "432"
    }

]
// CRUD functions 
let getUsers = () => users;

function getUsers2() {
    return users;
}

// export functions to use in another file in application
module.exports = {getUsers, getUsers2}