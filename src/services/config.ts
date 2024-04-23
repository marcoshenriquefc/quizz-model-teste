import axios, { AxiosInstance } from 'axios';

const http : AxiosInstance = axios.create({
    //Link version 1.3.0
    baseURL : 'https://script.google.com/macros/s/AKfycbzuSE4DeJCysbnwDPqHDGFP4W-lxRWfNRw3hajrU-f3GMV-z0FDy6YkCLi0L6xwMHot/exec'
});

export default http;