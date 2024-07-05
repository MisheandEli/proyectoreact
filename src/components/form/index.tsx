import { IPerson, Person } from "../../interfaces/Person";
import { useDispatch, useSelector } from "react-redux";
import { PersonState, setData, setPersons } from '../../features/person/personSlice';
import { PersonService } from "../../services/person.service";
import Swal from "sweetalert2";
import { useState } from "react";

export const Form = () => {

    const { person } = useSelector((state:{ person: PersonState }) => state);
    
    const [ errorForm, setErrorForm ] = useState({
        nombre: false,
        direccion: false,
        telefono: false
    })

    const dispatch = useDispatch();

    const personService = new PersonService();
  
    const setFormValue = (event:React.ChangeEvent<HTMLInputElement>) => { 
        dispatch(setData({ ... person.data, [event.target.id]: event.target.value }))
	}

    const isValidForm = ( ) => {
   
        const error = { nombre: false, direccion: false, telefono: false }

        if(!person.data.nombre) error.nombre = true 
        if(!person.data.direccion) error.direccion = true; 
        if(!person.data.telefono) error.telefono = true; 

        setErrorForm(error) 

        return error.nombre || error.direccion || error.telefono;
    }

    const fetchUpdate = async (event:React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault() 
            const data:IPerson = await personService.put(person.data)
            // add item
            const dataArray:IPerson[] =  [...person.list]  
            // search index 
            let index:number = dataArray.findIndex((item:IPerson)=>item.id === data.id )
            // replace item 
            dataArray.splice(index, 1, data); 
            //update item
            dispatch(setPersons(dataArray))
            // for clean form
            dispatch(setData(new Person()))
 
            Swal.fire({ 
                icon: 'success',
                title: 'The data has been updated' 
            })
        } catch (error) {
            console.log(error)
        }
    }

    const fetchCreate = async (event:React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault() 
            // valid fields 
            if(isValidForm()) return null;

            const data:IPerson = await personService.post(person.data)
            // for clean form
            dispatch(setData(new Person()))
            // add item
            const dataArray:IPerson[] = [ ... person.list ]
            dataArray.push(data)
            dispatch(setPersons(dataArray))

            Swal.fire({ 
                icon: 'success',
                title: 'The data has been saved' 
            })
        } catch (error) {
            console.log(error)
        }
    }

    const inputCSS = "block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40 "
    const inputError ="border-red-400"
    
    return (
    <div className="px-8 py-4 pb-8 rounded-lg bg-gray-50">
 
        <form onSubmit={(e)=>person.data.id?fetchUpdate(e):fetchCreate(e)}>
            
            <div className="mt-4">
                <label className="mb-2  text-gray-800">Nombre</label>
                <input 
                    id="nombre"
                    type="text" 
                    placeholder="Artyom Developer"
                    value={person.data.nombre}
                    onChange={(e)=>setFormValue(e)}
                    className={errorForm.nombre?inputCSS+inputError:inputCSS } />
                    {errorForm.nombre && <p className="mt-1 text-m text-red-400">This is field is required</p>}  
            </div>

            <div className="mt-4">
                <label className="mb-2  text-gray-800">Direccion</label>
                <input 
                    id="direccion"
                    type="text" 
                    placeholder="California Cll 100"
                    value={person.data.direccion}
                    onChange={(e)=>setFormValue(e)}
                    className={errorForm.direccion?inputCSS+inputError:inputCSS } />
                    {errorForm.direccion && <p className="mt-1 text-m text-red-400">This is field is required</p>}  
            </div>

            <div className="mt-4">
                <label className="mb-2  text-gray-800">Telefono</label>
                <input 
                    id="telefono"
                    type="text" 
                    placeholder="88888888" 
                    value={person.data.telefono}
                    onChange={(e)=>setFormValue(e)}
                    className={errorForm.telefono?inputCSS+inputError:inputCSS } />
                    {errorForm.telefono && <p className="mt-1 text-m text-red-400">This is field is required</p>}  
            </div>

            <button className="w-full mt-8 bg-teal-600 text-gray-50 font-semibold py-2 px-4 rounded-lg">
                {person.data.id?"Save":"Create"}
            </button>
        </form>
    </div>
    )
}