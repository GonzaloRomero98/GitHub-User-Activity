
const dataActivity = (count,responseData) =>{
  responseData.forEach((dataActivity)=>{
    
    if(dataActivity.type == 'PushEvent'){
      console.log('ACAAAAAA'+dataActivity.type+"\n")
      console.log("")
      console.log("")
      const commits = dataActivity.payload.commits;
      console.log('---- Activity N°',count, " ---- \n")
      console.log("* "+ commits[0].message+"\n")
      count +=1;
    } 
  });
}



const dataGit = async (nameGitOwner) =>{
    const data = await fetch(`https://api.github.com/users/${nameGitOwner}/events`)
    const response = await data.json();
    return response
}

const menu = async () =>{
    let count = 1;
    const username = process.argv[2];
    const responseData =await dataGit(username);
    console.log(responseData)
    const filter = process.argv[3];

    switch(filter){
      case 'Push':
        dataActivity(count,responseData);
        break;
      

      default:
        responseData.forEach((data) => {
          const filter = data.payload.commits;
          console.log("")
          console.log("")
          console.log(data.type)
          console.log("")
          console.log("")
          console.log("")
          console.log("")
          console.log(data)
          console.log("")
          console.log("")
          
          if(filter !== undefined){
            console.log(data.type)
            console.log('---- Activity N°',count, " ---- \n")
            const message = filter[0].message;
            
            console.log("* "+message+"\n")
            count +=1;
          }
        });
        break;
    }
    
}

menu();