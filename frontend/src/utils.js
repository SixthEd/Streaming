import axios from 'axios';

const axiosInstance = axios.create({
	baseURL: 'http://ec2-65-0-167-220.ap-south-1.compute.amazonaws.com:80/',
    withCredentials: true});

export default axiosInstance;
