var source = $("#some-template").html(); 
var template = Handlebars.compile(source); 

var data = { 
    users: [ 
    {
        firstName: "Travis", 
        lastName: "Hoki",
        email: "travis.hoki@gmail.com",
        active: true
    },
    { 
        firstName: "John", 
        lastName: "Doe",
        email: "john.doe@gmail.com",
        active: false
    },
    {
        firstName: "Jane", 
        lastName: "Smith",
        email: "jane.smith@gmail.com",
        active: true
    }
    ]
}; 

Handlebars.registerHelper('initials', function(fname, lname) {
  return fname[0] + lname[0];
});

$('body').append(template(data));