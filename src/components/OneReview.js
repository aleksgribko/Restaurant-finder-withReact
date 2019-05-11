import React from 'react'

function OneReview (props){	

	return(
		<div>
			<h4 className='star'>{props.rating}</h4>
			<p>{props.text}</p>
			<hr />
		</div>
	)
}

export default OneReview
