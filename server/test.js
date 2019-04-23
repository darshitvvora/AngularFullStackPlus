const POP3Client = require('mailpop3');
const simpleParser = require('mailparser').simpleParser;

const port = 995;
const host = 'pop.gmail.com';

const client = new POP3Client(port, host, {

  tlserrs: false,
  enabletls: true,
  debug: false

});

function parseMail(source) {
  simpleParser(source)
    .then(parsed => {
      console.log('parsed');
      console.log(typeof parsed);
      console.log(Object.keys(parsed));
    })
    .catch(err => {
      console.log('err');
      console.log(err);
    });
}

client.on("connect", function() {
  console.log("CONNECT success");
  client.login('doctorodoctor@gmail.com', 'doctordoctor');
});

client.on("login", function(status, rawdata) {

  if (status) {

    console.log("LOGIN/PASS success");
    client.list();

  } else {
    console.log(status, rawdata);
    console.log("LOGIN/PASS failed");
    client.quit();

  }
});


client.on("list", function(status, msgcount, msgnumber, data, rawdata) {

  if (status === false) {
    console.log("LIST failed");
    client.quit();
  } else {
    console.log("LIST success with " + msgcount + " element(s)");

    if (msgcount > 0) {
      client.retr(2);
    }
    else {
      client.quit();
    }
  }
});

client.on("retr", function(status, msgnumber, data, rawdata) {

  if (status === true) {

    console.log("RETR success for msgnumber " + msgnumber);
    parseMail(data);
    // client.dele(msgnumber);
    // client.quit();

  } else {

    console.log("RETR failed for msgnumber " + msgnumber);
    client.quit();

  }
});


client.on("quit", function(status, rawdata) {

  if (status === true) console.log("QUIT success");
  else console.log("QUIT failed");

});
