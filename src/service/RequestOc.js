import instance from "../apis/app";

class RequestOCService {

    get = () => instance.get('/API/ControladorTicket');
    post = (data) => instance.post('/API/ControladorTicket', data);
    update = (id, data) => instance.put(`/API/ControladorTicket/${id}`, data);
    getOC = (id) => instance.get(`/API/ControladorTicket/ListaOC/${id}`);
    Enable = (id, data) => instance.put(`/API/ControladorOrdenCompra/${id}`, data);
    delete = (id) => instance.delete(`/API/ControladorTicket/${id}`);
    deleteOC = (id) => instance.delete(`/API/ControladorOrdenCompra/${id}`)

}

const RequestOC = new RequestOCService();
export default RequestOC;