
export  function fetchCount(amount = 1) {
  return new Promise(async(resolve) =>{

    const res = await fetch('http://localhost:8080')
    const data =await res.json();
    resolve({data})

  }
  );
}
