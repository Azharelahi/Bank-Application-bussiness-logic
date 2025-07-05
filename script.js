const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let blnce = 5000;

function fetchBalance() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(blnce);
    }, 2000);
  });
}
function savingAccount() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Fetching your saving account details...");
    });
  });
}
function currentAcount() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Fetching your current account details...");
    });
  });
}
function LoanAccount() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Fetching your loan account details...");
    });
  });
}
function askQueries(query) {
  return new Promise((res) => {
    rl.question(query, (answer) => {
      res(answer);
    });
  });
}
function transferMoney() {
  return new Promise((resolve, reject) => {
    let accountNumber;
    askQueries("Enter the account number to trasnfer the money: ")
      .then((accountNo) => {
        accountNumber = accountNo;
        console.log("Account number entered: " + accountNumber);
        return askQueries("Enter the amount to transfer the money: ");
      })
      .then((amntstr) => {
        let amnt = parseFloat(amntstr);
        console.log(
          "Transferring " + amnt + " to account number " + accountNumber
        );
        if (amnt > blnce) {
          reject("Insufficient balance to transfer " + amnt);
        } else if (amnt <= 0) {
          reject("Invalid amount entered, Cannot send 0 or negative amount");
        } else {
          blnce -= amnt;
          resolve("Transfer successful! New balance is: " + blnce);
        }
      });
  });
}
function loanApplication() {
  return new Promise((resolve, reject) => {
    let loanApprovalChance = Math.random() > 0.5;
    setTimeout(() => {
      if (loanApprovalChance) {
        resolve("loan Approved , Proceeding to view your account details");
      } else {
        reject("loan Rejected");
      }
    });
  });
}
console.log("Welcome to the Bank!");
console.log("Fetching your balance...");
fetchBalance()
  .then((balance) => {
    console.log("Your current balance is: " + balance);
    return "Proceeding to transfer money...";
  })
  .then((message) => {
    console.log(message);
    return transferMoney();
  })
  .then((message) => {
    console.log(message);
    return loanApplication();
  })
  .then((loanmessage) => {
    console.log(loanmessage);
    return Promise.all([savingAccount(), currentAcount(), LoanAccount()]);
  })
  .catch((err) => {
    console.error("Error: " + err);
    rl.close();
  })
  .then((message) => {
    console.log(message[0]);
    rl.close();
  });
