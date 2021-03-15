import React, { Fragment } from 'react'

const Card = ({ data, key }) => {
	console.log('data ',JSON.stringify(data));
    return (
		<Fragment>
			{data.avatar_url ? 
					<a className="card-image" href={data.url} target="_blank" style={{backgroundImage: `url(${data.avatar_url})`}} >
						<img src={data.avatar_url} alt="Psychopomp" />
					</a>:''
			}
		<a className="card-description" href={data.url} target="_blank">
			{/* <h2>Name: {data.login ? data.login : data.name}</h2> */}
			{data.name ?
				<ol>
					<li> {data.full_name ?  `Full Name: ${data.full_name}`:''} </li>
					<li> {data.owner ?  `Owner: ${data.owner.login}`:''} </li>
					<li> {data.description ? `Description ${data.description}`:''}</li>
					<li>{data.stargazers_count ? `Stars ${data.stargazers_count}`: ''}</li>
					<li>{data.watchers_count? `Watchers ${data.watchers_count}`:''}</li>
					<li>{data.forks_count ? `Forks ${data.forks_count}`:''}</li>
					<li>{data.language ? `Language ${data.language}`:''}</li>
				</ol>
			:
			<p>Name: {data.login}</p>
		    }
		</a>
		</Fragment>
    )
}

export default Card
