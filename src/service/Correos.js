import instance from "../apis/app";

class CorreosService {

    post = () => instance.post('/API/ControladorEnviarCorreo/Liberadores');
    list = (data) => instance.post('/API/ControladorEnviarCorreo/VariosLiberadores', data);
    cotizar = (data) => instance.post('/API/ControladorEnviarCorreo/Proveedor', data, { headers: { 'Content-Type': 'multipart/form-data' } });
    contabilidad = (data) => instance.post('/API/ControladorEnviarCorreo/VariosReceptores', data);

}

const Correos = new CorreosService();
export default Correos;