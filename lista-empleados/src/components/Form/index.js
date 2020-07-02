import React from 'react';
const Form = props =>
{
    const {newEmployee, handleAddEmployeeSubmit, handleAddEmployeeChange} = props;
    return (<form onSubmit={handleAddEmployeeSubmit} className='form-add-employee'>
            <input
            className='input'
            type='text'
            value={newEmployee}
            onChange={handleAddEmployeeChange} />
                <button className="button" type='submit'>Agregar empleado</button>
    </form>)
}

export default Form;
