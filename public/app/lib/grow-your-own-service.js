import axios from 'axios';

const baseUrl = 'http://localhost:4000/directory';

const loadDirectory = () =>
  axios.get(baseUrl)
    .then(res => res)
     // .then(data => console.log(data))
    .catch((error) => {
      if (error.response) {
        // console.log(error.response.data);
        // console.log(error.response.status);
        // console.log(error.response.headers);
      }
    });

export default loadDirectory;
