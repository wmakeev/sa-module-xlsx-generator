var xlsxGeneratorModule = function(sandbox){
  return {

    init: function(options, done){
      doSomethingAsync(function(err){
        // ...
        done(err);
      });
    },

    destroy: function(done){
      //
    }
  };
};

module.exports = xlsxGeneratorModule;
