const {google} = require('googleapis');


exports.sheets = async(req, res) => {
    const garage= req.query.garageName
    let sheet;
    switch(garage){
        case 'Baxter':
            sheet = "Baxter Street"
            break;
        case 'VanVorst':
            sheet = "LENOX"
            break;
        case 'Waverly':
            sheet = "Waverly"
        case '24th Street':
            sheet = "24th"
        case "Schermerhorn":
            sheet = "Schermerhorn"
    }

    console.log(sheet)
    const auth = new google.auth.GoogleAuth({
         keyFile: "credentials.json",
         scopes: "https://www.googleapis.com/auth/spreadsheets",
    });
  
    const client = await auth.getClient()
  
    const spreadsheetId = "1x9pbu9i3peKNuXPuJebNjywoc-iJ7O0rzM5jLsvQeAA";
  
    const googleSheets = google.sheets({version:"v4", auth:client});
  
    const getRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: `${sheet}`
        
    })
    res.send(getRows.data.values)
  }