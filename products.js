const app = {
  data: {
    url: 'https://vue3-course-api.hexschool.io',
    path: 'jay0303597',
    newData: []
  },

  getProducts() {
    axios.get(`${this.data.url}/api/${this.data.path}/admin/products`)
      .then((res) => {
        this.data.newData = res.data.products;
        this.render();
      })
      .catch((err) => {
        console.log(err);
      })
  },

  delete(id) {
    axios.delete(`${this.data.url}/api/${this.data.path}/admin/product/${id}`)
      .then((res) => {
        this.getProducts();
        alert('成功刪除產品');
      })
      .catch((err) => {
        console.log(err);
      })
  },

  render() {
    const productList = document.querySelector('#productList');
    const productCount = document.querySelector('#productCount');

    let str = '';
    this.data.newData.forEach((item) => {
      str += `
      <tr>
        <td>${item.title}</td>
        <td width="120">
          ${item.origin_price}
        </td>
        <td width="120">
          ${item.price}
        </td>
        <td width="100">
          <span class="">${item.is_enabled}</span>
        </td>
        <td width="120">
          <button type="button" class="btn btn-sm btn-outline-danger move deleteBtn" data-action="remove" data-id="${item.id}"> 刪除 </button>
        </td>
      </tr>`;
    })
    productList.innerHTML = str;
    productCount.textContent = this.data.newData.length;

    // 刪除產品
    const deleteBtn = document.querySelectorAll('.deleteBtn');
    deleteBtn.forEach((item) => {
      item.addEventListener('click', (e) => {
        const id = e.target.getAttribute('data-id');
        this.delete(id);
      });
    })
  },

  created() {
    // 取得 token
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    // 把 token 加入 headers
    axios.defaults.headers.common['Authorization'] = token;
    this.getProducts();
  }
};

app.created();
