import React from 'react'

function MyPositionElement(props){
	
	return (<div className="pointerYou" style={{width:props.size*3, height:props.size*3, position: 'absolute',  transform: 'translate(-50%, -50%)'}}></div>)
}

export default MyPositionElement

