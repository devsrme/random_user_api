const fs = require("fs");
let users = JSON.parse(
  fs.readFileSync(`${__dirname}/../devData/usersData.json`)
);

// get random user

exports.getRandomUser = async (req, res) => {
  try {
    const random = await Math.floor(Math.random() * users.length);
    const randomUser = users[random];

    // SEND RESPONSE
    res.status(200).send({
      status: "success",
      results: randomUser.length,
      user: randomUser,
    });
  } catch (err) {
    res.status(404).send({
      status: "Not found",
      messege: "can not get random user",
    });
  }
};

// get all users

exports.getAllUsers = async (req, res) => {
  try {
    const allUsers = await users;
    const limit = req.query.limit;

    if (limit) {
      res.status(200).send({
        status: "success",
        users: allUsers.slice(0, limit),
      });
    } else {
      res.status(200).send({
        status: "success",
        results: allUsers.length,
        users: allUsers,
      });
    }
  } catch (err) {
    res.status(404).send({
      status: "Not found",
      messege: "can not get all users",
    });
  }
};

// create new user

exports.postNewUser = async (req, res) => {
  try {
    const { name, gender, contact, address, photoUrl } = req.body;

    const arr = [];
    for (let x in req.body) {
      arr.push(x);
    }

    if (!name || !gender || !contact || !address || !photoUrl) {
      res.status(400).send({
        messege: "Invalid fields name or some fields are missing",
      });
    } else if (arr.length > 5) {
      res.status(400).send({
        messege: "Invalid fields name or some fields are missing",
      });
    } else {
      const newId = (await users[users.length - 1].id) + 1;

      const newUser = await Object.assign({ id: newId });
      if (name && gender && contact && address && photoUrl) {
        newUser.name = name;
        newUser.gender = gender;
        newUser.contact = contact;
        newUser.address = address;
        newUser.photoUrl = photoUrl;
      }

      users.push(newUser);

      // save to local json file
      fs.writeFile(
        `${__dirname}/../devData/usersData.json`,
        JSON.stringify(users),
        (err) => {
          res.status(201).send({
            status: "success",
            user: newUser,
          });
        }
      );
    }
  } catch (err) {
    res.status(400).send({
      status: "fail",
      messege: "can not create user",
    });
  }
};

// update user

exports.updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    if (id > users.length) {
      return res.status(400).send({
        status: "fail",
        messege: "Invalid ID",
      });
    } else {
      const { name, gender, contact, address, photoUrl } = req.body;
      const updateUser = await users.find((user) => user.id == Number(id));

      // update fields
      if (name) {
        updateUser.name = name;
      }
      if (gender) {
        updateUser.gender = gender;
      }
      if (contact) {
        updateUser.contact = contact;
      }
      if (address) {
        updateUser.address = address;
      }
      if (photoUrl) {
        updateUser.photoUrl = photoUrl;
      }

      // save to local json file
      fs.writeFile(
        `${__dirname}/../devData/usersData.json`,
        JSON.stringify(users),
        (err) => {
          return res.send({
            data: {
              user: updateUser,
            },
          });
        }
      );
    }
  } catch (error) {
    return res.status(400).send({
      status: "fail",
      messege: "can not update user",
    });
  }
};

// delete user

exports.deleteUser = async (req, res) => {
  try {
    const id = req.params.id * 1;
    if (id > users.length) {
      res.status(400).send({
        status: "fail",
        messege: "Invalid ID",
      });
    } else {
      users = await users.filter((user) => user.id !== id);

      // save to local json file
      fs.writeFile(
        `${__dirname}/../devData/usersData.json`,
        JSON.stringify(users),
        (err) => {
          res.status(204).send({
            status: "success",
            data: users,
          });
        }
      );
    }
  } catch (error) {
    res.status(400).send({
      status: "fail",
      messege: "can not delete user",
    });
  }
};

// update multiple users

exports.updateMultipleUsers = async (req, res) => {
  try {
    const multipleUsers = req.body;
    for (let i = 0; i < multipleUsers.length; i++) {
      const index = users.findIndex((user) => user.id === multipleUsers[i].id);
      const user = users[index];
      if (!user) {
        return res.status(400).send({
          status: "fail",
          messege: "can not update users",
        });
      } else if (user) {
        for (let property in multipleUsers[i]) {
          if (user[property]) {
            user[property] = multipleUsers[i][property];
          }
        }
      }
    }

    // save to local json file
    fs.writeFile(
      `${__dirname}/../devData/usersData.json`,
      JSON.stringify(users),
      (err) => {
        res.status(201).send({
          status: "success",
          data: {
            user: multipleUsers,
          },
        });
      }
    );
  } catch (error) {
    res.status(400).send({
      status: "fail",
      messege: "can not update users",
    });
  }
};
