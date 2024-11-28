import instance from "../apis/app";

class ExcelService {

    OC = () => instance.get('/API/ControladorOrdenCompra/Imprimir');
    OCExcel = () => instance.post('/API/ControladorExcel/OCA');
    Requests = () => instance.get('/API/ControladorOrdenCompra/Imprimir');
    Users = () => instance.get('/API/ControladorUsuario/Imprimir');
    SingleProvider = (data) => instance.post('/API/ControladorExcel/Proveedor', data, { headers: { 'Content-Type': 'multipart/form-data' } });
    CostCenter = (data) => instance.post('/API/ControladorExcel/CeCo', data, { headers: { 'Content-Type': 'multipart/form-data' } });
    BienServicio = (data) => instance.post('/API/ControladorExcel/BS', data, { headers: { 'Content-Type': 'multipart/form-data' } });


}

const Excels = new ExcelService();
export default Excels;