import axios from "axios";

const client = axios.create();

//글로벌 설정 예시:

// API 주소를 다른 곳으로 사용함
client.defaults.baseURL = "http://ec2-54-180-98-167.ap-northeast-2.compute.amazonaws.com:8080/";
// 헤더 설정
const token = typeof window !== "undefined" && sessionStorage.getItem("access_token");

if (token !== null) {
  client.defaults.headers.common["access_token"] = token;
}
//client.defaults.withCredentials=true;
// 인터셉터 설정
axios.interceptors.response.use(
  response => {
    // 요청 성공 시 특정 작업 수행
    return response;
  },
  error => {
    // 요청 실패 시 특정 작업 수행
    return Promise.reject(error);
  },
);

export default client;
