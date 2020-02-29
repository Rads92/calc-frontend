import axios from 'axios';

export const get = uri => {
    return axios.get(process.env.REACT_APP_API_URL + uri);
};

export const remove = uri => {
    return axios.delete(process.env.REACT_APP_API_URL + uri);
};

export const post = (uri, data) => {
    return axios.post(process.env.REACT_APP_API_URL + uri, data);
};
