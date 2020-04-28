import React from 'react'
import axios from 'axios'

const baseURL = 'http://localhost:3001/persons'

const getContacts = () =>{
    const request = axios.get(baseURL)
    return request.then(response => response.data)
}

const addContact = (newContact) =>{
    const request = axios.post(baseURL, newContact)
    return request.then(response => response.data)
}

const deleteContact =(contactID) =>{
    const toDelete = `${baseURL}/${contactID}`
    const request = axios.delete(toDelete)
    return request.then(response => response.data)
}

const updateContact = (id,newObject) =>{
    const request = axios.put(`${baseURL}/${id}`,newObject)
    return request.then(response => response.data);
}

export default{
    getContacts: getContacts,
    addContact: addContact,
    deleteContact: deleteContact,
    updateContact: updateContact
}