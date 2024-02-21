let term = new Terminal({
  cursorBlink: true,
  cursorStyle: 'underline',
  minimumContrastRatio: 7,
  convertEol: true
});

term.open(document.getElementById('terminal'));
let term_elem = document.getElementById('terminal');

let prompt = "test prompt"

term.prompt = () => {
  term.write(prompt);
}

term.nl = () => {
  term.write("\n");
}

let line = "";

// login gui

import login_data from '../data/accounts.json' assert { type: 'json' };

term.write("jsTerm Login");
term.nl();
term.write("Username: ");

let usernames = [];
let passwords = [];
login_data.users.data.forEach(
  (element) => {
    usernames.push(element.username);
    passwords.push(element.password);
  }
);

let current_login_info = [];

term_elem.onkeyup = (key) => {
  if (key.code === "Enter") {
    if (current_login_info.length === 1) {
      current_login_info.push(line);
      console.log(
      checklogin(current_login_info)/*;*/
      );
      console.log(current_login_info);
    } else {
      current_login_info.push(line);
      line = "";
      term.write("\nPassword: ");
    }
  } else if (key.code === "Backspace") {
    line = line.slice(0, line.length - 1);
    term.write("\b \b");
  } else if (!["ShiftLeft","ShiftRight","CapsLock","End","PageDown","PageUp","Home","Escape","Insert","Delete","F1","F2","F3","F4","F5","F6","F7","F8","F9","F10","F11","F12","ControlLeft","ControlRight","AltLeft","AltRight"].includes(key.code)) {
    line += key.key;
    term.write(key.key);
  }
  console.log(key.code);
}

let checklogin = (data) => {
  if (usernames.includes(data[0]) && passwords.includes(data[1]) && usernames.indexOf(data[0]) === passwords.indexOf(data[1])) {
    term.reset();
    start();
  } else {
    current_login_info = [];
    term.reset();
    term.write("Error, invalid credentials. Press any key to exit, then reopen app to try again.");
    term_elem.onkeyup = (key) => {
      close();
    }
  }
};

import userdata_unfiltered from '../data/userdata.json' assert { type: 'json' };

let start = () => {
  let directory = "~";
  let username = current_login_info[0];
  let userdata = userdata_unfiltered[username];
  
  prompt = username+'@'+userdata.pcname+' '+directory+' $ ';

  term.prompt();
}