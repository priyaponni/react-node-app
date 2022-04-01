import { useEffect, useState } from "react";

import { connect } from 'react-redux';

export default function ShowData(props) {
    const [data, setData] = useState('');

    useEffect(async () => {
        const response = await fetch('http://localhost:8000/api/hello', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        console.log(response);
        const responseObj = await response.json();
        console.log(responseObj);
        if(response.ok) {
            setData(responseObj.data);
        } else {
            console.log('error');
        }
    }, [])

    return (
        <div>
            {data}
        </div>
    )
}

// export default connect(mapStateToProps)(ShowData);