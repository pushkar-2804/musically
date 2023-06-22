import './Playlist.css'

type tracksProps = {
  data:{
      hits: {
          track:{
              adamid:number,
              avatar:string,
              ti:string,
              verified:boolean,
              weburl:string
          }
  }[]}
}



const Playlist = (props:tracksProps) => {
  return (
    <div className="playlists">
        <h3 className="subtitle"> Playlists </h3>
        <div className="rplayed__grid">
    {props.data.hits.map((hit) =>{
        console.log(hit.artist.name);
        return <ArtistCard key={hit.artist.adamid} id={hit.artist.adamid} artist={hit.artist.name} onClick={()=>{window.open(hit.artist.weburl)}} />
    })}
    </div>
    </div>
  )
}

export default Playlist