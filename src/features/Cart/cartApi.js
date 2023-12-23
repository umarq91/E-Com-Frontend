export  function addToCart(item) {
  return new Promise(async(resolve) =>{

    const res = await fetch('http://localhost:8080/cart',{
      method:'POST',
      body:JSON.stringify(item),
      headers:{'content-type':'application/json'}
    })
    const data =await res.json();
    resolve({data})

  }
  );
}

// Fetch All Cart Items 

export  function fetchCartItemsById(userId) {
  return new Promise(async(resolve) =>{

    const res = await fetch('http://localhost:8080/cart?user='+userId)
    const data =await res.json();
    resolve({data})

  }
  );
}