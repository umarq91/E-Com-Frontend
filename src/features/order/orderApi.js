export  function createOrder(order) {
  return new Promise(async(resolve) =>{

    const res = await fetch('http://localhost:8080/orders',{
      method:'POST',
      body:JSON.stringify(order),
      headers:{'content-type':'application/json'}
    })
    const data =await res.json();
    resolve({data})

  }
  );
}
