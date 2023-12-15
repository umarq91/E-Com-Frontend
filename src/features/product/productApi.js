
export  function fetchAllProducts() {
  return new Promise(async(resolve) =>{
    // Todo : we will mot hard code server URl Error
    const res = await fetch('http://localhost:8080/products')
    const data =await res.json();
    resolve({data})

  }
  );
}

export  function fetchProductsByFilter(filter,sort,pagination) {
  return new Promise(async (resolve) => {
    //FILTER = {"category":["smartphones","laptops"]}
    //sort = {_sort="price",order="desc"}
    //pagination = {"page=1,_limit=10}
    let queryString = "";
  

    // Kam chalane k liye filhal doing this ,
    // we will change this from single to array after
    for (const key in filter) {
      const categoryValues = filter[key];
      if (categoryValues.length > 0) {
        const lastCategoryvalue = categoryValues[categoryValues.length - 1];

        queryString += `${key}=${lastCategoryvalue}&`;
      }
    }
    // Sort
    for (const key in sort) {
      queryString += `${key}=${sort[key]}&`;
    }
    for (const key in pagination) {
      queryString += `${key}=${pagination[key]}&`;
    }
    // Todo : we will mot hard code server URl Error
    const res = await fetch("http://localhost:8080/products?" + queryString);
    const data = await res.json();
    const totalItems = await res.headers.get("X-total-Count");

    resolve({ data: { products: data, totalItems: +totalItems } });
  });
}


export  function fetchCategories() {
  return new Promise(async(resolve) =>{
    // Todo : we will mot hard code server URl Error
    const res = await fetch('http://localhost:8080/categories')
    const data =await res.json();
    
    resolve({data})

  }
  );
}

export  function fetchBrands() {
  return new Promise(async(resolve) =>{
    // Todo : we will mot hard code server URl Error
    const res = await fetch('http://localhost:8080/brands')
    const data =await res.json();
    resolve({data})

  }
  );
}