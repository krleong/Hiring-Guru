import { useParams } from 'react-router-dom';
import { MEMBERS } from '../../constants';
import './Member.css';

function Member() {
    const params = useParams();
    const member = MEMBERS[params.index]
    return (
        <div className='members-root'>
            <div className='members-root-container'>
                <h3>{member.name}</h3>
                <p>{member.email}</p>
                <p>{member.description.toString()}</p>
            </div>
        </div>
    );
}

export default Member;
