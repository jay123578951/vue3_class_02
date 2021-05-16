const url = 'https://vue3-course-api.hexschool.io';
const path = 'jay0303597';

const emailBtn = document.querySelector('#username');
const passwordBtn = document.querySelector('#password');
const loginBtn = document.querySelector('#loginBtn');

loginBtn.addEventListener('click', login);

function login(e) {
  e.preventDefault();

  const username = emailBtn.value;
  const password = passwordBtn.value;
  
  const user = {
    username,
    password
  }
  
  axios.post(`${url}/admin/signin`, user)
    .then((res) => {
      console.log(res);
      if (res.data.success) {
        const token = res.data.token;
        const expired = res.data.expired;
        // 儲存 token 在 coolie
        document.cookie = `hexToken = ${token}; expires=${new Date(expired)}`;
        // 跳轉頁面
        window.location = 'products.html';
      } else {
        alert('請輸入正確的帳號或密碼');
      }
    })
    .catch((err) => {
      console.log(err);
    })
}

// const checkBtn = document.querySelector('#checkBtn');
// checkBtn.addEventListener('click', checkLogin);

// function checkLogin() {
//   // 取得 token
//   const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
//   // 把 token 加入 headers
//   axios.defaults.headers.common['Authorization'] = token;
//   // 透過 axios 發送請求驗證
//   axios.post(`${url}/api/user/check`)
//     .then((res) => {
//       console.log(res);
//     })
// }
