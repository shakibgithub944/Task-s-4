import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast'

const Identity = () => {
    const [Sectors, setSectors] = useState([])

    const [name, setName] = useState('')
    const [sector, setSector] = useState('')
    const [checked, setChecked] = useState(false)

    const [edit, setEdit] = useState('')
    const [id, setId] = useState('')

    useEffect(() => {
        fetch('https://task-s-4-server.vercel.app/sector')
            .then(res => res.json())
            .then(data => {
                setSectors(data);
            })

    }, [])

    const handleFormDetails = (e) => {

        if (name === '' || sector === '') {
            return toast.error('Please fill up all input.')

        }
        const user = {
            name,
            sector,
            AgreeToTerms: checked
        }

        fetch(`https://task-s-4-server.vercel.app/user`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                setId(data.insertedId)
                fetch(`https://task-s-4-server.vercel.app/editUser/${data.insertedId}`)
                    .then(res => res.json())
                    .then(data => {
                        setEdit(data)
                        toast.success('Request Successfull.')
                    })

            })
    }

    const handleUpdateDetails = (e) => {

        if (name === '' || sector === '') {
            return toast.error('Please fill up all input.')

        }
        const user = {
            name,
            sector,
            AgreeToTerms: checked
        }

        fetch(`https://task-s-4-server.vercel.app/UpdatedUser/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast.success('Information Updated.')
                    setChecked(false)
                }
            })
            .catch(err => {
                toast.error('Before update you need to saved it.')
            })

    }

    return (
        <div className='Page'>
            <div className='form'>
                <h3>Please enter your name and pick the Sectors you are currently involved in.</h3>
                <div>

                    <label htmlFor="name">Name:</label><br />
                    <input className='input-item' type="text" defaultValue={edit.name} onChange={(e) => setName(e.target.value)} id="name" name="name" required /><br />

                    <label htmlFor="">Sectors:</label>
                    <select className='input-item' name="sector" onChange={(e) => setSector(e.target.value)} >
                        <option className='option' value="">Please select a sector</option>
                        {
                            edit && <option>{edit.sector}</option>
                        }
                        {
                            Sectors.map((sector, idx) => <option key={idx}>{sector.sector}</option>)
                        }
                    </select> <br />

                    <input className='check-box' type="checkbox" onChange={(e) => setChecked(e.target.checked)} id="vehicle1" name="check" checked={checked} />
                    <label htmlFor="vehicle1">Agree to terms</label><br />
                    <input className='btn' type="submit" onClick={handleFormDetails} disabled={!checked} value="Save" />
                    <input className='btn' type="submit" onClick={handleUpdateDetails} disabled={!checked} value="Update" />
                </div>
            </div>
        </div>
    );
};

export default Identity;