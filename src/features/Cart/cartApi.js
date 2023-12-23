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


// Update Cart 

export  function updateCart(update) {
  return new Promise(async(resolve) =>{

    const res = await fetch('http://localhost:8080/cart/'+update.id,{
      method:'PATCH',
      body:JSON.stringify(update),
      headers:{'content-type':'application/json'}
    })
    const data =await res.json();
    resolve({data})

  }
  );
}

export  function removefromCart(itemId) {
  return new Promise(async(resolve) =>{

    const res = await fetch('http://localhost:8080/cart/'+itemId,{
      method:'DELETE',
      headers:{'content-type':'application/json'}
    })
    const data =await res.json();
    console.log(data);
    resolve({data})

  }
  );
}