import { Alert, Snackbar, AlertTitle } from "@mui/material";
import { showAddFailState, showAddSuccessState } from '../../../../states/markers/atom';
import { useRecoilState } from 'recoil';

function AlertAdd() {
    const [showAddFail, setShowAddFail] = useRecoilState(showAddFailState);
    const [showAddSuccess, setShowAddSuccess] = useRecoilState(showAddSuccessState);

    return (
        <>
            <Snackbar open={showAddSuccess} >
                <Alert severity={"success"}
                    onClose={() => {
                        setShowAddSuccess(false);
                    }}>
                    <AlertTitle>{"Marcador adicionado"}</AlertTitle></Alert>
            </Snackbar>

            <Snackbar open={showAddFail} >
                <Alert severity={"error"}
                    onClose={() => {
                        setShowAddFail(false);
                    }}>
                    <AlertTitle>{"Erro ao adicionar marcador"}</AlertTitle></Alert>
            </Snackbar>

        </>
    )
}

export default AlertAdd;