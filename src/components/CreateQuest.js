import React, { useState} from 'react';
import {addDoc, collection} from "firebase/firestore";
import { db, auth } from '../firebase';
import { useNavigate} from "react-router-dom";
import Footer from './Footer';

function CreateQuest({ missionValues, setMissionValues}) {
  const [questTitle, setQuestTitle] = useState("");
  const [questOrigin, setQuestOrigin] = useState("");
  const [selectedDate, setSelectedDate ] = useState(null);

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

  console.log(missionValues);
  
  const questsCollectionRef = collection(db, "quests")
  let navigate = useNavigate();
  


  const createQuest = async (e) => {
    e.preventDefault();

    await addDoc(questsCollectionRef, {
      
      questTitle, 
      questOrigin, 
      selectedDate, 
      missionValues, 
      author: {name: auth.currentUser.displayName, id: auth.currentUser.uid}
    });
    navigate("/");
  };

  
  return (
      <main>
        <form>
            <div className='layout'>
              <div className='box'>
                <h1> Begin a Quest </h1>
                <div className='inputGp'> 
                  <label> Quest Name:</label>
                  <br/>
                  <input 
                    className="input"
                    placeholder='Title...' 
                    required
                    onChange={(event) => {
                      setQuestTitle(event.target.value);
                    }}

                  />
                </div>
                <div className="inputGp">
                  <label> Quest Origin: </label>
                  <br />
                  <textarea 
                    className="input"
                    placeholder="What's being put into action"
                    required
                    onChange={(event) => {
                      setQuestOrigin(event.target.value);
                    }}
                  />
                </div>
                <div className='datePicker'>
                  <label>Quest Deadline</label>
                  <br/>
                  <input
                    className="input"
                    type="date"
                    required
                    onChange={(event) => {
                      setSelectedDate(event.target.value)
                    }}
                  />
                  
                </div>
                
                <div className='inputGp'>
                  {missionValues.map((element, index) => (
                    <div className='form-inline' key={index}>
                      <label>Mission</label>
                      <br />
                      <input 
                      className="input"
                      placeholder='What is your first step?'
                      type='text' 
                      name='mission' 
                      value={element.mission} 
                      onChange={(e) => handleChange(e, index)} />
                      {
                        index ?
                        <button type='button' className='buttonicon' onClick={() => removeFormFields(index)}>-</button>
                        : null 
                      }
                      <button className="buttonicon" type="button" onClick={() => addFormFields()}>+</button>
                    </div>
                  ))}
                  <br/>
                  <div className="button-section">
                    <button onClick={createQuest} className="button submit" type="submit">Begin Quest!</button>
                  </div>
                </div>
              </div>
            </div>        
        </form>
        <Footer />
      </main>
    
    
  )
}

export default CreateQuest