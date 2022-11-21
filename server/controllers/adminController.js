var admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert('./service_key.json'),
  databaseURL: "https://automotion-web-platform-default-rtdb.firebaseio.com"
});

exports.adminList = async (req, res) => {
  const listAllUsers = async (nextPageToken) => {
    // List batch of users, 1000 at a time.
    let userdata = []
    await admin.auth()
      .listUsers(1000, nextPageToken)
      .then((listUsersResult) => {
        listUsersResult.users.forEach((userRecord) => {
          userdata.push([userRecord.uid, userRecord.email]);
          //console.log(users)
        });
        if (listUsersResult.pageToken) {
          // List next batch of users.
          listAllUsers(listUsersResult.pageToken);
        }
        res.send(userdata)
      })
      .catch((error) => {
        console.log('Error listing users:', error);
      });
  };
  listAllUsers()
};

exports.adminDelete = async (req, res) => {
  let usersToDelete = [] 
  req.body.IdsOfCheckedEmails.forEach(email => {
    usersToDelete.push(email)
  })

  console.log(usersToDelete)
  console.log(req.body.IdsOfCheckedEmails)
  admin.auth()
    .deleteUsers(usersToDelete)
    .then((deleteUsersResult) => {
      console.log(`Successfully deleted ${deleteUsersResult.successCount} users`);
      console.log(`Failed to delete ${deleteUsersResult.failureCount} users`);
      deleteUsersResult.errors.forEach((err) => {
        console.log(err.error.toJSON());
      })
      res.send(200)
    })
    .catch((error) => {
      console.log('Error deleting users:', error);
    });
}

exports.adminUpdate = async (req, res) => {
  let userToUpdate = req.body.userId
  console.log("user",userToUpdate)
  console.log("id",req.body.userId)
  //console.log("newPw", req.body.password)
  console.log("newEmail", req.body.email)
  admin.auth()
  .updateUser(userToUpdate, {
    email: req.body.email,
    //password: req.body.password  
  })
  .then((userRecord) => {
    // See the UserRecord reference doc for the contents of userRecord.
    console.log('Successfully updated user', userRecord.toJSON());
    res.sendStatus(200)
  })
  .catch((error) => {
    console.log('Error updating user:', error);
  });
}

exports.userDetails = async (req, res) => {
  let userId = req.body.userId
  console.log(userId)
  admin.auth()
  .getUser(userId)
  .then((userRecord) => {
    // See the UserRecord reference doc for the contents of userRecord.
    console.log(`Successfully fetched user data: ${userRecord.toJSON()}`);
    res.send(userRecord.toJSON())
  })
  .catch((error) => {
    console.log('Error fetching user data:', error);
  });
}