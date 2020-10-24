import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';

const Updates = () => {
    const {updates} = useContext(UserContext);
    const [update, setUpdates] = updates;

    const { register, handleSubmit, errors } = useForm();

    const onSubmit = (data, id) => {
        fetch(`http://localhost:5000/update/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(result => {
            console.log('updated');
        })
        if(data){
            document.getElementById('form-name').value = '';
        }
    };

    return (
        <section className="container-fluid">
            <div className="row justify-content-center">
                <div className="col-12 col-md-4">
                    
                    <form onSubmit={handleSubmit(onSubmit)} className="form pt-5 mb-3">
                        <div className="input-group">
                            <input id="form-name" defaultValue={update.name} name="name" className="form-control" placeholder="update your list"  ref={register({ required: true })} />
                                {errors.name && <span>This field is required</span>}
                            <div className="input-group-append">
                                <input type="submit" value="Update" className="btn btn-primary" />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Updates;