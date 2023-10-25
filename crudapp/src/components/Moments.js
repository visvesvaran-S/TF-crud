import axios from "axios";
import "../styles/Moments.css";
import React, { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineMenu } from "react-icons/ai";
import { BiEditAlt} from "react-icons/bi";
import { FiChevronDown,FiLogOut  } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

function Moments() {
  const [momentUserData, setmomentUserData] = useState([])
  const navigate = useNavigate();
  const handlemoment = () => {
    navigate("/addmoments");
  };

  const getuser = () => {
    axios
      .get("http://localhost:3004/api/getUser")
      .then(function (response) {
        setmomentUserData(response.data.data)
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }
console.log(momentUserData);
  useEffect(() => {
    getuser()
  }, []);

  const handleNaviateEdit = (e,userid) => {
    navigate(`/edtimoments/${userid}`)
  }

  const handleDelete = (e,userid) => {
    console.log(userid);
    axios
    .delete(`http://localhost:3004/api/Deleteuser/${userid}`)
    .then(function (response) {
      getuser();
      Swal.fire(response.data.message)
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
  }
  const handleLogout = ()=>{
    navigate("/");
  }

  return (
    <div>
      <div className=" flex h-screen w-full">
        <div className="h-screen w-80	 shadow-xl ">
          <div className=" mt-32">
            <div className="ml-10"> Profile</div>
            <div className="flex justify-between  mt-6 bg-slate-900 border-2 p-3">
              <div className="ml-10 text-slate-100 text-xl font-bold">

                Moments
              </div>
              <span className="pt-1.5 mr-3 text-slate-100">

                <FiChevronDown />
              </span>
            </div>

            <div className="flex flex-col ml-20">
              <span className="my-3">Momentlist</span>
              <span className="cursor-pointer" onClick={handlemoment}>
                Add new moment
              </span>
            </div>
          </div>
        </div>
        <div className="w-11/12">
          <div>
            <div className="h-12 w-full   flex justify-between border-2">
              <div className="p-2">

                <AiOutlineMenu className="text-3xl " />
              </div>
              <div className="flex p-2x mr-3">
                <span className="mr-3 pt-1.5 cursor-pointer" onClick={handleLogout}>
                    < FiLogOut className="text-2xl"/>
                  {/* <img
                    className="w-8 h-8 object-cover rounded-full border-2 "
                    src=""
                    alt="N"
                  /> */}
                </span>
                <span className="pt-1.5">
                  <FiChevronDown />
                </span>
              </div>
            </div>

            <div className="h-12 p-3 text-xl font-bold w-full border-2 border-t-0 ">
              <span className=""> Momentslist</span>
            </div>
          </div>

          <div className=" m-5 p-3  h-3/4  shadow-xl border-2   overflow-auto	 ">
            <table className=" table  w-full text-left">
              <thead>
                <tr>
                  <th>Si.no</th>
                  <th>image</th>
                  <th>Title</th>
                  <th>tags</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {momentUserData?.map((user,index) => {
                  return(
                    <tr className='border-b-2'>
                    <td className='p-2 w-36'>{index+1}</td>
                    <td className='p-2 w-52'><span> <img className='w-14 h-14 rounded-full border border-gray-700' src={user?.image ? user?.image : null} alt="N" /> </span></td>
                    <td className='w-72'>{user?.title ? user?.title : null}</td>
                    <td>{user?.tag ? user?.tag : null}</td>
                    <td className='w-52'>
                      <button className="" onClick={(e)=>handleNaviateEdit(e,user._id)}> < BiEditAlt className='text-2xl font-bold' /> </button>
                      <button className=" ml-2" onClick={(e)=>handleDelete(e,user._id)}> < AiOutlineDelete className='text-2xl font-bold' /> </button>
  
                    </td>
                  </tr>
                  )
                })}
                
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Moments;
