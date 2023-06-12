import React from "react";
import "./DetailsMarker.css";
import { MdClose } from "react-icons/md";
import { useSetRecoilState, useRecoilValue, useRecoilState } from "recoil";
import { showDetailsMarkerState } from "../../../../states/detailsmarker/atom";
import { markersState } from "../../../../states/markers/atom";
import moment from 'moment'
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { showEditMarkerState } from "../../../../states/editmarker/atom";
import { MdModeEdit } from "react-icons/md";
import EditMarker from "../EditMarker/EditMarker";
import AlertEdit from "../Alert/AlertEdit";
import { showEditFailState, showEditSuccessState } from "../../../../states/editmarker/atom";

function DetailsMarker(props) {
    const setShowDetailsMarker = useSetRecoilState(showDetailsMarkerState);
    const setShowEditFail = useSetRecoilState(showEditFailState);
    const setShowEditSuccess = useSetRecoilState(showEditSuccessState);
    const [showEditMarker, setShowEditMarker] = useRecoilState(showEditMarkerState);
    const markers = useRecoilValue(markersState);
    const indexMarker = markers.findIndex(m => m.id === props.marker);
    let marker = markers[indexMarker];

    React.useEffect(() => {
        marker = markers[indexMarker];
    }, [markers]);

    function getColor(status) {
        return status === 'ja fui' ? '#073064' :
            status === 'quero ir' ? 'green' : '#dede09';
    }

    function handleClick() {
        setShowDetailsMarker(false);
        setShowEditFail(false);
        setShowEditSuccess(false);
    }

    function handleEdit() {
        setShowEditMarker(true);
    }
    
    return (
        <div className="details_marker">
            {
                !showEditMarker && marker !== undefined ?
                    <div className="details_marker_content">
                        <MdClose size={'30px'} color="#808080" className="details_marker_close" onClick={() => handleClick()}></MdClose>
                        <div className="details_marker_elements">
                            <h1>{marker.title}</h1>
                            {marker.photos.length > 1 &&
                                <Carousel showArrows={true} className="Carousel">
                                    {marker.photos.map(element => (
                                        <div key={element}>
                                            <img src={'http://localhost:8001/uploads/' + element} alt="imagem viagem" />
                                        </div>
                                    ))}
                                </Carousel>}
                            {marker.photos.length === 1 &&
                                <img style={{ width: "100%" }} src={'http://localhost:8001/uploads/' + marker.photos[0]} alt="imagem viagem" />
                            }
                            <div className="details_marker__date">
                                <span className="dot" style={{ backgroundColor: getColor(marker.status) }}></span>
                                <p>{marker.start_date !== null ? moment(marker.start_date).utc().format('DD/MM/YYYY') : 'Sem data de ida'} - {marker.end_date !== null ? moment(marker.end_date).utc().format('DD/MM/YYYY') : 'Sem data de volta'}</p>
                            </div>
                            <p className="details_marker__description">{marker.description}</p>
                        </div>
                        <button className="edit_button" onClick={handleEdit}><MdModeEdit size={'14px'} className="icon_edit"></MdModeEdit> Editar</button>
                    </div>
                    :
                    marker !== undefined && <EditMarker marker={marker}></EditMarker>
            }
            <AlertEdit></AlertEdit>
        </div>
    )
}

export default DetailsMarker;