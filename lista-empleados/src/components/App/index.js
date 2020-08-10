import React from 'react';
import '../App/index.css';
import faker from 'faker'
import EmployeeCard from '../EmployeeCard'
import Form from '../Form';

class App extends React.Component {
    constructor() {
        super()
        //faker.seed(123);
        faker.locale = "es";
        const employees = Array.from({ length: 30 }, () => ({
            name: faker.name.findName(),
            sector: faker.name.jobArea(),
            avatar: faker.image.avatar(),
            id: faker.random.uuid(),
        }));

        //Obtain list of jobAreas
        const sectors = employees.map(({sector}) => sector);
        const sectoresUnrepeated = new Set(sectors);
        const sectorsArray = [...sectoresUnrepeated];

        this.state = {
            selectedSector: '',
            employees: employees,
            listBackup: employees,
            sectors: sectorsArray,
            empleadoDelMes: null,
            modalActive: false,
            employeeToEdit: null,
            idToEdit: null
        }
        this.handleEmpleadoMesClick = this.handleEmpleadoMesClick.bind(this) //Linea mounstrosa
        this.handleAddEmployeeSubmit = this.handleAddEmployeeSubmit.bind(this) //Linea mounstrosa
        this.handleAddEmployeeChange = this.handleAddEmployeeChange.bind(this) //Linea mounstrosa
        this.handleDeleteEmployeeClick = this.handleDeleteEmployeeClick.bind(this) //Linea mounstrosa
    }

    handleDeleteEmployeeClick = (id) =>
    {
        const {employees} = this.state;
        let newList = employees.filter(obj => obj.id != id);
        this.setState({employees: newList});
    }

    handleEditEmployeeChange = event =>
    {
        const {value} = event.target;
        this.setState({employeeToEdit: value});
    }

    //nuevo clase 2 de julio
    handleAddEmployeeChange = event => 
    {
        const {value} = event.target;
        this.setState({ employeeName: value});
    }

    handleEmployeeEditClick = (id) =>
    {
        const {employees} = this.state;
        const employee = employees.find((employee)=>employee.id === id);
         this.setState({modalActive: true, employeeToEdit: employee.name, idToEdit: employee.id});
    }

    handleEmployeeUpdateClick = () =>
    {
        const {employeeToEdit, idToEdit} = this.state;
        const {employees} = this.state;
        employees.forEach((employee)=>
        {
            if(employee.id == idToEdit)
            {
                employee.name = employeeToEdit;
            }
        });
        this.setState({employees: employees, modalActive: false});
    }

    handleModalClose = (event) =>
    {
         this.setState({modalActive: false});
    }

    //nuevo clase 2 de julio
    handleAddEmployeeSubmit = event =>
    {
        event.preventDefault();
        const {employees, employeeName} = this.state;

        const newEmployee = {
            name: employeeName,
            sector: faker.name.jobArea(),
            avatar: faker.image.avatar(),
            id: faker.random.uuid(),
        }
        const newList = [newEmployee, ...employees];
        this.setState({employees: newList})
    }

    //nuevo clase 2 de julio
    handleDropdownActive = () =>
    {
        this.setState(prevState => ({dropdownActive: !prevState.dropdownActive}));
    }

    //nuevo clase 2 de julio
    handleSelectSector = sector =>
    {
        const {listBackup} = this.state;
        const listFilteredBySector = listBackup.filter(employee => employee.sector === sector);
        this.setState({
                selectedSector: sector,
                employees: listFilteredBySector,
                dropdownActive: false,
        });
    }

    handleRemoveSelectedSector = () =>
    {
        this.setState(prevState => ({ employees: prevState.listBackup, selectedSector: ''}));
    }

    handleEmpleadoMesClick(employeeId){
       
        //setear el estado diciendo cual es el id del empleado del mes
        this.setState({
            empleadoDelMes:employeeId
        })
        console.log('parametro',employeeId)
        setTimeout(() => {
            console.log('state',this.state.empleadoDelMes)
            
        }, 1);
    }

    render() {
        const {
            newEmployee,
            employees,
            idMonthEmployee,
            dropdownActive,
            sectors,
            selectedSector,
            modalActive,
            employeeToEdit,
            idToEdit
        } = this.state

        return (
            <div className='container'>
                <h1 className='is-size-1'>Lista de Empleados</h1>

                <Form handleAddEmployeeChange={this.handleAddEmployeeChange} handleAddEmployeeSubmit={this.handleAddEmployeeSubmit} newEmployee={this.state.employeeName}/>

                <Dropdown 
                    sectors={sectors}
                    dropdownActive={dropdownActive}
                    selectedSector={selectedSector}
                    onSelectSector={this.handleSelectSector}
                    onDropdownActive={this.handleDropdownActive}
                    onRemoveSelectedSector={this.handleRemoveSelectedSector}
                />

                {modalActive && (
                    <div className='modal is-active'>
                        <div className='modal-background' />
                        <div className='modal-card'>
                            <header className='modal-card-head'>
                                <p className='modal-card-title'>Modal title</p>
                                <button className='delete' aria-label='close' onClick={this.handleModalClose}/>
                            </header>
                            <section className='modal-card-body'>
                                <form className='form-add-employee'>
                                    <input
                                        className='input'
                                        type='text'
                                        value={this.state.employeeToEdit}
                                        onChange={this.handleEditEmployeeChange}
                                    />
                                </form>
                            </section>
                            <button className='button is-primary' onClick={this.handleEmployeeUpdateClick}>
                            <span className='icon is-small'>
                                <i className='fas fa-edit' />
                            </span>
                            <span>Editar</span>
                            </button>
                        </div>
                    </div>
                )}

                {
                    this.state.employees.map((employee) =>
                        <EmployeeCard
                        handleEmployeeEditClick={this.handleEmployeeEditClick}
                        handleDeleteEmployeeClick={this.handleDeleteEmployeeClick} 
                        employeeData={employee} 
                        key={employee.id} 
                        handleEmpleadoMesClick={this.handleEmpleadoMesClick} 
                        empleadoDelMesID = {this.state.empleadoDelMes}
                        />
                    )
                }
            </div>
        )
    }
}

const Dropdown = props => {
    const {sectors, dropdownActive, onDropdownActive, onSelectSector, onRemoveSelectedSector, selectedSector} = props;
    return (
        <div>
            <div className={`dropdown ${dropdownActive === true ? 'is-active' : ''}`}>
                <div className='dropdown-trigger'>
                    <button
                        className='button'
                        aria-haspopup='true'
                        aria-controls='dropdown-menu'
                        onClick={onDropdownActive}>
                        <span>Elegir sector</span>
                        <span className='icon is-small'>
                            <i className='fas fa-angle-down' aria-hidden='true' />
                        </span>
                    </button>
                </div>
                <div className='dropdown-menu' id='dropdown-menu' role='menu'>
                    <div className="dropdown-content">
                        {
                            sectors.map((job) => <a href="#" className="dropdown-item" onClick={()=>onSelectSector(job)}>{job}</a>)
                        }
                    </div>
                </div>
            </div>


            {selectedSector != "" && (<button
                className='button'
                aria-haspopup='true'
                aria-controls='dropdown-menu'
                style={{ marginLeft: '15px' }}
                onClick={onRemoveSelectedSector}
            >
                <span>{selectedSector}</span>
                <span className='icon is-small'>
                    <i className='fas fa-trash-alt' aria-hidden='true' />
                </span>
            </button>)}

        </div>
    )
}

export default App;
