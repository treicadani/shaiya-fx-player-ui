// const Account = require("./../../models/Account");

module.exports = {


    friendlyName: 'Signup',
  
  
    description: 'Sign up for a new user account.',
  
  
    extendedDescription:
  `This creates a new user record in the database, signs in the requesting user agent
  by modifying its [session](https://sailsjs.com/documentation/concepts/sessions), and
  (if emailing with Mailgun is enabled) sends an account verification email.
  
  If a verification email is sent, the new user's account is put in an "unconfirmed" state
  until they confirm they are using a legitimate email address (by clicking the link in
  the account verification message.)`,
  
  
    inputs: {
  
      accountname: {
        required: true,
        type: 'string',
      },
  
      email: {
        required: true,
        type: 'string',
        isEmail: true,
      },
  
      password: {
        required: true,
        type: 'string',
        maxLength: 200,
      }
  
    },
  
  
    exits: {
  
      success: {
        description: 'New user account was created successfully.'
      },
  
      invalid: {
        responseType: 'badRequest',
        description: 'The provided account name, password and/or email address are invalid.',
        extendedDescription: 'If this request was sent from a graphical user interface, the request '+
        'parameters should have been validated/coerced _before_ they were sent.'
      },
  
      emailAlreadyInUse: {
        statusCode: 409,
        description: 'The provided email address is already in use.',
      },
  
    },
  
  
    fn: async function ({accountname, password, email}) {
      var newEmailAddress = email.toLowerCase();
      var date = new Date();
      var formatDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
      var formatTime =  (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":" + 
                        (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) + ":" + 
                        (date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds());
      var formatedDate = formatDate + " " + formatTime;
      var formatedIp = this.req.ip.replace('::ffff:', '');
  
      // Build up data for the new user record and save it to the database.
      // (Also use `fetch` to retrieve the new ID so that we can use it below.)
   
      var newUser = {
        // id: (maxUID[0].id + 1),
        UserID: _.escape(accountname),
        Pw: await sails.helpers.passwords.hashPassword(_.escape(password)),
        JoinDate: formatedDate,
        Admin: 0,
        AdminLevel: 0,
        UseQueue: 0,
        Status: 0,
        Leave: 0,
        LeaveDate: formatedDate,
        UserType: "N",
        UserIp: formatedIp,
        Point: 1000,
        Enpassword: 'NULL',
        Email: _.escape(newEmailAddress),
      };
  
      sails.log.info(newUser);
  
      var newUserRecord = null;
      try {
  
        newUserRecord = await Account.create(newUser)
        .intercept('E_UNIQUE', 'emailAlreadyInUse')
        .intercept({name: 'UsageError'}, 'invalid')
        .fetch();
    
        sails.log.info(newUserRecord);
        
      } catch (err) {
  
        sails.log.error(err);
  
      }
  
      // Store the user's new id in their session.
      this.req.session.userId = newUserRecord.id;
  
    }
  
  };
  