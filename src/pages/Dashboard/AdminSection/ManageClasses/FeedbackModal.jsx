

const FeedbackModal = ({ classCard, handleSendFeedback }) => {
    return (
        <div>
            {/* modal body */}
            <input type="checkbox" id={classCard._id} className="modal-toggle" />
            <div className="modal">
                <div className="modal-box whitespace-normal items-start">
                    <label htmlFor={classCard._id} className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    {/* <h1 className='text-2xl font-bold'>{toyName}</h1> */}
                    <form onSubmit={(event) => handleSendFeedback(event, classCard)}>
                        <div className="mb-3">
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Feedback</span>
                                </label>
                                <label>
                                    <textarea type="text" className="textarea input-bordered w-full" name="feedback" placeholder="Give Feedback"></textarea>
                                </label>
                            </div>
                        </div>
                        <input type="submit" value="Send Feedback" className="btn btn-block bg-gradient-to-r from-[#1CB5E0] to-[#000851] text-white border-none" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default FeedbackModal;