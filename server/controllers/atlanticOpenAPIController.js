const axios = require('axios')

exports.atlanticOpenAPI = (req, res) => {
    let from = req.query.inDate;
    let to = req.query.outDate;
    console.log(req.query);
    console.log("from", from);
    console.log("to", to);
    const OPEN_API_URL = `https://ssl.garagenet.com/api/N2UwNjFi/woc/reports/allOpenInventoryData?from=${from}&to=${to}`;
    axios
      .get(OPEN_API_URL, {
        auth: {
          username: "wocreports",
          password: "wqEsCg0LticrMNtG",
        },
      })
      .then((response) => res.send(response.data))
      .catch((err) => {
        res.send(err);
      });
  };
  