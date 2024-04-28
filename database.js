var Database = {
  constructor: function () {
    if (!window.indexedDB) {
      Database.log("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available");
    } else {
      Database.log("Your browser support a stable version of IndexedDB.");
      Database.support = true;
      Database.openDatabase();
    }
  },

  log: function (t) {
    console.log(t);
  },

  openDatabase: function () {
    if (Database.support == true) {
      Database.log('Opening Database...');
      var request = window.indexedDB.open("MyDATABASE", 3);
      request.onerror = function (e) {
        Database.log(e);
      };
      request.onupgradeneeded = function (e) {
        Database.db = e.target.result;
        Database.log(Database.db);
        Database.db.onerror = function (e) {
          Database.log(e);
        };
        Database.objectStore = Database.db.createObjectStore("name", { keyPath: "myKey" });
      };
      return request;
    }
  }
};

//new Database.constructor();
