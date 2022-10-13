import React from "react";
import { useState } from "react";


function Csvfilereader() {

const [csvfile, setCsvfile] = useState();
const [csvArray, setCsvArray] = useState([]);
// [{name: "", age: 0, rank: ""},{name: "", age: 0, rank: ""}]

const handleChange = () => {
    const file = csvfile;
    const reader = new FileReader();
    reader.onload = function(e) {
        const text = e.target.result; 
        console.log(text);
        processCSV(text)
    }
    reader.readAsText(file);
}

const processCSV = (str, delim=',') => {
    const headers = str.slice(0,str.indexOf('\n')).split(delim);
    const rows = str.slice(str.indexOf('\n')+1).split(('\n'));

    const newArray = rows.map(row => {
        const values = row.split(delim);
        const eachObject = headers.reduce((obj, header, i) => {
            obj[header] = values[i];
            return obj;
        }, {})
        return eachObject;
    })
    console.log(newArray);
    csvArray.push(...newArray)
    setCsvArray([...csvArray])
    console.log(csvArray);
}

    return(
        <>
        <div>
            <input onChange={(e) => {setCsvfile(e.target.files[0])}} className='form-control' type="file" accept=".csv" />  <br />
            <button className="btn btn-secondary" type="submit" 
                onClick={(e) => {e.preventDefault()
                if(csvfile)handleChange()}} > Submit
            </button>  
            <div>
                {csvArray.length>0 ? 
                    (<table className="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Score</th>
                                <th>Date</th>
                                <th>Remark</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                csvArray.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.Name}</td>
                                        <td>{item.Score}</td>
                                        <td>{item.Date}</td>
                                        <td>{item.Remark}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>)
             : (null)}
            </div>
        </div>
        </>
    );
}

export default Csvfilereader