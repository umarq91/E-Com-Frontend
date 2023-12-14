
export  function fetchAllProducts() {
  return new Promise(async(resolve) =>{
    // Todo : we will mot hard code server URl Error
    const res = await fetch('http://localhost:8080/products')
    const data =await res.json();
    resolve({data})

  }
  );
}

export  function fetchProductsByFilter(filter,sort) {
  return new Promise(async(resolve) =>{
    let queryString ='';
    // Kam chalane k liye filhal doing this ,
    // we will change this from single to array after 
    for (const key in filter) {
      const categoryValues = filter[key]
      if(categoryValues.length>0){
        const lastCategoryvalue = categoryValues[categoryValues.length-1]
        
        queryString+=`${key}=${lastCategoryvalue}&`
      }   
      }
// Sort
for (const key in sort){
  queryString+=`${key}=${sort[key]}&`

}


    // Todo : we will mot hard code server URl Error
    const res = await fetch('http://localhost:8080/products?'+queryString)
    const data = await res.json();
    resolve({data})

  }
  );
}
