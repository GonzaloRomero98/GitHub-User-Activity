

const dataGit = async (nameGitOwner) =>{
    const data = await fetch(`https://api.github.com/users/${nameGitOwner}/events`)
    const response = await data.json();
    return response
}

menu = async () =>{
    const username = process.argv[2];
    const filter = process.argv[3];
   

    switch(filter){
      case 'Push':
        console.log('pusheo');
        break;
      
      default:
        let count = 1;
        const responseData =await dataGit(username);
        responseData.forEach((data) => {
          if(data.type == 'PushEvent'){
              count += 1;
              console.log(count ,") "+JSON.stringify(data.payload['commits'][0].message));
          }
      });
      break;
    }
    
}

menu();

/*
{
    id: '48172848143',
    type: 'PushEvent',
    actor: {
      id: 205480721,
      login: 'GonzaloRomero98',
      display_login: 'GonzaloRomero98',
      gravatar_id: '',
      url: 'https://api.github.com/users/GonzaloRomero98',
      avatar_url: 'https://avatars.githubusercontent.com/u/205480721?'
    },
    repo: {
      id: 957758222,
      name: 'GonzaloRomero98/Cli-Task',
      url: 'https://api.github.com/repos/GonzaloRomero98/Cli-Task'
    },
    payload: {
      repository_id: 957758222,
      push_id: 23490638968,
      size: 1,
      distinct_size: 1,
      ref: 'refs/heads/main',
      head: '73f66843772c3730cd6eeea1331d3cd853c8d15a',
      before: '36ce35ad97c3907e044dbfc8e276e35060857384',
      commits: [Array]
    },
    public: true,
    created_at: '2025-04-01T01:43:58Z'
  }


  {
  id: '48133323194',
  type: 'CreateEvent',
  actor: {
    id: 205480721,
    login: 'GonzaloRomero98',
    display_login: 'GonzaloRomero98',
    gravatar_id: '',
    url: 'https://api.github.com/users/GonzaloRomero98',
    avatar_url: 'https://avatars.githubusercontent.com/u/205480721?'
  },
  repo: {
    id: 957758222,
    name: 'GonzaloRomero98/Cli-Task',
    url: 'https://api.github.com/repos/GonzaloRomero98/Cli-Task'
  },
  payload: {
    ref: null,
    ref_type: 'repository',
    master_branch: 'main',
    description: 'Todo-app en consola con js',
    pusher_type: 'user'
  },
  public: true,
  created_at: '2025-03-31T04:34:11Z'
}
*/