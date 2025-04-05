
const dataGit = async (nameGitOwner) =>{
    const data = await fetch(`https://api.github.com/users/${nameGitOwner}/events`)
    const response = await data.json();
    return response
}

const dataActivity = (count,responseData,filterSelected) =>{
  console.log(responseData)
  filterData = responseData.filter((data)=>data.type == filterSelected);
  filterData.forEach((dataActivity)=>{
    if(dataActivity.type == 'PushEvent'){
      const commits = dataActivity.payload.commits;
      console.log('---- Activity N°',count, " ---- \n")
      console.log("* "+ commits[0].message+"\n")
      count +=1;
    }else if(data.type == 'IssueCommentEvent' || data.type == 'IssuesEvent'){
      console.log('---- Activity N°',count, " ---- \n")
      const messages = data.payload.issue.title;
      console.log("* "+messages+"\n")
      count +=1;
    }else{
      console.log('---- Activity N°',count, " ---- \n")
      const messages = data.payload.pull_request.title;
      console.log("* "+messages+"\n")
      count +=1;
    }
      
  });
}


const menu = async () =>{
    let count = 1;
    const username = process.argv[2];
    const responseData =await dataGit(username);
    const filter = process.argv[3];
    console.log(filter)
    switch(filter){
      case 'Push':
        dataActivity(count,responseData,'PushEvent');
        break;
      case 'PullRequest':
        dataActivity(count,responseData, 'PullRequestEvent');
        break;
      case 'Issues':
        dataActivity(count,responseData, 'IssuesEvent');
        break;
      case undefined:
        responseData.forEach((data) => {     
          if(filter !== 'undefined'){
            if(data.type == 'PullRequestEvent'){
              console.log('---- Activity N°',count, " ---- \n")
              const messages = data.payload.pull_request.title;
              console.log("* "+messages+"\n")
              count +=1;
            }else if(data.type == 'IssueCommentEvent' || data.type == 'IssuesEvent'){
              console.log('---- Activity N°',count, " ---- \n")
              const messages = data.payload.issue.title;
              console.log("* "+messages+"\n")
              count +=1;

            }else{
              console.log('---- Activity N°',count, " ---- \n")
              const messages = data.payload.commits[0].message;
              console.log("* "+messages+"\n")
              count +=1;
            }
            
          }
        });
        break;

      default:
        console.log("Error: Invalid filter. Please use 'Push', 'PullRequest', 'Issues' or 'undefined'.");
        
    }
    
}

menu();