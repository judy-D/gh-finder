import axios from 'axios';
import { Fragment, useEffect, useState } from 'react';

type Props = {
	data: any,
	token: string
}

interface Details {
	location: string;
	email: string;
}

const simulateSlowNetworkRequest = () =>
  new Promise(resolve => setTimeout(resolve, 2500));


const Card = ({ data, token }: Props) => {
	const [user, setUser] = useState<Details>([] as any);


	// eslint-disable-next-line react-hooks/exhaustive-deps
	const userMoreDetails = async () => {
	try{
		const searchUrl = data.url;
		// to get access to more details, and fix API limit error, please generate a temporary token and add it to the header 
    	// await axios.get(searchUserURL,
        //     { 
        //                 headers: {
    	//                  'Authorization':`token ${token}`,
        //                    }
        //              }
        //     )
	
	await axios.get<Details>(searchUrl
		).then((details) => {
			
		setUser(details.data)
		return details.data
			
	})
} catch(err) {
		console.log("err" + JSON.stringify(err));	
	}
	}
	useEffect(() => {
		let isCancelled = false;

		simulateSlowNetworkRequest().then(() => {
		  if (!isCancelled) {
			userMoreDetails();
		  }
		});
	
		return () => {
		  isCancelled = true;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data])

    return (
		<Fragment>
			{data.avatar_url ? 
					<a className="card-image" href={`https://github.com/${data.login}`} target="_blank"  rel="noreferrer" style={{backgroundImage: `url(${data.avatar_url})`}} >
						<img src={data.avatar_url} alt="" />
					</a>:''
			}
		<a className="card-description" href={`https://github.com/${data.full_name}`} target="_blank"  rel="noreferrer">
			{data.name ?
				<ol>
				{data.full_name ? 	<li> <b>Full Name:</b> {data.full_name}</li>:''} 
				{data.owner ? 	<li>  <b>Owner:</b> {data.owner.login} </li>:''}
				{data.description ? <li>  <b>Description:</b> {data.description.length > 25 ? data.description.substring(0, 25) + "..." : data.description} </li>:''}
				{data.stargazers_count ? <li> <b>Stars:</b> {data.stargazers_count} </li> : ''}
				{data.watchers_count?	<li> <b>Watchers:</b> {data.watchers_count} </li>:''}
				{data.forks_count ? <li>  <b>Forks:</b> {data.forks_count} </li> :''}
				{data.language ? <li> <b>Language:</b> {data.language} </li> :''}
				</ol>
			:
			<Fragment>
				<p><b>Name:</b> {data.login}</p> <br />
				<p><b>Location:</b>{user.location ? user.location : 'Null'}</p> <br />
				<p><b>Email:</b>{user.email ? user.email: 'Null'}</p>
			</Fragment>
		    }
		</a>
		</Fragment>
    )
}

export default Card
