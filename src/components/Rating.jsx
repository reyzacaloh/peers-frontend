import { Rate } from 'antd';
import axios from "axios";
import {useFormik} from "formik";
import {useNavigate} from "react-router-dom";
import { Form, Button } from './registerForm/RegisterStyledComponents';
import Popup from 'reactjs-popup';

function Rating(props) {
  
  const navigate = useNavigate();
  const tutorId = Number(props.tutorId);
  const scheduleId = Number(props.scheduleId);
  const isRated = props.isRated;

  const initialValues = {
    schedule_id: scheduleId,
    tutor_id: tutorId,
    rating: 0,
  };
  
  const onSubmit = async (values, actions) => {
    
    try {
        await axios.post(`${process.env.REACT_APP_API_URL}/api/tutor_form/rate/`, {rating:`${values.rating}`, tutor_id:`${values.tutor_id}`, schedule_id:`${values.schedule_id}`},{
            headers: {
                "content-type": "application/x-www-form-urlencoded",
                authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
            }}
        );
        actions.setSubmitting(false);
        console.log("Success");
        actions.setStatus("success");
        console.log(isRated);

        navigate("/rate");

    } catch (err) {
        console.log(values);
        console.log("Error: ", err);
        actions.setStatus(err.code);
        actions.setSubmitting(false);
    }
};

const formik = useFormik({
  initialValues,
  onSubmit,
});

function MouseOver(event) {
  event.target.style.background = 'grey';
}
function MouseOut(event){
  event.target.style.background="";
}

  return (
    <div style={styles.container}>
      <Popup trigger=
                {<button style={styles.button} disabled={isRated === "true" ? true:false}> Rate Tutor</button>}
                modal nested>
      {close => (
      <><div style={styles.form}>
      <button style={{backgroundColor:"white"}} onMouseOver={MouseOver} onMouseOut={MouseOut} onClick={() => close()}>
        [x]
      </button>
            <Form onSubmit={formik.handleSubmit}>
              <h2> Berikan Rating untuk Tutor Anda </h2>
              <Rate style={styles.rate}
                onChange={(value) => formik.setFieldValue("rating", value)} />
              <Button
                type="submit" 
                disabled={formik.isSubmitting || formik.status === "success" }
              >
                {formik.isSubmitting ? "Processing..." : "Save"}
              </Button>
            </Form>
          </div><div>
            </div></>)
      }
      </Popup>
    </div>
  );
};


const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  stars: {
    display: "flex",
    flexDirection: "row",
    margin: 10,
  },
  button: {
    border: "1px solid #a9a9a9",
    borderRadius: 5,
    width: 90,
    padding: 7,
  },
  form: {
    border: "1px solid #a9a9a9",
    borderRadius: 5,
    width: 300,
    height: 230,
    padding: 10,
    backgroundColor: "white",
    margin:"auto"
  },
  rate: {
    margin: "auto",
    padding: 10,
  }
};

export default Rating;