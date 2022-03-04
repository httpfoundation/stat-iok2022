import Section from "../../components/Section/Section"
import "./Map.scss"
import Title from "../../components/Title/Title"
import Text from "../../components/Text/Text"
import map from "../../assets/img/map.png"
import { useStaticElement } from '../../tools/datoCmsTools'
import { StructuredText  } from "react-datocms"


const Map = () => {
	const [mapText1] = useStaticElement("map1") 
	const [mapText2] = useStaticElement("map2") 
	return <Section id="helyszin" container placeholder>
		<Title>Konferencia <span className="highlight">HELYSZÍN</span></Title>
		<Text description><StructuredText data={mapText1}></StructuredText></Text>
		<img className="map" src={map} alt="Térkép" />
		<Text description><StructuredText data={mapText2}></StructuredText></Text>
	</Section>
}

export default Map