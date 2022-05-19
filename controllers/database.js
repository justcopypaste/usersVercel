const { Sequelize, Model, DataTypes } = require("sequelize");

const sequelize = new Sequelize('postgresql://postgres:dp$m3-eV4jyBvVR@db.eemlqvkorfcljgmacfiq.supabase.co:5432/postgres', {
    logging: false,
    dialect: 'postgres',
    }
    );

class User extends Model{

}

const initDB = () => {
    User.init(  
        {
            id:{
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name:DataTypes.STRING,
            surname:DataTypes.STRING,
            avatar:DataTypes.STRING,  
        },  
        { sequelize, modelName:"user" }
    );
    
    sequelize.sync({
        //force: true
    }).then(() => {
            //console.log(`¡Las tablas fueron creadas!`);
        }
    );
}

const createUser = (name, surname, avatar) => {
    return new Promise((resolve, reject) => {
        User.create({
            name,
            surname,
            avatar
        }).then((res) => {
            resolve(res);
        }).catch((err)=>{
            reject(err)
        });
    });
}

const getUsers = () => {
    return new Promise((resolve, reject) => {
        User.findAll().then((users) => {
            resolve(users);
        }).catch((err)=>{reject(err)});
    });
}

const findUser = (id) => {
    return new Promise((resolve, reject) => {
        User.findByPk(id).then((user) => {
            resolve(user);
        }).catch((err)=>{reject(err)});
    });
}

const updateUser = (u) => {
    return new Promise((resolve, reject) => {
        User.update({name: u.name, surname: u.surname, avatar: u.avatar},{where: {id: u.id}})
        .then((res) => {
            resolve(res);
        }).catch((err)=>{
            reject(err)
        });
    });
}

const deleteUser = (id) => {
    return new Promise((resolve, reject) => {
        User.destroy({
            where: {id:id},
        }).then((res) => {
            resolve(res);
        }).catch((err)=>{
            reject(err)
        });
    });
}

module.exports = {
    initDB,
    createUser,
    getUsers,
    findUser,
    updateUser,
    deleteUser
}