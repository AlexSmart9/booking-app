import { Map, Marker } from "pigeon-maps";


const HotelMap = ({lat, lon}) => {
    return (
        <div className="flex-container">
            <Map center={[+lat, +lon]} width={300} height={300}>
            <Marker width={50} anchor={[+lat, +lon]} color="#ea4959" />
            </Map>
        </div>
      );
    
}

export default HotelMap