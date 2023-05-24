import axios from 'axios';

const EMPLOYEE_API_BASE_URL = "http://localhost:8000/api";
const url_comment="http://127.0.0.1:8000/comment";
class EmployeeService {

    getEmployees(){
        return axios.get(EMPLOYEE_API_BASE_URL+'/all');
    }

    createEmployee(employee){
        return axios.post(EMPLOYEE_API_BASE_URL+'/post', employee);
    }

    getEmployeeById(employeeId){
        return axios.get(EMPLOYEE_API_BASE_URL + '/get/' + employeeId);
    }

    updateEmployee(employee, employeeId){
        return axios.put(EMPLOYEE_API_BASE_URL + '/update/' + employeeId, employee);
    }

    deleteEmployee(employeeId){
        return axios.delete(EMPLOYEE_API_BASE_URL + '/delete/' + employeeId);
    }
    deleteCom(comId) {
        return axios.delete(url_comment + '/delete/' + comId);
      }
    createComment(com){
        return axios.post(url_comment+'/post', com);
    }
    getCommentById(employeeId){
        return axios.get(url_comment+'get/'+employeeId);
    }


}

export default new EmployeeService()