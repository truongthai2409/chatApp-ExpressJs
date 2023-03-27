let userList = [
//   {
//     id: "1",
//     userName: "Nguyen Van A",
//     userRoom: "room1",
//   },
//   {
//     id: "2",
//     userName: "Truong Van T",
//     userRoom: "room2",
//   },
];
const addUserList = (newUser) => (userList = [...userList, newUser]);

const getUserList = (Room) => userList.filter((user) => user.userRoom === Room);
// console.log(getUserList);
const removeUserList = (id) => userList = userList.filter((user) => user.id !== id);
module.exports = { 
    getUserList, 
    addUserList, 
    removeUserList,
};
