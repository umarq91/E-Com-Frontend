
export  function fetchLoggedInUser(userId) {
  return new Promise(async(resolve) =>{

    const res = await fetch('http://localhost:8080/user/'+userId)
    const data =await res.json();
    resolve({data})

  }
  );
}
