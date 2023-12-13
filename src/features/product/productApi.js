
export  function fetchAllProducts() {
  return new Promise(async(resolve) =>{
    // Todo : we will mot hard code server URl Error
    const res = await fetch('http://localhost:8080/products')
    const data =await res.json();
    resolve({data})

  }
  );
}

export  function fetchProductsByFilter(filter) {
  return new Promise(async(resolve) =>{
    let queryString ='';
    for (const key in filter) {
      queryString+=`${key}=${filter[key]}&`
      
      }
    // Todo : we will mot hard code server URl Error
    const res = await fetch('http://localhost:8080/products?'+queryString)
    const data = await res.json();
    resolve({data})

  }
  );
}
