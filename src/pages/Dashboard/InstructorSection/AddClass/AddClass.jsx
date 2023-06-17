import Swal from "sweetalert2";
import useAuth from "../../../../Hooks/useAuth";


const AddClass = () => {

    const { user } = useAuth();

    const handleAddClass = (event) => {
        event.preventDefault();

        const form = event.target;

        const className = form.className.value;
        const image = form.classImage.value;
        const instructorName = form.instructorName.value;
        const instructorEmail = form.instructorEmail.value;
        const availableSeats = parseInt(form.availableSeats.value);
        const price = parseInt(form.price.value);


        const newClass = { className, image, instructorName, instructorEmail, availableSeats, price }

        console.log(newClass);

        fetch('http://localhost:5000/classes', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newClass)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.insertedId) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'New class added successfully',
                        icon: 'success',
                        confirmButtonText: 'Ok'
                    });
                    form.reset();
                }
            })
    }

    return (
        <div className="px-16 my-12">
            <form onSubmit={handleAddClass}>
                {/* form class name and image row */}
                <div className="md:flex mb-8">
                    <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="label-text">Class Name*</span>
                        </label>
                        <label>
                            <input type="text" name="className" placeholder="Class Name" className="input input-bordered w-full" required />
                        </label>
                    </div>
                    <div className="form-control md:w-1/2 ml-4">
                        <label className="label">
                            <span className="label-text">Class Image*</span>
                        </label>
                        <label>
                            <input type="url" name="classImage" placeholder="Class Image" className="input input-bordered w-full" required />
                        </label>
                    </div>
                </div>
                {/* form instructor name and email row */}
                <div className="md:flex mb-8">
                    <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="label-text">Instructor Name*</span>
                        </label>
                        <label>
                            <input type="text" name="instructorName" defaultValue={user.displayName} placeholder="Instructor Name" className="input input-bordered w-full" required />
                        </label>
                    </div>
                    <div className="form-control md:w-1/2 ml-4">
                        <label className="label">
                            <span className="label-text">Instructor Email*</span>
                        </label>
                        <label>
                            <input type="email" name="instructorEmail" defaultValue={user.email} placeholder="Instructor Email" className="input input-bordered w-full" required />
                        </label>
                    </div>
                </div>
                {/* form available seats and price row */}
                <div className="md:flex mb-8">
                    <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="label-text">Available Seats*</span>
                        </label>
                        <label>
                            <input type="text" name="availableSeats" placeholder="Available Seats" className="input input-bordered w-full" required />
                        </label>
                    </div>
                    <div className="form-control md:w-1/2 ml-4">
                        <label className="label">
                            <span className="label-text">Price*</span>
                        </label>
                        <label>
                            <input type="text" name="price" placeholder="Price" className="input input-bordered w-full" required />
                        </label>
                    </div>
                </div>

                <input type="submit" value="Add Class" className="w-full btn bg-gradient-to-r from-[#1CB5E0] to-[#000851] text-white" />

            </form>
        </div>
    );
};

export default AddClass;