var unirest = require('unirest');
var monk = require('monk')('localhost/linkedin-demo')

module.exports = {

  writeData: function(collection,name,callback){
    if(name){
      var user = name.displayName;
    collection.update({ user : user },
                      { user : user },
                      { upsert: true});
      //{ profile: profile },
      //{ upsert: true });
      callback('done');
    }
  }
}
