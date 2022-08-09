import axios from 'axios';
const getData = async (garageName, automatedSetFailedtoLoad, automatedSetErr, setResponse, setTotal, formattedDate, setIsLoading) => {
  

  console.log(formattedDate);

  const token = sessionStorage.getItem("token");
  let data = null;

  try {
    const promise = await axios.get(
      "http://localhost:8080/garagedata/transactions",
      {
        params: {
          inDate: formattedDate,
          outDate: formattedDate,
          garage: garageName,
        },
        headers: {
          authorization: "Bearer " + token,
        },
      }
    );
    data = promise.data;
    console.log(data);
    setResponse(data);
    setIsLoading(false)
    if (data.total[0].total != null) {
      setTotal(data.total[0].total);
    }
  } catch (err) {
    automatedSetFailedtoLoad(true);
    automatedSetErr(err.response.data);
  }
};

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

export const automatedGarageAPI = getData;
export {formatDate, padTo2Digits}
