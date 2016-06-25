const API_COMPANY_URL = "/api/company";

/**
 * Create company form
 */
var CompanyCreateForm = React.createClass({
    getInitialState: function () {
        return {name: '', mail: ''};
    },
    handleNameChange: function (e) {
        this.setState({name: e.target.value});
    },
    handleMailChange: function (e) {
        this.setState({mail: e.target.value});
    },
    createCompany: function () {
        this.props.createCompany(this.state);
        this.setState({name: '', mail: ''});
    },
    render: function () {
        return (
            <form className="commentForm">
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
                <input type="button" value="Create" onClick={this.createCompany}/>
            </form>
        );
    }
});

/**
 * Company display
 */
var Company = React.createClass({
    render: function () {
        return (
            <div>
                <b>#{this.props.company._id}</b> {this.props.company.name} + <i>({this.props.company.mail})</i>
            </div>);
    }
});

/**
 * Company list
 */
var CompanyList = React.createClass({
    render: function () {
        var companies = this.props.companies.map(function (company) {
            return (<Company key={company._id} company={company}/>);
        });
        return (<div>{companies}</div>);
    }
});

/**
 * Company element (existing entries + create form)
 */
var CompanyDisplay = React.createClass({
    getInitialState: function () {
        return {companies: []};
    },
    componentDidMount: function () {
        this.loadCompaniesFromServer();
    },
    loadCompaniesFromServer: function () {
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
    submitCompany: function (company) {
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
    render: function () {
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