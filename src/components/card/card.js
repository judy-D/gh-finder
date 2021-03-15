import React, { Fragment } from 'react'

const Card = ({ data }) => {
	console.log('data ',JSON.stringify(data));
    return (
		<Fragment>
			{data.avatar_url ? 
					<a className="card-image" href={data.url} target="_blank" style={{backgroundImage: `url(${data.avatar_url})`}} >
						<img src={data.avatar_url} alt="Psychopomp" />
					</a>:''
			}
		<a className="card-description" href={data.url} target="_blank">
			{data.name ?
				<ol>
				{data.full_name ? 	<li> Full Name: ${data.full_name}</li>:''} 
				{data.owner ? 	<li>  Owner: ${data.owner.login} </li>:''}
				{data.description ? <li>  Description ${data.description} </li>:''}
				{data.stargazers_count ? <li> Stars ${data.stargazers_count} </li> : ''}
				{data.watchers_count?	<li> Watchers ${data.watchers_count} </li>:''}
				{data.forks_count ? <li>  Forks ${data.forks_count} </li> :''}
				{data.language ? <li> Language ${data.language} </li> :''}
				</ol>
			:
			<p>Name: {data.login}</p>
		    }
		</a>
		</Fragment>
    )
}

export default Card
