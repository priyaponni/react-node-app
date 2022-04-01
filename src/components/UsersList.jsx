
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

export default function UsersList(props) {
    const [data, setData] = useState([]);

    const getUsersTable = () => {
        console.log(data);
        let trows = data.map((user) => {
            return (
                <tr>
                    <td> <Link to={`/users/${user.id}`}> {user.name} </Link></td>
                    <td> {user.id} </td>
                </tr>
            )
        })
        return (
            <table>
                <tbody>
                    {trows}
                </tbody>
            </table>
        )
    }

    useEffect(async () => {
        const response = await fetch('http://localhost:8000/api/users', {
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
            {getUsersTable()}
        </div>
    )
}