const API_COMPANY_URL = "/api/company";

/**
 * Create company form
 */
var CompanyCreateForm = React.createClass({
    getInitialState() {
        return {name: '', mail: ''};
    },
    handleNameChange(e) {
        this.setState({name: e.target.value});
    },
    handleMailChange(e) {
        this.setState({mail: e.target.value});
    },
    createCompany() {
        this.props.createCompany(this.state);
        this.setState({name: '', mail: ''});
    },
    render() {
        return (
            <div>
                <input
                    type="text"
                    placeholder="Name"
                    value={this.state.name}
                    onChange={this.handleNameChange}
                />
                <input
                    type="text"
                    placeholder="Mail"
                    value={this.state.mail}
                    onChange={this.handleMailChange}
                />
                <input type="button" value="Create" onClick={this.createCompany}
                       disabled={!(this.state.name && this.state.mail)}/>
            </div>
        );
    }
});

/**
 * Company display
 */
var Company = React.createClass({
    render() {
        return (
            <li>
                <b>#{this.props.company._id}</b> {this.props.company.name} <i>({this.props.company.mail})</i>
            </li>);
    }
});

/**
 * Company list
 */
var CompanyList = React.createClass({
    render() {
        var companies = this.props.companies.map(function (company) {
            return (<Company key={company._id} company={company}/>);
        });
        return (<ul>{companies}</ul>);
    }
});

/**
 * Company element (existing entries + create form)
 */
var CompanyDisplay = React.createClass({
    getInitialState() {
        return {companies: []};
    },
    componentDidMount() {
        this.loadCompaniesFromServer();
    },
    loadCompaniesFromServer() {
        $.ajax({
            url: API_COMPANY_URL,
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({companies: data});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(API_COMPANY_URL, status, err.toString());
            }.bind(this)
        });
    },
    submitCompany(company) {
        $.ajax({
            url: API_COMPANY_URL,
            dataType: 'json',
            type: 'POST',
            data: company,
            success: function (data) {
                this.loadCompaniesFromServer();
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(API_COMPANY_URL, status, err.toString());
            }.bind(this)
        });
        this.setState({name: '', mail: ''});
    },
    render() {
        return (
            <div>
                <h1>Company</h1>
                <CompanyList companies={this.state.companies}/>
                <CompanyCreateForm createCompany={this.submitCompany}/>
            </div>
        );
    }
});

ReactDOM.render(<CompanyDisplay />, document.getElementById('content'));