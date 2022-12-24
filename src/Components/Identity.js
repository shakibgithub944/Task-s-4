import React, { useEffect, useState } from 'react';

const Identity = () => {
    const [Sectors, setSectors] = useState([])

    const [name, setName] = useState('')
    const [sector, setSector] = useState('')
    const [checked, setChecked] = useState(false)

    const [edit, setEdit] = useState({})
    const [id, setId] = useState('')

    useEffect(() => {
        fetch('http://localhost:5000/sector')
            .then(res => res.json())
            .then(data => {
                setSectors(data);
            })

    }, [])

    // console.log(name, sector, checked);

    const handleFormDetails = (e) => {
        e.preventDefault()
        // const form = e.target;
        // const name = form.name.value;
        // const sector = form.sector.value;
        const user = {
            name,
            sector,
            AgreeToTerms: checked
        }
        console.log(user);

        fetch(`http://localhost:5000/user`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                setId(data.insertedId)
                fetch(`http://localhost:5000/editUser/${data.insertedId}`)
                    .then(res => res.json())
                    .then(data => {
                        // console.log(data);
                        setEdit(data)
                        alert(' Successfully user added')
                    })

            })
    }


    const handleUpdateDetails = (e) => {
        e.preventDefault()
        // const form = e.target;
        // const name = form.name.value;
        // const sector = form.sector.value;
        const user = {
            name,
            sector,
            AgreeToTerms: checked
        }
        console.log(user);

        fetch(`http://localhost:5000/UpdatedUser/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.acknowledged) {
                    alert('Your Profile updated')
                    setName('')
                    setSector('')
                    setChecked(false)
                }
            })
            .catch(err => {
                alert('before update you need to saved it.')
            })

    }


    return (
        <div className='form'>
            {/* <h3>Please enter your name and pick the Sectors you are currently involved in.</h3> */}
            <div className=''>
                <div >

                    <label htmlFor="fname">Name:</label><br />
                    <input type="text" defaultValue={edit.name} onChange={(e) => setName(e.target.value)} id="name" name="name" required /><br />

                    <label htmlFor="cars">Sectors:</label>
                    <select id="cars" name="sector" onChange={(e) => setSector(e.target.value)} >
                        {
                            edit && <option>{edit.sector}</option>
                        }
                        {
                            Sectors.map((sector, idx) => <option key={idx}>{sector.sector}</option>)
                        }
                    </select> <br />

                    <input type="checkbox" onChange={(e) => setChecked(e.target.checked)} id="vehicle1" name="check" checked={checked} />
                    <label htmlFor="vehicle1">Agree to terms</label><br />
                    <input type="submit" onClick={handleFormDetails} disabled={!checked} value="Save" />
                    <input type="submit" onClick={handleUpdateDetails} disabled={!checked} value="Update" />
                </div>
            </div>

            {/* <div className=''>
                <form onSubmit={handleUpdateDetails} >

                    <label htmlFor="fname">Name:</label><br />
                    <input type="text" defaultValue={edit.name} id="name" name="name" required /><br />

                    <label htmlFor="cars">Sectors:</label>
                    <select id="cars" name="sector">
                        <option>{edit.sector}</option>
                        {
                            Sectors.map((sector, idx) => <option key={idx}>{sector.sector}</option>)
                        }
                    </select> <br />

                    <input type="checkbox" onChange={(e) => setChecked(e.target.checked)} id="vehicle1" name="check" checked={checked} />
                    <label htmlFor="vehicle1">Agree to terms</label><br />
                    <input type="submit" value="Update" />
                </form>
            </div> */}

        </div>
    );
};

export default Identity;