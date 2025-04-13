
import React from 'react'

interface ICardProps {
    name:string;
    age:number;
}

const Card = ({name,age}:ICardProps) => {
  return (
    <div>
        <h1>{name}</h1>
        <p>age: {age}</p>
    </div>
  )
}

export default Card