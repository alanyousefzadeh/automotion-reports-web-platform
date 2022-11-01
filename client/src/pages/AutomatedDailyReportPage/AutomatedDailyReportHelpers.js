import axios from 'axios';
const getData = async (garageName, automatedSetFailedtoLoad, setErr, setResponse, setTotal, formattedDate, setIsLoading) => {
    console.log(formattedDate);

  let data = null;
  const token = sessionStorage.getItem('token');

  try {
    const promise = await axios.get(
      process.env.REACT_APP_TRANSACTIONS_URL,
      {
        params: {
          inDate: formattedDate,
          outDate: formattedDate,
          garage: garageName,
        },
        headers: {
          authorization: 'Bearer ' + token
        }

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
    setErr(err.response.data);
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

export {padTo2Digits, formatDate, getData as automatedGarageAPI};