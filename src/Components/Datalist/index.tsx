import React from "react"

interface DatalistProps {
  data: string[]
  id: string
}

const Datalist: React.FC<DatalistProps> = props => {
  return (
    <datalist id={props.id} >
      {props.data.map((item: string) => (
        <option value={item} />
      ))}
    </datalist>
  )
}

export default Datalist