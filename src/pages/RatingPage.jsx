import RatingSchedule from '../components/RatingSchedule';

const RatingPage = () => {
  return (
    <div className='page_container'>
      <h1>Rating</h1>
      <div className="grid-container">
        <div className="card">
          <div>
            <RatingSchedule></RatingSchedule>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RatingPage;
