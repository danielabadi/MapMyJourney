import { Alert, Snackbar, AlertTitle } from "@mui/material";
import { showEditFailState, showEditSuccessState } from "../../../../states/editmarker/atom";
import { useRecoilState } from 'recoil';

function AlertEdit() {
    const [showEditFail, setShowEditFail] = useRecoilState(showEditFailState);
    const [showEditSuccess, setShowEditSuccess] = useRecoilState(showEditSuccessState);

    return (
        <>
            <Snackbar open={showEditSuccess} >
                <Alert severity={"success"}
                    onClose={() => {
                        setShowEditSuccess(false);
                    }}>
                    <AlertTitle>{"Marcador editado"}</AlertTitle></Alert>
            </Snackbar>

            <Snackbar open={showEditFail} >
                <Alert severity={"error"}
                    onClose={() => {
                        setShowEditFail(false);
                    }}>
                    <AlertTitle>{"Erro ao editar marcador"}</AlertTitle></Alert>
            </Snackbar>

        </>
    )
}

export default AlertEdit;