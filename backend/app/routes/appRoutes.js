'use strict';
module.exports = function(app) {
  var controller = require('../controller/appController');
  var userController = require('../controller/userController');
  const { checkToken } = require("../auth/token_validation");

  // todoList Routes
  //just insert check token in .method(checkToken, ....)
  app.route('/teams')
    .get(controller.list_all_teams)
    .post(controller.create_a_team);

   app.route('/teams/:teamId')
    .get(controller.read_a_team)
    .put(controller.update_a_team)
    .delete(controller.delete_a_team);

    app.route('/users')
     .get(userController.list_all_users)
     .post(userController.create_a_user);

     app.route('/users/:userId')
      .get(userController.read_a_user);

      app.route('/usersUsername/:username')
       .get(userController.read_a_user_by_username);

      app.route('/login')
       .post(userController.login);



    };
