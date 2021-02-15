import React from 'react';
import { useSelector } from "react-redux";

function TableRow({dish,index}) {
    const user = useSelector(state => state.user.currentUser);
    //setting highlight class
    var Class ="";
    if(user.likedDishes.includes(dish.id)){
        Class = "tr-s";
       
    }else{
        Class = " ";
    }
    return (
        <>
            <tbody>
                <tr className={Class}>
                    <td>{index+1}</td>
                    <td>{dish.name}</td>
                    <td>{dish.votes} </td>
                    <td>{dish.createdBy}</td>
                </tr>
            </tbody>
        </>
    )
}

export default TableRow;
