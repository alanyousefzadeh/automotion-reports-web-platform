const axios = require('axios')

const OPEN_API_URL = `https://ssl.garagenet.com/api/N2UwNjFi/woc/reports/allClosedInventoryData?from=1662436800&to=1662565135`
    axios
      .get(OPEN_API_URL, {
        auth: {
          username: "wocreports",
          password: "wqEsCg0LticrMNtG",
        },
      })
      .then((response) => console.log(response.data))
      .catch((err) => {
        res.send(err);
      });