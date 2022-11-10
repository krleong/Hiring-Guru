import './ManageRoles.css';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';

const Roles = [
    {
        title: "Software Engineer",
        expectations: "Write and test product or system development code." +
            " Participate in, or lead design reviews with peers and stakeholders" +
            " to decide amongst available technologies. Review code developed by" +
            " other developers and provide feedback to ensure best practices" +
            " (e.g., style guidelines, checking code in, accuracy, testability," +
            " and efficiency). Contribute to existing documentation or educational" +
            " content and adapt content based on product/program updates and user " +
            "feedback. Triage product or system issues and debug/track/resolve" +
            " by analyzing the sources of issues and the impact on hardware, " +
            "network, or service operations and quality.",
        benefits: "Beyond competitive pay, you can receive incentive awards for" +
            " your performance. Other great perks include 401(k) match, stock" +
            " purchase plan, paid maternity and parental leave, PTO, multiple" +
            " health plans, and much more."
    },
    {
        title: "Software Engineer",
        expectations: "Participate in, or lead design reviews with peers and stakeholders" +
            " to decide amongst available technologies ",
        benefits: "Beyond competitive pay, you can receive incentive awards for your performance." +
            " Other great perks include 401(k) match, stock purchase plan, paid maternity and" +
            " parental leave, PTO, multiple health plans, and much more."
    }
]

const columns = [{
    dataField: 'title',
    text: 'Title'
}, {
    dataField: 'expectations',
    text: 'Expectations'
}, {
    dataField: 'benefits',
    text: 'Benefits'
}];

export function ManageRoles() {
    const { SearchBar } = Search;
    return (
        <div className={"page-container"}>
            <div>
                <ToolkitProvider
                    keyField="id"
                    data={ Roles }
                    columns={ columns }
                    search
                >
                    {
                        props => (
                            <div>
                                <h3>Input something at below input field:</h3>
                                <SearchBar { ...props.searchProps } />
                                <hr />
                                <BootstrapTable
                                    { ...props.baseProps }
                                />
                            </div>
                        )
                    }
                </ToolkitProvider>
            </div>
        </div>
    )
}