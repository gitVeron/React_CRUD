import { Component } from 'react';
import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';
import './app.css';

class App extends Component {
    constructor(props) {
        super();
        this.state = {
            data: [
                {name: 'John C.', salary: 800, increase: false, like: false, id: 1},
                {name: 'Alex M.', salary: 3000, increase: false, like: false, id: 2},
                {name: 'Carl W.', salary: 5000, increase: false, like: false, id: 3}
            ],
            term: "",
            filter: "all"
        }
        this.maxId = 4
    }

    deleteItem = (id) => {
        this.setState(({data}) =>{
            return {
                data: data.filter(item => item.id !== id)
            }
        })
    }

    addItem = (name, salary) => {
        const newItem = {name, salary, increase: false, like: false, id: this.maxId++}
        if (newItem.name.length < 3 || newItem.salary === "") {
            return;
        }
        this.setState(({data}) =>{
            const newArr = [...data, newItem];
            return {
                data: newArr
            }
        });
    }
    
    onToggleProp = (id, prop) => {
        this.setState(({data}) =>({
            data: data.map(item => {
                if (item.id === id) {
                    return {...item, [prop]: !item[prop]}
                } else {
                return item
                }
            })
        }));
    }

    searchEmp = (items, term) => {
        if (term.length === 0) {
            return items;
        }
        return items.filter(item => {
            return item.name.indexOf(term) > -1
        })
    }

    onUpdateSearch = (term) => {
        this.setState({term});
    }

    filterPost = (items, filter) => {
        switch (filter) {
            case "like":
                return items.filter(item => item.like);
            case "moreThen1000":
                return items.filter(item => item.salary > 1000);
            default:
                return items
        }
    }

    onFilterSelect = (filter) => {
        this.setState({filter});
    }

    onUpdateSalary = (id, salar) => {
          this.setState(({data}) =>({
            data: data.map(item => {
                if (item.id === id) {
                    return {...item, salary: salar}
                } else {
                return item
                }
            })
        }));
    }

    render() {
        const employees = this.state.data.length;
        const increased = this.state.data.filter(item => item.increase).length;
        const visibleData = this.filterPost(this.searchEmp(this.state.data, this.state.term), this.state.filter);
        return (
            <div className="app">
                <AppInfo employees={employees} increased={increased}/>
                <div className='search-panel'>
                    <SearchPanel onUpdateSrch={this.onUpdateSearch}/>
                    <AppFilter filter={this.state.filter} onFilt={this.onFilterSelect}/>
                </div>
                <EmployeesList data={visibleData} onDel={this.deleteItem} onToggProp={this.onToggleProp} onUpdSalary={this.onUpdateSalary}/>
                <EmployeesAddForm onAdd={this.addItem}/>
            </div>
        );
    }
}

export default App;