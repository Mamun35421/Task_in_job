import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const EmpEdit = () => {
    const { empid } = useParams();



    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users" +empid)
        .then((res) => {
            return res.json();
        }).then((resp) => {
            idchange(resp.id);
            namechange(resp.name);
            sectorchange(resp.sector);
         
            activechange(resp.isactive);
        }).catch((err) => {
            console.log(err.message);
        })
    }, []);

    const[id,idchange]=useState("");
    const[name,namechange]=useState("");
    const[sector,sectorchange]=useState("");
    const[active,activechange]=useState(true);
 


    const navigate=useNavigate();

    const handlesubmit=(e)=>{
      e.preventDefault();
      const empdata={id,name,sector,active};
      

      fetch("http://localhost:8000/candidatelisting/"+empid,{
        method:"PUT",
        headers:{"content-type":"application/json"},
        body:JSON.stringify(empdata)
      }).then((res)=>{
        alert('Successfully Edit.')
        navigate('/');
      }).catch((err)=>{
        console.log(err.message)
      })

    }
    return ( 
        <div>

        <div className="row">
            <div className="offset-lg-3 col-lg-6">
                <form className="container" onSubmit={handlesubmit}>

                    <div className="card" style={{"textAlign":"left"}}>
                        <div className="card-title">
                            <h2>Employee Edit</h2>
                        </div>
                        <div className="card-body">

                            <div className="row">

                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>ID</label>
                                        <input value={id} disabled="disabled" className="form-control"></input>
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Name</label>
                                        <input required value={name} onChange={e=>namechange(e.target.value)} className="form-control"></input>
                                    
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Sector</label>
                                        
                                    <select class="form-select" value={sector}  onChange={e=>sectorchange(e.target.value)} className="form-control" >
                                       <option selected>Select Your Sector</option>
                                       <option>Front-end Developer</option>
                                       <option>Back-end Developer</option>
                                       <option>Fullstack Developer</option>
                                    </select>

                                       
                                        </div>
                                    </div>

                    

                                <div className="col-lg-12">
                                    <div className="form-check">
                                    <input checked={active} onChange={e=>activechange(e.target.checked)} type="checkbox" className="form-check-input"></input>
                                        <label  className="form-check-label">Is Active</label>
                                        
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="form-group">
                                       <button className="btn btn-success" type="submit">Save</button>
                                       <Link to="/" className="btn btn-danger">Back</Link>
                                    </div>
                                </div>

                            </div>

                        </div>

                    </div>

                </form>

            </div>
        </div>
    </div>
     );
}
 
export default EmpEdit;