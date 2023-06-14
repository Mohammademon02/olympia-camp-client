

const ClassesCard = ({ classItem }) => {

    const { className, image, availableSeats, instructorName, price } = classItem;

    return (
        <div>
            <div className={availableSeats === 0 ? 'card card-compact w-[80%] h-[420px] bg-red-400 shadow-xl mx-auto' : 'card card-compact w-[80%] h-[420px] bg-base-100 shadow-xl mx-auto'}>
                <figure><img src={image} alt="Shoes" /></figure>
                <div className="card-body">
                    <h2 className="card-title">{className}</h2>
                    <p><strong>Instructor Name:</strong> {instructorName}</p>
                    <p><strong>Available Seats:</strong> {availableSeats}</p>
                    <p><strong>Price:</strong> ${price}</p>
                    <div className="">
                        <button className='btn btn-neutral border-none'>Enroll Now</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClassesCard;