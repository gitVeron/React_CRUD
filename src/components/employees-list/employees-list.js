import EmployeesListItem from '../employees-list-item/employees-list-item';
import './employees-list.css';

const EmployeesList = ({data, onDel, onToggProp, onUpdSalary}) => {
    const elements = data.map(item => {
        const {id, ...itemProps} = item;
        return (
            <EmployeesListItem key={id} {...itemProps} onDelete={() => onDel(id)} onToggleProp={(e) => onToggProp(id, e.currentTarget.getAttribute('data-toggle'))} onUpdateSalary={(e) => onUpdSalary(id, e.target.value)}/>
        )
    })
    return (
        <ul className="app-list list-group">
            {elements}
        </ul>
    );
}

export default EmployeesList;