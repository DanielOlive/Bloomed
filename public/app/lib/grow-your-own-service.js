import axios from 'axios';

const baseUrl = 'http://localhost:4000/directory';

const loadDirectory = () => axios.get(baseUrl).then(res => res);

export default loadDirectory;
