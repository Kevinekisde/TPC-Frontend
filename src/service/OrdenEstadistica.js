import instance from "../apis/app";

class OrdenEstadisticaService {

    list = () => instance.get('/API/ControladorOrdenesEstadisticas');
    create = (data) => instance.post('/API/ControladorOrdenesEstadisticas', data);
    update = (id, data) => instance.put(`/API/ControladorOrdenesEstadisticas/${id}`, data);
    delete = (id, data) => console.log(id, data) || instance.post(`/API/ControladorOrdenesEstadisticas/${id}`, data);


}

const OrdentEstadistica = new OrdenEstadisticaService();
export default OrdentEstadistica;