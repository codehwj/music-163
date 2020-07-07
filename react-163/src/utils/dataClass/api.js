import axios from "axios"

const instance = axios.create({
  baseURL: 'http://codehwj.com:3000',
  timeout: 1000,
  headers: {
    post: {
      "Content-Type": 'application/x-www-form-urlencoded'
    }
  }
});

/**
 * @param {string} url 接口地址
 * @param {string} method 请求方法：GET、POST，只能大写
 * @param {JSON} [params=''] body的请求参数，默认为空
 * @return 返回Promise
 */
export async function getRequest(url, params = {}) {
  // let header = {
  //   "Content-Type": "application/json;charset=UTF-8",
  //   "accesstoken": token  //用户登陆后返回的token，某些涉及用户数据的接口需要在header中加上token
  // };
  return new Promise(function (resolve, reject) {
    instance.get(url, {
      params: params,
    }).then((response) => {
      if (response.status === 200 && response.data.code === 200) {
        resolve({ success: true, response: response.data.result });
      }
    })
      .catch((err) => {
        console.log('err:', url, err);     //网络请求失败返回的数据
        reject(err);
      })
  });
}

export default {
  getRequest: getRequest
}