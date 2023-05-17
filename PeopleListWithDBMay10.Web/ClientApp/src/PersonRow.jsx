import React from 'react';

export default function PersonRow({firstName, lastName, age, onEditClicked, onDeleteClicked}) {

        return (<>
            <tr>
                <td>{firstName}</td>
                <td>{lastName}</td>
                <td>{age}</td>
                <td> <button className='btn btn-warning' onClick={onEditClicked}>Edit</button>
                    <button className='btn btn-danger' onClick={onDeleteClicked}>Delete</button> </td>
            </tr>
        </>);
    

};

