import React, {useRef, useEffect}from 'react'
import VanillaTilt from 'vanilla-tilt'

interface Props {
    name: string
    id: number
    image: string
    type: string
}
function PokemonList(props: Props) {

  const tiltRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (tiltRef.current) {
      VanillaTilt.init(tiltRef.current);
    }
  }, []);


  const {name, id, image, type} = props

    return (
    <div>
        <section ref={tiltRef} data-tilt className={`pokemon-list-container ${type} `}>
            <p className="pokemon-name">#{id}</p>
            <p className="pokemon-name"> {name} </p>
            <img src={image} alt={name} />
            <p className="pokemon-name"> Type : {type} </p>

        </section>
    </div>
    
  )
}

export default PokemonList