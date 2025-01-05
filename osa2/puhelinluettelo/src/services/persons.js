import axios from "axios";

const getAll = async () => {
    try {
        const res = await axios.get('http://localhost:3001/persons');
        console.log(res);
        return res.data;
    }
    catch(e) {
        console.log(e)
    }
}

const addPerson = async (personObject) => {
    try {
        const res = await axios.post('http://localhost:3001/persons', personObject);
        console.log(res);
        return res.data;
    }
    catch(e) {
        console.log(e)
    }
}

const deletePerson = async (id) => {
    try {
        const res = await axios.delete(`http://localhost:3001/persons/${id}`);
        console.log(res);
        return res.data;
    }
    catch(e) {
        console.log(e)
    }
}

const updatePerson = async (id, data) => {
    try {
        const res = await axios.put(`http://localhost:3001/persons/${id}`, data);
        console.log(res);
        return res.data;
    }
    catch(e) {
        console.log(e)
    }
}

export default {getAll, addPerson, deletePerson, updatePerson};