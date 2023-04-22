import React, { useState, useEffect } from 'react'
import Table from "react-bootstrap/Table";
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { DLT,ADD,REMOVE } from "../redux/actions/action";


function CardsDetail() {

    const [data, setData] = useState([]);

    // to get item id
    const {id} = useParams();

    // to go to home toute after deleting
    const history = useNavigate();

    // to remove items
    const dispatch = useDispatch();

    const getdata =  useSelector((state)=> state.cartreducer.carts);     /// add to cart numbering 

    const compare = () => {
        let comparedata = getdata.filter((e)=> {
            return e.id == id
        });
        setData(comparedata)
    }

    // add data - increase quantity
    const send = (e)=>{
        dispatch(ADD(e));
    }

    const dlt = (id) =>{
        dispatch(DLT(id));
        history("/");
    }

    // remove one - decrement quantity
    const remove = (item)=>{
        dispatch(REMOVE(item))
    }
  
    useEffect(()=>{
        compare()
    },[id])

    return (
        <>
        <div className='container mt-2'>
            <h2 className='text-center'> Item Detail Page</h2>      
            <section className='container mt-4'>
                <div className='itemsdetails'>
                    {
                        data.map((ele)=>{
                            return (
                                <>
                                    <div className='items_img'>
                                    <img src={ele.imgdata} alt="img1" />
                                    </div>
                                    <div className='details'>
                                        <Table>
                                            <tr>
                                                <td>
                                                    <p> <strong> Restuarant : </strong> {ele.rname}</p>
                                                    <p> <strong> Price : </strong> ₹ {ele.price}</p>
                                                    <p> <strong> Dishes : </strong> {ele.address}</p>
                                                    <p> <strong> Total : </strong> ₹ {ele.price * ele.qnty} </p>

                                                    <div className='mt-5 d-flex justify-content-between align-items-center' style={{widht:100, cursor:"pointer", background:"#ddd", color:"#111"}}>
                                                        <span style={{fontSize:24}} onClick={ele.qnty <=1 ? ()=>dlt(ele.id) : ()=>remove(ele)}>-</span>
                                                        <span style={{fontSize:22}}>{ele.qnty}</span>
                                                        <span style={{fontSize:24}} onClick={()=>send(ele)}>+</span>
                                                    </div>

                                                </td>
                                                <td>
                                                    <p> <strong> Rating : </strong> <span style={{background:"green",color:"white", padding:"2px 5px", borderRadius:"5px"}}> {ele.rating} ★ </span> </p>
                                                    <p> <strong> Order Review : </strong> {ele.somedata} </p>
                                                    <p> <strong> Remove : </strong> <i className="fa-solid fa-trash" onClick={()=>dlt(ele.id)} style={{color:"red",fontSize:20, cursor:"pointer"}} ></i> </p>
                                                </td>
                                            </tr>
                                        </Table>
                                    </div>      
                                </>
                            )
                        })
                    }
                    
                </div>
            </section>  
        </div>
        </>
    )
}

export default CardsDetail