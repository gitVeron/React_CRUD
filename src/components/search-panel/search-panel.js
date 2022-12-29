import { Component } from 'react';
import './search-panel.css';

class SearchPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            term: ''
        }
    }

    onUpdSearch = (e) => {
        const trm = e.target.value;
        this.setState({term: trm});
        this.props.onUpdateSrch(trm);
    }

    render() {
        return (
            <input
                type="text"
                className="form-control search-input"
                placeholder="Найти сотрудника"
                value={this.state.term}
                onChange={this.onUpdSearch}/>
        );
    }
}

export default SearchPanel;