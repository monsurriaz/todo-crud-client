import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import Nav from '../Nav/Nav';

const Updates = () => {
    const {updates} = useContext(UserContext);
    const [update] = updates;

    const { handleSubmit, errors } = useForm();
    const onSubmit = (data) => {console.log(data)}

    // const onSubmit = (data, id) => {
    //     fetch(`http://localhost:5000/update/${id}`, {
    //         method: 'PATCH',
    //         headers: { 'Content-Type': 'application/json'},
    //         body: JSON.stringify(data)
    //     })
    //     .then(res => res.json())
    //     .then(result => {
    //         console.log('updated');
    //         alert('Update successfully')
    //     })
    //     if(data){
    //         document.getElementById('form-name').value = '';
    //     }
    // };

    // const updateVolunteerInfo = () => {
    //     const name = document.getElementById('VolunteerName').value;
    //     const email = document.getElementById('VolunteerEmail').value;
    //     const eventTitle = document.getElementById('event').value;
    //     const eventDate = document.getElementById('date').value;

    //     const volunteerInfo = { name, email, eventTitle, eventDate }

    // }


    const handleUpdate = (id) => {
        const name = document.getElementById('name').value;
        const updated = {id, name};
        fetch(`https://fierce-brushlands-90552.herokuapp.com/update/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(updated)
        })
        .then(res => res.json())
        .then(result => {
            console.log('updated');
            alert('Update successfully');
        })
        if(updated){
            document.getElementById('name').value = '';
        }
    }

    return (
        <section className="container-fluid">
            <Nav></Nav>
            <div className="row justify-content-center">
                <div className="col-12 col-md-4">
                    <form onSubmit={handleSubmit(onSubmit)} className="form pt-5 mb-3">
                        <div className="input-group">
                            <input id="name" defaultValue={update.name} className="form-control" placeholder="update your list" />
                            {errors.name && <span>This field is required</span>}
                            <div className="input-group-append">
                                <button onClick={() => {handleUpdate(update._id)}} className="btn btn-primary">Submit</button>
                            </div>
                        </div>
                    </form>
                    
                </div>
            </div>
        </section>
    );
};

export default Updates;