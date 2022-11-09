

function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }
  
function formatDate(date) {
    return [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
    ].join('-');
  }

  function spaces(garageName){
    switch (garageName) {
      case 'Baxter':
          return 67
      case 'VanVorst':
          return 254
      case 'Waverly':
          return 32
      default:
          console.log('error');
  }
  }


  module.exports = {padTo2Digits, formatDate, spaces}