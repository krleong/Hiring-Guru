import './MembersList.css';
import {MEMBERS} from '../../constants'

function MembersList() {
    return (
        <div className='members-list-comp-root'>
            <div className='members-list-container'>
                <h2>Here's the list of engineers working on Hiring Guru</h2>
                <ul key={'spajksndjkansd'}>
                    {MEMBERS.map((member, index) => {
                        return (
                            <li key={'member'+index.toString()}>
                                <a href={`/about/members/${index}/detail`}>{member.name}</a>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    );
}

export default MembersList;
