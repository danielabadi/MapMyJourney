import React from "react";
import "./Map.css";
import * as Leaflet from "leaflet";
import { useRecoilState, useSetRecoilState } from "recoil";
import { markersState, showAddFailState, showAddSuccessState } from "../../states/markers/atom";
import apiClient from "../../services/apiClient";
import { IconBlue, IconGreen, IconYellow, IconGrey } from "../../utils/Markers";
import { MdClose } from "react-icons/md";
import { BiCloudUpload } from "react-icons/bi";
import { showAddMarcadorState } from "../../states/actionbar/atom";
import useCreateMarker from "../../services/map/hooks/useCreateMarker";
import AlertAdd from "./components/Alert/AlertAdd";

function Map() {
    const setShowAddFail = useSetRecoilState(showAddFailState);
    const setShowAddSuccess = useSetRecoilState(showAddSuccessState);
    const { mutate: createMarker } = useCreateMarker();
    const [formData, setFormData] = React.useState({
        status: "ja fui",
        title: "",
        start_date: "",
        end_date: "",
        description: "",
        lat: 0,
        lng: 0,
        photos: [],
    });

    const [showAddMarcador, setShowAddMarcador] = useRecoilState(showAddMarcadorState);
    const [markers, setMarkers] = useRecoilState(markersState);
    const mapRef = React.useRef(null);
    const layerRef = React.useRef(null);
    const salvar = React.useRef(false);
    const marcador = React.useRef(false);
    const layerRefAux = React.useRef(null);
    React.useEffect(() => {
        if (mapRef.current == null) {
            mapRef.current = Leaflet.map("pageMap-map", {
                center: [0, 0],
                zoom: 3,
                maxZoom: 18,
                minZoom: 2,
                zoomSnap: 1,
                worldCopyJump: true,
                maxBounds: [
                    [-90, -180],
                    [90, 180],
                ],
                maxBoundsViscosity: 1.0,
            });
            Leaflet.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
                attribution:
                    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            }).addTo(mapRef.current);

            layerRef.current = Leaflet.layerGroup().addTo(mapRef.current);
            layerRefAux.current = Leaflet.layerGroup().addTo(mapRef.current);

            mapRef.current.on("click", (e) => {
                if (marcador.current) {
                    layerRefAux.current.clearLayers();
                    Leaflet.Marker.prototype.options.icon = IconGrey;
                    Leaflet.marker(e.latlng).addTo(layerRefAux.current);
                    salvar.current = true;
                    marcador.current = false;
                    setShowAddMarcador(true);
                    setFormData((prevFormData) => {
                        return {
                            ...prevFormData,
                            lat: e.latlng.lat,
                            lng: e.latlng.lng,
                        };
                    });
                }
            });
        }
    }, []);

    React.useEffect(() => {
        async function fetchData() {
            try {
                const response = await apiClient.get("/markers", {
                    withCredentials: true,
                });
                setMarkers([...response.data.data]);
            } catch (error) {
                console.log("error", error);
            }
        }
        fetchData();
    }, []);

    React.useEffect(() => {
        layerRef.current.clearLayers();
        markers.forEach((element) => {
            Leaflet.Marker.prototype.options.icon = getIcon(element.status);
            Leaflet.marker([element.lat, element.lng])
                .addTo(layerRef.current)
        });
    }, [markers]);

    function letPutPin() {
        marcador.current = true;
        setShowAddMarcador(false);
    }

    function getIcon(status) {
        return status === "ja fui"
            ? IconBlue
            : status === "quero ir"
                ? IconGreen
                : IconYellow;
    }

    function handleClick() {
        setShowAddMarcador(false);
        setFormData({
            status: "ja fui",
            title: "",
            start_date: "",
            end_date: "",
            description: "",
            lat: "",
            lng: "",
            photos: [],
        });
    }

    function handleChange(event) {
        setFormData((prevFormData) => {
            return {
                ...prevFormData,
                [event.target.name]: event.target.value,
            };
        });
    }

    function handleFileChange(event) {
        setFormData((prevFormData) => {
            return {
                ...prevFormData,
                photos: [...event.target.files],
            };
        });
    }

    const handleSubmit = async (event) => {
        marcador.current = false;
        event.preventDefault();
    
        createMarker(formData, {
          onSuccess: (data) => {
            setMarkers((prev) => {
              return [...prev, data.data];
            });
    
            layerRefAux.current.clearLayers();
            setFormData({
              status: "ja fui",
              title: "",
              start_date: "",
              end_date: "",
              description: "",
              lat: "",
              lng: "",
              photos: [],
            });
            salvar.current = false;
            setShowAddMarcador(false);
            setShowAddSuccess(true);
          },
          onError: (err) => {
            console.log(err);
            setShowAddFail(true);
          },
        });
      };

    return (
        <div className='pageMap'>
            <div className='pageMap-map' id='pageMap-map'></div>
            {showAddMarcador && (
                <div className='pageMap-form'>
                    <MdClose
                        size={"30px"}
                        color='#808080'
                        className='pageMap-form__close'
                        onClick={() => handleClick()}
                    ></MdClose>
                    <h1>Adicionar marcador</h1>
                    <form onSubmit={handleSubmit} autoComplete={"off"}>
                        <div className='pageMap-form__titulo'>
                            <label htmlFor='titulo'>Título*</label>
                            <input
                                id='titulo'
                                type='text'
                                onChange={handleChange}
                                name='title'
                                value={formData.title}
                                required
                            />
                        </div>

                        <div className='pageMap-form__tipo'>
                            <label htmlFor='tipo'>Status*</label>
                            <div className='pageMap-form__tipo-buttons'>
                                <div className='pageMap-form__tipo__option'>
                                    <input
                                        type='radio'
                                        id='a25'
                                        name='status'
                                        value='ja fui'
                                        onChange={handleChange}
                                        checked={formData.status === "ja fui"}
                                    />
                                    <label className='btn btn-default' htmlFor='a25'>
                                        Já fui
                                    </label>
                                </div>
                                <div className='pageMap-form__tipo__option'>
                                    <input
                                        type='radio'
                                        id='a50'
                                        name='status'
                                        value='planejado'
                                        onChange={handleChange}
                                        checked={formData.status === "planejado"}
                                    />
                                    <label className='btn btn-default' htmlFor='a50'>
                                        Planejado
                                    </label>
                                </div>
                                <div className='pageMap-form__tipo__option'>
                                    <input
                                        type='radio'
                                        id='a75'
                                        name='status'
                                        value='quero ir'
                                        onChange={handleChange}
                                        checked={formData.status === "quero ir"}
                                    />
                                    <label className='btn btn-default' htmlFor='a75'>
                                        Quero ir
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className='pageMap-form__datas'>
                            <div>
                                <label htmlFor='start_date'>Data de ida</label>
                                <input
                                    id='start_date'
                                    className='pageMap-form__datas__picker'
                                    type='date'
                                    name='start_date'
                                    onChange={handleChange}
                                    value={formData.start_date}
                                />
                            </div>
                            <div className='end_date'>
                                <label htmlFor='end_date'>Data de volta</label>
                                <input
                                    id='end_date'
                                    className='pageMap-form__datas__picker'
                                    type='date'
                                    name='end_date'
                                    onChange={handleChange}
                                    value={formData.end_date}
                                />
                            </div>
                        </div>

                        <div className="pageMap-form__images">
                            <div>
                                <h6>Fotos</h6>
                                <input
                                    type='file'
                                    id='input_image'
                                    accept='image/png, image/jpeg'
                                    onChange={handleFileChange}
                                    multiple
                                ></input>
                                <label htmlFor="input_image">Adicionar fotos <BiCloudUpload className="upload-icon" size={'20px'}></BiCloudUpload></label>
                            </div>
                            {formData.photos.length === 0 && (
                                <p>Nenhuma foto seleiconada</p>
                            )}

                            {formData.photos.length === 1 && (
                                <p>{formData.photos.length} foto selecionada</p>
                            )}

                            {formData.photos.length > 1 && (
                                <p>{formData.photos.length} fotos selecionadas</p>
                            )}
                        </div>

                        <div className='pageMap-form__descricao'>
                            <label htmlFor='descricao'>Descrição</label>
                            <textarea
                                id='descricao'
                                value={formData.description}
                                onChange={handleChange}
                                name='description'
                            />
                        </div>

                        <div className='pageMap-form__botoes'>
                            <button
                                type='button'
                                onClick={letPutPin}
                                style={{
                                    backgroundColor: salvar.current ? "#A73636" : "#073064",
                                }}
                            > {!salvar.current
                                ? "Definir localização"
                                : "Alterar localização"}
                            </button>
                            <button
                                disabled={!salvar.current}
                                style={{
                                    backgroundColor: salvar.current ? "#49B047" : "#D3D3D3",
                                }}
                            >
                                Salvar
                            </button>
                        </div>
                    </form>
                </div>
            )}
            <AlertAdd></AlertAdd>
        </div>
    )
}

export default Map;