export  function createUser(userData) {
  return new Promise(async(resolve) =>{

    const res = await fetch('http://localhost:8080/users',{
      method:'POST',
      body:JSON.stringify(userData),
      headers:{'content-type':'application/json'}
    })
    const data =await res.json();
    resolve({data})

  }
  );
}

// this is just for now , we'll check password in the backend
export  function checkUser(loginInfo) {
  return new Promise(async(resolve,reject) =>{

    const email = loginInfo.email;
    const password = loginInfo.password;
    const res = await fetch('http://localhost:8080/users?email='+email)
    const data =await res.json();
    if(data.length>0){
      if(data[0].password === password){
        resolve({data : data[0]})
      }else{
        reject(({message:'wrong credentials'}))
      }
    }else{
      reject({message:'user not found'})
    }

  }
  );
}


