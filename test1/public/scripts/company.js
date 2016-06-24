var CompanyCreateForm = React.createClass({
    getInitialState: function () {
        return {name: '', mail: ''};
    },
    submitCompany: function () {
        $.ajax({
            url: '/api/company',
            dataType: 'json',
            type: 'POST',
            data: {name: this.state.name, mail: this.state.mail},
            success: function (data) {
                this.setState({result: data});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
        this.setState({name: '', mail: ''});
    },
    handleNameChange: function (e) {
        this.setState({name: e.target.value});
    },
    handleMailChange: function (e) {
        this.setState({mail: e.target.value});
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
                <input type="button" value="Create" onClick={this.submitCompany}/>
            </form>
        );
    }
});

var Company = React.createClass({
    render: function () {
        return (
            <div>
                <b>#{this.props.company._id}</b> {this.props.company.name} + <i>({this.props.company.mail})</i>
            </div>);
    }
});

var CompanyList = React.createClass({
    getInitialState: function () {
        return {companies: []};
    },
    componentDidMount: function () {
        this.loadCompaniesFromServer();
        setInterval(this.loadCompaniesFromServer, 2000);
    },
    loadCompaniesFromServer: function () {
        $.ajax({
            url: 'api/company',
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({companies: data});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    render: function () {
        var companies = this.state.companies.map(function (company) {
            return (<Company key={company._id} company={company}/>);
        });
        return (<div>{companies}</div>);
    }
});

ReactDOM.render(
    <div>
        <CompanyList />
        <CompanyCreateForm />
    </div>,
    document.getElementById('content')
);