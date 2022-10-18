import { useParams } from 'react-router-dom';
import { MEMBERS } from '../../constants';
import './Member.css';

function Member() {
    const params = useParams();
    const member = MEMBERS[params.index]
    return (
        <div className='members-root'>
            <div className='members-root-container'>
                <h3 id="name">{member.name}</h3>
                <p id="email">{member.email}</p>
                <p id="desc">{member.description.toString()}</p>
            </div>
        </div>
    );
}

export default Member;
