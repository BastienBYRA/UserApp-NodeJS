export class PagesController {
  repository;

  constructor(repository) {
    this.repository = repository;
  }

  showHome(req, res) {
    var search = req.query.search;

    if(search) //Recherche d'une utilisateur
    {
      this.repository.getByCriteria(search).then((users) => {
        res.render('home', { users, search });
      }).catch((err) => {
        res.render('error', { error: "Error while trying to display the home view.", redirectPage: "/", textLink: "Back to previous page"})
      });
    }
    else //Aucune recherche
    {
      this.repository.getAll().then((users) => {
        res.render('home', { users, search: '' });
      }).catch((err) => {
        res.render('error', { error: "Error while trying to display the home view.", redirectPage: "/", textLink: "Back to previous page"})
      });
    }
  }

  showAddUser(req, res) {
    res.render('edit', { user: {} });
  }

  createUser(req, res) {
    const { firstName, lastName, email } = req.body;
    var user = { firstName, lastName, email };
    var isValid = this.verifyUserField(firstName, lastName, email)

    if(isValid.state === false)
    {
      res.render('edit', { errorMessage: isValid.errorMessage, user });
    }
    else
    {
      this.repository.create(firstName, lastName, email).then(() => {
        res.redirect('/');
      }).catch((err) => {
        var errorMessage = 'Error creating user.';
        if(err.code === 11000) errorMessage = "Error, the email '" + email + "' is already in use, please use another email."
        if(err.errors) errorMessage = "Please fill the email field with a valid email address."
        res.render('edit', { errorMessage: errorMessage, user });
      });
    }
  }

  showEditUser(req, res) {
    const id = req.params.id;

    var isValid = this.verifyUserId(id);
    if(!isValid)
    {
      var errorMessage = "The id of the user is incorrect."
      res.render('error', { error: errorMessage, redirectPage: "/", textLink: "Back to previous page"});
    }
    else
    {
      this.repository.getOne(id).then((user) => {
        res.render('edit', { user });
      }).catch((err) => {
        var errorMessage = "Error while trying to display the edit view."
        res.render('error', { error: errorMessage, redirectPage: "/", textLink: "Back to previous page"});
      });
    }
  }

  modifyUser(req, res) {
    const { firstName, lastName, email } = req.body;
    var user = { firstName, lastName, email };
    const id = req.params.id;

    var isValid = this.verifyUserField(firstName, lastName, email)

    if(isValid.state === false)
    {
      res.render('edit', { errorMessage: isValid.errorMessage, user });
    }
    else
    {
      this.repository.update(id, firstName, lastName, email).then(() => {
        res.redirect('/');
      }).catch((err) => {
        var errorMessage = 'Error updating user.';
        if(err.code === 11000) errorMessage = "Error, the email '" + email + "' is already in use, please use another email."
        if(err.errors) errorMessage = "Please fill the email field with a valid email address."
        res.render('edit', { errorMessage, user });
      });
    }
  }

  deleteUser(req, res) {
    const id = req.body.id;

    this.repository.deleteOne(id).then(() => {
      res.redirect('/');
    }).catch((err) => {
      var errorMessage = 'Error deleting user.';
      res.render('error', { error: errorMessage, redirectPage: "/", textLink: "Back to previous page"});
    });
  }

  pageNotExist(req, res) {
    var errorMessage = 'The page you requested does not exist';
    res.render('error', { error: errorMessage, redirectPage: "/", textLink: "Go to main page"});
  }

  verifyUserField = (firstName, lastName, email) => {
    var isValid = true;
    var errorMessage = "Error, you must provide ";
    
    //Permet de savoi si il y a plus d'une erreur dans le formulaire
    //SI c'est le cas, alors on peut savoir quand mettre une "," entre les différentes fausses valeurs
    var alreadyError = false;

    if(firstName == null || firstName == '') {
      errorMessage += "a firstName"
      alreadyError = true;
      isValid = false;
    }

    if(lastName == null || lastName == '') {
      if(alreadyError) { errorMessage += ", lastName"}
      else { errorMessage += "a lastName", alreadyError = true;}
      isValid = false;
    }

    if(email == null || email == '') {
      if(alreadyError) { errorMessage += ", email"}
      else { errorMessage += "an email", alreadyError = true;}
      isValid = false;
    }

    return { state: isValid, errorMessage: errorMessage }
  }

  verifyUserId = (id) => {
    var isValid = true;
    if(id.length < 24 || id.length > 24) isValid = false;
    return isValid;
  }

}
