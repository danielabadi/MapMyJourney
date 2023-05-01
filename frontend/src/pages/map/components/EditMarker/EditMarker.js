import React from "react";
import "./EditMarker.css";
import { useSetRecoilState } from "recoil";
import { showEditMarkerState } from "../../../../states/editmarker/atom";
import useEditMarker from "../../../../services/map/hooks/useEditMarker";
import { markersState } from "../../../../states/markers/atom";
import { MdClose } from "react-icons/md";
import { BiCloudUpload } from "react-icons/bi";
import moment from "moment";

function EditMarker(props) {
    const setMarkers = useSetRecoilState(markersState);
    const setShowEditMarker = useSetRecoilState(showEditMarkerState);
    const { mutate: editMarker } = useEditMarker();
    const [formData, setFormData] = React.useState({
        markerId: props.marker.id,
        status: props.marker.status,
        title: props.marker.title,
        start_date: props.marker.start_date,
        end_date: props.marker.end_date,
        description: props.marker.description,
        lat: props.marker.lat,
        lng: props.marker.lng,
        photos: [],
    });
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
        event.preventDefault();
        editMarker(formData, {
            onSuccess: (data) => {
                setMarkers((prev) => {
                    let prevMod = [...prev]
                    const index = prev.findIndex(item => item.id === props.marker.id);
                    prevMod[index] = data.data;
                    return [...prevMod];
                });
                setShowEditMarker(false);
            },
            onError: (err) => {
                console.log(err);
                setShowEditMarker(false);
            },
        });
    };

    return (
        <div className='edit-form'>
            <MdClose
                size={"30px"}
                color='#808080'
                className='edit-form__close'
                onClick={() => setShowEditMarker(false)}
            ></MdClose>
            <h1>Editar marcador</h1>
            {props !== undefined &&
                <form onSubmit={handleSubmit} autoComplete={"off"}>
                    <div className='edit-form__titulo'>
                        <label htmlFor='titulo'>Título*</label>
                        <input
                            id='titulo'
                            type='text'
                            onChange={handleChange}
                            name='title'
                            value={formData.title}
                        />
                    </div>

                    <div className='edit-form__tipo'>
                        <label htmlFor='tipo'>Status*</label>
                        <div className='edit-form__tipo-buttons'>
                            <div className='edit-form__tipo__option'>
                                <input
                                    type='radio'
                                    id='JF'
                                    name='status'
                                    value='ja fui'
                                    onChange={handleChange}
                                    checked={formData.status === "ja fui"}
                                />
                                <label className='btn btn-default' htmlFor='JF'>
                                    Já fui
                                </label>
                            </div>
                            <div className='edit-form__tipo__option'>
                                <input
                                    type='radio'
                                    id='PL'
                                    name='status'
                                    value='planejado'
                                    onChange={handleChange}
                                    checked={formData.status === "planejado"}
                                />
                                <label className='btn btn-default' htmlFor='PL'>
                                    Planejado
                                </label>
                            </div>
                            <div className='edit-form__tipo__option'>
                                <input
                                    type='radio'
                                    id='QI'
                                    name='status'
                                    value='quero ir'
                                    onChange={handleChange}
                                    checked={formData.status === "quero ir"}
                                />
                                <label className='btn btn-default' htmlFor='QI'>
                                    Quero ir
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className='edit-form__datas'>
                        <div>
                            <label htmlFor='start_date'>Data de ida</label>
                            <input
                                id='start_date'
                                className='edit-form__datas__picker'
                                type='date'
                                name='start_date'
                                onChange={handleChange}
                                value={moment(formData.start_date).utc().format('YYYY-MM-DD')}
                            />
                        </div>
                        <div className='end_date'>
                            <label htmlFor='end_date'>Data de volta</label>
                            <input
                                id='end_date'
                                className='edit-form__datas__picker'
                                type='date'
                                name='end_date'
                                onChange={handleChange}
                                value={moment(formData.end_date).utc().format('YYYY-MM-DD')}
                            />
                        </div>
                    </div>

                    <div className="edit-form__images">
                        <div>
                            <h6>Fotos</h6>
                            <input
                                type='file'
                                id='input_image_edit'
                                accept='image/png, image/jpeg'
                                onChange={handleFileChange}
                                multiple
                            ></input>
                            <label htmlFor="input_image_edit">Adicionar fotos <BiCloudUpload className="upload-icon" size={'20px'}></BiCloudUpload></label>
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

                    <div className='edit-form__descricao'>
                        <label htmlFor='descricao'>Descrição</label>
                        <textarea
                            id='descricao'
                            value={formData.description}
                            onChange={handleChange}
                            name='description'
                        />
                    </div>

                    <button
                        style={{
                            backgroundColor: "#49B047",
                        }}
                    >
                        Salvar
                    </button>
                </form>
            }
        </div>
    )
}

export default EditMarker;