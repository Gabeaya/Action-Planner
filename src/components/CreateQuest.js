import React, { useState} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import {addDoc} from "firebase/firestore"
function CreateQuest({missionValues, setMissionValues}) {
  const [questTitle, setQuestTitle] = useState("");
  const [questOrigin, setQuestOrigin] = useState("");
  const [selectedDate, setSelectedDate ] = useState(null)

  const handleChange = (e, index) => {
    const {name, value} = e.target
    const newMissionValues = [...missionValues];
    newMissionValues[index][name] = value;
    setMissionValues(newMissionValues)
  };

  const addFormFields = () => {
    setMissionValues([...missionValues, {mission: ""}])
  }

  const removeFormFields = (i) => {
    const newMissionValues = [...missionValues];
    newMissionValues.splice(i, 1);
    setMissionValues(newMissionValues)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(JSON.stringify(missionValues));
  }

  console.log(missionValues);

  const createQuest = async () =>
  return (
    <form onSubmit={handleSubmit}>
      <div className='createPostPage'>
        <div className='cpContainer'>
          <h1> Begin a Quest </h1>
          <div className='inputGp'> 
            <label> Quest Name:</label>
            <br/>
            <input 
              placeholder='Title...' 
              onChange={(event) => {
                setQuestTitle(event.target.value);
              }}
            />
          </div>
          <div className="inputGp">
            <label> Quest Origin: </label>
            <br />
            <textarea 
              placeholder='Where does your quest begin...'
              onChange={(event) => {
                setQuestOrigin(event.target.value);
              }}
            />
          </div>
          <div className='datePicker'>
            <label>Quest Deadline</label>
            
              <DatePicker 
                selected={selectedDate}
                onChange={
                  date => setSelectedDate(date)
                }
                minDate={new Date()}
                isClearable
                showYearDropdown
                scrollableMonthYearDropdown
              />
            
          </div>
          
          <div className='inputGp'>
            {missionValues.map((element, index) => (
              <div className='form-inline' key={index}>
                <label>Mission</label>
                <br />
                <input type='text' name='mission' value={element.mission} onChange={(e) => handleChange(e, index)} />
                {
                  index ?
                  <button type='button' className='button remove' onClick={() => removeFormFields(index)}>Remove</button>
                  : null 
                }
              </div>
            ))}
            <br/>
            <div className="button-section">
              <button className="button add" type="button" onClick={() => addFormFields()}>Add Mission</button>

              <br/>
              <button className="button submit" type="submit">Begin Quest!</button>
          </div>
          </div>
        </div>
      </div>
    </form>
    
  )
}

export default CreateQuest