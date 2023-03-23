const uuid=require("uuid");

function getId(){
    return uuid.v1();
}

const initialUsers= ()=>{
    return [
        {id:getId(), userName:"Taylan", password:"1234"},
        {id:getId(), userName:"Taylan1", password:"1235"},
        {id:getId(), userName:"Taylan2", password:"1236"},
        {id:getId(), userName:"Taylan3", password:"1237"}
    ]
}

let users= initialUsers();

function getAll(){
    return users
}

function postUser(user){
    user.id= getId();
    users.push(user);
    return user;
}

function findUser(user){
    let isFind=false; //flag operation
    for (let i=0; i<users.length; i++){
        const item=users[i];
        if (item.userName===user.userName && item.password===user.password){
            isFind=true;
            break;
        }
    }
    return isFind;
}


function checkIsSame(userName){
    let isSameUserNameExist=users.find(item=>item.userName===userName);
    return !!isSameUserNameExist;
}

module.exports={
    getAll,
    postUser,
    findUser,
    checkIsSame
}