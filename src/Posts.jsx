import { useLocation, useParams } from "react-router-dom";
 
export default function Posts(){
    const urlstring = new URLSearchParams(useLocation().search);
    const fname = urlstring.get("fname");
    const lname= urlstring.get("lname");
    const {id}=useParams();
    return(
       <h1>This is Posts page Hello {fname} {lname} {id}</h1>
    );
}