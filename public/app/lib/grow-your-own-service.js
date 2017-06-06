import axios from 'axios';

const baseUrl = 'http://localhost:4000/directory';

const loadDirectory = () => axios
  .get(baseUrl)
  .then(res => res)
  .catch(error => {
    if (error.response) {
      // console.log();
    }
  });

export default loadDirectory;
